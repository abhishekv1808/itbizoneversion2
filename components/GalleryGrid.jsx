'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { POSTERS, drawPoster } from '@/lib/posters'

gsap.registerPlugin(ScrollTrigger)

/**
 * Crops a texture to a target aspect instead of stretching it.
 *
 * The wall's planes are a fixed 2:3, but the artwork is a mix of 9:16 stories,
 * 1:1 posts, a 2819x4000 brochure and a visiting card. Without this every
 * square post would be squeezed into portrait. Same idea as CSS object-fit:
 * cover, expressed as a UV window.
 */
function cover(texture, planeAspect) {
  const image = texture.image
  if (!image?.width || !image?.height) return
  const imageAspect = image.width / image.height

  if (imageAspect > planeAspect) {
    // Wider than the plane — trim the sides.
    texture.repeat.set(planeAspect / imageAspect, 1)
    texture.offset.set((1 - texture.repeat.x) / 2, 0)
  } else {
    // Taller than the plane — trim top and bottom.
    texture.repeat.set(1, imageAspect / planeAspect)
    texture.offset.set(0, (1 - texture.repeat.y) / 2)
  }
}


/**
 * Card size on screen works out to roughly:
 *
 *     containerWidth / COLS
 *
 * because the camera frames exactly one lattice period, so COLS columns must
 * always span the container. Height does NOT change how big a poster draws —
 * it only decides how many rows come into view. That makes COLS and the
 * container width the two levers, and it is why this section is full-bleed:
 * the 1200px measure was capping the cards.
 *
 * Visible count scales with COLS², so 8 columns holds 22–24 on screen while
 * still drawing each poster ~22% larger than a 7-column field did.
 */
const COLS = 8
const ROWS = 4
const PLANE_H = 1.8
const PLANE_W = PLANE_H * (2 / 3) // posters are 2:3
const GAP = 0.3

const CELL_W = PLANE_W + GAP
const CELL_H = PLANE_H + GAP
const SPAN_X = COLS * CELL_W
const SPAN_Y = ROWS * CELL_H

const FOV = 45
const CLICK_SLOP = 6

const vertexShader = /* glsl */ `
  uniform float uCurve;
  uniform float uCurveStart;

  varying vec2  vUv;
  varying float vDist;

  void main() {
    vUv = uv;

    vec4 world = modelMatrix * vec4(position, 1.0);
    vDist = length(world.xy);

    /*
      The bend is confined to a band along the section's edges.

      It used to be applied across the whole field, scaled by vDist squared,
      which curves radially outward from the centre — so cards well inside the
      frame were already tilting, and the falloff traced a circle rather than
      the shape of a wide section.

      To scope it rectangularly this projects the vertex once *unbent* to find
      where it lands on screen, derives how close that is to the nearest
      viewport edge, and only then applies the bend. Two projections per vertex
      is cheap: there are COLS x ROWS = 32 planes of 12x12 segments, not a
      character model.
    */
    vec4 flatClip = projectionMatrix * viewMatrix * world;
    vec2 ndc = flatClip.xy / flatClip.w;

    // 0 dead centre, 1 at the viewport edge — min() of the two axes makes the
    // contour a rectangle rather than a circle.
    float edge = 1.0 - min(1.0 - abs(ndc.x), 1.0 - abs(ndc.y));
    float amount = smoothstep(uCurveStart, 1.0, edge);

    world.z -= vDist * vDist * uCurve * amount;

    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uMap;
  uniform float uHover;
  uniform float uAspect;
  uniform float uFadeStart;
  uniform float uFadeEnd;
  varying vec2  vUv;
  varying float vDist;

  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
    // 0.11 in this space is ~16% of the card's width. At 0.05 the corners
    // were geometrically rounded but read as square at the size a card
    // actually draws on screen.
    float d = roundedBox(p, vec2(uAspect, 1.0) * 0.5, 0.11);

    float mask = 1.0 - smoothstep(-0.005, 0.005, d);
    if (mask <= 0.001) discard;

    vec3 color = texture2D(uMap, vUv).rgb;

    // Dissolve toward the rim. This is also what hides the tiling seam —
    // a repeated poster has faded out before it reaches the far edge.
    float fade = 1.0 - smoothstep(uFadeStart, uFadeEnd, vDist);

    color = mix(color, color * 1.06 + 0.02, uHover);

    // Opacity is left to the radial seam fade alone. An extra rectangular
    // dimming pass was tried here and removed: the edge treatment asked for is
    // the geometric bend in the vertex stage, and dimming on top of it made
    // the outer cards harder to read rather than softer.
    gl_FragColor = vec4(color, mask * fade);
  }
`

