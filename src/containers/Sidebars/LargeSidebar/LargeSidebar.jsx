import React, { useReducer, useEffect } from "react";
import { useHref, NavLink } from "react-router-dom";
import MainNav from "../MainNav/MainNav";
import NavLinkItem from "../NavLinkItem/NavLinkItem";
import FIREBRIGADE from "../../../images/asideLinks/Straż_pożarna_300x190.webp";
import SOFTWASH from "../../../images/asideLinks/softwash.webp";
import MOP from "../../../images/asideLinks/MOP_300x190.webp";
import HYGIENIC_BARRIER from "../../../images/asideLinks/hygienic_barrier_300x190.webp";
import NURSERY from "../../../images/asideLinks/Żłobki_i_przedszkola_300x190.webp";
import SAVE_WATER_ENERGY from "../../../images/asideLinks/save_water_energy_300x190.webp";
import CONTROLS from "../../../images/asideLinks/sterowniki.webp";
import { vend } from "../../../images/vendLaundry";
import { hospitality } from "../../../images/hospitality";
import NewsletterForm from "../../../components/NewsletterForm";
import Links from "../../../components/Admin/Links/Links";

import { openSingleTabReducer, TOGGLE_TAB } from "../../../reducers/tabs";
import Divider from "../../../components/Divider";

