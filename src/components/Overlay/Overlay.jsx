import React from 'react';
import PropTypes from 'prop-types';

export default function Overlay({ children }) {
  return (
    <div className="overlay px-6 py-4 flex flex-col justify-center items-center absolute top-0 right-0 bottom-0 left-0 bg-white bg-opacity-[.95] translate-y-full group-hover:translate-y-0 transition duration-300">
      {children}
    </div>
  );
}
Overlay.propTypes = {
  children: PropTypes.node,
};
Overlay.defaultProps = {
  children: null,
};
