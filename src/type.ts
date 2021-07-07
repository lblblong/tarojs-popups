import { RequiredKeys } from "utility-types"

export type Position = "top" | "bottom" | "right" | "left" | "center"

export type OpenProps<T> = T extends (param: infer P) => any
  ? RequiredKeys<P> extends never
    ? {
        /** 目标组件的参数 */
        props?: P
      }
    : {
        /** 目标组件的参数 */
        props: P
      }
  : {}

export interface PopupOptions {
  /** 弹出的位置 */
  position?: Position
  /** 是否需要遮罩 */
  mask?: boolean
  /** z-index 层级 */
  zIndex?: number
  /** 是否点击遮罩关闭 */
  maskClosable?: boolean
  /** 动画持续时间 */
  duration?: number
}
