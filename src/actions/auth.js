import * as Auth from "../constants/auth";
import Taro from '@tarojs/taro';
import { setState } from "../store/globalState";

export function login(url, data){
  return dispatch =>{
    function dealError() {
      dispatch(loginFail())
      Taro.showToast({
        title: '登录失败',
        icon: 'none',
        duration: 1500
      })
    }
    return Taro.post(url, data).then(res=>{
      if (res.statusCode == 200){
        dispatch(loginSuccess(res.data));
        Taro.reLaunch({
          url: '/pages/index/index'
        })
      }else{
        dealError()
      }
      return res
    }).catch(err=>{
      dealError()
      return err
    })
  }
}
export function loginSuccess(data){
  setState('token',data.token)
  return {
    type: Auth.USER_LOGIN_SUCCESS,
    payload: data
  }
}

export function loginFail(){
  return {
    type: Auth.USER_LOGIN_FAIL,
  }
}
