import { loadFbSdk, getLoginStatus } from '../helpers/facebook-login.js';

export function initLoginStatus() {
  return dispatch => {
    loadFbSdk()
      .then(loadingResult => console.log(loadingResult, window.FB))
      .then(() => getLoginStatus())
      .then(loginStatus => {
        console.log('status connection', loginStatus);
        dispatch({
          type: 'getFacebookStatus',
          payload: loginStatus.status
        });
      });
  };
}