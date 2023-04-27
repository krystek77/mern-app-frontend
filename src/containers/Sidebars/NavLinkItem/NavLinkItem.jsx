import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';
import CountIndicator from '../../../components/CountIndicator';

export default function NavLinkItem({
  children,
  Icon,
  to,
  label,
  direction,
  count,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? direction === 'vertical'
            ? 'flex-col h-auto py-2 font-medium text-[11px] text-white relative group border border-primary-dark bg-primary rounded flex items-center w-full text-xs mb-2 pl-3 pr-3'
            : 'relative group border border-primary-dark bg-primary rounded flex items-center w-full text-xs mb-2 h-12 pl-3 pr-3 text-white font-medium'
          : direction === 'vertical'
          ? 'relative group border border-slate-100 rounded flex flex-col items-center w-full text-xs mb-2 h-auto pl-3 font-medium text-[11px] pr-3 py-2 text-black-dark hover:bg-accent-light hover:border-accent-dark'
          : 'relative group border border-slate-100 rounded flex items-center w-full text-xs mb-2 h-12 pl-3 pr-3 text-black-dark hover:bg-accent-light hover:border-accent-dark '
      }
    >
      {({ isActive }) => {
        return (
          <>
            {children ? (
              children(isActive)
            ) : (
              <Icon
                className={`w-6 h-6 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-black-dark'
                }`}
              />
            )}

            <span
              className={
                direction === 'vertical'
                  ? ' text-center ml-0 mt-1 max-w-[160px] whitespace-normal '
                  : ' text-left ml-4 max-w-[160px] whitespace-normal '
              }
            >
              {label}
            </span>
            {count !== undefined && direction !== 'vertical' ? (
              <CountIndicator
                isActive={isActive}
                count={count}
                posX="right-3"
                posY="top-2"
              />
            ) : null}
          </>
        );
      }}
    </NavLink>
  );
}
NavLinkItem.propTypes = {
  Icon: PropTypes.elementType,
  to: PropTypes.string,
  direction: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.func,
};

NavLinkItem.defaultProps = {
  direction: 'horizontal',
  Icon: HomeIcon,
  to: '/',
  label: 'etykieta linku',
  children: null,
};
