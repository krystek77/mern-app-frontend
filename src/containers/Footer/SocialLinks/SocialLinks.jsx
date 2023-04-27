import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa';
import SocialLink from './SocilalLink/SocialLink';

const socialLinks = [
  {
    id: 1,
    icon: FaFacebook,
    url: 'https://www.facebook.com',
    title: 'Facebook',
  },
  { id: 2, icon: FaTwitter, url: 'https://twitter.com', title: 'Twitter' },
  { id: 3, icon: FaYoutube, url: 'https://www.youtube.com', title: 'Youtube' },
  {
    id: 4,
    icon: FaLinkedin,
    url: 'https://www.linkedin.com',
    title: 'Linkedin',
  },
  {
    id: 5,
    icon: FaInstagram,
    url: 'https://www.instagram.com',
    title: 'Instagram',
  },
];

export default function SocialLinks() {
  return (
    <>
      {socialLinks.length
        ? socialLinks.map((socialLink) => (
            <SocialLink
              key={socialLink.id}
              url={socialLink.url}
              Icon={socialLink.icon}
              title={socialLink.title}
            />
          ))
        : null}
    </>
  );
}
