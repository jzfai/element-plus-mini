import VPApp, { NotFound, globals } from '../vitepress'
// @ts-ignore
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'uno.css'
export default {
  NotFound,
  Layout: VPApp,
  enhanceApp: ({ app }) => {
    app.use(ElementPlus)
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  }
}
