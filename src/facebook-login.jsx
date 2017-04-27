/* global someFunction FB,window,document,fjs */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import isFunction from 'lodash/isFunction';
import { loadFbSdk, getLoginStatus, fbLogin, fbLogout } from './helpers/helpers.js';
import Spinner from './spinner.jsx';
import Icon from './style/icon.png';

export default class FacebookReduxLogin extends Component {
  constructor(props) {
    super(props);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.showSpinner = this.showSpinner.bind(this);
    this.styles = merge({}, defaults.styles, props.style);
    this.labels = merge({}, defaults.labels, props.lables);
    this.verbose = this.props.verbose;
    this.state = {
      isWorking: false,
      isConnected: false
    };
  }
  componentWillMount() {
    this.setState({
      isWorking: true
    });
    loadFbSdk(this.props.appId)
      .then(loadingResult => {
        if (this.verbose) console.info(loadingResult, window.FB);
      })
      .then(() => getLoginStatus())
      .then(response => {
        if (response.status === 'connected') {
          this.setState({ isConnected: true });
        }
        this.setState({ isWorking: false });
        if (isFunction(this.props.onWillMount)) {
          this.props.onWillMount(response);
        }
      });
  }

  getButtonText() {
    switch (this.state.isConnected) {
      case true:
        return this.labels.logOut;
      case false:
        return this.labels.logIn;
      default:
        return 'this is default';
    }
  }
  buttonClicked() {
    if (this.state.isConnected) {
      this.logout();
    } else {
      this.login();
    }
  }
  showSpinner() {
    if (this.state.isWorking) {
      return <Spinner style={this.styles.spinner} />;
    } else {
      return <div style={defaults.styles.fbIcon} />;
    }
  }
  login() {
    this.setState({ isWorking: true });
    fbLogin().then(response => {
      if (this.verbose) console.info('login response', response);
      if (response.status === 'connected') {
        this.setState({ isConnected: true, isWorking: false });
      } else {
        this.setState({ isConnected: false, isWorking: false });
      }
      if (isFunction(this.props.onLoginEvent)) {
        this.props.onLoginEvent(response);
      }
    });
  }
  logout() {
    this.setState({ isWorking: true });
    fbLogout().then(response => {
      if (this.verbose) console.info('logout response', response);
      this.setState({
        isWorking: false,
        isConnected: false
      });
      if (isFunction(this.props.onLogoutEvent)) {
        this.props.onLogoutEvent(response);
      }
    }
    );
  }
  render() {
    return (
      <div>
        <button onClick={this.buttonClicked} style={this.styles.loginBtn}>
          {this.showSpinner()}
          {this.getButtonText()}
        </button>
      </div>
    );
  }
}

FacebookReduxLogin.propTypes = {
  appId: PropTypes.string.isRequired

};

const defaults = {
  labels: {
    logIn: 'Log In To Facebook',
    logOut: 'Log out from Facebook'
  },
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
};