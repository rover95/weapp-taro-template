import getType from '../utils/createActionType';

//构建异步请求reducer处理函数
export function createHandlers(type){
  const handlers = {
    [type]: (state,action)=>{
      return Object.assign({}, state, { isRequesting: true });
    },
    [getType(type).success]: (state, action) => {
      return Object.assign({}, state, { data: action.payload, isRequesting: false });
    },
    [getType(type).fail]: (state, action) => {
      return Object.assign({}, state, { error: action.error, isRequesting: false });
    },
  };
  return handlers;
}
//构建异步请求reducer
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

//构建初始化state
export function initState(data) {
  return {
    data,
    isRequesting: false,
    error: null
  };
}