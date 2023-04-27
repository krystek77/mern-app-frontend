import React from 'react';
import PropTypes from 'prop-types';

export default function ModelName({ name, textSize }) {
  return (
    <span
      className={`font-bold ${textSize} order-1 block mx-auto text-center text-xs mb-4 bg-black-dark text-white max-w-max py-1 px-2 rounded`}
    >
      {name}
    </span>
  );
}
ModelName.propTypes = {
  name: PropTypes.string,
  textSize: PropTypes.string,
};
ModelName.defaultProps = {
  name: '__-___',
  textSize: 'text-sm',
};
