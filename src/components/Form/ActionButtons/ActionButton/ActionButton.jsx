import React from 'react';
import PropTypes from 'prop-types';

export default function ActionButton({
  type,
  title,
  label,
  children,
  onClick,
}) {
  return (
    <button
      className="group flex justify-center items-center border border-slate-300 bg-slate-100 px-2 py-1 mx-2 mb-1 rounded text-sm font-medium hover:bg-accent hover:border-accent-dark focus:outline-none focus:ring-0 focus:border-2 focus:border-accent-dark "
      type={type}
      title={title}
      onClick={onClick}
    >
      {children}
      <span className="self-center justify-self-center lowercase">{label}</span>
    </button>
  );
}

ActionButton.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.element,
  onClick: PropTypes.func,
};
ActionButton.defayltProps = {
  type: 'submit',
  title: 'submit form',
  label: 'submit',
  children: null,
  onClick: () => {},
};
