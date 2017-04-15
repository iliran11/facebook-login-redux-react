import { loadFbSdk, getLoginStatus, fbLogin, fbLogout } from '../helpers/facebook-login.js';
import { updateFacebookLoginStatus } from './actions.js'

export function initLoginStatus() {
  return dispatch => {
    loadFbSdk()
      .then(loadingResult => console.log(loadingResult, window.FB))
      .then(() => getLoginStatus())
      .then(response => {
        console.log('status connection', response);
        dispatch(updateFacebookLoginStatus(response.status));
      });
  };
}
export function logIn() {
  return dispatch => {
    fbLogin().then(response => {
      console.log(response.status);
      dispatch(updateFacebookLoginStatus(response.status));
    });
  };
}
export function logOut() {
  return dispatch => {
    fbLogout().then(response => {
      console.log(response.status);
      dispatch(updateFacebookLoginStatus(response.status));
    }
    )
  }
}