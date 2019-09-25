import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { AtInput, AtForm, AtButton, AtMessage } from 'taro-ui'
import { connect } from '@tarojs/redux';

import { getAccessToken, login } from "../../../actions/auth";
import { getLoginUrl } from "../../../services/api";
import { getState, setState } from "../../../store/globalState";

@connect((state) => state.auth, (dispatch) => ({
  
}))

class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  constructor(props) {
    super(props);
    this.state = { 
      username:'admin',
      password:'123456'
    };
  }
  componentDidMount(){
    for(let i=0;i<10;i++){
      // Taro.get('https://finance.sina.cn/china/gncj/2019-05-31/detail-ihvhiqay2662671.d.html')
    }
  }
  login(e){
    const {username,password} = this.state;
    this.props.dispatch(login(getLoginUrl(), { username, password })).then(res=>{
      Taro.reLaunch({
        url: '/pages/index/index'
      })
    }).catch(err=>{                                
      Taro.atMessage({
        'message': err.message,
        'type': 'error',
      })
    })
  }
  handleUsernameChange(val){
    this.setState({
      username:val
    })
  }
  handlePasswordChange(val) {
    this.setState({
      password: val
    })
  }
  render() {
    return (
      <View>
        <AtMessage></AtMessage>
        <AtForm
          onSubmit={()=>this.login()}
        >
          <AtInput name='username' value={this.state.username} placeholder='用户名' onChange={e=>this.handleUsernameChange(e)}/>
          <AtInput name='password' value={this.state.password} type='password' placeholder='密码' onChange={e=>this.handlePasswordChange(e)}/>
          <View style="padding: 40rpx 30rpx" >
            <AtButton formType='submit'>登录</AtButton>
          </View>
          {/* <Button style="margin: 40rpx 30rpx" onClick={this.login}>登录</Button> */}
        </AtForm>
      </View>
    );
  }
}

export default Login;