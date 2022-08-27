// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ElBadge: typeof import('element-plus')['ElBadge']
  }
}
