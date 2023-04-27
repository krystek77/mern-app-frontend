import React from 'react';
import PropTypes from 'prop-types';
import { FaFacebook } from 'react-icons/fa';

export default function SocialLink({ Icon, url, title }) {
  return (
    <a
      href={url}
      className="mr-2 text-accent-dark rounded p-1 hover:text-accent transition-all duration-150"
      title={title}
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="w-6 h-6" />
    </a>
  );
}
SocialLink.propTypes = {
  Icon: PropTypes.elementType,
  url: PropTypes.string,
  title: PropTypes.string,
};
SocialLink.defaultProps = {
  Icon: FaFacebook,
  url: 'https://www.facebook.com',
  title: 'Facebook',
};
