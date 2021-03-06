import Taro from '@tarojs/taro';
import * as Types from '../constants/actionType';
import request from '../services/request';
import { setState } from '../store/globalState';

export const login = (url, data)=>{
  return dispatch =>{
    function dealError(error) {
      Taro.showToast({
        title: error,
        icon: 'none',
        duration: 1500
      });
      dispatch({
        type: Types.USER_LOGIN_FAIL,
      });
      throw new Error(error);
    }
    return request.post(url, data,{hideErrorToast: true}).then(res=>{
      if (res.statusCode == 200){
        setState('token', res.data.token);
        Taro.setStorageSync('token', res.data.token);
        Taro.setStorageSync('userInfo', res.data);
        dispatch({
          type: Types.USER_LOGIN_SUCCESS,
          payload: res.data
        });
        
        return res.data;
      }else{
        dealError(res.data.message || '请求出错');
      }
    },err=>{
      dealError(err.message || '请求出错');
    });
  };
};

export const setAuth = (userInfo) => {
  return {
    type: Types.SET_USERINFO,
    payload: userInfo
  };
};