import React from 'react'

export interface PopupController {
  /**
   * 关闭弹出层
   *
   * 如果 result 是 Error 的实例，则是关闭弹出层然后抛出异常，否则是关闭弹出层然后返回 result
   */
  close: (result?: any) => void
  /**
   * 隐藏弹出层
   *
   * 和 close 的区别是该方法不会改变 promise 状态，即关闭弹出层但永远不结束 promise
   */
  hide: () => void
}

export const Context = React.createContext<PopupController>(null as any)

export const useController = () => {
  return React.useContext(Context)
}
