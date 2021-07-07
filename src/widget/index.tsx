import { View } from "@tarojs/components"
import classNames from "classnames"
import React, { FC, useEffect, useMemo, useState } from "react"
import { PopupOptions } from "../type"
import { requestAnimationFrame } from "../utils"
import styles from "./index.module.scss"

export interface Props extends PopupOptions {
  visible: boolean
  onClose?: () => any
  onAfterClose?: () => any
  className?: string
}

export const Popup: FC<Props> = (props) => {
  const {
    visible,
    onAfterClose,
    onClose,
    mask,
    className,
    zIndex,
    duration,
    position,
    maskClosable,
  } = props
  const [animVisible, setAnimVisible] = useState(false)

  useEffect(() => {
    if (visible) {
      animShow()
    } else {
      animHide()
    }
  }, [visible])

  const onHide = () => {
    onAfterClose && onAfterClose()
  }

  const animHide = () => {
    requestAnimationFrame(() => setAnimVisible(false))
    setTimeout(
      () => {
        onHide()
      },
      duration! > 300 ? duration : 300
    )
  }

  const animShow = () => {
    requestAnimationFrame(() => setAnimVisible(true))
  }

  const onMaskClick = () => {
    if (maskClosable) onClose && onClose()
  }

  const contentStyle = useMemo(() => {
    const style: any = {
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.6, 1)`,
    }
    if (position === "center" && animVisible) {
      style.transform = "scale(1)"
    }
    return style
  }, [duration, position, animVisible])

  return (
    <View
      className={classNames(styles.popup, styles[position!], className, {
        [styles.show]: animVisible,
      })}
      style={{ zIndex }}
    >
      {mask && (
        <View
          className={styles.mask}
          style={{
            transition: `all ${duration! + 300 - 195}ms`,
          }}
          onClick={onMaskClick}
        ></View>
      )}

      <View className={styles.content} style={contentStyle}>
        <View className={styles.main}>{props.children}</View>
      </View>
    </View>
  )
}

Popup.defaultProps = {
  zIndex: 1000,
  mask: true,
  maskClosable: true,
  duration: 195,
}
