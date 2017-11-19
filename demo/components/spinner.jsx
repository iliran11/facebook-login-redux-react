/* eslint  no-unsed-vars:0 */

import React, { Component } from 'react';
import animation from '../style/animation.css'; // eslint-disable-line no-unused-vars

export default class Spinner extends Component {

  constructor(props) {
    super(props);
    const defaultStyle = {
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
    // this.styles = merge({}, style, props.style);
    this.styles = Object.assign({}, defaultStyle, props.style);
  }
  render() {
    return <div style={this.styles} />;
  }
}