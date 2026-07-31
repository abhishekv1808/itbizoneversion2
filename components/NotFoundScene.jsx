'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import Link from 'next/link'
import { ArrowLeft, Home, MessageCircle } from 'lucide-react'
import Logo from '@/components/ui/Logo'

/* ─── Colour palette (matches the site tokens) ────────────────────── */
const PALETTE = {
  bg: 0x0a0a0a,
  primary: 0x17c964,
  accent: 0x00d4ff,
  warm: 0xff6b35,
  white: 0xffffff,
  muted: 0x6b6b6b,
}

/* ─── Floating particle field ──────────────────────────────────────── */
function createParticles(scene) {
  const count = 600
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 40
    pos[i * 3 + 1] = (Math.random() - 0.5) * 40
    pos[i * 3 + 2] = (Math.random() - 0.5) * 40
    sizes[i] = Math.random() * 2 + 0.5
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  const mat = new THREE.PointsMaterial({
    color: PALETTE.primary,
    size: 0.06,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const points = new THREE.Points(geo, mat)
  scene.add(points)
  return points
}

/* ─── Glowing "404" made from voxel cubes ──────────────────────────── */
function createDigit(char, x, scene) {
  const group = new THREE.Group()
  group.position.set(x, 0, 0)

  // Each digit is built from small cubes arranged in a 5×7 grid (pixel font)
  const patterns = {
    4: [
      [1, 0, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
    ],
    0: [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
    ],
  }

  const pattern = patterns[char]
  const cubeSize = 0.32
  const gap = 0.04
  const step = cubeSize + gap
  const cubes = []

  const colors = [
    new THREE.Color(PALETTE.primary),
    new THREE.Color(PALETTE.accent),
    new THREE.Color(PALETTE.warm),
  ]

  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      if (pattern[row][col]) {
        const geo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
        const color = colors[Math.floor(Math.random() * colors.length)]
        const mat = new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.3,
          metalness: 0.4,
          roughness: 0.3,
        })

        const cube = new THREE.Mesh(geo, mat)
        cube.position.set(
          (col - 2) * step,
          (3 - row) * step,
          0
        )

        // Store original position for animation
        cube.userData.originalPos = cube.position.clone()
        cube.userData.floatOffset = Math.random() * Math.PI * 2
        cube.userData.floatSpeed = 0.5 + Math.random() * 1.5
        cube.userData.floatAmplitude = 0.02 + Math.random() * 0.04

        cubes.push(cube)
        group.add(cube)
      }
    }
  }

  scene.add(group)
  return { group, cubes }
}

/* ─── Orbiting ring ────────────────────────────────────────────────── */
function createOrbitRing(scene, radius, color, tiltX, tiltZ) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0)
  const points = curve.getPoints(128)
  const geo = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(p.x, 0, p.y))
  )
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
  })
  const ring = new THREE.Line(geo, mat)
  ring.rotation.x = tiltX
  ring.rotation.z = tiltZ
  scene.add(ring)

  // Orbiting sphere
  const sphereGeo = new THREE.SphereGeometry(0.08, 16, 16)
  const sphereMat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.8,
  })
  const sphere = new THREE.Mesh(sphereGeo, sphereMat)
  scene.add(sphere)

  return { ring, sphere, radius, tiltX, tiltZ }
}

