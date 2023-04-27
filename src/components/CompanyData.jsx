import React from 'react';

export default function CompanyData() {
  return (
    <div className="text-center px-4 py-12">
      <p className="mb-1">
        <strong>
          Przedsiębiorstwo Produkcji Urządzeń Pralniczych "Pralma" sp. z o.o.
        </strong>
      </p>
      <p className="mb-4">25-651 Kielce, ul. Górnicza 49a</p>
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <span className="text-sm pr-4 font-semibold">konto:</span>
          <span className="">
            ALIOR BANK, nr rachunku: 54849300040010007921490001
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-sm pr-4 font-semibold">NIP:</span>
          <span className="">657-008-11-16</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm pr-4 font-semibold">KRS:</span>
          <span className="">0000022564</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm pr-4 font-semibold">REGON:</span>
          <span className="">290022092</span>
        </div>
      </div>
    </div>
  );
}
