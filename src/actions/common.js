import Taro from '@tarojs/taro';
import * as Types from '../constants/actionType';
import { createAction } from '../utils/createAction';

//公共请求,复用异常处理,不做数据存储
export const commonFetch = (url, data, type) => {
  return createAction({
    method: type || 'get', url, data, type: Types.TEMPORARY });
};