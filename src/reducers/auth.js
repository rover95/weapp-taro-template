import * as Types from "../constants/actionType";
import { createReducer, createHandlers } from "../utils/creatrReducer";

function initState(data) {
  return {
    data,
    isRequesting: false,
    error: null
  }
}

const initAuth = {
  userInfo:null,
  isRequesting:false,
  error:null
}
exports.auth = createReducer(initAuth, {
  [Types.USER_LOGIN_SUCCESS]: (state, action) => {    
    return {
      ...state,
      userInfo: action.payload
    }
  },
  [Types.USER_LOGIN_FAIL]: (state, action) => {
    return {
      ...state,
      userInfo: null
    }
  },
})

exports.siteList = createReducer(initState([]), createHandlers(Types.GET_SITELIST))
