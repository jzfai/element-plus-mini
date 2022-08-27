import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  //构建前先清空
  clean: true,
  //生成 d.ts文件
  declaration: true,
  //生成common.js
  rollup: {
    emitCJS: true,
  },
});
