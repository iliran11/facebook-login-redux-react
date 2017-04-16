/* global someFunction FB,window,document,fjs */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initLoginStatus, logIn, logOut } from '../actions/thunks.js';

class FacebookReduxLogin extends Component {
  constructor(props) {
    super(props);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.showSpinner = this.showSpinner.bind(this);
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
        return 'log in';
    }
  }
  buttonClicked() {
    if (this.props.isConnected) {
      this.props.logOut();
    } else {
      this.props.logIn();
    }
  }
  showSpinner() {
    if (this.props.isWorking) {
      return <div>Loading .....</div>
    }
    return null;
  }
  render() {
    return <button onClick={this.buttonClicked}>
      {this.getButtonText()}
      {this.showSpinner()}
    </button>;
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