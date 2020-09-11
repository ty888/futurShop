import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

const Progress = (props) => {
  /**
   * percent: 进度
   * background: 进度条颜色
   */
  const { 
    percent,
    background = 'linear-gradient(to left, #ff0844 0%, #ffb199 100%)',
  } = props;

  const styles = {
    width: percent + '%',
    backgroundImage: background,
  }

  return (
    <View className='progress_c'>
      <View style={styles} className="inner" />
    </View>
  )
}

export default Progress