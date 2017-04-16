export default function (state = { isConnected: false, isWorking: false }, action) {
  console.log('reducer', action);
  switch (action.type) {
    case 'loginResponse':
      if (action.payload === 'connected') {
        console.log('here!');
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
