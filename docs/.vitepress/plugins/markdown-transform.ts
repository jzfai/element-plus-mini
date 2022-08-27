// @ts-ignore
import path from "path";
import type { Plugin } from "vite";
export function MarkdownTransform(): Plugin {
  return {
    name: "element-plus-md-transform",
    enforce: "pre",
    // config(config) {
    //   console.log("config", config);
    // },
    // transformIndexHtml(html) {
    //   console.log("transformIndexHtml");
    //   return html;
    //   // return html.replace(
    //   //   /<title>(.*?)<\/title>/,
    //   //   `<title>Title replaced!</title>`
    //   // )
    // },
    // resolveId(id) {
    //   console.log(id);
    // },
    async transform(code, id) {
      if (!id.endsWith(".md")) return;

      const componentId = path.basename(id, ".md");

      const append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.globEager('../../examples/${componentId}/*.vue')`,
        ],
      };

      return combineMarkdown(
        code,
        [combineScriptSetup(append.scriptSetups), ...append.headers],
        append.footers
      );
    },
  };
}
const combineScriptSetup = (codes: string[]) =>
  `\n<script setup>
${codes.join("\n")}
</script>
`;

const combineMarkdown = (code, headers, footers) => {
  const frontmatterEnds = code.indexOf("---\n\n") + 4;
  const firstSubheader = code.search(/\n## \w/);
  const sliceIndex = firstSubheader < 0 ? frontmatterEnds : firstSubheader;
  if (headers.length > 0) {
    code =
      code.slice(0, sliceIndex) + headers.join("\n") + code.slice(sliceIndex);
  }
  code += footers.join("\n");
  return `${code}\n`;
};
