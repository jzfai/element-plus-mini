export const INSTALLED_KEY = Symbol('INSTALLED_KEY')
export const version = '1.0.3'
export const makeInstaller = (components) => {
  const install = (app, options) => {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
    //options
  }
  return {
    version,
    install
  }
}
