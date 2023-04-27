import React from 'react';
import PropTypes from 'prop-types';
import { GiPadlockOpen } from 'react-icons/gi';

export default function AuthButton({
  type,
  Icon,
  label,
  action,
  btnTitle,
  ariaLabel,
  toolbar,
}) {
  return (
    <button
      onClick={action}
      type={type}
      aria-label={ariaLabel}
      title={btnTitle}
      className={
        toolbar
          ? 'flex justify-center items-center mr-2 px-1 py-1 text-xs border border-slate-300 bg-admin-light bg-opacity-60 text-black-dark rounded self-center hover:border-accent-dark hover:bg-accent transition-all duration-150'
          : 'self-start flex justify-start items-center px-1 py-1 text-xs border border-slate-300 bg-admin-light bg-opacity-60 text-black-dark rounded hover:border-accent-dark hover:bg-accent transition-all duration-150'
      }
    >
      <Icon className={toolbar ? 'w-4 h-4 mr-0' : 'w-4 h-4 mr-1'} />
      <span>{toolbar ? '' : label}</span>
    </button>
  );
}

AuthButton.propTypes = {
  Icon: PropTypes.elementType,
  label: PropTypes.string,
  btnTitle: PropTypes.string,
  ariaLabel: PropTypes.string,
  action: PropTypes.func,
  type: PropTypes.oneOf(['submit', 'button']),
  toolbar: PropTypes.bool,
};
AuthButton.defaultProps = {
  Icon: GiPadlockOpen,
  label: 'wyloguj się',
  btnTitle: 'wyloguj się',
  ariaLabel: 'log out',
  action: () => {},
  type: 'button',
  toolbar: false,
};
