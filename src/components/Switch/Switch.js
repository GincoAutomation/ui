import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Switch.css';

class Switch extends Component {
  render() {
    return (
      <button>{this.props.label}</button>
    );
  }
}

Switch.propTypes = {
  label: PropTypes.string
}
export default Switch;