// @ts-ignore
import path from 'path'
const distFolder = path.resolve(__dirname, 'dist')
import { epOutput } from '@element-plus/build-utils'
const distBundle = path.resolve(epOutput, 'theme-chalk')
import { dest, parallel, series, src } from 'gulp'

//buildThemeChalk
// @ts-ignore
import chalk from 'chalk'
// @ts-ignore
import gulpSass from 'gulp-sass'
// @ts-ignore
import dartSass from 'sass'
// @ts-ignore
import autoprefixer from 'gulp-autoprefixer'
// @ts-ignore
import cleanCSS from 'gulp-clean-css'
// @ts-ignore
import rename from 'gulp-rename'
import consola from 'consola'
function buildThemeChalk() {
  const sass = gulpSass(dartSass)
  const noElPrefixFile = /(index|base|display)/
  return src(path.resolve(__dirname, 'src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(details.stats.originalSize / 1000)} KB -> ${chalk.green(
            details.stats.minifiedSize / 1000
          )} KB`
        )
      })
    )
    .pipe(
      rename((path) => {
        if (!noElPrefixFile.test(path.basename)) {
          path.basename = `el-${path.basename}`
        }
      })
    )
    .pipe(dest(distFolder))
}

/**
 * copy from packages/theme-chalk/dist to dist/element-plus/theme-chalk
 */
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

/**
 * copy source file to packages
 */
export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(dest(path.resolve(distBundle, 'src')))
}

export default parallel(copyThemeChalkSource, series(buildThemeChalk, copyThemeChalkBundle))
