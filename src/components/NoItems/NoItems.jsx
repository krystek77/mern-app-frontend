import React from 'react';
import PropTypes from 'prop-types';

export default function NoItems({ msg, classes }) {
  return (
    <div className={`col-span-5 text-lg font-light text-slate-500 ${classes}`}>
      {msg}
    </div>
  );
}
NoItems.propTypes = {
  msg: PropTypes.string,
  classes: PropTypes.string,
};
NoItems.defaultProps = {
  msg: 'Brak elementów',
  classes: '',
};
