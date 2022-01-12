import { WebGLRenderer, Scene, AxesHelper } from 'three'
import { camera } from './camera'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Scene
export const scene = new Scene()

export const canvas = document.querySelector('#webgl')

// Renderer
export const renderer = new WebGLRenderer({
  canvas,
  preserveDrawingBuffer: true, // To allow screenshot
})

//Shadows
renderer.shadowMap.enabled = true

// Axes Helper
const axesHelper = new AxesHelper()
scene.add(axesHelper)
axesHelper.visible = false

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

function updateRenderer() {
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // To avoid performance problems on devices with higher pixel ratio
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  updateRenderer()

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
})

// Fullscreen mode
window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement // Safari 😒

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

scene.add(camera)
updateRenderer()

export const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

export default {
  renderer,
  controls,
  canvas,
}
