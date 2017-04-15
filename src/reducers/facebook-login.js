export default function (state = { isConnected: false }, action) {
  if (action.payload === 'connected' && action.type === 'getFacebookStatus') {
    return {
      isConnected: true
    };
  }
  return state;
}
