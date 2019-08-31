import * as Auth from "../constants/auth";

const initState = {
  AccessToken:null
}

export default function auth(state = initState, action) {
  switch (action.type) {
    case Auth.GET_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        AccessToken: action.payload.access_token
      };
    
    default:
      return state;
  }
}