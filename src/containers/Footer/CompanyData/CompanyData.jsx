import React from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaFax } from 'react-icons/fa';

export default function CompanyData() {
  return (
    <div>
      <div className="address text-white flex flex-col justify-center items-center mb-2">
        <span className="font-medium text-base mb-2 text-center max-w-xs">
          Przedsiębiorstwo Produkcji Urządzeń Pralniczych &quot;Pralma&quot; sp.
          z o.o.
        </span>
        <span className="font-normal text-sm mb-1">
          25-651 Kielce, ul. Górnicza 49a
        </span>
      </div>
      <div className="phones text-xs flex flex-wrap justify-center items-center mb-1 text-white">
        <a
          href="tel:413450561"
          className="flex justify-start items-center px-2 group"
        >
          <FaFax className="w-4 h-4 mr-2 text-accent-dark group-hover:text-accent" />
          <span>tel./faks: 41 34 505 61</span>
        </a>
        <a
          href="tel:413683549"
          className="flex justify-start items-center px-2 group"
        >
          <MdPhone className="w-4 h-4 mr-2 text-accent-dark group-hover:text-accent" />
          <span>tel: 41 36 835 49</span>
        </a>
        <a
          href="tel:413453856"
          className="flex justify-start items-center px-2 group"
        >
          <MdPhone className="w-4 h-4 mr-2 text-accent-dark group-hover:text-accent" />
          <span>tel: 41 34 538 56</span>
        </a>
      </div>
      <div className="emails text-xs flex flex-wrap justify-center items-center text-white">
        <a
          href="mailto:biuro@pralma.pl"
          className="flex justify-start items-center group px-2"
        >
          <MdEmail className="w-4 h-4 mr-2 text-accent-dark group-hover:text-accent" />
          <span className="group-hover:text-accent">biuro@pralma.pl</span>
        </a>
        <a
          href="mailto:biuro@pralma.pl"
          className="flex justify-start items-center group px-2"
        >
          <MdEmail className="w-4 h-4 mr-2 text-accent-dark group-hover:text-accent" />
          <span className="group-hover:text-accent">serwis@pralma.pl</span>
        </a>
        <a
          href="mailto:biuro@pralma.pl"
          className="flex justify-start items-center group px-2"
        >
          <MdEmail className="w-4 h-4 mr-2 text-accent-dark group-hover:text-accent" />
          <span className="group-hover:text-accent">k.wrona@pralma.pl</span>
        </a>
      </div>
    </div>
  );
}
