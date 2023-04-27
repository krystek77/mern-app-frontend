import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdPrivacyTip } from 'react-icons/md';
import { v4 as uuidV4 } from 'uuid';

export default function Tips({ title, items, children }) {
  const [showTip, setShowTip] = useState(false);
  return (
    <div
      className="relative max-w-lg mb-2 mt-9"
      onPointerEnter={() => {
        setShowTip(true);
      }}
      onPointerLeave={() => {
        setShowTip(false);
      }}
    >
      <div className="absolute top-0 left-0 -translate-y-full">{children}</div>
      <div
        className={
          showTip
            ? ' shadow-md text-xs text-black-dark font-light max-h-96 transition-all duration-150'
            : ' shadow-md text-xs text-black-dark font-light max-h-0 overflow-hidden'
        }
      >
        <div className="px-4 py-2 border border-admin rounded-md bg-admin-light">
          <div className="flex flex-wrap justify-between items-center border-b border-admin-dark pb-1 mb-2">
            <span className="font-medium">Uwaga !!!</span>
            <MdPrivacyTip className="w-4 h-4 text-primary" />
          </div>
          <p className="bg-admin border-admin-dark border px-2 py-1 rounded-sm my-1 capitalize text-center font-medium">
            {title}
          </p>
          {items.length ? (
            <ol className="list-decimal list-inside">
              {items.map((item) => (
                <li className="mb-px" key={item._id}>
                  <Link to={item.to} className="hover:text-slate-700">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </div>
  );
}

Tips.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      to: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  children: PropTypes.element,
};
Tips.defaultProps = {
  title: 'Dodawanie produktu',
  items: [
    {
      _id: uuidV4(),
      to: '/pralma/formularz-sterownika',
      text: 'Dodaj sterowniki, gdy ich brak na formularzu produktu',
    },
    {
      _id: uuidV4(),
      to: '/pralma/formularz-dokumentu',
      text: 'Dodaj dokumenty, gdy ich brak na formularzu produktu',
    },
    {
      _id: uuidV4(),
      to: '/pralma/formularz-tagu',
      text: 'Dodaj tagi, gdy ich brak na formularzu produktu',
    },
    {
      _id: uuidV4(),
      to: '/pralma/formularz-produktu',
      text: 'Następnie dodaj produkt',
    },
  ],
  children: null,
};
