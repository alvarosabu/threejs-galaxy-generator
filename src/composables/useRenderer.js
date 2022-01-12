import { ref, watch, computed, toRaw } from 'vue'
import { WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { useWindowSize } from '@vueuse/core'

let renderer = ref(null)
export const useRenderer = () => {
  const { width, height } = useWindowSize()
  const aspectRatio = computed(() => width.value / height.value)
  const experience = ref(null)
  const controls = ref(null)

  function updateRenderer() {
    renderer.value.setSize(width.value, height.value)
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  watch(aspectRatio, updateRenderer)

  function initRenderer() {
    if (renderer.value === null) {
      renderer.value = new WebGLRenderer({
        canvas: experience.value,
        preserveDrawingBuffer: true,
      })
    }
  }

  function renderScene(scene, camera) {
    renderer.value.render(scene, camera)
  }

  function initOrbitControls(camera) {
    // Orbit Controls
    controls.value = new OrbitControls(camera, renderer.value.domElement)
    controls.value.enableDamping = true
  }

  function updateControls() {
    controls.value.update()
  }

  return {
    experience,
    aspectRatio,
    updateRenderer,
    initRenderer,
    renderer,
    renderScene,
    controls,
    initOrbitControls,
    updateControls,
  }
}
