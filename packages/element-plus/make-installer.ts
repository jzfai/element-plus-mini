import { provideGlobalConfig } from '@element-plus/hooks'

export const INSTALLED_KEY = Symbol('INSTALLED_KEY')
export const version = '1.0.3'
export const makeInstaller = (components: any) => {
  const install = (app: any, options: any) => {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true
    components.forEach((c: any) => app.use(c))
    //options
    if (options) provideGlobalConfig(options, app, true)
  }
  return {
    version,
    install
  }
}
