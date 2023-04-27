import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const PageHeader = forwardRef((props, ref) => {
  const styles = `page-header relative py-12 px-6 h-[230px] ${props.bg}`;
  return (
    <header ref={ref} className={styles}>
      <div className='absolute inset-x-0 inset-y-0 bg-gradient-radial-circle-from-tl mix-blend-hard-light'>
        {props.children}
      </div>
    </header>
  );
});

PageHeader.propTypes = {
  bg: PropTypes.string,
  children:PropTypes.node,
};
PageHeader.defaultProps = {
  bg: "",
  children:null,
};
export default PageHeader;
