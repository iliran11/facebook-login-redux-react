import { combineReducers } from 'redux';
import facebookLogin from './login-reducer.js';
import userInformation from './user-information.js'

const rootReducer = combineReducers({
  facebookLogin,
  userInformation
});

export default rootReducer;
