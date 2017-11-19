Contribute
======
I welcome any kind of contributions/requests/questions/general feedback.
possible methods to contact me:
1. [open an Issue](https://github.com/iliran11/facebook-login-react/issues/new)
2. send me a mail: iliran11@gmail.com
3. [contact me on facebook](https://www.facebook.com/Liran.Co.1984)

[![npm](https://img.shields.io/npm/dm/facebook-login-redux-react.svg)](https://www.npmjs.com/package/facebook-login-redux-react)

Default Styling Of The Button
======

![button preview](http://i.imgur.com/4UHZAtX.png "")

Example: Integrating  Button with Redux
======
source code can be found in [demo](https://github.com/iliran11/facebook-login-react/tree/master/demo) folder.
the actual component is just the button (:
![app preview](http://i.imgur.com/MzaCdgO.gif "")



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
| loginOptions 	| object 	| {scope: 'email'} 	| all options listed on [Facebook Docs](https://developers.facebook.com/docs/reference/javascript/FB.login/v2.9) are passable with camelCase. e.g : {returnScopes: false} 	|
| logoutLabel 	| string 	| Log out from Facebook 	|   	|
| onClick 	| function 	|  	| will execute before the onLoginEvent/onLogoutEvent. useful for triggering the fetching event for redux store. 	|
| sdkLoaded | Object | returns an object with the following keys: <br> <b>isConnected</b>: Boolean. is the User conneted? <br> <b>FB:</b> the api object. |
| onLoginEvent 	| function 	|  	|  	|
| onLogoutEvent 	| function 	|  	|  	|

Style Props
------
Style Props Accepts any valid String values for those css Properties: 

| Prop Name       | Default Value (String)            |
|-----------------|-----------------------------------|
| width           | None                              |
|  padding        | 0 15px 0px 46px                   |
| fontSize        | 16px                              |
| backgroundImage | linear-gradient(#4C69BA, #3B55A0) |
| color           | #FFF                              |
| lineHeight      | 34px                              |



Example:
------


```xml
<FacebookReduxLogin
  appId='12345678'
  onLoginEvent={this.login}
  onLogoutEvent={this.logout}
  onClick={() => this.props.startFetching()}
  />
```
Development
======

- running the demo on dev server `npm start`. this will run the demo app, which is configured for redux, 


Tests
======

tests will be added hopefully soon.
