import * as Types from '../constants/actionType'
import Taro from '@tarojs/taro';
import { setState } from "../store/globalState";

exports.login = (url, data)=>{
  return dispatch =>{
    function dealError(data) {
      dispatch({
        type: Types.USER_LOGIN_FAIL,
      })
      throw new Error(data)
    }
    return Taro.post(url, data,{hideErrorToast:true}).then(res=>{
      if (res.statusCode == 200){
        setState('token', res.data.token)
        Taro.setStorageSync('token', res.data.token)
        dispatch({
          type: Types.USER_LOGIN_SUCCESS,
          payload: res.data
        });
        
        return res.data
      }else{
        dealError(res.data.message || '请求出错')
      }
    },err=>{
      dealError(err.message || '请求出错')
    })
  }
}
