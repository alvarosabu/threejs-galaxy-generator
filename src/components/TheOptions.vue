<script setup>
import { onMounted, computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import { useRenderer } from '/@/composables/'

const styles = computed(() => ({
  top: `${paneTop.value + 16}px`,
  width: `${paneWidth.value}px`,
}))

const paneTop = ref(0)
const paneWidth = ref(100)

const { renderer } = useRenderer()
// Axes Helper
function saveCanvas() {
  const anchor = document.createElement('a')
  anchor.download = `my-awesome-galaxy-${uuidv4()}.png`
  anchor.href = renderer.value.domElement.toDataURL()
  anchor.click()
}

onMounted(() => {
  const { offsetHeight, offsetTop, clientWidth } =
    document.querySelector('.tp-dfwv')
  paneTop.value = offsetTop + offsetHeight
  paneWidth.value = clientWidth
})
</script>

<template>
  <aside :style="styles" class="absolute right-2 flex justify-end">
    <AsButton
      outline
      label="Capture"
      variant="secondary"
      class="mr-4"
      @click="saveCanvas"
    />
    <AsButton outline icon="twitter" variant="secondary" label="Share" />
  </aside>
</template>
