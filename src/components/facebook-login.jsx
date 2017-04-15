/* global someFunction FB,window,document,fjs */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initLoginStatus, logIn, logOut } from '../actions/thunks.js';

class FacebookReduxLogin extends Component {
  constructor(props) {
    super(props);
    this.buttonClicked = this.buttonClicked.bind(this);
  }
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
  buttonClicked() {
    this.props.logIn();
  }
  render() {
    return <button onClick={this.buttonClicked}>{this.getButtonText()}</button>;
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
  return { isConnected: state.facebookLogin.isConnected };
}


export default connect(mapStateToProps, mapDispatchToProps)(FacebookReduxLogin);