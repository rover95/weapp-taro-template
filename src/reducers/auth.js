import * as Types from "../constants/actionType";
import { createReducer, createHandlers } from "../utils/creatrReducer";

function initState(data) {
  return {
    data,
    isRequesting: false,
    error: null
  };
}

const initAuth = {
  userInfo:null,
  isRequesting:false,
  error:null
};
export const auth = (state = initState, action) => {
  switch (action.type) {
    case Types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload
      };
    case Types.USER_LOGIN_FAIL:
      return {
        ...state,
        userInfo: null
      };
    default:
      return state;
  }
};

export const siteList = createReducer(initState([]), createHandlers(Types.GET_SITELIST));
