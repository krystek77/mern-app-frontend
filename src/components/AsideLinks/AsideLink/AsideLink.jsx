import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import CardImage from '../../CardImage/CardImage';

export default function AsideLink({ src, alt, to, title }) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? 'group block  mb-4 p-2 bg-primary rounded border border-primary-dark shadow-lg'
          : 'group block  mb-4 p-2 bg-accent-light rounded border border-accent-dark hover:shadow-lg'
      }
      to={to}
    >
      {({ isActive }) => (
        <>
          <CardImage
            width="w-200px"
            height="h-125px"
            src={src}
            alt={alt}
            transform="group-hover:scale-125"
          />
          <span
            className={
              isActive
                ? 'block text-sm text-center font-semibold text-white whitespace-normal py-2'
                : 'block text-sm text-center font-semibold text-black-dark whitespace-normal py-2'
            }
          >
            {title}
          </span>
        </>
      )}
    </NavLink>
  );
}

AsideLink.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  to: PropTypes.string,
  title: PropTypes.string,
};
AsideLink.defaultProps = {
  src: 'temp.webp',
  alt: 'pralnice przemysłowe',
  to: '/',
  title: 'dedykowane rozwiązania dla konkretnego obiektu',
};
