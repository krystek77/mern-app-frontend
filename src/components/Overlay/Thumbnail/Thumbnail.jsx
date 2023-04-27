import React from 'react';
import PropTypes from 'prop-types';
import IconCardTemp_300_430_64 from '../../../images/icon_card_300_430_64.webp';

export default function Thumbnail({ src, alt, height, width }) {
  return (
    <div
      className={`absolute top-4 left-4 rounded-full overflow-hidden border border-slate-200 ${width} ${height}`}
    >
      <img className="object-cover w-full h-full" src={src} alt={alt} />
    </div>
  );
}

Thumbnail.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
Thumbnail.defaultProps = {
  src: IconCardTemp_300_430_64,
  alt: 'przemysłowe urządzenia pralncze',
  width: 'w-[48px]',
  height: 'h-[48px]',
};