export default function LargeSidebar({
  isVisibleScrollBar,
  setIsVisibleScrollbar,
  items,
  smallScreen,
  countPost,
  user,
}) {
  const [tabIndexes, dispatch] = useReducer(openSingleTabReducer, [0]);
  const url = useHref();
  useEffect(() => {
    if (url === "/wyposazenie-pralni-przemyslowej") {
      dispatch({ type: TOGGLE_TAB, index: 0 });
    } else if (url === "/wyposazenie-pralni-przemyslowej-samoobslugowe") {
      dispatch({ type: TOGGLE_TAB, index: 1 });
    }
  }, [url]);

  const countCOIN = items.filter((category) => category.coin === true).length;
  const countOPL = items.filter((category) => category.coin === false).length;

  return (
    <div
      className={
        isVisibleScrollBar
          ? `sidebar ${
              smallScreen ? "block shadow-lg md:hidden" : "hidden md:block"
            } fixed z-[100] top-[64px] left-0 border-r border-r-slate-300 pb-12 bg-white  w-[320px] overflow-y-scroll h-screen visible`
          : `sidebar ${
              smallScreen ? "block shadow-lg md:hidden" : "hidden md:block"
            } fixed z-[100] top-[64px] left-0 border-r border-r-slate-300 pb-12 bg-white  w-[320px] overflow-y-scroll h-screen `
      }
      onPointerEnter={() => setIsVisibleScrollbar(true)}
      onPointerLeave={() => {
        setIsVisibleScrollbar(false);
      }}>
      <div className='sidebar-inner mx-auto px-4 pt-4 pb-12'>
        {/** Admin links */}
        {user ? <Links /> : null}
        {/** End admin links */}

        <MainNav countOPL={countOPL} countCOIN={countCOIN} countPost={countPost} />
        <Divider />
        <span className='title font-light text-lg text-slate-500 block ml-4 mb-4'>Produkty</span>
        {/** TABS */}
        <div className='navigation-tabs max-w-[260px]'>
          <div className='navigation-tabs_action-btns grid grid-cols-2 gap-x-2 mb-4'>
            {["OPL", "SAMOOBSŁUGOWE"].map((label, index) => (
              <NavLink
                to={index === 0 ? "/wyposazenie-pralni-przemyslowej" : "/wyposazenie-pralni-przemyslowej-samoobslugowe"}
                key={label}
                className={({ isActive }) =>
                  isActive
                    ? "navigation-tabs_btn p-2 text-xs text-center font-bold cursor-pointer border border-slate-700 text-white rounded-tr-md rounded-tl-md bg-slate-500 shadow-lg "
                    : "navigation-tabs_btn p-2 text-xs text-center font-bold cursor-pointer border border-slate-200 text-black-dark rounded-tr-md rounded-tl-md hover:bg-slate-200 hover:border-slate-300 hover:shadow-md"
                }
                type='button'>
                {label}
              </NavLink>
            ))}
          </div>
          <div className='navigation-tabs_contents'>
            {tabIndexes.includes(0) && (
              <div className='navigation-tabs_content'>
                {items.map((item) => {
                  return (
                    !item.coin && (
                      <NavLinkItem
                        key={item._id}
                        to={`/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${item.slug}`}
                        label={item.title}
                        count={item.productsCount}>
                        {({ isActive }) => (
                          <div
                            className={
                              isActive
                                ? "overflow-hidden w-8 h-8 rounded-full border border-accent-dark bg-accent"
                                : "overflow-hidden w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-accent-dark"
                            }>
                            <img
                              className='object-cover w-full h-full'
                              src={item.icon}
                              alt={`${item.title} thumbnail`}
                            />
                          </div>
                        )}
                      </NavLinkItem>
                    )
                  );
                })}
              </div>
            )}
            {tabIndexes.includes(1) && (
              <div className='navigation-tabs_content'>
                {items.map((item) => {
                  return (
                    item.coin && (
                      <NavLinkItem
                        key={item._id}
                        to={`/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${item.slug}`}
                        label={item.title}
                        count={item.productsCount}>
                        {({ isActive }) => (
                          <div
                            className={
                              isActive
                                ? "overflow-hidden w-8 h-8 rounded-full border border-accent-dark bg-accent"
                                : "overflow-hidden w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-accent-dark"
                            }>
                            <img
                              className='object-cover w-full h-full'
                              src={item.icon}
                              alt={`${item.title} thumbnail`}
                            />
                          </div>
                        )}
                      </NavLinkItem>
                    )
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <Divider />
        <span className='title font-light text-lg text-slate-500 block ml-4 mb-4'>Dedykowane rozwiązania</span>
        <div className='max-w-[260px]'>
          {/** hospitality laundry */}
          <NavLinkItem
            to='/wyposazenie-pralni-przemyslowej/wyposazenie-pralni-dla-hotelu'
            label='przemysłowe rozwiązania pralnicze dla hoteli, pensjonatów i moteli'>
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "overflow-hidden w-8 h-8 rounded-full border border-accent-dark bg-accent"
                    : "overflow-hidden w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-accent-dark"
                }>
                <img
                  className='object-cover w-full h-full'
                  src={hospitality.ASIDE_LINK}
                  alt='Przemysłowe urządzenia pralnicze do pralni w hotelu, pensjonacie, motelu - pralnicowirówki, suszarki'
                />
              </div>
            )}
          </NavLinkItem>
          {/** vend laundry */}
          <NavLinkItem
            to='/wyposazenie-pralni-przemyslowej/pralnia-samoobslugowa'
            label='nowoczesna pralnia samoobsługowa'>
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "overflow-hidden w-8 h-8 rounded-full border border-accent-dark bg-accent"
                    : "overflow-hidden w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-accent-dark"
                }>
                <img
                  className='object-cover w-full h-full'
                  src={vend.ASIDE_LINK_IMAGE}
                  alt='Urządzenia pralnicze do pralni samoobslugowej, pralnicowirówki samoobsługowe, pralnice samoobsługowe, suszarki samoobsługowe'
                />
              </div>
            )}
          </NavLinkItem>
          {/** civil services */}
          <NavLinkItem
            to='/wyposazenie-pralni-przemyslowej/sluzby-cywilne'
            label='Urządzenia pralnicze dla straży pożarnej'>
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "overflow-hidden w-8 h-8 rounded-full border border-accent-dark bg-accent"
                    : "overflow-hidden w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-accent-dark"
                }>
                <img
                  className='object-cover w-full h-full'
                  src={FIREBRIGADE}
                  alt='Urządzenia pralnicze dla straży pożarnej'
                />
              </div>
            )}
          </NavLinkItem>
          {/** softwash */}
          <NavLinkItem to='/wyposazenie-pralni-przemyslowej/softwash' label='Technologia softwash'>
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "overflow-hidden w-8 h-8 rounded-full border border-accent-dark bg-accent"
                    : "overflow-hidden w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-accent-dark"
                }>
                <img className='object-cover w-full h-full' src={SOFTWASH} alt='Technologia softwash' />
              </div>
            )}
          </NavLinkItem>
          {/** mop */}
          <NavLinkItem to='/wyposazenie-pralni-przemyslowej/pranie-mop' label='Pranie MOP-ów'>
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "overflow-hidden w-8 h-8 rounded-full border border-accent-dark bg-accent"
                    : "overflow-hidden w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-accent-dark"
                }>
                <img className='object-cover w-full h-full' src={MOP} alt='Pranie MOP-ów' />
              </div>
            )}
          </NavLinkItem>
          {/** hygienic barrier */}
          <NavLinkItem to='/wyposazenie-pralni-przemyslowej/bariera-higieny' label='Pralnia z barierą higieny'>
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "overflow-hidden w-8 h-8 rounded-full border border-accent-dark bg-accent"
                    : "overflow-hidden w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-accent-dark"
                }>
                <img
                  className='object-cover w-full h-full'
                  src={HYGIENIC_BARRIER}
                  alt='Wyposażenie pralni z barierą higieny'
                />
              </div>
            )}
          </NavLinkItem>
          {/** nursery */}
          <NavLinkItem
            to='/wyposazenie-pralni-przemyslowej/zlobki-i-przedszkola'
            label='Pralnia w żłobku lub przedszkolu'>
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "overflow-hidden w-8 h-8 rounded-full border border-accent-dark bg-accent"
                    : "overflow-hidden w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-accent-dark"
                }>
                <img
                  className='object-cover w-full h-full'
                  src={NURSERY}
                  alt='Wyposażenie pralni dla żłobka lub przedszkola'
                />
              </div>
            )}
          </NavLinkItem>
          {/** ecology */}
          <NavLinkItem
            to='/wyposazenie-pralni-przemyslowej/odzysk-wody-i-energii-w-pralni-przemyslowej'
            label='Oszczędzanie wody i energii'>
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "overflow-hidden w-8 h-8 rounded-full border border-accent-dark bg-accent"
                    : "overflow-hidden w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-accent-dark"
                }>
                <img
                  className='object-cover w-full h-full'
                  src={SAVE_WATER_ENERGY}
                  alt='Recykling wody i energii w procesie przemysłowego prania'
                />
              </div>
            )}
          </NavLinkItem>
        </div>
        <Divider />
        <span className='title font-light text-lg text-slate-500 block ml-4 mb-4'>Sterowniki urządzeń</span>
        <div className='max-w-[260px]'>
          <NavLinkItem to='/sterowniki-urzadzen-pralniczych' label='Sterowniki urządzeń pralniczych'>
            {({ isActive }) => (
              <div
                className={
                  isActive
                    ? "overflow-hidden w-8 h-8 rounded-full border border-accent-dark bg-accent"
                    : "overflow-hidden w-8 h-8 rounded-full border border-slate-200 bg-white hover:border-accent-dark"
                }>
                <img
                  className='object-cover w-full h-full'
                  src={CONTROLS}
                  alt='Sterowniki pralnicowirówek, suszarek, prasownic, magli ...'
                />
              </div>
            )}
          </NavLinkItem>
        </div>
        <Divider />
        <span className='title font-light text-lg text-slate-500 block ml-4 mb-4'>Newsletter</span>
        <NewsletterForm />
      </div>
    </div>
  );
}
