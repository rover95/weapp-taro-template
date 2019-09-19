import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux';

import { getAccessToken } from "../../../actions/auth";
import { getLoginUrl } from "../../../services/api";

@connect((state) => state, (dispatch) => ({
  // getAccessToken() {
  //   return dispatch(getAccessToken())
  // }
}))

class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  constructor(props) {
    super(props);
    this.state = { 
      
    };
  }
  componentDidMount(){
    for(let i=0;i<10;i++){
      // Taro.get('https://finance.sina.cn/china/gncj/2019-05-31/detail-ihvhiqay2662671.d.html')
    }
  }
  login(){
    Taro.post(getLoginUrl(), { username: "smartsite", password: "smartsiteadmin"})
  }
  // 获取百度AI令牌
  getAccessToken_() {
    this.props.dispatch(getAccessToken()).then(() => {
      Taro.navigateTo({
        url: '../../tool/index'
      })
    })
  }
  render() {
    return (
      <View>
        <AtInput placeholder="用户名"/>
        <AtInput type='password' placeholder="密码"/>
        <Button style="margin: 40rpx 30rpx" onClick={this.login}>登录</Button>
      </View>
    );
  }
}

export default Login;