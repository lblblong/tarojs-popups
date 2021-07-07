# tarojs-popups

#### 安装

```shell
$ npm install tarojs-popups
# or
$ yarn add tarojs-popups
```

#### 使用

```tsx
import { Button, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { FC } from 'react'
import 'tarojs-popups/dist/index.css'
import { Popups, useController } from 'tarojs-popups'  // 引入

const Test: FC<{name?:string}> = (props) => {
  const ctx = useController()
  return (
      <View style={{background:'#fff'}}>
          <View>你好，{props.name}</View>
          <Button onClick={() => ctx.close('我是数据')}>关闭弹窗并返回数据<Button>
      </View>
  )
}

export default function IndexPage {
  return (
    <View className="index">
      <Popups />
      <Button
        onClick={async () => {
          const value = await Popups.open({
            el: Test,
            props: { name: 'tarojs-popups' },
            position: 'bottom',
          })
          console.log('获得数据',value)
        }}
      >
        弹出窗口
      </Button>
    </View>
  )
}
```
