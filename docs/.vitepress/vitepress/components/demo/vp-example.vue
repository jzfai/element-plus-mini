<script setup lang="ts">
import {} from "vue";
defineProps({
  file: {
    type: String,
    required: true,
  },
  demo: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="example-showcase p-20px">
    <component :is="demo" v-if="demo" v-bind="$attrs" />
  </div>
</template>

<style scoped lang="scss">
.example-showcase {
  background-color: var(--bg-color);
}
</style>
