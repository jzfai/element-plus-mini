export const excludeFiles = (files) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)))
}
