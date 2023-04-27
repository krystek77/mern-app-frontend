import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
moment.locale('pl');
export default function Dates({ createdAt, updatedAt }) {
  return (
    <div className="text-xs flex justify-center items-center flex-wrap italic mt-4">
      <div className="mx-1">
        <span>Dodano: </span>
        <span className="font-medium">
          {moment(createdAt).format('DD-MM-YYYY, hh:mm:ss')}
        </span>
      </div>
      <div className="mx-1">
        <span>Uaktualniono: </span>
        <span className="font-medium">
          {moment(updatedAt).format('DD-MM-YYYY, hh:mm:ss')}
        </span>
      </div>
    </div>
  );
}

Dates.propTypes = {
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
};
Dates.defaultProps = {
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
