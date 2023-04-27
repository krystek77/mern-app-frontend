import React from 'react';
import PropTypes from 'prop-types';

export default function InputContainer({ children, classes }) {
  return <div className={`input-container mb-6 ${classes}`}>{children}</div>;
}

InputContainer.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
};
InputContainer.defaultProps = {
  children: null,
  classes: '',
};
