import React from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'
import './index.scss'

const Tli = () => {

  return (
    <View className='index'>
      <Text>淘礼金</Text>
    </View>
  )
}

export default connect()(Tli)