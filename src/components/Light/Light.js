import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Light.css';

class Light extends Component {
  render() {
    return (
      <div 
        className="light"
        style={{ 
          backgroundColor: this.props.color,
          opacity: this.props.isOn ? 1.0 : 0.1
        }}
      />
    );
  }
}

Light.propTypes = {
  color: PropTypes.string,
  isOn: PropTypes.bool
}
export default Light;