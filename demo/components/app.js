import React, { Component } from 'react';
import FacebookReduxLogin from '../../src/facebook-login.jsx';

export default class App extends Component {
  render() {
    return (
      <FacebookReduxLogin appId='326022817735322'
        verbose={false}
        onLoginEvent={() => { console.log('logged !!!'); }}
      />
    );
  }
}
