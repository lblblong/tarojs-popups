import Taro from "@tarojs/taro"
import React from "react"
import { PopupController } from "./controller"
import { PopupItem } from "./popup-item"
import { OpenProps, PopupOptions } from "./type"

export const Context = React.createContext<Popups>(null as any)
export function useManager() {
  return React.useContext(Context)
}

export class Popups extends React.Component<PopupOptions> {
  private static instance: Popups
  private static id = 0

  componentWillMount() {
    const instance = Taro.getCurrentInstance()
    if (!instance.page || (instance.page as any)?.popups) return
    const originOnShow = instance.page.onShow
    const _this = this
    instance.page.onShow = function () {
      Popups.instance = _this
      originOnShow?.apply(this)
    }
    ;(instance.page as any).popups = true
    Popups.instance = this
  }

  /**
   * 打开一个弹出层
   */
  static open<T extends React.FC<any>>(
    options: {
      /** 目标组件 */
      el: T
    } & PopupOptions &
      OpenProps<T>
  ) {
    const instance = Popups.instance
    return new Promise<any>((ok, fail) => {
      instance.setState((prev: any) => {
        const id = Popups.id++
        return {
          popups: [
            ...prev.popups,
            {
              id,
              widget: (
                <PopupItem
                  {...instance.props}
                  {...options}
                  id={id}
                  key={id}
                  promise={{
                    ok,
                    fail,
                  }}
                />
              ),
            },
          ],
        }
      })
    })
  }

  /** 关闭所有弹出层 */
  static clear() {
    const instance = Popups.instance
    for (const p of instance.state.popups) {
      p.ctx.hide()
    }
  }

  state: {
    popups: { id: number; widget: any; ctx: PopupController }[]
  } = {
    popups: [],
  }

  render() {
    return (
      <Context.Provider value={this}>
        {this.state.popups.map((it) => it.widget)}
      </Context.Provider>
    )
  }
}
