export default function (state = { isConnected: null }, action) {
  if (action.payload === 'connected' && action.type === 'getFacebookStatus') {
    return {
      isConnected: true
    };
  }
  return {
    isConnected: false
  };
}
