/* global someFunction FB,window,document,fjs */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initLoginStatus, logIn, logOut } from './actions/thunks.js';
import Spinner from './spinner.jsx';
import merge from 'lodash/merge';

class FacebookReduxLogin extends Component {
  constructor(props) {
    super(props);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.showSpinner = this.showSpinner.bind(this);
    this.styles = merge({}, defaults.styles, props.style);
    this.labels = merge({}, defaults.labels, props.lables);
  }
  componentDidMount() {
    this.props.initLoginStatus(this.props.appId);
  }
  getButtonText() {
    console.log(this.props.isConnected);
    switch (this.props.isConnected) {
      case true:
        return this.labels.logOut;
      case false:
        return this.labels.logIn;
    }
  }
  buttonClicked() {
    if (this.props.isConnected) {
      this.props.logOut();
    } else {
      this.props.logIn();
    }
    this.props.onClick();
  }
  showSpinner() {
    if (this.props.isWorking) {
      return <Spinner />;
    } else {
      return <div style={defaults.styles.before} />;
    }
  }
  render() {
    console.log('this.styles', this.styles);
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
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initLoginStatus,
    logOut,
    logIn
  }, dispatch);
}

function mapStateToProps(state) {
  return { isConnected: state.facebookLogin.isConnected, isWorking: state.facebookLogin.isWorking };
}
export default connect(mapStateToProps, mapDispatchToProps)(FacebookReduxLogin);

const defaults = {
  labels: {
    logIn: 'Log In To Facebook',
    logOut: 'Log out from Facebook'
  },
  styles: {
    loginBtn: {
      display: 'flex',
      boxSizing: 'border-box',
      position: 'relative',
      margin: '0.2em',
      padding: '0 15px 0px 46px',
      border: 'none',
      textAlign: 'left',
      lineHeight: '34px',
      whiteSpace: 'nowrap',
      borderRadius: '0.2em',
      fontSize: '16px',
      color: '#FFF',
      backgroundColor: '#4C69BA',
      backgroundImage: 'linear-gradient(#4C69BA, #3B55A0)',
      textShadow: '0 -1px 0 #354C8C',
      ':active': {
        boxShadow: 'inset 0 0 0 32px rgba(0,0,0,0.1)'
      },
      ':hover': {
        backgroundColor: '#5B7BD5',
      }
    },
    before: {
      boxSizing: 'border-box',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 34,
      height: '100%',
      // borderRight: '#364e92 1px solid',
      background: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat"
    }
  }
};