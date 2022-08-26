import { epRoot, excludeFiles, pkgRoot, getPackageDependencies, epPackage } from '@element-plus/build-utils'
// @ts-ignore
import glob from 'fast-glob'
import esbuild from 'rollup-plugin-esbuild'
import { rollup } from 'rollup'
//plugins
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import vueJsx from '@vitejs/plugin-vue-jsx'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import DefineOptions from 'unplugin-vue-define-options/rollup'

//build info
// @ts-ignore
import { buildConfigEntries, target } from '../build-info'
import { writeBundles } from '../utils'
export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(epPackage)
  if (!options.full) {
    peerDependencies.push('@vue', ...dependencies)
  }
  return (id: string) => {
    // @ts-ignore
    return [...new Set(peerDependencies)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`))
  }
}
import type { Plugin } from 'rollup'
export function ElementPlusAlias(): Plugin {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `@element-plus/${themeChalk}`
  const bundleThemeChalk = `element-plus/${themeChalk}`

  return {
    name: 'element-plus-alias-plugin',
    resolveId(id: any) {
      if (!id.startsWith(sourceThemeChalk)) return
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute'
      }
    }
  }
}

//buildModules
export const buildModules = async () => {
  //获取 pkgRoot 下的文件进行打包
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  //rollup input
  const bundle = await rollup({
    input,
    plugins: [
      ElementPlusAlias(),
      DefineOptions(),
      vue({ isProduction: false }),
      vueJsx(),
      nodeResolve({ extensions: ['.mjs', '.js', '.json', '.ts'] }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts'
        }
      })
    ],
    external: await generateExternal({ full: false }),
    treeshake: false
  })
  // rollup write
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]) => {
      return {
        format: config.format,
        dir: config.output.path,
        //default – 如果你使用 export default ... 仅仅导出一个东西，那适合用这个
        // named – 如果你导出多个东西，适合用这个
        exports: module === 'cjs' ? 'named' : undefined,
        // 关键属性，只有将其设置为 `true` 才能保证只编译、不打包
        preserveModules: true,
        preserveModulesRoot: epRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}
