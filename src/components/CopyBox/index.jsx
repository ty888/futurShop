import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const CopyBox = (props) => {
  /**
   * data: 淘口令
   */
  const { data = {}, visible = false, onCancel, onSuccess } = props;

  // const copy_word = 

  const currentStyle = {
    display: visible ? 'flex' : 'none'
  }
  
  const copyLink = `
    卜纷bofon洗衣球凝珠8g*60颗5种香型除菌除螨浓缩洁净护色三合一
    关注微信公众号
    公众号地址: https://mp.weixin.qq.com/s?__biz=MzkyODEzMTE2MQ==&tempkey=MTA3OF9iQldmZFNpTE0wN0MyMUFzQ0tvYlYzS2Q3MUVyYU92ZnA5dE9oMXg1OGlVZ0NMRTdFV1JiYTNLT1FPUWJUMjRTNm9iU1VxT3dadlAzeFpJUThqN0diU1VPTEFyYkdCUXpYOGd2dU5PZ05MQUV4TkVFc1lRVTVtRW9YSWhCYkxOXzdlQmNHTUVkUHlESWVlTC10Vjg0WC00anhpMlhQbC1vS09EM3N3fn4%3D&WLK=FK${data.taoword}WX&chksm=421c3032756bb924581382ec839a0d683c9fbf9e460da31e44080c95e7901fd30e45fa91b377&scene=0&xtrack=1&previewkey=cRLbJuV2J%252BL8xZ2Z2Hc%252BwcNS9bJajjJKzz%252F0By7ITJA%253D#wechat_redirect
  `


  return (
    <View className='copy_box_c' style={currentStyle}>
      <View className="copy_wrap">
        <View className="copy_body">
          <View className="title_box">
            <Text className="text">复制文案</Text>
          </View>
          <View className="content">
            <View className="content_box">{data.title || '复制框内整段文字，即可领券购买。'}</View>
            <View className="copy_btn" onClick={() => {
              Taro.setClipboardData({
                data: copyLink,
                success: function () {
                  onSuccess()
                }
              })
            }}>复制文案&链接</View>
          </View>
        </View>
        <View className='at-icon at-icon-close-circle close_btn' onClick={() => { onCancel() }} />
      </View>
    </View>
  )
}

export default CopyBox