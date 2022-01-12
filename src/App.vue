<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

import { useWindowSize } from '@vueuse/core'

const parameters = {
  count: 30000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.02,
  randomnessPower: 3,
  insideColor: '#b5f28d',
  outsideColor: '#1b3984',
}

// Feature: Renderer
const experience = ref(null)
const scene = new THREE.Scene()

const renderer = ref(null)
let controls = null
const { width, height } = useWindowSize()

const aspectRatio = computed(() => width.value / height.value)

function updateRenderer() {
  renderer.value.setSize(width.value, height.value)
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}

watch(aspectRatio, updateRenderer)

// Feature: Camera
const VERTICAL_FIELD_OF_VIEW = 75 // degrees 45 is the normal

const camera = new THREE.PerspectiveCamera(
  VERTICAL_FIELD_OF_VIEW,
  aspectRatio.value,
)

camera.position.set(3, 3, 5)

scene.add(camera)

const loop = () => {
  fpsGraph.begin()

  controls.update()
  renderer.value.render(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

// Feature: Galaxy

let geometry = null
let particles = null
let material = null

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/textures/particles/8.png')

const generateGalaxy = () => {
  // If there are alredy particles, remove them before creating new ones
  if (particles !== null) {
    geometry.dispose()
    material.dispose()
    scene.remove(particles)
  }
  geometry = new THREE.BufferGeometry()

  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)

  const positions = new Float32Array(parameters.count * 3)
  const colors = new Float32Array(parameters.count * 3)

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3

    const radius = Math.random() * parameters.radius
    const spinAngle = radius * parameters.spin
    const branchAngle =
      ((i % parameters.branches) * Math.PI * 2) / parameters.branches

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? -1 : 1)
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? -1 : 1)
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? -1 : 1)

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX // x
    positions[i3 + 1] = randomY // y
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ // z

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / parameters.radius)

    colors[i3 + 0] = mixedColor.r // R
    colors[i3 + 1] = mixedColor.g // G
    colors[i3 + 2] = mixedColor.b // B
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  material = new THREE.PointsMaterial({
    transparent: true,
    alphaMap: texture,
    color: 0xffffff,
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)
}

// GUI related
const pane = new Pane()
pane.registerPlugin(EssentialsPlugin)

// FPS graph
const fpsGraph = pane.addBlade({
  view: 'fpsgraph',
  label: 'fpsgraph',
})

pane
  .addInput(parameters, 'count', {
    min: 0,
    max: 100000,
  })
  .on('change', generateGalaxy)
pane
  .addInput(parameters, 'size', {
    min: 0.01,
    max: 0.1,
    step: 0.01,
  })
  .on('change', generateGalaxy)
pane
  .addInput(parameters, 'radius', {
    min: 0.1,
    max: 20,
    step: 0.01,
  })
  .on('change', generateGalaxy)
pane
  .addInput(parameters, 'branches', {
    min: 2,
    max: 10,
    step: 1,
  })
  .on('change', generateGalaxy)
pane
  .addInput(parameters, 'spin', {
    min: -5,
    max: 5,
    step: 0.01,
  })
  .on('change', generateGalaxy)
pane
  .addInput(parameters, 'randomness', {
    min: 0.1,
    max: 0.2,
    step: 0.01,
  })
  .on('change', generateGalaxy)
pane
  .addInput(parameters, 'randomnessPower', { min: 1, max: 10, step: 0.001 })
  .on('change', generateGalaxy)
pane.addInput(parameters, 'insideColor').on('change', generateGalaxy)
pane.addInput(parameters, 'outsideColor').on('change', generateGalaxy)

const captureBtn = pane.addButton({ title: 'Capture' })

// Axes Helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

onMounted(() => {
  renderer.value = new THREE.WebGLRenderer({
    canvas: experience.value,
    preserveDrawingBuffer: true,
  })

  // Orbit Controls
  controls = new OrbitControls(camera, renderer.value.domElement)
  controls.enableDamping = true

  updateRenderer()
  loop()
  generateGalaxy()
})
</script>
<template>
  <TheHeader />
  <canvas ref="experience"></canvas>
  <TheFooter />
</template>
