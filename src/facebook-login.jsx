/* global someFunction FB,window,document,fjs */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initLoginStatus, logIn, logOut } from './actions/thunks.js';
import Spinner from './spinner.jsx';

class FacebookReduxLogin extends Component {
  constructor(props) {
    super(props);
    debugger;
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
    let visibility;
    if (this.props.isWorking) {
      visibility = 'visible';
    } else {
      visibility = 'hidden';
    }
    return <Spinner visibility={visibility} />;
  }
  render() {
    return (
      <button style={{ display: 'flex', justifyContent: 'center', width: '100%', height: 50, position: 'relative' }} onClick={this.buttonClicked}>
        <div style={{ marginRight: 'auto' }} />
        <div>{this.getButtonText()}</div>
        {this.showSpinner()}
      </button>
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