import { useSizeProp } from '@element-plus/hooks'

export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  /**
   * @deprecated
   * Text type will be deprecated in the next major version (3.0.0)
   */
  'text',
  ''
] as const
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const
import { Loading } from '@element-plus/icons-vue'

//Props
// import { buildProps } from '@element-plus/utils'
export const buttonProps = {
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    values: buttonTypes,
    default: ''
  },
  icon: {
    type: [String, Object, Function],
    default: ''
  },
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: 'button'
  },
  loading: Boolean,
  loadingIcon: {
    type: [String, Object, Function],
    default: () => Loading
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: undefined
  }
}

export const buttonEmits = {
  click: (evt) => evt
}
