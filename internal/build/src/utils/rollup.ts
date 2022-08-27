import { epPackage, getPackageDependencies } from '@element-plus/build-utils'

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(epPackage)

  return (id: string) => {
    const packages: string[] = peerDependencies
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }

    // @ts-ignore
    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`))
  }
}
export function writeBundles(bundle, options) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export function formatBundleFilename(name: string, minify: boolean, ext: string) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}
