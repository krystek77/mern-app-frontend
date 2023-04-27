import React from 'react';
import PropTypes from 'prop-types';

export default function CountIndicator({ isActive, count, posX, posY }) {
  return (
    <span
      className={
        isActive
          ? `absolute ${posX} ${posY} bg-primary-light rounded-full text-xs leading-none flex-shrink-0 border border-primary-dark text-white font-semibold w-8 h-8 flex items-center justify-center`
          : `absolute ${posX} ${posY} bg-slate-50 rounded-full text-xs leading-none flex-shrink-0 border border-slate-200 text-black-dark font-semibold w-8 h-8 flex items-center justify-center group-hover:bg-accent group-hover:border-accent-dark`
      }
    >
      {count}
    </span>
  );
}

CountIndicator.propTypes = {
  isActive: PropTypes.bool,
  count: PropTypes.number,
  posX: PropTypes.string,
  posY: PropTypes.string,
};
CountIndicator.defaultProps = {
  isActive: false,
  count: undefined,
  posX: 'top-4',
  posY: 'right-4',
};
