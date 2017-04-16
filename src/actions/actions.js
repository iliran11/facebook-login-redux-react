export function getLoginResponse(status) {
  return ({
    type: 'loginResponse',
    payload: status
  });
}
export function loginFetching() {
  return {
    type: 'fetching'
  };
}