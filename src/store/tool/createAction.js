import request from '../../services/request';
import getType from './createActionType';

/* 
  构建异步请求的action
  @param cb Function 请求后的回调函数, 在异步数据存入state前进行预处理
*/
export function createAction({ method, url, data, type }, cb) {
  return dispatch => {
    const actionType = getType(type);
    dispatch({
      type: actionType.begin,
    });
    return request[method](url, data).then(res => {
      const payload = cb ? cb(res.data) : res.data;
      if (res.statusCode === 200 || res.statusCode === 204) {
        dispatch({
          type: actionType.success,
          payload
        });
      } else {
        dispatch({
          type: actionType.fail,
          error: { message: res.data.message || '请求出错' }
        });
        //继续向外抛出错误
        throw { message: res.data.message || '请求出错', hasDispatch: true };
      }
      return payload;
    }).catch(err => {
      if(!err.hasDispatch){
        dispatch({
          type: actionType.fail,
          error: { message: err.message },
        });
      }
      //继续向外抛出错误
      throw new Error(err);
    });
  };
}