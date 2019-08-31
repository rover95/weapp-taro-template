import Taro , { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { add, minus, asyncAdd } from '../../actions/counter';
import { getAccessToken } from "../../actions/auth";

import './index.scss';


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add());
    
  },
  dec () {
    dispatch(minus());
  },
  asyncAdd () {
    dispatch(asyncAdd());
  },
  getAccessToken(){
    dispatch(getAccessToken())
  }
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  componentWillReceiveProps (nextProps) {
  }

  componentWillUnmount () { 
    
  }
  
  componentDidShow () { }

  componentDidHide () { }

  // 获取百度AI令牌
  getAccessToken_(){
    Taro.get('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=BaknhgTGUUlR9I5oNyPuWA27&client_secret=rlPPHoK2PA59Z2ycEu8SzQGoRwNut1C6').then(res => {
      console.log(res);

    })
  }
  render () {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.getAccessToken}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    );
  }
}

export default Index;
