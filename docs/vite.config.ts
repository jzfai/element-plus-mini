// @ts-ignore
import path from 'path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'
import Inspect from 'vite-plugin-inspect'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// @ts-ignore
export default defineConfig(async () => {
  return {
    // base: '/en-US/component/badge.html',
    server: {
      port: 5005,
      host: true,
      https: false
    },
    plugins: [
      DefineOptions(),
      Components({
        dirs: ['.vitepress/vitepress/components'],
        allowOverrides: true,
        // custom resolvers
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons
          IconsResolver()
        ]
      }), // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true
      }),
      UnoCSS(),
      MarkdownTransform(),
      Inspect()
    ],

    optimizeDeps: {
      include: ['element-plus', '@element-plus/icons-vue', '@vueuse/core']
    }
  }
})
