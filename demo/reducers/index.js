import { combineReducers } from 'redux';
import facebookLogin from './login-reducer.js';
import userInformation from './user-information.js'
import facebookObject from './facebook-object.js'

const rootReducer = combineReducers({
  facebookLogin,
  userInformation,
  facebookObject
});

export default rootReducer;
