/* global someFunction FB,window,document,fjs */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initLoginStatus } from '../actions/index.js';

class FacebookReduxLogin extends Component {
  componentDidMount() {
    this.props.initLoginStatus(FacebookReduxLogin.loadSdk)
  }
  getButtonText() {
    switch (this.props.isConnected) {
      case true:
        return 'logout';
      case false:
        return 'log in';
      default:
        return 'loading ...';
    }
  }
  render() {
    return <button>{this.getButtonText()}</button>;
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initLoginStatus
  }, dispatch);
}

function mapStateToProps(state) {
  return { isConnected: state.facebookLogin.isConnected };
}


export default connect(mapStateToProps, mapDispatchToProps)(FacebookReduxLogin);