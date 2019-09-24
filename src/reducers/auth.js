import * as Auth from "../constants/auth";

const initState = {
  userInfo:null
}

export default function auth(state = initState, action) {
  switch (action.type) {
    case Auth.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload
      }
    case Auth.USER_LOGIN_FAIL:
      return {
        ...state,
        userInfo: null
      }
    default:
      return state;
  }
}