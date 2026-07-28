'use client'

import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import * as THREE from 'three'
import useReducedMotion from '@/lib/useReducedMotion'

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    // Already a clip-space quad — no matrices needed.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2  uResolution;
  uniform float uTime;
  uniform float uVelocity;   // smoothed scroll velocity, roughly -1..1
  uniform float uProgress;   // 0..1 across the pinned gallery

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // Value noise — cheap enough to run per fragment at this grid density.
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    // Work in aspect-corrected space so cells stay square on any viewport.
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vec2(vUv.x * aspect, vUv.y);

    const float CELL = 0.032;
    vec2 id = floor(p / CELL);
    vec2 gv = fract(p / CELL) - 0.5;

    // The field drifts on its own clock and is pushed sideways by gallery
    // progress, so the texture reads as travelling with the cards.
    float n = noise(id * 0.16 + vec2(uTime * 0.05 + uProgress * 2.2, uTime * 0.03));

    // Scroll velocity stretches each dot horizontally. Sampling the grid
    // rather than blurring keeps it cheap and gives a clean smear.
    float stretch = 1.0 + abs(uVelocity) * 6.0;
    gv.x /= stretch;

    float radius = 0.10 + n * 0.22;
    float d = length(gv);
    float mask = smoothstep(radius, radius - 0.07, d);

    // Fade the field out at the edges so it never collides with the section
    // borders or the type sitting on top of it.
    float edge = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.82, vUv.y);

    float alpha = mask * (0.030 + n * 0.055) * edge;
    gl_FragColor = vec4(vec3(0.0), alpha);
  }
`

/**
 * The texture behind the pinned gallery. Deliberately near-invisible at rest —
 * it exists to give the scroll weight, not to be looked at directly.
 *
 * `progressRef` is a plain ref of 0..1 written by the gallery's ScrollTrigger.
 * Passing it as a ref rather than a prop keeps React out of the frame loop.
 */
export default function PortfolioCanvas({ progressRef }) {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)
  const velocityRef = useRef(0)
  const reducedMotion = useReducedMotion()
  const reducedRef = useRef(false)

  useEffect(() => {
    reducedRef.current = reducedMotion
  }, [reducedMotion])

  // Lenis reports velocity in px/frame; scale it into roughly -1..1.
  useLenis((lenis) => {
    velocityRef.current = THREE.MathUtils.clamp(lenis.velocity / 45, -1, 1)
  })

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      // No WebGL — the section reads fine without its backdrop.
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearAlpha(0)

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uVelocity: { value: 0 },
      uProgress: { value: 0 },
    }

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })
    scene.add(new THREE.Mesh(geometry, material))

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host
      if (!w || !h) return
      renderer.setSize(w, h, false)
      uniforms.uResolution.value.set(w, h)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(host)

    let frame
    let last = performance.now()
    let elapsed = 0
    let visible = true
    let onscreen = true
    let smoothedVelocity = 0

    const onVisibility = () => {
      visible = document.visibilityState === 'visible'
      last = performance.now()
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Nothing to draw while the section is off-screen — this canvas sits in
    // the middle of a long page and would otherwise burn a GPU frame forever.
    const io = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting
      },
      { rootMargin: '200px 0px' }
    )
    io.observe(host)

    const tick = (now) => {
      frame = requestAnimationFrame(tick)

      const delta = (now - last) / 1000
      last = now
      if (!visible || !onscreen) return

      if (!reducedRef.current) elapsed += delta

      // Ease toward the reported velocity so a flick decays instead of
      // snapping back the instant the wheel stops.
      const target = reducedRef.current ? 0 : velocityRef.current
      smoothedVelocity += (target - smoothedVelocity) * Math.min(delta * 6, 1)

      uniforms.uTime.value = elapsed
      uniforms.uVelocity.value = smoothedVelocity
      uniforms.uProgress.value = progressRef?.current ?? 0

      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [progressRef])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
