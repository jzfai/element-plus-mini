<template>
  <div class="example">
    <Example :file="path" :demo="formatPathDemos[path]" />
    <ElDivider class="m-0" />
    <div class="op-btns">
      <ElTooltip content="copy-code" :show-arrow="false">
        <ElIcon :size="16" class="op-btn" @click="copyCode">
          <i-ri-file-copy-line />
        </ElIcon>
      </ElTooltip>
      <ElTooltip content="view-source" :show-arrow="false">
        <ElIcon :size="16" class="op-btn" @click="toggleSourceVisible()">
          <i-ri-code-line />
        </ElIcon>
      </ElTooltip>
    </div>

    <ElCollapseTransition>
      <SourceCode v-show="sourceVisible" :source="source" />
    </ElCollapseTransition>

    <Transition name="el-fade-in-linear">
      <div
        v-show="sourceVisible"
        class="example-float-control"
        @click="toggleSourceVisible(false)"
      >
        <ElIcon :size="16">
          <CaretTop />
        </ElIcon>
        <span>hide-source</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Example from "./demo/vp-example.vue";
import SourceCode from "./demo/vp-source-code.vue";
import { CaretTop } from "@element-plus/icons-vue";
import { computed, getCurrentInstance, toRef } from "vue";
const props = defineProps<{
  demos: object;
  source: string;
  path: string;
  rawSource: string;
  description?: string;
}>();

const formatPathDemos = computed(() => {
  const demos = {};
  Object.keys(props.demos).forEach((key) => {
    demos[key.replace("../../examples/", "").replace(".vue", "")] =
      props.demos[key].default;
  });
  return demos;
});

//copy code
import { useClipboard, useToggle } from "@vueuse/core";
const vm = getCurrentInstance()!;
const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
});
const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties;
  if (!isSupported) {
    $message.error("copy-error");
  }
  try {
    await copy();
    $message.success("copy-success");
  } catch (e) {
    $message.error(e.message);
  }
};
const [sourceVisible, toggleSourceVisible] = useToggle();
</script>

<style scoped lang="scss">
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
