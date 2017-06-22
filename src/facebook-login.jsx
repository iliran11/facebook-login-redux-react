/* global someFunction FB,window,document,fjs */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadFbSdk, getLoginStatus, fbLogin, fbLogout } from './helpers/helpers.js';
import Spinner from './spinner.jsx';
import defaultStyles from './style/styles.js';

export default class FacebookReduxLogin extends Component {
  constructor(props) {
    super(props);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.showSpinner = this.showSpinner.bind(this);
    this.state = {
      isWorking: false,
      isConnected: false
    };
    this.styles = {};
  }
  componentWillMount() {
    this.setState({
      isWorking: true
    });
    loadFbSdk(this.props.appId, this.props.version)
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
        return this.props.logoutLabel;
      case false:
        return this.props.loginLabel;
      default:
        return 'this is default';
    }
  }
  buttonClicked() {
    this.props.onClick();
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
      return <div style={this.styles.fbIcon} />;
    }
  }
  login() {
    this.setState({ isWorking: true });
    fbLogin(this.props.loginOptions).then(response => {
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
    if (this.styles) {
      this.styles.loginBtn = Object.assign({}, defaultStyles.loginBtn, this.styles.loginBtn);
      this.styles.fbIcon = Object.assign({}, defaultStyles.fbIcon, this.styles.fbIcon);
      this.styles.spinner = Object.assign({}, defaultStyles.spinner, this.styles.spinner);
    }
    return (
      <div>
        {this.props.loginOptions.color}
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
  version: PropTypes.string,
  loginLabel: PropTypes.string,
  loginOptions: PropTypes.shape({
    authType: PropTypes.string,
    scope: PropTypes.string,
    returnScopes: PropTypes.bool,
    enableProfileSelector: PropTypes.bool,
    profileSelectorIds: PropTypes.string
  }),
  logoutLabel: PropTypes.string,
  verbose: PropTypes.bool,
  onWillMount: PropTypes.func,
  onLoginEvent: PropTypes.func,
  onLogoutEvent: PropTypes.func,
  onClick: PropTypes.func
};
FacebookReduxLogin.defaultProps = {
  loginLabel: 'Log In To Facebook',
  version: 'v2.9',
  loginOptions: {
    scope: 'email'
  },
  logoutLabel: 'Log out from Facebook',
  verbose: false,
  onWillMount: () => { },
  onLoginEvent: () => { },
  onLogoutEvent: () => { },
  onClick: () => { },
  styles: {}
};