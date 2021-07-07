import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import { Context } from "./controller"
import { useManager } from "./popups"
import { PopupOptions } from "./type"
import { Popup } from "./widget"

interface Props<P = any> extends PopupOptions {
  id: number
  props?: P
  el: React.FunctionComponent<P> | React.Component<P>
  promise: { ok: (result?: any) => void; fail: (err?: any) => void }
}

export const PopupItem: FC<Props> = (props) => {
  const manager = useManager()
  const backRef = useRef<() => void>()
  const [visible, setVisible] = useState(true)

  const ctx = useMemo(() => {
    return {
      hide: () => {
        setVisible(false)
      },
      close: (result?: any) => {
        setVisible(false)
        if (result && result instanceof Error) {
          backRef.current = () => props.promise.fail(result)
        } else {
          backRef.current = () => props.promise.ok(result)
        }
      },
    }
  }, [])

  const destroy = useCallback(() => {
    manager.setState((prev: any) => {
      return {
        popups: prev.popups.filter((p: any) => p.id !== props.id),
      }
    })
  }, [])

  useEffect(() => {
    const popup = manager.state.popups.find((p) => p.id === props.id)
    popup!.ctx = ctx
  }, [])

  return (
    <Popup
      visible={visible}
      onClose={() => {
        setVisible(false)
      }}
      onAfterClose={() => {
        backRef.current && backRef.current()
        destroy()
      }}
      {...props}
    >
      <Context.Provider value={ctx}>
        {React.createElement(props.el as any, { ...props.props })}
      </Context.Provider>
    </Popup>
  )
}
