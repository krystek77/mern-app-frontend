import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CountIndicator from '../CountIndicator';

import CardImage from '../CardImage/CardImage';
import ImageCardTemp_300_430 from '../../images/image_card_300_430.webp';

export default function Card({ children, item, to, widthImg, heightImg }) {
  const { _id, image, title, wide, productsCount } = item;

  return (
    <Link
      className={`similar-item-card group relative border border-slate-100 flex flex-col items-center px-2  pt-4 overflow-hidden rounded-md min-h-[390px] ${
        wide && 'md:col-span-2'
      }`}
      to={to}
      key={_id}
    >
      {children}
      <CardImage src={image} alt={title} width={widthImg} height={heightImg} />
      {productsCount !== undefined && (
        <CountIndicator count={productsCount} posX="bottom-4" posY="right-4" />
      )}
      <div className="absolute bottom-0 left-0 w-0 bg-accent h-1 border border-accent-dark group-hover:w-full transition-all duration-300"></div>
    </Link>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  item: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
  }),
  to: PropTypes.string,
  widthImg: PropTypes.string,
  heightImg: PropTypes.string,
};
Card.defaultProps = {
  children: null,
  item: {
    _id: '',
    image: ImageCardTemp_300_430,
    title: 'przemysłowe urządzenie pralnicze',
    features: [],
  },
  to: '',
  widthImg: 'max-w-[300px]',
  heightImg: 'max-h-[430px]',
};