/** Wrap a coordinate into [-span/2, span/2) for seamless tiling. */
function wrap(value, span) {
  return (((value + span / 2) % span) + span) % span - span / 2
}

/**
 * An endless field of posters you drag around in any direction.
 *
 * The lattice is only COLS×ROWS meshes; they are repositioned by modulo each
 * frame rather than duplicated, so panning forever costs the same as standing
 * still.
 */
export default function GalleryGrid({ onSelect, onActiveChange }) {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearAlpha(0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100)

    // Enough segments that the dome bend reads as a curve, not a crease.
    const geometry = new THREE.PlaneGeometry(PLANE_W, PLANE_H, 12, 12)
    const meshes = []
    const textures = []
    const loader = new THREE.TextureLoader()
    let disposed = false

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const index = row * COLS + col
        const spec = POSTERS[index % POSTERS.length]

        /*
          The drawn composition goes up first and the real artwork replaces it
          when it arrives. Loading synchronously is not an option — these are
          13 files, several over 400KB — and starting from a blank plane would
          flash an empty wall on every load.
        */
        const texture = new THREE.CanvasTexture(drawPoster(spec))
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
        textures.push(texture)

        if (spec.src) {
          loader.load(
            spec.src,
            (loaded) => {
              if (disposed) {
                loaded.dispose()
                return
              }
              loaded.colorSpace = THREE.SRGBColorSpace
              loaded.anisotropy = renderer.capabilities.getMaxAnisotropy()
              cover(loaded, PLANE_W / PLANE_H)
              textures.push(loaded)
              material.uniforms.uMap.value = loaded
            },
            undefined,
            // Leave the drawn composition in place on failure.
            () => {}
          )
        }

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          transparent: true,
          uniforms: {
            uMap: { value: texture },
            uHover: { value: 0 },
            uAspect: { value: PLANE_W / PLANE_H },
            // Retuned for the 8×4 field. Curvature is applied to squared
            // radius, so widening the span without flattening the dome would
            // drive the corner posters far behind the camera plane.
            uCurve: { value: 0.032 },
            uFadeStart: { value: 4.0 },
            uFadeEnd: { value: 7.2 },
            /*
              Where the bend starts, as a fraction of the way from the centre
              of the viewport to its edge. 0.6 leaves the middle 60% of the
              field perfectly flat and ramps the curve in over the outer 40%.
            */
            uCurveStart: { value: 0.6 },
          },
        })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.userData = {
          index,
          spec,
          baseX: (col - (COLS - 1) / 2) * CELL_W,
          // Offsetting alternate columns breaks the rigid grid without
          // disturbing the wrap, since the shift stays inside one span.
          baseY: (row - (ROWS - 1) / 2) * CELL_H + (col % 2) * CELL_H * 0.5,
        }

        scene.add(mesh)
        meshes.push(mesh)
      }
    }

    // ── framing ─────────────────────────────────────────────────────────
    let worldPerPixel = 0.01

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host
      if (!w || !h) return

      renderer.setSize(w, h, false)
      const aspect = w / h
      camera.aspect = aspect

      // Never show more than one full lattice period in either axis,
      // otherwise the same poster appears twice on screen.
      const visibleHeight = Math.min(SPAN_Y, SPAN_X / aspect) * 0.94
      camera.position.z =
        visibleHeight / (2 * Math.tan(THREE.MathUtils.degToRad(FOV) / 2))
      camera.updateProjectionMatrix()

      worldPerPixel = visibleHeight / h
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)

    // ── interaction state ───────────────────────────────────────────────
    let offsetX = 0
    let offsetY = 0
    let velocityX = 0
    let velocityY = 0
    let scrollOffsetY = 0

    let dragging = false
    let pointerId = null
    let lastX = 0
    let lastY = 0
    let travel = 0
    let activeIndex = -1

    const scrollTrigger = ScrollTrigger.create({
      trigger: host,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        // A gentle vertical drift as the section passes, so the field is
        // already alive before anyone touches it.
        scrollOffsetY = (self.progress - 0.5) * CELL_H * 2
      },
    })

    const pointer = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    let hasPointer = false

    const onPointerDown = (event) => {
      dragging = true
      pointerId = event.pointerId
      lastX = event.clientX
      lastY = event.clientY
      travel = 0
      velocityX = 0
      velocityY = 0
      host.setPointerCapture(event.pointerId)
      host.style.cursor = 'grabbing'
    }

    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      hasPointer = true

      if (!dragging) return

      const dx = event.clientX - lastX
      const dy = event.clientY - lastY
      lastX = event.clientX
      lastY = event.clientY
      travel += Math.abs(dx) + Math.abs(dy)

      // Converting through worldPerPixel makes the field track the cursor
      // exactly, which is what sells it as a physical surface.
      velocityX = dx * worldPerPixel
      velocityY = -dy * worldPerPixel
      offsetX += velocityX
      offsetY += velocityY
    }

    const endDrag = () => {
      if (!dragging) return
      dragging = false
      if (pointerId !== null && host.hasPointerCapture(pointerId)) {
        host.releasePointerCapture(pointerId)
      }
      pointerId = null
      host.style.cursor = activeIndex >= 0 ? 'pointer' : 'grab'

      if (travel < CLICK_SLOP && activeIndex >= 0) {
        onSelect?.(meshes[activeIndex].userData.spec)
      }
    }

    const onPointerLeave = () => {
      hasPointer = false
    }

    host.addEventListener('pointerdown', onPointerDown)
    host.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerup', endDrag)
    host.addEventListener('pointercancel', endDrag)
    host.addEventListener('pointerleave', onPointerLeave)

    // ── loop ────────────────────────────────────────────────────────────
    let frame
    let onscreen = true
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting
      },
      { rootMargin: '200px 0px' }
    )
    intersectionObserver.observe(host)

    const tick = () => {
      frame = requestAnimationFrame(tick)
      if (!onscreen) return

      if (!dragging) {
        offsetX += velocityX
        offsetY += velocityY
        velocityX *= 0.94
        velocityY *= 0.94
        if (Math.abs(velocityX) < 0.00005) velocityX = 0
        if (Math.abs(velocityY) < 0.00005) velocityY = 0

        offsetX += 0.0012 // idle drift
      }

      meshes.forEach((mesh) => {
        const { baseX, baseY } = mesh.userData
        mesh.position.x = wrap(baseX + offsetX, SPAN_X)
        mesh.position.y = wrap(baseY + offsetY + scrollOffsetY, SPAN_Y)
      })

      // Raycast after the wrap, or hover targets the previous frame's layout.
      let nextActive = -1
      if (hasPointer && !dragging) {
        raycaster.setFromCamera(pointer, camera)
        const hit = raycaster.intersectObjects(meshes, false)[0]
        if (hit) nextActive = meshes.indexOf(hit.object)
      }

      if (nextActive !== activeIndex) {
        activeIndex = nextActive
        host.style.cursor = activeIndex >= 0 ? 'pointer' : 'grab'
        onActiveChange?.(
          activeIndex >= 0 ? meshes[activeIndex].userData.spec : null
        )
      }

      meshes.forEach((mesh, i) => {
        const uniform = mesh.material.uniforms.uHover
        uniform.value += ((i === activeIndex ? 1 : 0) - uniform.value) * 0.12
        mesh.scale.setScalar(1 + uniform.value * 0.07)
      })

      renderer.render(scene, camera)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      scrollTrigger.kill()

      host.removeEventListener('pointerdown', onPointerDown)
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerup', endDrag)
      host.removeEventListener('pointercancel', endDrag)
      host.removeEventListener('pointerleave', onPointerLeave)

      geometry.dispose()
      meshes.forEach((mesh) => mesh.material.dispose())
      textures.forEach((texture) => texture.dispose())
      renderer.dispose()
    }
  }, [onSelect, onActiveChange])

  return (
    <div
      ref={hostRef}
      // Breaks out of the 1200px measure to full viewport width, which is what
      // makes the cards bigger — see the COLS note above. Safe against a
      // horizontal scrollbar because body sets overflow-x-hidden.
      //
      // pan-y keeps vertical swipes scrolling the page; horizontal drags
      // belong to the field.
      className="relative left-1/2 h-[500px] w-screen -translate-x-1/2 cursor-grab touch-pan-y overflow-hidden select-none md:h-[760px] lg:h-[880px]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
