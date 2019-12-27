import * as Types from '../constants/actionType';
import { createReducer, createHandlers } from '../utils/creatrReducer';

function initState(data) {
  return {
    data,
    isRequesting: false,
    error: null
  };
}

const initAuth = {
  data: null,
  isRequesting: false,
  error: null
};
export const userInfo = (state = initAuth, action) => {
  switch (action.type) {
    case Types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case Types.SET_USERINFO:
      return {
        ...state,
        data: action.payload
      };
    case Types.USER_LOGIN_FAIL:
      return {
        ...state,
        data: null
      };
    default:
      return state;
  }
  return state;
};

export const siteList = createReducer(initState([]), createHandlers(Types.GET_SITELIST));
