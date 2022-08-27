// @ts-ignore
import path from 'path'
import { epOutput } from '@element-plus/build-utils'

export const target = 'es2018'

export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(epOutput, 'es')
    },
    bundle: {
      path: `element-plus/es`
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(epOutput, 'lib')
    },
    bundle: {
      path: `element-plus/lib`
    }
  }
}
export const buildConfigEntries = Object.entries(buildConfig)
