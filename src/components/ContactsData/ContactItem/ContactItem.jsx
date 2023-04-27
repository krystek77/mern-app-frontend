import React from 'react';
import PropTypes from 'prop-types';

export default function ContactItem({ contactKind }) {
  return contactKind.values.length ? (
    <div className="">
      {contactKind.values.map((value, index) => {
        return (
          <div
            className="border-b border-b-slate-300 flex justify-start items-center"
            key={`${index}_${value}_phone`}
          >
            <contactKind.Icon className="w-9 h-9 text-black-dark p-2 mr-2" />
            <a href={`tel:${value}`}>{value}</a>
          </div>
        );
      })}
    </div>
  ) : null;
}

ContactItem.propTypes = {
  contactKind: PropTypes.shape({
    Icon: PropTypes.elementType,
    values: PropTypes.arrayOf(PropTypes.string),
  }),
};
