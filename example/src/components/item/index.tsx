import { Button, View } from '@tarojs/components'
import { FC } from '@tarojs/taro'
import { useController } from 'tarojs-popups'

export const Item = () => {
  const ctx = useController()

  return (
    <View
      style={{
        background: '#fff',
        height: '80vh',
      }}
    >
      哈哈啊哈
      <Button
        onClick={() => {
          ctx.close('ahahahah')
        }}
      >
        关闭
      </Button>
    </View>
  )
}

export const CenterItem: FC = () => {
  const ctx = useController()

  return (
    <View
      style={{
        width: '80vw',
        height: '30vh',
        background: '#fff'
      }}
    >
      啊哈哈，中间弹出
      <Button
        onClick={() => {
          ctx.close('ahahahah')
        }}
      >
        关闭
      </Button>
    </View>
  )
}
