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

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
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

    // Slow crossed sine drift — enough to keep the surface alive without
    // reading as a distortion effect.
    float t = uTime * 0.06;
    float wave = sin(uv.y * 3.0 + t) * 0.0040
               + sin(uv.x * 4.0 - t * 1.3) * 0.0030;
    vec2 warped = clamp(uv + vec2(wave, wave * 0.5), 0.0, 1.0);

    vec3 color = texture2D(uTexture, warped).rgb;

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
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      geometry.dispose()
      material.dispose()
      texture?.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={hostRef} className="absolute inset-0 z-0 overflow-hidden">
      {/* Fallback layer: covers no-WebGL, texture errors, and the pre-load
          frames. The canvas fades in over the top once it has something. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat max-md:top-1/2 max-md:left-1/2 max-md:h-[100vw] max-md:w-[1000px] max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:rotate-90"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
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
