import React, { Component } from 'react';

export default class Spinner extends Component {
  render() {
    const style = {
      marginLeft: 'auto',
      marginRight: 20,
      width: 30,
      height: 30,
      borderRadius: '50%',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #3498db',
      animation: 'spin 2s linear infinite',
      visibility: this.props.visibility
    };
    return <div style={style} />;
  }
}