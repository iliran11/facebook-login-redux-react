export default function (state = { FB: null }, action) {
  switch (action.type) {
    case 'loginResponse':
      return {
        FB: action.payload.FB
      };
    default:
      return state;
  }
}