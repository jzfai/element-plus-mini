export default function pluginDemo(projectConfig) {
  return {
    name: 'plugin-demo',
    enforce: 'post',
    /*node运行后进入*/
    // config(config) {
    //   console.log(projectConfig)
    //   console.log('config', config)
    //   return projectConfig
    // },
    // //配置，配置
    // configResolved(resolvedCofnig) {
    //   console.log('configResolved')
    // },
    // options(opts) {
    //   console.log('options', opts)
    // },
    // configureServer(server) {
    //   console.log('configureServer')
    //   // server.app.use((req, res, next) => {
    //   //   // custom handle request...
    //   // })
    // },
    // buildStart(server) {
    //   console.log('buildStart')
    // },

    /*页面加载后进入*/
    // transformIndexHtml(html) {
    //   return html.replaceAll('test-demo', '好烦啊')
    //   // return html.replace(
    //   //   /<title>(.*?)<\/title>/,
    //   //   `<title>Title replaced!</title>`
    //   // )
    // },
    // id确认
    // resolveId(source) {
    //   if (source.includes('main.ts')) {
    //     console.log('resolvedId', source)
    //     return source // 返回source表明命中，vite不再询问其他插件处理该id请求
    //   }
    //   return null // 返回null表明是其他id要继续处理
    // },
    // // 加载模块代码
    // load(id) {
    //   if (id.includes('main.ts')) {
    //     console.log('load')
    //     return 'export default "This is virtual!"' // 返回"virtual-module"模块源码
    //   }
    //   return null // 其他id继续处理
    // },
    transform(code, id) {
      if (id.includes('main.ts')) {
        console.log('transform')
        return code
      }
    }
  }
}
