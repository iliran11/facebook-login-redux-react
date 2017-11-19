/* global someFunction FB,window,document,fjs */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  buttonText() {
    return {
      isConnected: this.state.isConnected,
      loginLabel: this.props.loginLabel,
      logoutLabel: this.props.logoutLabel
    }
  }
  styles() {
    return   {
      display: 'flex',
      alignItems:'center',
      position: 'relative',
      padding: '0 15px 0px 46px',
      border: 'none',
      lineHeight: '34px',
      fontSize: '16px',
      color: '#FFF',
      backgroundImage: 'linear-gradient(#4C69BA, #3B55A0)'
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
    return (
      <button onClick={this.buttonClicked} style={this.styles()}>
        {this.props.children}
        <ButtonText {...this.buttonText() } />
      </button>
    );
  }
}

const ButtonText = ({ isConnected, logoutLabel, loginLabel }) => {
  return (
    <span>
      {isConnected ? loginLabel : logoutLabel}
    </span>
  )
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