/* global FB */

import React, { Component } from 'react';
import FacebookReduxLogin from '../../src/facebook-login.jsx';
import { connect } from 'react-redux';
import { getLoginStatus, startFetching, getUserInformation } from '../actions.js';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.showUserInformation = this.showUserInformation.bind(this);
  }
  login(response) {
    this.props.getLoginStatus(response.status);
    FB.api('/me', 'GET', { 'fields': 'id,name,email,cover,picture.width(200)' },
      userInformation => {
        this.props.getUserInformation(userInformation);
      }
    );
  }
  logout(response) {
    this.props.getLoginStatus(response.status);
  }
  showUserInformation() {
    if (this.props.userInformation) {
      return (
        <div>hello</div>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <div>
        <FacebookReduxLogin appId='326022817735322'
          verbose={false}
          onLoginEvent={this.login}
          onLogoutEvent={this.login}
          onClick={() => this.props.startFetching()}
        />
        {this.showUserInformation()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getLoginStatus, startFetching, getUserInformation
  }, dispatch);
}
function mapStateToProps(state) {
  return { userInformation: state.userInformation };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
