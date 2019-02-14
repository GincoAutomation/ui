import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

class Button extends Component {
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

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
}
export default Button;