/* ─── Glitch lines ─────────────────────────────────────────────────── */
function createGlitchLines(scene) {
  const lines = []
  for (let i = 0; i < 8; i++) {
    const points = [
      new THREE.Vector3(-8 + Math.random() * 16, (Math.random() - 0.5) * 8, -2),
      new THREE.Vector3(-8 + Math.random() * 16, (Math.random() - 0.5) * 8, -2),
    ]
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    const mat = new THREE.LineBasicMaterial({
      color: PALETTE.primary,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    })
    const line = new THREE.Line(geo, mat)
    scene.add(line)
    lines.push({ line, mat })
  }
  return lines
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function NotFoundScene() {
  const canvasContainerRef = useRef(null)
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
  }, [])

  useEffect(() => {
    const container = canvasContainerRef.current
    if (!container) return

    /* ── Renderer setup ─────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(PALETTE.bg, 1)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    /* ── Scene + Camera ─────────────────────────────── */
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(PALETTE.bg, 0.035)

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 10)

    /* ── Lights ─────────────────────────────────────── */
    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1)
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)

    const rimLight = new THREE.PointLight(PALETTE.primary, 2, 20)
    rimLight.position.set(-5, 3, 3)
    scene.add(rimLight)

    const fillLight = new THREE.PointLight(PALETTE.accent, 1.5, 20)
    fillLight.position.set(5, -3, 3)
    scene.add(fillLight)

    /* ── Objects ─────────────────────────────────────── */
    const digit4a = createDigit(4, -2.8, scene)
    const digit0 = createDigit(0, 0, scene)
    const digit4b = createDigit(4, 2.8, scene)

    const particles = createParticles(scene)

    const orbit1 = createOrbitRing(scene, 5, PALETTE.primary, 0.8, 0.2)
    const orbit2 = createOrbitRing(scene, 6, PALETTE.accent, -0.5, -0.3)
    const orbit3 = createOrbitRing(scene, 4, PALETTE.warm, 1.2, 0.5)

    const glitchLines = createGlitchLines(scene)

    const allDigitGroups = [digit4a, digit0, digit4b]

    /* ── Entrance animation ─────────────────────────── */
    allDigitGroups.forEach((d, i) => {
      d.cubes.forEach((cube) => {
        const orig = cube.userData.originalPos.clone()
        cube.position.set(
          orig.x + (Math.random() - 0.5) * 12,
          orig.y + (Math.random() - 0.5) * 12,
          orig.z + (Math.random() - 0.5) * 12
        )
        cube.scale.set(0, 0, 0)
        cube.rotation.set(
          Math.random() * Math.PI * 4,
          Math.random() * Math.PI * 4,
          Math.random() * Math.PI * 4
        )

        gsap.to(cube.position, {
          x: orig.x,
          y: orig.y,
          z: orig.z,
          duration: 1.4,
          delay: 0.3 + i * 0.15 + Math.random() * 0.3,
          ease: 'back.out(1.7)',
        })
        gsap.to(cube.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          delay: 0.3 + i * 0.15 + Math.random() * 0.3,
          ease: 'elastic.out(1, 0.5)',
        })
        gsap.to(cube.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.4,
          delay: 0.3 + i * 0.15 + Math.random() * 0.3,
          ease: 'power3.out',
        })
      })
    })

    /* ── Periodic glitch ────────────────────────────── */
    function triggerGlitch() {
      const target = allDigitGroups[Math.floor(Math.random() * 3)]
      target.cubes.forEach((cube) => {
        const orig = cube.userData.originalPos
        gsap.to(cube.position, {
          x: orig.x + (Math.random() - 0.5) * 0.6,
          y: orig.y + (Math.random() - 0.5) * 0.6,
          z: orig.z + (Math.random() - 0.5) * 0.4,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        })
      })

      glitchLines.forEach((g) => {
        if (Math.random() > 0.5) {
          gsap.to(g.mat, {
            opacity: 0.6 + Math.random() * 0.4,
            duration: 0.05,
            yoyo: true,
            repeat: 3,
            ease: 'steps(1)',
            onComplete: () => { g.mat.opacity = 0 },
          })
        }
      })

      gsap.delayedCall(2 + Math.random() * 4, triggerGlitch)
    }
    gsap.delayedCall(2.5, triggerGlitch)

    /* ── Resize ─────────────────────────────────────── */
    function handleResize() {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    /* ── Render loop ────────────────────────────────── */
    const clock = new THREE.Clock()

    function animate() {
      rafRef.current = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Camera follows mouse
      camera.position.x += (mx * 1.2 - camera.position.x) * 0.03
      camera.position.y += (-my * 0.8 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)

      // Floating cubes
      allDigitGroups.forEach((d) => {
        d.cubes.forEach((cube) => {
          const o = cube.userData
          cube.position.y =
            o.originalPos.y +
            Math.sin(t * o.floatSpeed + o.floatOffset) * o.floatAmplitude
          cube.rotation.x = Math.sin(t * 0.3 + o.floatOffset) * 0.05
          cube.rotation.y = Math.cos(t * 0.4 + o.floatOffset) * 0.05
        })
        // Subtle group breathing
        d.group.rotation.y = Math.sin(t * 0.15) * 0.04 + mx * 0.06
        d.group.rotation.x = Math.cos(t * 0.12) * 0.03 + my * 0.04
      })

      // Particles rotate
      particles.rotation.y = t * 0.03
      particles.rotation.x = Math.sin(t * 0.02) * 0.1

      // Orbiting spheres
      ;[orbit1, orbit2, orbit3].forEach((o, i) => {
        const speed = 0.25 + i * 0.12
        const angle = t * speed
        const x = Math.cos(angle) * o.radius
        const z = Math.sin(angle) * o.radius
        const euler = new THREE.Euler(o.tiltX, 0, o.tiltZ)
        const vec = new THREE.Vector3(x, 0, z).applyEuler(euler)
        o.sphere.position.copy(vec)
      })

      // Pulsing lights
      rimLight.intensity = 2 + Math.sin(t * 1.5) * 0.5
      fillLight.intensity = 1.5 + Math.cos(t * 1.2) * 0.3

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      gsap.killTweensOf('*')
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a]">
      {/* Three.js canvas — confined to the upper ~55% of the viewport */}
      <div
        ref={canvasContainerRef}
        className="absolute top-0 left-0 right-0 z-0"
        style={{ height: '60vh' }}
        aria-hidden="true"
      />

      {/* Radial vignette over the 3D scene */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-[1]"
        style={{
          height: '60vh',
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.8) 100%)',
        }}
      />

      {/* Gradient fade from 3D scene to text area */}
      <div
        className="pointer-events-none absolute left-0 right-0 z-[1]"
        style={{
          top: '42vh',
          height: '20vh',
          background:
            'linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)',
        }}
      />

      {/* Content — positioned in the lower portion */}
      <div
        className="relative z-[2] flex flex-col items-center px-6 text-center"
        style={{ paddingTop: '55vh' }}
      >
        {/* Animated badge */}
        <span
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/60 backdrop-blur-sm"
          style={{ animation: 'nf-fadeSlideUp 0.8s ease-out 1.8s both' }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full bg-[#ff6b35]"
            style={{ animation: 'nf-pulse-dot 2s ease-in-out infinite' }}
          />
          Page Not Found
        </span>

        {/* Subtitle */}
        <p
          className="max-w-[480px] text-[17px] leading-[1.55] font-normal text-white/50"
          style={{ animation: 'nf-fadeSlideUp 0.8s ease-out 2s both' }}
        >
          The page you&rsquo;re looking for has drifted into the void.
          <br className="hidden md:block" />
          Let&rsquo;s get you back on track.
        </p>

        {/* Action buttons */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animation: 'nf-fadeSlideUp 0.8s ease-out 2.2s both' }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0a0a0a] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(23,201,100,0.3)]"
          >
            <Home size={16} />
            Go Home
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3.5 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/5 hover:text-white"
          >
            <MessageCircle size={16} />
            Contact Us
          </Link>
        </div>

        {/* Back link */}
        <button
          onClick={() => {
            if (typeof window !== 'undefined') window.history.back()
          }}
          className="mt-8 mb-16 inline-flex items-center gap-1.5 text-[13px] text-white/35 transition-colors duration-200 hover:text-white/70 cursor-pointer"
          style={{ animation: 'nf-fadeSlideUp 0.8s ease-out 2.4s both' }}
        >
          <ArrowLeft size={13} />
          Go back to previous page
        </button>
      </div>

      {/* Bottom credit line */}
      <div
        className="absolute bottom-6 left-0 right-0 z-[2] text-center text-[12px] text-white/20"
        style={{ animation: 'nf-fadeSlideUp 0.8s ease-out 2.6s both' }}
      >
        <span className="inline-flex items-center gap-1.5">
          Error 404 ·
          <Logo reversed alt="ITBIZONE" className="h-[11px] w-auto" />
        </span>
      </div>

      {/* Keyframe animations — scoped with nf- prefix to avoid collision */}
      <style>{`
        @keyframes nf-fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes nf-pulse-dot {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.7);
          }
        }
      `}</style>
    </div>
  )
}
