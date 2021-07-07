import Taro from "@tarojs/taro"

export function isNil(val: any) {
  return val === undefined || val === null
}

export function isNotNil(val: any) {
  return !isNil(val)
}

export function requestAnimationFrame(cb: () => void) {
  var systemInfo = Taro.getSystemInfoSync()
  if (systemInfo.platform === "devtools") {
    return setTimeout(function () {
      cb()
    }, 1000 / 30)
  }
  return Taro.createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(function () {
      cb()
    })
}
