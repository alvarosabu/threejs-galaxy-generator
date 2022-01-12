import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import 'virtual:windi.css'
import { controls, renderer, scene, canvas } from './renderer'
import camera from './camera'
import { usePane } from './debug'
import { v4 as uuidv4 } from 'uuid'

// UI
gsap.to('.title', {
  delay: 0.5,
  opacity: 1,
  y: 2,
  display: 'block',
  duration: 0.5,
  ease: 'expo.out',
})

/**
 * Galaxy
 */

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

function saveCanvas() {
  const anchor = document.createElement('a')
  anchor.download = `my-awesome-galaxy-${uuidv4()}.png`
  anchor.href = renderer.domElement.toDataURL()
  anchor.click()
}

const { fpsGraph, captureBtn } = usePane(parameters, generateGalaxy)

captureBtn.on('click', saveCanvas)

generateGalaxy()

const loop = () => {
  fpsGraph.begin()

  controls.update()
  renderer.render(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

loop()
