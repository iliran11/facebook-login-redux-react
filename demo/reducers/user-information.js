export default function (state = null, action) {
  switch (action.type) {
    case 'getUserInformation':
      return (action.payload);
    default:
      return state;
  }
}