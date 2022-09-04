import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)

import elementPlus from 'element-plus-origin'
import 'element-plus/theme-chalk/index.css'
app.use(elementPlus, { size: 'small' })

app.mount('#app')
