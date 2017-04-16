import { combineReducers } from 'redux';
import facebookLogin from './login-reducer.js';

const rootReducer = combineReducers({
  facebookLogin
});

export default rootReducer;
