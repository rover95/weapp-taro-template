import * as Types from '../constants/actionType'
import { createAction } from "../utils/createAction";
import Taro from '@tarojs/taro';

exports.getSiteList = (url,data)=>{
  return createAction({ method:'get', url, data, type: Types.GET_SITELIST })
}