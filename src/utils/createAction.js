import request from '../services/request';
import getType from '../utils/createActionType';

/* 
  构建异步请求的action
  @param cb Function 请求后的回调函数, 在异步数据存入state前进行预处理
*/
export function createAction({ method, url, data, type }, cb) {
  return dispatch => {
    const actionType = getType(type);
    dispatch({
      type: type,
    });
    return request[method](url, data).then(res => {
      if (res.statusCode === 200 || res.statusCode === 204) {
        dispatch({
          type: actionType.success,
          payload: cb ? cb(res.data) : res.data
        });
      } else {
        dispatch({
          type: actionType.fail,
          error: { message: res.data.message || '请求出错' }
        });
        throw new Error(res);
      }
      return res;
    }).catch(err => {
      dispatch({
        type: actionType.fail,
        error: { message: '网络异常' }
      });
      throw new Error(err);
      return err;
    });
  };
}