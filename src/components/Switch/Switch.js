import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Switch.css';

class Switch extends Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
      >
        {this.props.label}
      </button>
    );
  }
}

Switch.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
}
export default Switch;