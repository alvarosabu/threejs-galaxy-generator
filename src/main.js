import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'

import App from './App.vue'
import 'virtual:windi.css'
import AsUI from '@alvarosabu/ui/'
import '@alvarosabu/ui/dist/style.css'

import './style.css'
const app = createApp(App)
const metaManager = createMetaManager()
app.use(AsUI)
app.use(metaManager)
app.mount('#app')
