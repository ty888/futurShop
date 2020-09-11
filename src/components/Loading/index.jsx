import React from 'react'
import { View, Image } from '@tarojs/components'
import loadingIcon from '@/assets/loading.gif'
import './index.scss'

const Loading = (props) => {

  /**
   * loading: 是否展示
   * isGlobal: 是否全局
   */
  const { loading = false, isGlobal = true } = props;

  const currentStyle = {
    position: isGlobal ? 'fixed' : 'absolute',
  }

  return (
    <View className='loading_c'>
      {
        loading && <View className="loading_box" style={currentStyle}>
          <Image className="loading_img" src={loadingIcon} />
        </View>
      }
    </View>
  )
}

export default Loading