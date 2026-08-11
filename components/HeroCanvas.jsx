'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { HERO_IMAGE } from '@/lib/assets'
import useReducedMotion from '@/lib/useReducedMotion'

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    // Geometry is already a clip-space quad, so no matrices are needed.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2  uResolution;
  uniform vec2  uTexSize;
  uniform float uTime;
  uniform float uPortrait;

  // Pointer in canvas space (0..1), and how much of the lens to apply. The
  // strength is separate so the effect can fade in and out without the lens
  // sliding in from wherever the cursor was last seen.
  uniform vec2  uPointer;
  uniform float uPointerFade;

  // 0 at the top of the hero, 1 once it has scrolled a screen away.
  uniform float uScroll;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    /*
      Held before the portrait rotation below. The lens has to follow the
      cursor where it actually is on screen, so it is measured in unrotated
      canvas space while the artwork sampling is not.
    */
    vec2 screenUv = vUv;

    vec2 uv = vUv;
    vec2 frame = uResolution;

    // Portrait viewports rotate the artwork a quarter turn so the
    // landscape composition still fills the frame.
    if (uPortrait > 0.5) {
      uv = vec2(uv.y, 1.0 - uv.x);
      frame = uResolution.yx;
    }

    // background-size: cover
    float frameRatio = frame.x / frame.y;
    float texRatio   = uTexSize.x / uTexSize.y;
    vec2 covered = frameRatio < texRatio
      ? vec2(uTexSize.x * frame.y / uTexSize.y, frame.y)
      : vec2(frame.x, uTexSize.y * frame.x / uTexSize.x);
    vec2 offset = (frameRatio < texRatio
      ? vec2((covered.x - frame.x) * 0.5, 0.0)
      : vec2(0.0, (covered.y - frame.y) * 0.5)) / covered;
    uv = uv * frame / covered + offset;

    /*
      Scroll depth. A slow push-in as the hero leaves, so the background
      recedes at a different rate from the type sliding over it — the
      parallax that makes a flat image read as a layer behind the content
      rather than part of it.

      Scaled about the centre and kept under 5%: enough to separate the
      planes, small enough that the composition never visibly reframes.
    */
    uv = (uv - 0.5) * (1.0 - uScroll * 0.045) + 0.5;

    // Slow crossed sine drift — enough to keep the surface alive without
    // reading as a distortion effect.
    float t = uTime * 0.06;
    float wave = sin(uv.y * 3.0 + t) * 0.0040
               + sin(uv.x * 4.0 - t * 1.3) * 0.0030;

    /*
      Cursor lens.

      A gaussian falloff around the pointer, aspect-corrected so it stays
      circular on a wide viewport rather than stretching into an ellipse.
      The texture is pushed outward along the vector from the cursor, which
      reads as a soft magnification of whatever sits under it.

      exp(-d*d) rather than smoothstep: it has no hard outer edge, so the
      effect has nowhere to visibly stop.
    */
    vec2 toPointer = (screenUv - uPointer) * vec2(uResolution.x / uResolution.y, 1.0);
    float lens = exp(-dot(toPointer, toPointer) * 11.0) * uPointerFade;
    vec2 push = normalize(toPointer + 1e-5) * lens * 0.011;

    vec2 warped = clamp(uv + vec2(wave, wave * 0.5) + push, 0.0, 1.0);

    vec3 color = texture2D(uTexture, warped).rgb;

    // The lens lifts as well as displaces. Refraction alone is legible only
    // where the artwork already has detail; the lift keeps it readable
    // across the flat areas too.
    color += lens * 0.05;

    // Fine grain, then a slight lift toward white so the black type on top
    // keeps its contrast against the busiest parts of the image.
    color += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.018;
    color = mix(color, vec3(1.0), 0.04);

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function HeroCanvas() {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const reducedRef = useRef(false)
  const [ready, setReady] = useState(false)

  // Read through a ref so toggling the preference doesn't tear down the scene.
  useEffect(() => {
    reducedRef.current = reducedMotion
  }, [reducedMotion])

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
      })
    } catch {
      // No WebGL — the CSS background underneath stays visible.
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()

    const uniforms = {
      uTexture: { value: null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTexSize: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uPortrait: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uPointerFade: { value: 0 },
      uScroll: { value: 0 },
    }

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthTest: false,
      depthWrite: false,
    })
    scene.add(new THREE.Mesh(geometry, material))

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host
      if (!w || !h) return
      renderer.setSize(w, h, false)
      uniforms.uResolution.value.set(w, h)
      uniforms.uPortrait.value = h > w ? 1 : 0
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(host)

    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')

    let texture
    let disposed = false

    loader.load(
      HERO_IMAGE,
      (loaded) => {
        if (disposed) {
          loaded.dispose()
          return
        }
        texture = loaded
        texture.colorSpace = THREE.SRGBColorSpace
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false
        uniforms.uTexture.value = texture
        uniforms.uTexSize.value.set(texture.image.width, texture.image.height)
        setReady(true)
      },
      undefined,
      () => {
        // Texture failed — leave the CSS background showing.
      }
    )

    /*
      ── Pointer ─────────────────────────────────────────────────────────
      Listened for on the window rather than the host. The host sits at z-0
      under the headline and both CTAs, so a listener on it goes silent
      exactly where the cursor spends most of its time.

      Only the raw target is recorded here; the smoothing happens in the
      loop, so a burst of pointermove events costs two assignments rather
      than a tween each.
    */
    let targetX = 0.5
    let targetY = 0.5
    let pointerX = 0.5
    let pointerY = 0.5
    let targetFade = 0
    let fade = 0

    const onPointerMove = (event) => {
      // Fine pointers only. A touch drag would haul the lens across the
      // hero, and there is no cursor there to justify it.
      if (event.pointerType !== 'mouse') return

      const rect = host.getBoundingClientRect()
      const inside =
        event.clientY >= rect.top && event.clientY <= rect.bottom

      targetFade = inside ? 1 : 0
      if (!inside) return

      targetX = (event.clientX - rect.left) / rect.width
      // Flipped: the canvas samples with v running bottom-up.
      targetY = 1 - (event.clientY - rect.top) / rect.height
    }

    const onPointerLeave = () => {
      targetFade = 0
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)

    let frame
    let last = performance.now()
    let elapsed = 0
    let visible = true

    const onVisibility = () => {
      visible = document.visibilityState === 'visible'
      last = performance.now()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const tick = (now) => {
      frame = requestAnimationFrame(tick)

      const delta = (now - last) / 1000
      last = now
      if (!visible || !uniforms.uTexture.value) return

      if (!reducedRef.current) elapsed += delta
      uniforms.uTime.value = elapsed

      if (reducedRef.current) {
        // Both extras are motion the visitor asked not to see. The drift
        // above is already frozen by holding `elapsed`.
        uniforms.uPointerFade.value = 0
        uniforms.uScroll.value = 0
      } else {
        /*
          Frame-rate independent smoothing. A fixed lerp factor moves twice
          as far per second at 120Hz as at 60, so the lens would visibly
          chase harder on a high-refresh display; raising the retained
          fraction by delta keeps the time constant the same everywhere.
        */
        const ease = 1 - Math.pow(0.0015, delta)
        pointerX += (targetX - pointerX) * ease
        pointerY += (targetY - pointerY) * ease
        fade += (targetFade - fade) * (1 - Math.pow(0.02, delta))

        uniforms.uPointer.value.set(pointerX, pointerY)
        uniforms.uPointerFade.value = fade

        /*
          Read from the element rather than window.scrollY: Lenis owns the
          scroll position and drives it on its own schedule, so a cached
          scroll value would lag the transform actually being painted.
        */
        const top = host.getBoundingClientRect().top
        uniforms.uScroll.value = Math.min(Math.max(-top / host.clientHeight, 0), 1)
      }

      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      geometry.dispose()
      material.dispose()
      texture?.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={hostRef} className="absolute inset-0 z-0 overflow-hidden">
      {/*
        No fallback layer here any more — HeroBackdrop renders the image for
        every visitor and sits underneath. This canvas fades in over it once
        the texture has arrived, so a WebGL failure or a slow texture simply
        leaves the backdrop showing rather than a blank hero.
      */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
