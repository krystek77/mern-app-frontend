import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ label }) {
  return (
    <button
      className="bg-primary border border-primary-dark text-white text-xs rounded-sm px-2 py-1 hover:bg-primary-light "
      type="button"
    >
      {label.toLowerCase()}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
};
Button.defaultProps = {
  label: 'więcej',
};
