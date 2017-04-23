import React, { Component } from 'react';
// import FacebookReduxLogin from '../../src/facebook-login.jsx';
import FacebookReduxLogin from '../../build/index.js';

export default class App extends Component {
  render() {
    return (
      <FacebookReduxLogin />
    );
  }
}
