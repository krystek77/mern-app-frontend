import React from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';
import { ImMobile } from 'react-icons/im';
import { FaFax } from 'react-icons/fa';

export default function QuickContact() {
  return (
    <div className="bg-slate-200">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 max-w-5xl  mx-auto">
        <div className="border border-slate-100 bg-slate-50 flex flex-nowrap justify-center items-center text-black-dark py-2 px-1 rounded-sm hover:bg-slate-200 transition-all duration-150 hover:border-slate-200">
          <FaFax className="w-4 h-4 mr-2" />
          <a
            href="tel:+48413450561"
            className="font-normal text-sm whitespace-nowrap"
          >
            +48 41 345-05-61
          </a>
        </div>
        <div className="border border-slate-100 bg-slate-50 flex flex-nowrap justify-center items-center text-black-dark py-2 px-1 rounded-sm hover:bg-slate-200 transition-all duration-150 hover:border-slate-200">
          <MdEmail className="w-4 h-4 mr-2" />
          <a
            href="mailto:biuro@pralma.pl"
            className="font-normal text-sm whitespace-nowrap"
          >
            biuro@pralma.pl
          </a>
        </div>
        <div className="border border-slate-100 bg-slate-50 flex flex-nowrap justify-center items-center text-black-dark py-2 px-1 rounded-sm hover:bg-slate-200 transition-all duration-150 hover:border-slate-200">
          <MdPhone className="w-4 h-4 mr-2" />
          <a
            href="tel:+48413457408"
            className="font-normal text-sm whitespace-nowrap"
          >
            +48 41 345-74-08
          </a>
        </div>
        <div className="border border-slate-100 bg-slate-50 flex flex-nowrap justify-center items-center text-black-dark py-2 px-1 rounded-sm hover:bg-slate-200 transition-all duration-150 hover:border-slate-200">
          <ImMobile className="w-4 h-4 mr-2" />
          <a
            href="tel:+48602191607"
            className="font-normal text-sm whitespace-nowrap"
          >
            +48 602-191-607
          </a>
        </div>
      </div>
    </div>
  );
}
