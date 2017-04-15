/* global someFunction FB,window,document,fjs */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initLoginStatus } from '../actions/index.js';

class FacebookReduxLogin extends Component {
  componentDidMount() {
    this.props.initLoginStatus(FacebookReduxLogin.loadSdk)
  }
  render() {
    return <button onClick={FacebookReduxLogin.performLogin}>login</button>;
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initLoginStatus
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(FacebookReduxLogin)