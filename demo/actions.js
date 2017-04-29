export function getLoginStatus(status) {
  return { type: 'loginResponse', payload: status };
}

export function startFetching() {
  return { type: 'fetching' };
}

export function getUserInformation(userInformation) {
  return { type: 'getUserInformation', payload: userInformation };
}