import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import glsl from 'vite-plugin-glsl'

import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
  plugins: [vue(), glsl(), WindiCSS(), Components({})],
})
