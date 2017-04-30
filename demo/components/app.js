/* global FB */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FacebookReduxLogin from '../../src/facebook-login.jsx';
import { getLoginStatus, startFetching, getUserInformation } from '../actions.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.showUserInformation = this.showUserInformation.bind(this);
  }
  login(response) {
    this.props.getLoginStatus(response.status);
    FB.api('/me', 'GET', { fields: 'id,name,email,cover,picture.width(200)' },
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
      const { id, name, email } = this.props.userInformation;
      return (
        <ul style={styles.well}>
          <li>{id}</li>
          <li>{name}</li>
          <li>{email}</li>
        </ul>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <div>
        <FacebookReduxLogin
          appId='326022817735322'
          verbose={false}
          onLoginEvent={this.login}
          onLogoutEvent={this.login}
          onClick={() => this.props.startFetching()}
        />
        {this.showUserInformation()}
      </div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = {
  well: {
    background: '#28282B',
    borderRadius: 10,
    boxShadow: 'inset 0 0 10px black, 0 0 10px black',
    padding: 10,
    textAlign: 'center'
  }
};
