import React from 'react';
import PropTypes from 'prop-types';
import { PencilSquareIcon } from '@heroicons/react/20/solid';

export default function ButtonToForm({
  htmlFor = '',
  btnTitle = '',
  ariaLabel = '',
  children = null,
  btnClasses = '',
  type = 'button',
  Icon = PencilSquareIcon,
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      htmlFor={htmlFor}
      className={`w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark ${btnClasses}`}
      type={type}
      title={btnTitle}
      aria-label={ariaLabel}
    >
      <Icon className="w-4 h-4 self-center justify-self-center" />
      {children}
    </button>
  );
}
ButtonToForm.propTypes = {
  htmlFor: PropTypes.string,
  Icon: PropTypes.elementType,
  btnTitle: PropTypes.string,
  btnClasses: PropTypes.string,
  children: PropTypes.element,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};
