import * as AI from "../constants/ai_const";
import Taro from '@tarojs/taro';

export function imgGeneral(data) {
  return (dispatch) => {
    Taro.post('https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic', data, {
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      console.log(res);
      
    })
  }
}
export const getAccessTokenSuccess = (data) => {
  Taro.baidu_ai_token = data.AccessToken
  return {
    type: Auth.GET_ACCESS_TOKEN_SUCCESS,
    payload: data
  }
}