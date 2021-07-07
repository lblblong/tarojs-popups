import { Button, View } from '@tarojs/components'
import React, { FC } from 'react'
import { Popups } from 'tarojs-popups'
import { Item } from '../../components/item'
import './index.css'

const Index: FC = () => {
  return (
    <View className="index">
      <Popups mask />
      <Button
        onClick={async () => {
          const value = await Popups.open({
            el: Item,
            position: 'bottom',
          })
          console.log(value)
        }}
      >
        弹出窗口
      </Button>
    </View>
  )
}

export default Index
