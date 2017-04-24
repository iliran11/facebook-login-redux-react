import React, { Component } from 'react';
import animation from './spinner.scss';

export default class Spinner extends Component {
  render() {
    const style = {
      boxSizing: 'border-box',
      width: 30,
      height: '90%',
      borderRadius: '50%',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #3498db',
      animation: 'spin 2s linear infinite',
      position: 'absolute',
      left: 5
    };
    return <div style={style} />;
  }
}