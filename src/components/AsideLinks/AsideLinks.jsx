import React from 'react';
import AsideLink from './AsideLink/AsideLink';
import MOP from '../../images/asideLinks/MOP_300x190.webp';
import FIREBRIGADE from '../../images/asideLinks/Straż_pożarna_300x190.webp';
import NURSERY from '../../images/asideLinks/Żłobki_i_przedszkola_300x190.webp';
import TROLLEYS from '../../images/asideLinks/wózki_i_regały.webp';
import SOFTWASH from '../../images/asideLinks/softwash.webp';
import CONTROLS from '../../images/asideLinks/sterowniki.webp';
import HYGIENE_BARRIER from '../../images/asideLinks/hygienic_barrier_300x190.webp';
import SAVE_WATER_ENERGY from '../../images/asideLinks/save_water_energy_300x190.webp';
import { vend } from '../../images/vendLaundry';
import {hospitality} from '../../images/hospitality'

import NewsletterForm from '../NewsletterForm';

export default function AsideLinks() {
  return (
    <aside className="border border-accent-light bg-accent-light bg-opacity-10 px-4 pt-4 pb-12 rounded self-start xl:max-w-[300px] ">
      <span className="title font-light text-lg text-center text-slate-500 block  mb-4">
        Dedykowane rozwiązania
      </span>
      <div className="gap-x-4 auto-rows-max sm:grid sm:grid-cols-2  xl:grid-cols-1">
      <AsideLink
          title="HoReCa - wyposażenie pralni hotelowej, dla gastronomi"
          src={hospitality.ASIDE_LINK}
          alt="Urządzenia pralnicze dla hotelu, motelu i pensjonatu"
          to="/wyposazenie-pralni-przemyslowej/wyposazenie-pralni-dla-hotelu"
        />
        <AsideLink
          title="nowoczesna pralnia samoobslugowa"
          src={vend.ASIDE_LINK_IMAGE}
          alt="nowoczesna pralnia samoobsługowa - pralnicowirowki i suszarki na żetony i monety"
          to="/wyposazenie-pralni-przemyslowej/pralnia-samoobslugowa"
        />
        <AsideLink
          title="urządzenia do transportu i składowania prania - wózki i regały"
          src={TROLLEYS}
          alt="urządzenia do transportu i składowania prania - wózki i regały"
          to="/wyposazenie-pralni-przemyslowej/wozki-i-regaly"
        />
        <AsideLink
          title="pranie MOP"
          src={MOP}
          alt="pranie MOP - pralnicowirówki do mopów"
          to="/wyposazenie-pralni-przemyslowej/pranie-mop"
        />
        <AsideLink
          title="rozwiązania pralnicze dla żłobków i przedszkoli"
          src={NURSERY}
          alt="rozwiązania pralnicze dla żłobków i przedszkoli"
          to="/wyposazenie-pralni-przemyslowej/zlobki-i-przedszkola"
        />
        <AsideLink
          title="urządzenia pralnicze dla straży pożarnej"
          src={FIREBRIGADE}
          alt="urządzenia pralnicze dla straży pożarnej"
          to="/wyposazenie-pralni-przemyslowej/sluzby-cywilne"
        />
        <AsideLink
          title="ekologiczna pralnia chemiczna - technologia softwash"
          src={SOFTWASH}
          alt="ekologiczna pralnia chemiczna - technologia softwash"
          to="/wyposazenie-pralni-przemyslowej/softwash"
        />
        <AsideLink
          title="najlepsza ochrona przed zarazkami - bariera higieny"
          src={HYGIENE_BARRIER}
          alt="pralnia z barierą higieny, pralnicowirówki z barierą higieny, pralnice z barierą higieny"
          to="/wyposazenie-pralni-przemyslowej/bariera-higieny"
        />
        <AsideLink
          title="Oszczędzaj wodę i energię podczas prania"
          src={SAVE_WATER_ENERGY}
          alt="systemy odzysku wody i energii w procesie prania przemysłowego"
          to="/wyposazenie-pralni-przemyslowej/odzysk-wody-i-energii-w-pralni-przemyslowej"
        />
        <AsideLink
          title="sterowniki urządzeń pralniczych"
          src={CONTROLS}
          alt="ekologiczna pralnia chemiczna - technologia softwash"
          to="/sterowniki-urzadzen-pralniczych"
        />
      </div>
      <div className="hidden divider w-full h-0.5 bg-accent my-4 xl:block"></div>
      <div className="hidden xl:block">
        <span className="title font-light text-lg text-center text-slate-500 block  mb-4">
          Newsletter
        </span>
        <NewsletterForm />
      </div>
    </aside>
  );
}
