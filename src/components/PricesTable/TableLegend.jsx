import React from 'react';

export default function TableLegend() {
  return (
    <div className="legend mb-4 max-w-4xl mx-auto pl-4">
      <span className="block font-medium text-xs text-black-dark py-2">
        Legenda
      </span>
      <div className="flex justify-start items-center mb-2">
        <div className="w-4 h-4 bg-admin-dark bg-opacity-50 border-2 border-admin-dark rounded-sm mr-2"></div>
        <span className="text-black-dark text-xs">wypasażenie standardowe</span>
      </div>
      <div className="flex justify-start items-center mb-2">
        <div className="w-4 h-4 border-2 border-admin-dark rounded-sm mr-2"></div>
        <span className="text-black-dark text-xs">bez dopłaty</span>
      </div>
      <div className="flex justify-start items-center text-xs ">
        <div className="font-semibold mr-2">N/A</div>
        <span className="text-black-dark font-normal">nie dostępne</span>
      </div>
    </div>
  );
}
