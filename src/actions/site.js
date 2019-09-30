import Taro from '@tarojs/taro';
import * as Types from '../constants/actionType';
import { createAction } from '../utils/createAction';

export const getSiteList = (url,data)=>{
  return createAction({ method: 'get', url, data, type: Types.GET_SITELIST });
};