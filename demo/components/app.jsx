/* global FB */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import FacebookReduxLogin from '../../src/facebook-login.jsx';
import FacebookReduxLogin from '../../build/index.js';
import { getLoginStatus, startFetching, getUserInformation } from '../actions.js';
import Well from './well.jsx';
import ListItem from './listItem.jsx';
import Mail from '../style/mail.svg';
import Name from '../style/face.svg';
import Id from '../style/id.svg';


class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getUserInformation = this.getUserInformation.bind(this);
    this.styles = {};
  }

  login(response) {
    this.props.getLoginStatus(response.status);
  }
  logout(response) {
    this.props.getLoginStatus(response.status);
    this.props.getUserInformation(null);
  }
  getUserInformation() {
    if (this.props.facebookLogin.isConnected && !this.props.userInformation) {
      FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          this.props.getUserInformation(userInformation);
        }
      );
    }
  }
  render() {
    const { id, name, email } = this.props.userInformation || { id: null, name: null, email: null };
    this.getUserInformation();
    return (
      <div style={styles.container}>
        <FacebookReduxLogin
          appId='326022817735322'
          verbose={false}
          onWillMount={this.login}
          onLoginEvent={this.login}
          onLogoutEvent={this.logout}
          onClick={() => this.props.startFetching()}
        />
        <Well isDisplayed={this.props.userInformation}>
          <ListItem text={id} svg={Id} />
          <ListItem text={name} svg={Name} />
          <ListItem text={email} svg={Mail} />
        </Well>
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
  return {
    userInformation: state.userInformation,
    facebookLogin: state.facebookLogin
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};
