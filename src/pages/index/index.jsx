import Taro , { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { getAccessToken } from "../../actions/auth";

import './index.scss';


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
 
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  componentWillReceiveProps (nextProps) {
  }
  componentDidMount() {
    
  }
  componentWillUnmount () { 
    
  }
  
  componentDidShow () { }

  componentDidHide () { }

  
  render () {
    return (
      <View className='index'>
        <View className="title"><Text>Hello, World</Text></View>
      </View>
    );
  }
}

export default Index;
