import React from 'react';
import { getPrice } from '../../utils';

export default function Pictogram({ price, currency, rate }) {
  if (currency === undefined) currency = 'EUR';
  if (rate === undefined) rate = 1;

  return price === 'N/A' ? (
    <div className="text-xs font-normal text-black-dark  h-6 flex flex-col justify-center items-center mx-auto">
      N/A
    </div>
  ) : price === '-' ? (
    <div className="w-4 h-4 my-1 bg-admin-dark bg-opacity-50 border-2 border-admin-dark rounded-sm mx-auto"></div>
  ) : price === 'N/E' ? (
    <div className="w-4 h-4 my-1 border-2 border-admin-dark mx-auto rounded-sm"></div>
  ) : price === '0' ? (
    <div className="text-sm font-normal text-black-dark  h-6 flex flex-col justify-center items-center mx-auto">
      0
    </div>
  ) : (
    <div className="text-sm font-medium text-black-dark  h-6 flex flex-col justify-center items-center mx-auto">
      {getPrice(price, currency, rate)}
    </div>
  );
}
