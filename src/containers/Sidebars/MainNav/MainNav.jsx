import React from 'react';
import { HomeIcon, PhoneIcon, UsersIcon } from '@heroicons/react/24/solid';
import { GiWashingMachine } from 'react-icons/gi';
import { SiGooglenews } from 'react-icons/si';
import { GoTools } from 'react-icons/go';
import NavLinkItem from '../NavLinkItem/NavLinkItem';

export default function MainNav({ direction, countOPL, countCOIN, countPost }) {
  return (
    <div className="main-navigation max-w-[260px]">
      <NavLinkItem direction={direction} Icon={HomeIcon} to="/" label="Start" />
      <NavLinkItem
        direction={direction}
        Icon={GiWashingMachine}
        to="/wyposazenie-pralni-przemyslowej"
        label="Wyposażenie pralni"
        count={countOPL}
      />
      <NavLinkItem
        direction={direction}
        Icon={GiWashingMachine}
        to="/wyposazenie-pralni-przemyslowej-samoobslugowe"
        label="Wyposażenie pralni samoobsługowej"
        count={countCOIN}
      />
      <NavLinkItem
        direction={direction}
        Icon={UsersIcon}
        to="/klienci-przemyslowych-urzadzen-pralniczych"
        label="Nasi Klienci"
      />
      <NavLinkItem
        direction={direction}
        Icon={SiGooglenews}
        to="/wiadomosci"
        label="Wiadomosci"
        count={countPost}
      />
      <NavLinkItem
        direction={direction}
        Icon={GoTools}
        to="/czesci-zamienne"
        label="Części zamienne"
      />
      <NavLinkItem
        direction={direction}
        Icon={PhoneIcon}
        to="/kontakt"
        label="Dane kontaktowe"
      />
    </div>
  );
}
