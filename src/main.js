import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import AsUI from '@alvarosabu/ui/'
import '@alvarosabu/ui/dist/style.css'

import './style.css'
const app = createApp(App)

app.use(AsUI)

app.mount('#app')
