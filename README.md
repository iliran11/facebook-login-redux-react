## Active Development
This respository is currently undergoing  development.
I welcome any kind of tips/requests/questions.
possible methods to contact me:

1. open an issue
2. send me a mail: iliran11@gmail.com
3. contact me on facebook: you can find me with my mail address: iliran11@gmail.com

### Installation

```
npm install --save facebook-login-react
```

## Usage

The button object has one required props:

- `appId` to make a connection to your app. for information on obtainining an appId please visit: [Facebook Developers](https://developers.facebook.com)

Example:

```xml
<FacebookLogin
  appId = "123456778810"
  verbose={true}
  onWillMount = {(authResponse) => console.log('callback. the response: ' , authResponse)}
  on
  onLoginEvent = {(authResponse) => console.log('callback. the response: ' , authResponse)}
  onLogoutEvent = {(authResponse) => console.log('callback. the response: ' , authResponse)}
/>
```
## Development

- running the demo on dev server `npm run demo`. this will run the demo app, which is configured for redux, 

## Styles
Styles are fully mergable and extensible.
they are passed as an object with 2 keys, 'loginBtn' and 'fbIcon' and they will be merged with the default styles object (will soon add support for the spinner styling)
```js
  styles: {
    loginBtn: {
      position: 'relative',
      padding: '0 15px 0px 46px',
      border: 'none',
      lineHeight: '34px',
      fontSize: '16px',
      color: '#FFF',
      backgroundImage: 'linear-gradient(#4C69BA, #3B55A0)'
    },
    fbIcon: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 34,
      height: '100%',
      background: "url(" + Icon + ") 6px 6px no-repeat"
    }
  }
```
# redux

will add a demo showing integration with redux.

# Testing

tests will be added hopefully soon.

# Demos
to be added.

