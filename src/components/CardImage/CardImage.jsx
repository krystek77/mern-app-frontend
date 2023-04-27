import React from 'react';
import PropTypes from 'prop-types';
import ImageCardTemp_300_430 from '../../images/image_card_300_430.webp';

export default function CardImage({ src, alt, width, height, transform }) {
  return (
    <div
      className={`order-2 border border-slate-300 overflow-hidden rounded-md bg-slate-100 mx-auto ${width} ${height}}`}
    >
      <img
        className={`block object-fit w-full h-full ${transform} transition-all duration-300`}
        src={src}
        alt={alt}
      />
    </div>
  );
}

CardImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  transform: PropTypes.string,
};

CardImage.defaultProps = {
  src: ImageCardTemp_300_430,
  alt: 'przemysłowe urządzenie pralnicze',
  width: 'max-w-[300px]',
  height: 'max-h-[430px]',
  transform: '',
};
