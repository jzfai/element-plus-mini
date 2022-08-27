// @ts-ignore
import Badge from './src/badge.vue'

const withInstall = (main) => {
  main.install = (app) => {
    for (const comp of [main]) {
      app.component(comp.name, comp)
    }
  }
  return main
}

export const ElBadge = withInstall(Badge)
export default ElBadge
