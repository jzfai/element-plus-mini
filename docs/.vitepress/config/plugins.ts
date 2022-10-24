// @ts-ignore
import path, { resolve } from 'path'
// @ts-ignore
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
const localMd = MarkdownIt()
import { docRoot } from '@element-plus/build-utils'

//.vue change to  html
import { highlight } from '../utils/highlight'
export const mdPlugin = (md) => {
  //demo -> the token name such as type container_demo_open
  md.use(mdContainer, 'demo11', {
    //validate 匹配demo相关的，进入render进行处理
    validate(params) {
      //匹配demo开头的string 如4次
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        m.at(-1) //取最后一个元素
        //The amount is defined with `value` which accepts `Number` or `String`.
        const description = m && m.length > 1 ? m[1] : ''
        //badge/basic 的token
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        // basic/basic
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(path.resolve(docRoot, 'examples', `${sourceFile}.vue`), 'utf-8')
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
        return `<Demo :demos="demos" source="${encodeURIComponent(
          highlight(source, 'vue')
        )}" path="${sourceFile}" raw-source="${encodeURIComponent(source)}" description="${encodeURIComponent(
          localMd.render(description)
        )}">`
      } else {
        return '</Demo>'
      }
    }
  })
}
