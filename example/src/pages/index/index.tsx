import { Button, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { FC } from 'react'
import { Popups } from 'tarojs-popups'
import { CenterItem, Item } from '../../components/item'
import './index.css'

const Index: FC = () => {
  return (
    <View className="index">
      <Popups />
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
      <Button
        onClick={() => {
          Taro.navigateTo({
            url: '/pages/me/index',
          })
        }}
      >
        去Home页
      </Button>
      <Button
        onClick={() => {
          Popups.open({
            el: CenterItem,
            position: 'center',
            duration: 3000
          })
        }}
      >
        中间弹出
      </Button>
    </View>
  )
}

export default Index
