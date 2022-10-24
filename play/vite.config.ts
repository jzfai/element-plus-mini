import path from 'path'
// @ts-ignore
import { defineConfig } from 'vite'
// @ts-ignore
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import DefineOptions from 'unplugin-vue-define-options/vite'

// @ts-ignore
import pkg from '@element-plus/build-utils'
// @ts-ignore
import pluginDemo from './plugin/plugin-demo'

const { pkgRoot, epRoot } = pkg
// @ts-ignore
export default defineConfig(async ({ mode }) => {
  return {
    resolve: {
      alias: [
        {
          find: /^element-plus(\/(es|lib))?$/,
          replacement: path.resolve(epRoot, 'index.ts')
        },
        {
          find: /^element-plus\/(es|lib)\/(.*)$/,
          replacement: `${pkgRoot}/$2`
        }
      ]
    },
    server: {
      port: 5000,
      host: true,
      https: false
    },
    plugins: [
      vue(),
      DefineOptions(),
      Components({
        include: `${__dirname}/**`,
        resolvers: ElementPlusResolver({ importStyle: 'sass' }),
        dts: false
      }),
      pluginDemo({ name: 'plugin-demo' })
    ]
  }
})
