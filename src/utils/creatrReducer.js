import getType from "../utils/createActionType";
import { USER_LOGIN_SUCCESS } from "../constants/auth";

export function createHandlers(type){
  const handlers = {
    [type]:(state,action)=>{
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
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

