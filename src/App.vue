<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { useCamera, useScene, useRenderer, useTweakPane } from '/@/composables/'
import galaxyVertexShader from './shaders/galaxy/vertex.glsl'
import galaxyFragmentShader from './shaders/galaxy/fragment.glsl'

const parameters = {
  count: 30000,
  size: 10,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.02,
  randomnessPower: 3,
  insideColor: '#b5f28d',
  outsideColor: '#1b3984',
}

// Feature: Renderer
const { scene } = useScene()

const {
  renderer,
  experience,
  updateRenderer,
  renderScene,
  initRenderer,
  aspectRatio,
  initOrbitControls,
  updateControls,
  disposeRenderer,
} = useRenderer()

// Feature: Camera
const { camera } = useCamera({ aspectRatio: aspectRatio.value })

camera.position.set(3, 3, 5)

scene.add(camera)

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
  const scales = new Float32Array(parameters.count)
  const randomness = new Float32Array(parameters.count * 3)

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3

    const radius = Math.random() * parameters.radius
    /*  const spinAngle = radius * parameters.spin */
    const spinAngle = 0
    const branchAngle =
      ((i % parameters.branches) * Math.PI * 2) / parameters.branches

    positions[i3] = Math.cos(branchAngle) * radius // x
    positions[i3 + 1] = 0 // y
    positions[i3 + 2] = Math.sin(branchAngle) * radius // z

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? -1 : 1)
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? -1 : 1)
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? -1 : 1)

    randomness[i3] = randomX
    randomness[i3 + 1] = randomY
    randomness[i3 + 2] = randomZ

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / parameters.radius)

    colors[i3 + 0] = mixedColor.r // R
    colors[i3 + 1] = mixedColor.g // G
    colors[i3 + 2] = mixedColor.b // B

    scales[i] = Math.random()
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
  geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))

  material = new THREE.ShaderMaterial({
    transparent: true,
    /*     alphaMap: texture,
    color: 0xffffff, */
    /*     size: parameters.size,
    sizeAttenuation: true, */
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: galaxyVertexShader,
    fragmentShader: galaxyFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSize: {
        value: parameters.size * renderer.value.getPixelRatio(),
      },
    },
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)
}

// Feature: Animate
const clock = new THREE.Clock()

const loop = () => {
  fpsGraph.begin()

  const elapsedTime = clock.getElapsedTime()

  if (material) {
    material.uniforms.uTime.value = elapsedTime
  }

  updateControls(camera)
  renderScene(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

// GUI related
const { pane, fpsGraph } = useTweakPane()

pane
  .addInput(parameters, 'count', {
    min: 0,
    max: 100000,
  })
  .on('change', generateGalaxy)
pane
  .addInput(parameters, 'size', {
    min: 0.01,
    max: 40,
    step: 1,
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

// Axes Helper
const axesHelper = new THREE.AxesHelper()
axesHelper.visible = false
scene.add(axesHelper)

onMounted(() => {
  initRenderer()
  initOrbitControls(camera)
  updateRenderer()
  loop()
  generateGalaxy()
})

onBeforeUnmount(() => {
  scene.remove(particles)
  geometry.dispose()
  material.dispose()
  disposeRenderer()
})
</script>
<template>
  <TheHeader />
  <canvas ref="experience"></canvas>
  <TheOptions />
  <TheFooter />
</template>
