export default function (state = { isConnected: null, isWorking: null }, action) {
  console.log('action', action.payload)
  switch (action.type) {
    case 'loginResponse':
      if (action.payload.isConnected === true) {
        return ({
          isConnected: true,
          isWorking: false
        });
      } else {
        return ({
          isConnected: false,
          isWorking: false
        });
      }
    case 'fetching':
      return ({
        isConnected: state.isConnected,
        isWorking: true
      });
    default:
      return state;
  }
}
