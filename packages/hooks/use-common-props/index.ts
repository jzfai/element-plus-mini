import { computed, inject, ref, unref, getCurrentInstance } from 'vue'
import { componentSizes } from '@element-plus/constants'
import { useGlobalConfig } from '../use-global-config'

//from @element/token
export const useProp = (name: string) => {
  const vm = getCurrentInstance()!
  return computed(() => (vm.proxy?.$props as any)[name] ?? undefined)
}
export const formContextKey = Symbol('formContextKey')
export const formItemContextKey = Symbol('formItemContextKey')

export const useSizeProp = {
  type: String,
  values: componentSizes,
  required: false
}

//get size
export const useSize = (fallback?, ignore = {}) => {
  const emptyRef = ref(undefined)
  const size = ignore.prop ? emptyRef : useProp('size')
  const form = ignore.form ? { size: undefined } : inject(formContextKey, undefined)
  const formItem = ignore.formItem ? { size: undefined } : inject(formItemContextKey, undefined)
  const globalConfig = ignore.global ? emptyRef : useGlobalConfig('size')

  return computed(() => size.value || unref(fallback) || formItem?.size || form?.size || globalConfig.value || '')
}

export const useFormItem = () => {
  const form = inject(formContextKey, undefined)
  const formItem = inject(formItemContextKey, undefined)
  return { form, formItem }
}

export const useDisabled = (fallback?) => {
  const disabled = useProp('disabled')
  const form = inject(formContextKey, undefined)
  return computed(() => disabled.value || unref(fallback) || form?.disabled || false)
}
