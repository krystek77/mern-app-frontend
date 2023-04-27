import React from 'react';
import NavLinkItem from '../../../containers/Sidebars/NavLinkItem/NavLinkItem';
import Divider from '../../Divider';
import { AiFillTags } from 'react-icons/ai';
import { MdCategory, MdPower, MdMeetingRoom } from 'react-icons/md';
import { IoDocuments } from 'react-icons/io5';
import { IoLogoGameControllerA } from 'react-icons/io';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { GiNewspaper, GiMoneyStack, GiHeatHaze } from 'react-icons/gi';
import { FaTruck } from 'react-icons/fa';
import { IoIosOptions } from 'react-icons/io';
import { GoTools } from 'react-icons/go';

export default function Links({ direction }) {
  return (
    <div>
      {direction !== 'vertical' ? (
        <span className="title font-light text-lg text-slate-500 block ml-4 mb-4">
          Admin
        </span>
      ) : null}
      <div className="bg-admin-light p-2 border border-slate-300 rounded">
        <NavLinkItem
          direction={direction}
          Icon={MdCategory}
          to="/pralma/formularz-kategorii"
          label="Kategoria"
        />
        <NavLinkItem
          direction={direction}
          Icon={AiFillTags}
          to="/pralma/formularz-tagu"
          label="Tag"
        />
        <NavLinkItem
          direction={direction}
          Icon={IoDocuments}
          to="/pralma/formularz-dokumentu"
          label="Dokument"
        />
        <NavLinkItem
          direction={direction}
          Icon={IoLogoGameControllerA}
          to="/pralma/formularz-sterownika"
          label="Sterownik"
        />
        <NavLinkItem
          direction={direction}
          Icon={CgSmartHomeWashMachine}
          to="/pralma/formularz-produktu"
          label="Produkt"
        />
      </div>
      <Divider />
      <div className="bg-admin-light p-2 border border-slate-300 rounded">
        <NavLinkItem
          direction={direction}
          Icon={GiHeatHaze}
          to="/pralma/formularz-podgrzewu"
          label="Podgrzew"
        />
        <NavLinkItem
          direction={direction}
          Icon={MdPower}
          to="/pralma/formularz-zasilania"
          label="Zasilanie"
        />
        <NavLinkItem
          direction={direction}
          Icon={IoIosOptions}
          to="/pralma/formularz-opcji"
          label="Opcje"
        />
        <NavLinkItem
          direction={direction}
          Icon={GiMoneyStack}
          to="/pralma/formularz-cennika"
          label="Cennik"
        />
      </div>
      <Divider />
      <div className="bg-admin-light p-2 border border-slate-300 rounded">
        <NavLinkItem
          direction={direction}
          Icon={GiNewspaper}
          to="/pralma/formularz-wiadomosci"
          label="Wiadomość"
        />
      </div>
      <Divider />
      <div className="bg-admin-light p-2 border border-slate-300 rounded">
        <NavLinkItem
          direction={direction}
          Icon={MdMeetingRoom}
          to="/pralma/formularz-pralni"
          label="Zdjęcia pralni"
        />
      </div>
      <Divider />
      <div className="bg-admin-light p-2 border border-slate-300 rounded">
        <NavLinkItem
          direction={direction}
          Icon={FaTruck}
          to="/pralma/formularz-dostawcy"
          label="Dostawca"
        />
      </div>
      <div className="bg-admin-light p-2 border border-slate-300 rounded">
        <NavLinkItem
          direction={direction}
          Icon={GoTools}
          to="/pralma/formularz-czesci-zamiennej"
          label="Część zamienna"
        />
      </div>
      <Divider />
    </div>
  );
}
