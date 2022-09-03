import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)
import elementPlusMini from 'element-plus-mini'
app.use(elementPlusMini)

app.mount('#app')
