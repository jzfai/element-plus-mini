<template>
  <button
    ref="_ref"
    :class="[
      ns.b(),
      ns.m(_type),
      ns.m(_size),
      ns.is('disabled', _disabled),
      ns.is('loading', loading),
      ns.is('plain', plain),
      ns.is('round', round),
      ns.is('circle', circle),
      ns.is('text', text),
      ns.is('link', link),
      ns.is('has-bg', bg)
    ]"
    :aria-disabled="_disabled || loading"
    :disabled="_disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :style="buttonStyle"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <el-icon v-else :class="ns.is('loading')">
        <component :is="loadingIcon" />
      </el-icon>
    </template>
    <el-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </el-icon>
    <span v-if="$slots.default" :class="{ [ns.em('text', 'expand')]: shouldAddSpace }">
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { Text, computed, inject, ref, useSlots } from 'vue'
defineOptions({
  name: 'ElButton'
})
import { buttonEmits, buttonProps } from './button.ts'

//props emit slots
const props = defineProps(buttonProps)
console.log(props)
const emit = defineEmits(buttonEmits)
const slots = useSlots()

//get globalConfig
import { useGlobalConfig, useFormItem, useNamespace, useSize, useDisabled } from '@element-plus/hooks'
const globalConfig = useGlobalConfig('button')
//get namespace  el-button
const ns = useNamespace('button')

const _disabled = useDisabled()
const _ref = ref<HTMLButtonElement>()

const autoInsertSpace = computed(() => props.autoInsertSpace ?? globalConfig.value?.autoInsertSpace ?? false)

// add space between two characters in Chinese
const shouldAddSpace = computed(() => {
  const defaultSlot = slots.default?.()
  if (autoInsertSpace.value && defaultSlot?.length === 1) {
    const slot = defaultSlot[0]
    if (slot?.type === Text) {
      const text = slot.children as string
      return /^\p{Unified_Ideograph}{2}$/u.test(text.trim())
    }
  }
  return false
})
//button group relative
// import { useButtonCustomStyle } from './button-custom'// const buttonStyle = useButtonCustomStyle(props)
// const buttonGroupContextKey = Symbol('buttonGroupContextKey')
// const buttonGroupContext = inject(buttonGroupContextKey, undefined)

const _size = useSize()
// const _type = computed(() => props.type || buttonGroupContext?.type || '')
const _type = computed(() => props.type || '')

const { form } = useFormItem()
import { useButtonCustomStyle } from './button-custom'
const buttonStyle = useButtonCustomStyle(props)

const handleClick = (evt: MouseEvent) => {
  if (props.nativeType === 'reset') {
    form?.resetFields()
  }
  emit('click', evt)
}

defineExpose({
  /** @description button html element */
  ref: _ref,
  /** @description button size */
  size: _size,
  /** @description button type */
  type: _type,
  /** @description button disabled */
  disabled: _disabled,
  /** @description whether adding space */
  shouldAddSpace
})
</script>
