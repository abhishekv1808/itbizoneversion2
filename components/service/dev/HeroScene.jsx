'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * A living gradient, drawn rather than loaded.
 *
 * ── Composition ───────────────────────────────────────────────────────────
 * Concentric bands around a centre placed *above* the frame's middle, so only
 * their lower arcs are ever in view. Everything above that centre falls short
 * of the first band and stays clean white — which is why the type can sit dead
 * centre over a full-bleed gradient and still read as if it were on paper.
 *
 * The alternative — an even radial wash — put colour behind the headline as
 * well as below it. Anchoring the rings to a point above the content moves the
 * whole colour field to the lower half without masking anything.
 *
 * Bands breathe on a slow sine and are displaced by fBm, so the arcs read as
 * light rather than as concentric circles. Without the displacement the rings
 * are unmistakably geometric.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform float uScroll;
  varying vec2  vUv;

  // Hues drawn from the same range as the home hero's artwork.
  const vec3 CYAN   = vec3(0.435, 0.878, 0.867);
  const vec3 BLUE   = vec3(0.404, 0.545, 0.949);
  const vec3 VIOLET = vec3(0.639, 0.478, 0.949);
  const vec3 MINT   = vec3(0.643, 0.925, 0.792);

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

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

  float fbm(vec2 p) {
    float total = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      total += noise(p) * amp;
      p *= 2.02;
      amp *= 0.5;
    }
    return total;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    float t = uTime * 0.05;

    /*
      The rings are wider than they are tall, and more so on wide viewports —
      a true circle on a 21:9 monitor puts the arc's shoulders off screen and
      the band reads as a straight horizon.
    */
    float squash = mix(0.95, 0.58, clamp((aspect - 0.5) / 1.4, 0.0, 1.0));

    /*
      uv.y = 0 is the BOTTOM of the quad, not the top — PlaneGeometry's UVs
      run bottom-up. The ring centre therefore has to sit HIGH in uv space to
      put its arcs low on screen; a centre of 0.30 renders the whole
      composition upside down, with the colour across the top.
    */
    vec2 centre = vec2(0.5, 0.70);
    float d = length((uv - centre) * vec2(squash, 1.0));

    // Organic displacement so the arcs are not perfect circles.
    d += (fbm(uv * 2.6 + t) - 0.5) * 0.085;

    /*
      ── Breath ─────────────────────────────────────────────────────────────
      Asymmetric on purpose. A real breath draws in faster than it lets go, and
      a plain sine reads as a machine oscillation — the eye locks onto the
      constant rate and it stops feeling alive. Here the rise takes 38% of the
      cycle and the fall the remaining 62%.

      A second, much slower and non-harmonic wave rides on top so successive
      breaths are not identical. Without it the loop becomes predictable after
      about three cycles.
    */
    float phase = fract(uTime / 8.5);
    float breath = phase < 0.38
      ? smoothstep(0.0, 1.0, phase / 0.38)
      : 1.0 - smoothstep(0.0, 1.0, (phase - 0.38) / 0.62);

    float swell = breath * 2.0 - 1.0;                 // -1 .. 1
    swell = swell * 0.85 + sin(uTime * 0.11) * 0.15;  // slow wander

    /*
      Where colour begins. Above the centre the distance never reaches this, so
      the top of the frame stays white without any masking. 0.34 puts the first
      band at roughly two-thirds down — clear of the headline and the CTAs, and
      only grazing the very corners at the subhead's height.
    */
    /*
      Three things breathe together, which is what separates a pulse from a
      translation: the radius (the mass rises and falls), the band spread (it
      softens as it expands, the way anything inflating does), and the
      intensity. Moving the radius alone just slides the arcs up and down.
    */
    float r0 = 0.34 - swell * 0.055;
    float spread = 1.0 + swell * 0.16;
    float lift = 1.0 + swell * 0.07;

    float b1 = smoothstep(r0, r0 + 0.11 * spread, d);
    float b2 = smoothstep(r0 + 0.10 * spread, r0 + 0.25 * spread, d);
    float b3 = smoothstep(r0 + 0.22 * spread, r0 + 0.44 * spread, d);

    vec3 color = vec3(1.0);
    color = mix(color, MINT, clamp(b1 * 0.55 * lift, 0.0, 1.0));
    color = mix(color, CYAN, clamp(b1 * lift, 0.0, 1.0));
    color = mix(color, BLUE, clamp(b2 * lift, 0.0, 1.0));
    color = mix(color, VIOLET, clamp(b3 * 0.92 * lift, 0.0, 1.0));

    // Fade the field as the section leaves, so the next one arrives on white.
    color = mix(vec3(1.0), color, clamp(1.0 - uScroll * 1.15, 0.0, 1.0));

    // Fine grain stops the large flat areas from banding.
    color += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.014;

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function HeroScene({ hostRef, reducedMotion }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false })
    } catch {
      return // No WebGL — the CSS gradient underneath carries the section.
    }

    // A full-bleed gradient has no fine detail, so device pixel ratio buys
    // nothing here. Capping at 1.5 halves the fragment count on retina.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
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
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(host)

    const scrollTrigger = ScrollTrigger.create({
      trigger: host,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        uniforms.uScroll.value = self.progress
      },
    })

    let frame
    let visible = true
    let onScreen = true
    let elapsed = 0
    let last = performance.now()

    const onVisibility = () => {
      visible = document.visibilityState === 'visible'
      last = performance.now()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        last = performance.now()
      },
      { threshold: 0 }
    )
    io.observe(host)

    const tick = (now) => {
      frame = requestAnimationFrame(tick)
      const delta = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!visible || !onScreen) return

      if (!reducedMotion) elapsed += delta
      uniforms.uTime.value = elapsed
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      scrollTrigger.kill()
      observer.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [hostRef, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}
