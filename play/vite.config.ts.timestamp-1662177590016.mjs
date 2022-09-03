// vite.config.ts
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import DefineOptions from "unplugin-vue-define-options/vite";
import pkg from "@element-plus/build-utils";
var __vite_injected_original_dirname = "D:\\github\\element-plus-mini\\play";
var { pkgRoot, epRoot } = pkg;
var vite_config_default = defineConfig(async ({ mode }) => {
  return {
    resolve: {
      alias: [
        {
          find: /^element-plus(\/(es|lib))?$/,
          replacement: path.resolve(epRoot, "index.ts")
        },
        {
          find: /^element-plus\/(es|lib)\/(.*)$/,
          replacement: `${pkgRoot}/$2`
        }
      ]
    },
    server: {
      port: 5e3,
      host: true,
      https: false
    },
    plugins: [
      vue(),
      DefineOptions(),
      Components({
        include: `${__vite_injected_original_dirname}/**`,
        resolvers: ElementPlusResolver({ importStyle: "sass" }),
        dts: false
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxcZWxlbWVudC1wbHVzLW1pbmlcXFxccGxheVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2l0aHViXFxcXGVsZW1lbnQtcGx1cy1taW5pXFxcXHBsYXlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dpdGh1Yi9lbGVtZW50LXBsdXMtbWluaS9wbGF5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5pbXBvcnQgRGVmaW5lT3B0aW9ucyBmcm9tICd1bnBsdWdpbi12dWUtZGVmaW5lLW9wdGlvbnMvdml0ZSdcblxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHBrZyBmcm9tICdAZWxlbWVudC1wbHVzL2J1aWxkLXV0aWxzJ1xuY29uc3QgeyBwa2dSb290LCBlcFJvb3QgfSA9IHBrZ1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGFzeW5jICh7IG1vZGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAvXmVsZW1lbnQtcGx1cyhcXC8oZXN8bGliKSk/JC8sXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShlcFJvb3QsICdpbmRleC50cycpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAvXmVsZW1lbnQtcGx1c1xcLyhlc3xsaWIpXFwvKC4qKSQvLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBgJHtwa2dSb290fS8kMmBcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA1MDAwLFxuICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIGh0dHBzOiBmYWxzZVxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBEZWZpbmVPcHRpb25zKCksXG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgaW5jbHVkZTogYCR7X19kaXJuYW1lfS8qKmAsXG4gICAgICAgIHJlc29sdmVyczogRWxlbWVudFBsdXNSZXNvbHZlcih7IGltcG9ydFN0eWxlOiAnc2FzcycgfSksXG4gICAgICAgIGR0czogZmFsc2VcbiAgICAgIH0pXG4gICAgXVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUixPQUFPLFVBQVU7QUFFM1MsU0FBUyxvQkFBb0I7QUFFN0IsT0FBTyxTQUFTO0FBRWhCLE9BQU8sZ0JBQWdCO0FBRXZCLFNBQVMsMkJBQTJCO0FBRXBDLE9BQU8sbUJBQW1CO0FBRzFCLE9BQU8sU0FBUztBQWJoQixJQUFNLG1DQUFtQztBQWN6QyxJQUFNLEVBQUUsU0FBUyxPQUFPLElBQUk7QUFDNUIsSUFBTyxzQkFBUSxhQUFhLE9BQU8sRUFBRSxLQUFLLE1BQU07QUFDOUMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsS0FBSyxRQUFRLFFBQVEsVUFBVTtBQUFBLFFBQzlDO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxHQUFHO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxRQUNULFNBQVMsR0FBRztBQUFBLFFBQ1osV0FBVyxvQkFBb0IsRUFBRSxhQUFhLE9BQU8sQ0FBQztBQUFBLFFBQ3RELEtBQUs7QUFBQSxNQUNQLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
