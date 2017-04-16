import { loadFbSdk, getLoginStatus, fbLogin, fbLogout } from '../helpers/facebook-login.js';
import { getLoginResponse, loginFetching } from './actions.js'

export function initLoginStatus() {
  return dispatch => {
    dispatch(loginFetching());
    loadFbSdk()
      .then(loadingResult => console.log(loadingResult, window.FB))
      .then(() => getLoginStatus())
      .then(response => {
        console.log('status connection', response);
        dispatch(getLoginResponse(response.status));
      });
  };
}
export function logIn() {
  return dispatch => {
    dispatch(loginFetching());
    fbLogin().then(response => {
      console.log(response.status);
      dispatch(getLoginResponse(response.status));
    });
  };
}
export function logOut() {
  return dispatch => {
    dispatch(loginFetching());
    fbLogout().then(response => {
      console.log(response.status);
      dispatch(getLoginResponse(response.status));
    }
    );
  };
}