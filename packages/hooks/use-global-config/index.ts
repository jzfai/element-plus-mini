import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue'
export const configProviderContextKey = Symbol()
const globalConfig = ref()

//get  GlobalConfig through inject
export function useGlobalConfig(key?: string, defaultValue = undefined) {
  //global config
  const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig
  //has key then get config value
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue)
  } else {
    return config
  }
}

//setting global config  if  has the old config and then merge it
export const provideGlobalConfig = (config, app?, global = false) => {
  const inSetup = !!getCurrentInstance()
  const oldConfig = inSetup ? useGlobalConfig() : undefined

  const provideFn = app?.provide ?? (inSetup ? provide : undefined)
  if (!provideFn) {
    // debugWarn('provideGlobalConfig', 'provideGlobalConfig() can only be used inside setup().')
    return
  }

  // merge old config and  new config
  const context = computed(() => {
    const cfg = unref(config)
    if (!oldConfig?.value) return cfg
    return mergeConfig(oldConfig.value, cfg)
  })

  //set to global , through  provide
  provideFn(configProviderContextKey, context)
  if (global || !globalConfig.value) {
    globalConfig.value = context.value
  }
  return context
}

const mergeConfig = (a, b) => {
  // @ts-ignore
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])]
  const obj = {}
  for (const key of keys) {
    obj[key] = b[key] ?? a[key]
  }
  return obj
}
