import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import jiuIcon from '@/assets/entrance/9.9.png'
import rankIcon from '@/assets/entrance/rank.png'
import './index.scss'

const Entrance = (props) => {
  // const { } = props;

  const entranceList = [
    {
      icon: jiuIcon,
      title: '9.9包邮',
      link: 'pages/jiu/index'
    },
    {
      icon: rankIcon,
      title: '热卖榜单',
      link: 'pages/rank/index'
    },
  ]

  return (
    <View className='entrance_c'>
      {
        entranceList.map((item, i) => {
          return (
            <View key={i} className="entrance_item">
              <Image className="img" src={item.icon} />
              <Text className="text">{item.title}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

export default Entrance