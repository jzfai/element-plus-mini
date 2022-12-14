import path from 'path'

import { copyFile, mkdir } from 'fs/promises'

import { parallel, series } from 'gulp'
import { epOutput, epPackage, projRoot } from '@element-plus/build-utils'

import { run, runTask, withTaskName } from './src/utils'

//before build clean
const clean = withTaskName('clean', () => run('pnpm run clean'))
const createOutput = withTaskName('createOutput', () => mkdir(epOutput, { recursive: true }))

//build package component
export * from './src'
const buildModules = runTask('buildModules')
const buildFullBundle = runTask('buildFullBundle')

//  dist/element-plus/dist
export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true })
  await copyFile(path.resolve(epOutput, 'theme-chalk/index.css'), path.resolve(epOutput, 'dist/index.css'))
}
//buildThemeChalk
const buildThemeChalk = series(
  withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build')),
  copyFullStyle
)

//copy files
export const copyFiles = () =>
  Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(path.resolve(projRoot, 'README.md'), path.resolve(epOutput, 'README.md')),
    copyFile(path.resolve(projRoot, 'global.d.ts'), path.resolve(epOutput, 'global.d.ts'))
  ])

export default series(clean, createOutput, parallel(buildModules, buildThemeChalk, copyFiles))
