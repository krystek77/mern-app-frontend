import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorField({ error }) {
  return (
    error && (
      <span className="block text-xs font-medium text-white bg-primary border border-primary-dark px-2 py-px rounded absolute -bottom-1 left-0 translate-y-full">
        {error}
      </span>
    )
  );
}

ErrorField.propTypes = {
  error: PropTypes.string,
};
ErrorField.defaultProps = {
  error: '',
};
