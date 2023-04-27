import React from 'react';
import PropTypes from 'prop-types';

export default function Divider({ classes }) {
  return (
    <div className={`divider w-full h-0.5 bg-accent my-4 ${classes}`}></div>
  );
}

Divider.propTypes = {
  classes: PropTypes.string,
};

Divider.defaultProps = {
  classes: '',
};
