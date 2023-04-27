import React from "react";
import PropTypes from "prop-types";

export default function Cards({ children }) {
  return (
    <div className='grid gap-4 auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 mb-10'>
      {children}
    </div>
  );
}

Cards.propTypes = {
  children: PropTypes.node,
};
Cards.defaultProps = {
  children: null,
};
