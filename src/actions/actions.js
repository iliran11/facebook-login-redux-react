export function updateFacebookLoginStatus(status) {
  return {
    type: 'getFacebookStatus',
    payload: status
  }
}