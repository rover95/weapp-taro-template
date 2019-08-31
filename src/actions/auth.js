import * as Auth from "../constants/auth";
import Taro from '@tarojs/taro';

export function getAccessToken (){
  return (dispatch) => {
    return Taro.get('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=BaknhgTGUUlR9I5oNyPuWA27&client_secret=rlPPHoK2PA59Z2ycEu8SzQGoRwNut1C6').then(res => {
      if (res.statusCode == 200){
        dispatch(getAccessTokenSuccess(res.data))
      }
    })
  }
}
export const getAccessTokenSuccess = (data) =>{
  Taro.baidu_ai_token = data.access_token
  Taro.setStorageSync('baidu_ai_token', data.access_token);
  return {
    type: Auth.GET_ACCESS_TOKEN_SUCCESS,
    payload:data
  }
}