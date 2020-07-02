import * as Types from '../constants/actionType';
import { createReducer, createHandlers, initState } from '../store/tool/creatrReducer';

export const temporary = (state = {}, action) => {
  switch (action.type) {
    case 'TEMPORARY_SUCCESS':
      return {};
    case 'TEMPORARY':
      return {};
    case 'TEMPORARY_FAIL':
      return {};
    default:
      return state;
  }
  return state;
};