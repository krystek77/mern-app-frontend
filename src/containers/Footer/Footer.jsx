import React, { forwardRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Divider from "../../components/Divider";
import SocialLinks from "./SocialLinks/SocialLinks";
import CompanyData from "./CompanyData/CompanyData";
import { getCategories } from "../../api/categories";
import { adminLinks } from "../../constants/adminLinks-data";
import { userAPI } from "../../utils";

export const Footer = forwardRef((props, ref) => {
  const [categories, setCategories] = useState([]);
  const user = userAPI.checkAdmin();

  useEffect(() => {
    let ignore = false;
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        if (!ignore) {
          setCategories(categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <footer id='footer' ref={ref} className='py-8 px-4 lg:px-12 bg-primary '>
      <CompanyData />
      <Divider classes='h-px bg-primary-light my-8' />
      <div className='gap-4 sm:columns-2 lg:columns-5 mx-auto'>
        <div className=' mb-2'>
          <NavLink className='block text-accent-dark  font-normal text-sm capitalize hover:text-accent' to='/kontakt'>
            Kontakt
          </NavLink>
        </div>
        <div className=' mb-2'>
          <NavLink
            to='/wyposazenie-pralni-przemyslowej'
            className='block text-accent-dark font-normal text-sm capitalize hover:text-accent'>
            <span>Wyposażenie pralni</span>
          </NavLink>
          {categories.length
            ? categories
                .filter((category) => category.coin === false)
                .map((category) => (
                  <NavLink
                    key={category._id}
                    className='block text-white font-light text-xs my-1 hover:text-accent'
                    to={`/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${category.slug}`}>
                    {category.title}
                  </NavLink>
                ))
            : null}
        </div>

        <div className=' mb-2'>
          <NavLink
            to='/wyposazenie-pralni-przemyslowej-samoobslugowe'
            className='block text-accent-dark  font-normal text-sm capitalize hover:text-accent'>
            <span>Wyposażenie pralni samoobsługowej</span>
          </NavLink>
          {categories.length
            ? categories
                .filter((category) => category.coin === true)
                .map((category) => (
                  <NavLink
                    key={category._id}
                    className='block text-white font-light text-xs my-1 hover:text-accent'
                    to={`/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${category.slug}`}>
                    {category.title}
                  </NavLink>
                ))
            : null}
        </div>

        <div className=' mb-2'>
          <div className='block text-accent-dark  font-normal text-sm capitalize'>
            <span>Dedykowane rozwiązania</span>
          </div>
          <NavLink
            className='block text-white font-light text-xs my-1 hover:text-accent'
            to='/wyposazenie-pralni-przemyslowej/wyposazenie-pralni-dla-hotelu'>
            HoReCa - rozwiązania pralnicze
          </NavLink>
          <NavLink
            className='block text-white font-light text-xs my-1 hover:text-accent'
            to='/wyposazenie-pralni-przemyslowej/pralnia-samoobslugowa'>
            Pralnie samoobsługowe
          </NavLink>
          <NavLink
            className='block text-white font-light text-xs my-1 hover:text-accent'
            to='/wyposazenie-pralni-przemyslowej/sluzby-cywilne'>
            Urządzenia pralnicze dla straży pożarnej
          </NavLink>
          <NavLink
            className='block text-white font-light text-xs my-1 hover:text-accent'
            to='/wyposazenie-pralni-przemyslowej/softwash'>
            Technologia Softwash
          </NavLink>
          <NavLink
            className='block text-white font-light text-xs my-1 hover:text-accent'
            to='/wyposazenie-pralni-przemyslowej/pranie-mop'>
            Technologia prania MOP
          </NavLink>
          <NavLink
            className='block text-white font-light text-xs my-1 hover:text-accent'
            to='/wyposazenie-pralni-przemyslowej/bariera-higieny'>
            Pralnia z barierą higieny
          </NavLink>
          <NavLink
            className='block text-white font-light text-xs my-1 hover:text-accent'
            to='/wyposazenie-pralni-przemyslowej/zlobki-i-przedszkola'>
            Rozwiązania pralnicze dla żłobków i przedszkoli
          </NavLink>
          <NavLink
            className='block text-white font-light text-xs my-1 hover:text-accent'
            to='/wyposazenie-pralni-przemyslowej/odzysk-wody-i-energii-w-pralni-przemyslowej'>
            Oszczędzanie wody i energii
          </NavLink>

          <NavLink
            className='block text-white font-light text-xs my-1 hover:text-accent'
            to='/sterowniki-urzadzen-pralniczych'>
            Sterowniki urządzeń pralniczych
          </NavLink>
        </div>

        {user ? (
          <div className='mb-2 bg-admin-light p-2 rounded border border-admin'>
            <NavLink to='/' className='block text-black-dark  font-bold text-sm capitalize hover:text-admin'>
              <span>Admin</span>
            </NavLink>
            {adminLinks.map((adminLink) => (
              <NavLink
                key={adminLink.id}
                className='block text-black-dark font-normal text-xs my-1 hover:text-admin'
                to={adminLink.url}>
                {adminLink.title}
              </NavLink>
            ))}
          </div>
        ) : null}

        <div className='mb-2'>
          <NavLink
            to='/klienci-przemyslowych-urzadzen-pralniczych'
            className='block text-accent-dark font-normal capitalize text-sm mb-2 hover:text-accent'>
            <span>Nasi Klienci</span>
          </NavLink>
          <NavLink
            to='/wiadomosci'
            className='block text-accent-dark font-normal capitalize text-sm mb-2 hover:text-accent'>
            <span>Wiadomości</span>
          </NavLink>
          <NavLink
            to='/wyposazenie-pralni-przemyslowej/wozki-i-regaly'
            className='block text-accent-dark font-normal capitalize text-sm mb-2 hover:text-accent'>
            <span>Urządzenia do transportu i składowania prania - wózki i regały</span>
          </NavLink>
          <NavLink
            to='/czesci-zamienne'
            className='block text-accent-dark font-normal capitalize text-sm mb-2 hover:text-accent'>
            <span>Części zamienne</span>
          </NavLink>
          <NavLink
            to='/pralma/warunki-gwarancji'
            className='block text-accent-dark font-normal capitalize text-sm mb-2 hover:text-accent'>
            <span>Warunki gwarancji</span>
          </NavLink>
          <NavLink
            to='/pralma/warunki-realizacji'
            className='block text-accent-dark font-normal capitalize text-sm mb-2 hover:text-accent'>
            <span>Warunki realizacji</span>
          </NavLink>
        </div>
      </div>

      <Divider classes='h-px bg-primary-light my-8' />

      <div className='items-center grid grid-cols-1 sm:grid-cols-2 auto-rows-max mb-12 sm:mb-0'>
        <div className='flex flex-col text-white justify-self-start'>
          <span className='text-sm font-normal'>
            &copy;&nbsp;Krystian Wrona dla P.P.U.P. &quot;Pralma&quot; sp. z o.o. Kielce 2023
          </span>
          <span className='text-sm font-light'>&reg;&nbsp;Wszystkie prawa zastrzeżone</span>
        </div>
        <div className='justify-self-end flex flex-wrap justify-end items-center'>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
});
export default Footer;
