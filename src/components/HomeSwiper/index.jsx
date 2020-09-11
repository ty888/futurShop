import React, { useState } from 'react'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'

const HomeSwiper = (props) => {
  const { onSwiper = () => {} } = props;

  const swiperList = [
    {
      url: 'https://img.alicdn.com/imgextra/i1/2053469401/O1CN01PTLakJ2JJi23QA6Ta_!!2053469401.jpg',
      color: '#ea3d2e'
    },
    {
      url: 'https://img.alicdn.com/imgextra/i1/2053469401/O1CN01PTLakJ2JJi23QA6Ta_!!2053469401.jpg',
      color: '#093928'
    },
    {
      url: 'https://img.alicdn.com/imgextra/i1/2053469401/O1CN01PTLakJ2JJi23QA6Ta_!!2053469401.jpg',
      color: '#36135f'
    },
  ]


  return (
    <View className='swiper_c'>
      <Swiper
        className='swiper_box'
        indicatorColor='rgba(255,255,255,.4)'
        indicatorActiveColor='rgba(255,255,255,1)'
        circular
        indicatorDots
        autoplay
        onChange={(v) => {
          onSwiper(swiperList[v.detail.current].color)
        }}
      >
        {
          swiperList.map((item, i) => {
            return <SwiperItem key={i} className="swiper_item">
              <Image className="swiper_img" mode="aspectFill" src={item.url} />
            </SwiperItem>
          })
        }
      </Swiper>
    </View>
  )
}

export default HomeSwiper