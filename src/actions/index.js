export function getLoginStatus(status) {
  return { type: 'getFacebookStatus', payload: status }
}