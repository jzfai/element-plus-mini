import Badge from './src/button.vue'

const withInstall = (main) => {
  main.install = (app) => {
    for (const comp of [main]) {
      app.component(comp.name, comp)
    }
  }
  return main
}

export const ElButton = withInstall(Badge)
export default ElButton
