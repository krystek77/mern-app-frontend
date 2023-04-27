import React from 'react';
import PropTypes from 'prop-types';

export default function PageTitle({ text, children }) {
  return (
    <h2 className="flex flex-nowrap justify-start items-center relative">
      <div className="flex-shrink-0 bg-primary border border-primary-dark rounded-md w-2 min-h-[32px] mr-4"></div>
      <div className="text-black-dark text-base max-w-lg">{text}</div>
      {children}
    </h2>
  );
}

PageTitle.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};
PageTitle.defaultProps = {
  text: 'Page title',
  children: null,
};
