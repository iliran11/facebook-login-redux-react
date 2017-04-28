example of default styling of the button
======

![button preview](http://i.imgur.com/4UHZAtX.png "")

Active Development
======

This respository is currently undergoing  development.
I welcome any kind of contributions/requests/questions/general feedback.
possible methods to contact me:

1. open an issue
2. send me a mail: iliran11@gmail.com
3. contact me on facebook: you can find me with my mail address: iliran11@gmail.com

Installation
======

```
npm i facebook-login-redux-react
```

Usage
======

Props
------


| Props 	| Type 	| Default 	| Notes 	|
|---------------	|----------	|---------------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| appId 	| string 	| None.It is a required prop. 	|  	|
| version 	| string 	| 'v2.9' 	| refer to [Facebook Docs](https://developers.facebook.com/docs/apps/changelog/) for explanation on available values 	|
| loginLabel 	| string 	| Log In To Facebook 	|  	|
| loginOptions 	| object 	| {scope: 'user_friends,email,user_birthday'} 	| all options listed on [Facebook Docs](https://developers.facebook.com/docs/reference/javascript/FB.login/v2.9) are passable with camelCase. e.g : {returnScopes: false} 	|
| logoutLabel 	| string 	| Log out from Facebook 	|   	|
| verbose 	| boolean 	| false 	|  	|
| onWillMount 	| function 	|  	|  	|
| onLoginEvent 	| function 	|  	|  	|
| onLogoutEvent 	| function 	|  	|  	|



Example:
------


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
Development
======

- running the demo on dev server `npm run demo`. this will run the demo app, which is configured for redux, 

Styles
======

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
    },
    spinner: {
      boxSizing: 'border-box',
      width: 30,
      height: '90%',
      borderRadius: '50%',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #3498db',
      animation: 'spin 2s linear infinite',
      position: 'absolute',
      left: 5
    }
  }
```
redux
======

will add a demo showing integration with redux.

Testing
======

tests will be added hopefully soon.

Demos
======
to be added.