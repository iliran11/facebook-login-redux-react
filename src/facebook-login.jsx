/* global FB */

import React, { Component } from 'react';
import { loadFbSdk, getLoginStatus, fbLogin, fbLogout } from './helpers/helpers.js';

export default class FacebookReduxLogin extends Component {
  constructor(props) {
    super(props);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.buttonText = this.buttonText.bind(this);
    this.state = {
      isWorking: false,
      isConnected: false
    };
  }
  componentWillMount() {
    this.setState({
      isWorking: true
    });
    loadFbSdk(this.props.appId, this.props.version)
      .then(() => getLoginStatus())
      .then(response => {
        const isConnected = response.status === 'connected';
        if (isConnected) {
          this.setState({ isConnected: true });
        }
        this.setState({ isWorking: false });
        this.props.sdkLoaded({ isConnected, FB });
      });
  }
  buttonText() {
    return {
      isConnected: this.state.isConnected,
      loginLabel: this.props.loginLabel,
      logoutLabel: this.props.logoutLabel
    };
  }
  styles(options) {
    const {
      width = '',
      padding = '0 15px 0px 46px',
      fontSize = '16px',
      backgroundImage = 'linear-gradient(#4C69BA, #3B55A0)',
      color = '#FFF',
      lineHeight = '34px'
    } = options;
    return {
      width,
      fontSize,
      backgroundImage,
      padding,
      color,
      lineHeight,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      border: 'none'
    };
  }
  buttonClicked() {
    this.props.onClick();
    if (this.state.isConnected) {
      this.logout();
    } else {
      this.login();
    }
  }
  login() {
    this.setState({ isWorking: true });
    fbLogin(this.props.loginOptions).then(response => {
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
      this.setState({
        isWorking: false,
        isConnected: false
      });
      this.props.onLogoutEvent(response);
    }
    );
  }
  render() {
    return (
      <button onClick={this.buttonClicked} style={this.styles(this.props)}>
        {this.props.children}
        <ButtonText {...this.buttonText()} />
      </button>
    );
  }
}

const ButtonText = ({ isConnected, logoutLabel, loginLabel }) => {
  return (
    <span>
      {isConnected ? logoutLabel : loginLabel}
    </span>
  );
};
FacebookReduxLogin.defaultProps = {
  loginLabel: 'Log In To Facebook',
  version: 'v2.9',
  loginOptions: {
    scope: 'email'
  },
  logoutLabel: 'Log out from Facebook',
  onLoginEvent: () => { },
  onLogoutEvent: () => { },
  onClick: () => { },
  styles: {}
};