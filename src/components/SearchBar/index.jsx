import React, { useState } from 'react'
import { View, Input } from '@tarojs/components'
import './index.scss'

const SearchBar = (props) => {
  const { searchText = '搜索', placeholder = "输入商品信息", onSearch } = props;
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(true)

  return (
    <View className='search_bar_c'>
      <View className="search_wrap">
        <View className='at-icon at-icon-search' />
        <Input
          className="input_box"
          type='text'
          value={value}
          placeholder={placeholder}
          focus={focus}
          confirmType='搜索'
          onInput={(v) => { setValue(v.detail.value) }}
          onConfirm={() => { onSearch(value); setFocus(false) }}
        />
          <View onClick={() => {setValue('')}} className='at-icon at-icon-close-circle close_icon' />
      </View>
      <View className="search_btn" onClick={() => { onSearch(value); setFocus(false) }}>{searchText}</View>
    </View>
  )
}

export default SearchBar