import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Switch.module.css';

class Switch extends Component {
  render() {
    return (
      <button
        className={styles.switch}
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