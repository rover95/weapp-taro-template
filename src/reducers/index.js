import { combineReducers } from 'redux';
import counter from './counter';
import * as auths from './auth';

export default combineReducers({
  counter,
  ...auths,
});
