import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)

// @ts-ignore
import elementPlusMini from 'element-plus-mini'
import 'element-plus-mini/theme-chalk/index.css'

let data = '111'

console.log()

app.use(elementPlusMini)
app.mount('#app')
