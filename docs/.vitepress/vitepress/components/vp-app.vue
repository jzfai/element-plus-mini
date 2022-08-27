<template>
  <el-scrollbar ref="scrollRef" height="100vh" class="App">
    <VPContent class="doc-content" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useData, useRoute, useRouter } from "vitepress";
import VPContent from "./vp-content.vue";

const route = useRoute();
const router = useRouter();
const { site, page } = useData();
//get sidebars info
console.log(site.value.themeConfig.sidebars);
//get nav info
console.log(site.value.themeConfig.nav);
</script>

<style scoped lang="scss">
.doc-content {
  padding: 30px;
}
</style>
