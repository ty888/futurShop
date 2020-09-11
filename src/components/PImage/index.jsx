import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import phImg from '@/assets/ph.png'
import './index.scss'

const PImage = (props) => {
  /**
   * src: 图片地址
   * alt
   * size: 宽高
   * style: 自定义样式
   * radius: 圆度
   */
  const { size, src, alt, style, radius } = props;
  const [showBg, setShowBg] = useState(true)

  const currentStyle = {
    ...style,
    width: size + 'px',
    height: size + 'px',
    borderRadius: radius + 'px',
  }

  return (
    <View style={{...currentStyle, backgroundImage: showBg ? `url(${phImg})` : ''}} className='p_image'>
      <Image onLoad={() => { setShowBg(false) }} lazyLoad className="img" {...props} src={src} alt={alt} />
    </View>
  )
}

export default PImage