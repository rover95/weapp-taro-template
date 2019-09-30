import request from "../services/request";
import getType from "../utils/createActionType";

//构建异步请求的action
export function createAction({method,url,data,type},cb){
  return dispatch => {
    dispatch({
      type: type,
    });
    return request[method](url,data).then(res=>{
      if (res.statusCode === 200 || res.statusCode === 204){
        dispatch({
          type: getType(type).success,
          payload: cb ? cb(res.data) : res.data 
        });
      }else{
        dispatch({
          type: getType(type).fail,
          error: { message: res.data.message || '请求出错' }
        });
      }
      return res;
    }).catch(err=>{
      dispatch({
        type: getType(type).fail,
        error: { message: '网络异常'}
      });
      return err;
    });
  };
}