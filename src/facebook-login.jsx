/* global someFunction FB,window,document,fjs */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { loadFbSdk, getLoginStatus, fbLogin, fbLogout } from './helpers/helpers.js';
import Spinner from './spinner.jsx';
import styles from './style/styles.js';

export default class FacebookReduxLogin extends Component {
  constructor(props) {
    super(props);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.showSpinner = this.showSpinner.bind(this);
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
        if (this.props.verbose) console.info(loadingResult, window.FB);
      })
      .then(() => getLoginStatus())
      .then(response => {
        if (response.status === 'connected') {
          this.setState({ isConnected: true });
        }
        this.setState({ isWorking: false });
        this.props.onWillMount(response);
      });
  }

  getButtonText() {
    switch (this.state.isConnected) {
      case true:
        return this.props.logOut;
      case false:
        return this.props.logIn;
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
      return <div style={styles.fbIcon} />;
    }
  }
  login() {
    this.setState({ isWorking: true });
    fbLogin().then(response => {
      if (this.props.verbose) console.info('login response', response);
      if (response.status === 'connected') {
        this.setState({ isConnected: true, isWorking: false });
      } else {
        this.setState({ isConnected: false, isWorking: false });
      }
      this.props.onLoginEvent(response);
    });
  }
  logout() {
    this.setState({ isWorking: true });
    fbLogout().then(response => {
      if (this.props.verbose) console.info('logout response', response);
      this.setState({
        isWorking: false,
        isConnected: false
      });
      this.props.onLogoutEvent(response);
    }
    );
  }
  render() {
    this.styles = merge({}, styles, this.props.style);
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
  appId: PropTypes.string.isRequired,
  logIn: PropTypes.string,
  logOut: PropTypes.string,
  verbose: PropTypes.bool,
  onWillMount: PropTypes.func,
  onLoginEvent: PropTypes.func,
  onLogoutEvent: PropTypes.func
};
FacebookReduxLogin.defaultProps = {
  logIn: 'Log In To Facebook',
  logOut: 'Log out from Facebook',
  verbose: false,
  onWillMount: () => { },
  onLoginEvent: () => { },
  onLogoutEvent: () => { }
};