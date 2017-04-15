/* global someFunction FB,window,document,fjs */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLoginStatus } from '../actions/index.js';

class FacebookReduxLogin extends Component {
  static loadSdk() {
    return new Promise(resolve => {
      window.fbAsyncInit = function () {
        FB.init({
          appId: '326022817735322',
          xfbml: true,
          version: 'v2.8'
        });
        FB.AppEvents.logPageView();
        resolve('SDK Loaded!');
      };
      (function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        const js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    });
  }
  static getLoginStatus() {
    return new Promise(resolve => {
      window.FB.getLoginStatus(responseStatus => {
        resolve(responseStatus);
      });
    });
  }
  static performLogin() {
  }
  componentDidMount() {
    FacebookReduxLogin.loadSdk()
      .then(res => console.log(res, window.FB))
      .then(() => FacebookReduxLogin.getLoginStatus())
      .then(res => {
        console.log('status connection', res);
        this.props.getLoginStatus(res.status);
      });
  }
  render() {
    return <button onClick={FacebookReduxLogin.performLogin}>login</button>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getLoginStatus
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(FacebookReduxLogin)