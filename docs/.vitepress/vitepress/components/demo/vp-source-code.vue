<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});

const decoded = computed(() => {
  return decodeURIComponent(props.source);
});

console.log("decoded", decoded);
</script>

<template>
  <div class="example-source-wrapper">
    <div class="example-source language-vue" v-html="decoded" />
  </div>
</template>

<style scoped lang="scss">
.language-vue {
  margin: 0;
  border-radius: 0;
}
</style>
