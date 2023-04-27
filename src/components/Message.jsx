import React from 'react';
import PropTypes from 'prop-types';

export default function Message({ text, posX, posY, time }) {
  return text ? (
    <div
      className={`absolute ${posX} ${posY} bg-primary text-white font-medium text-xs border border-primary-dark py-1 px-2 rounded-md shadow-lg lowercase`}
    >
      {text}
    </div>
  ) : null;
}

Message.propTypes = {
  text: PropTypes.string,
  poxX: PropTypes.string,
  posY: PropTypes.string,
  time: PropTypes.number,
};

Message.defaultProps = {
  text: '',
  posY: 'top-0',
  posX: 'left-4',
  time: 1500,
};
