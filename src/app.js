import React, { Component } from 'react'
import { Provider } from "react-redux"
import './app.scss'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

import dva from "./models/dva";
import models from "./models";

const dvaApp = dva.createApp({
  initialState: {},
  models: models
});
const store = dvaApp.getStore();

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
    // return this.props.children
  }
}

export default App
