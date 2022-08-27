// @ts-ignore
import { mdPlugin } from './config/plugins'
import { sidebars } from './config/sidebars'
import { nav } from './config/nav'
export const config = {
  title: 'Element Plus',
  description: 'a Vue 3 based component library for designers and developers',
  lastUpdated: true,
  themeConfig: {
    repo: "element-plus",
    docsBranch: 'dev',
    docsDir: 'docs',
    editLinks: true,
    sidebars,
    nav,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
  },
  locales:{
    "/en-US": {
      "label": "en-US",
      "lang": "en-US"
    }
  },
  markdown: {
    config: (md) => mdPlugin(md),
  },
}
export default config
