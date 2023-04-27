import React from "react";
import PropTypes from "prop-types";

export default function Required({ children, posX, posY }) {
  return (
    <div className='required-indicator'>
      <div className='relative'>
        {children}
        <div className={`absolute z-1 ${posY} ${posX} flex items-center justify-center`}>
          <span className='text-black-dark'>[&nbsp;</span>
          <span className='text-primary font-bold text-md'>*</span>
          <span className='text-black-dark'>&nbsp;]</span>
        </div>
      </div>
    </div>
  );
}
Required.propTypes = {
  posY: PropTypes.string,
  posX: PropTypes.string,
};
Required.defaultProps = {
  posY: "-top-1",
  posX: "right-0",
};
