import React,{useEffect, useState} from 'react';
import Logo from '../images/logo.webp';
import AdminData from './Admin/AdminData/AdminData';
import { NavLink } from 'react-router-dom';
import { Bars4Icon } from '@heroicons/react/24/solid';
import { GiPadlock, GiPadlockOpen } from 'react-icons/gi';
import { MdOutlineOnlinePrediction } from 'react-icons/md';

export default function Toolbar({ handleSidebar, handleToggle, user }) {
  const [onLine,setOnline] = useState(true);

  useEffect(()=>{
    function updateStatus(){
      setOnline(navigator.onLine)
    }
    window.addEventListener("online",updateStatus);
    window.addEventListener("offline",updateStatus)
    return () => {
      window.removeEventListener("online",updateStatus);
      window.removeEventListener("offline",updateStatus);
    };
  },[])

  return (
    <div className="toolbar fixed px-4 w-full z-[100] top-0 left-0 bg-white bg-opacity-95">
      <div className="toolbar-content  flex items-center justify-between h-full flex-wrap px-4 py-2">
        <div className="flex items-center">
          <button
            className="hidden md:block"
            onClick={() => handleSidebar((prevIsWide) => !prevIsWide)}
            type="button"
            hidden={false}
            aria-label="resize-navigation"
            title="resize"
          >
            <Bars4Icon className="w-6 h-6" />
          </button>
          <button
            className="block md:hidden"
            onClick={() => handleToggle((toggle) => !toggle)}
            type="button"
            aria-label="toggle-navigation"
            title="toggle"
          >
            <Bars4Icon className="w-6 h-6" />
          </button>
          <NavLink
            to="/"
            className="group"
            title="Przemysłowe urządzenia pralnicze, pralnicowirówki, suszarki, pralki przemysłowe"
          >
            {({ isActive }) => (
              <>

              <div
                className={
                  isActive
                    ? `ml-4 px-1 py-1 rounded border border-slate-100 bg-white shadow-sm group-hover:bg-accent group-hover:border-accent-dark group-hover:shadow-lg`
                    : `ml-4 px-1 py-1 rounded border border-transparent group-hover:bg-accent group-hover:border-accent-dark group-hover:shadow-lg`
                }
              >
                <img
                  width="60px"
                  height="25px"
                  src={Logo}
                  alt="Przemysłowe urządzenia pralnicze, pralnicowirówki, suszarki, pralki przemysłowe"
                />
              </div>
              <span className='hidden'>Strona główna przedsiębiorstwa produkcji urządzeń pralniczych Pralma</span>
              </>
              
            )}
          </NavLink>
        </div>
        <div className="flex justify-end items-center">
          {onLine ? (
            <div className="mr-4 flex flex-col-reverse justify-center items-center">
              <span className="text-xs font-medium">online</span>
              <MdOutlineOnlinePrediction className="w-6 h-6 text-green-500" />
            </div>
          ) : (
            <div className="mr-4 flex flex-col-reverse justify-center items-center">
              <span className="text-xs font-medium">offline</span>
              <MdOutlineOnlinePrediction className="w-6 h-6 text-red-500" />
            </div>
          )}
          <div className="hidden md:block">
            <AdminData user={user} toolbar />
          </div>
          <NavLink
            title={user ? `zalogowano: ${user.email}` : 'zaloguj się'}
            to="/pralma/login"
            className={({ isActive }) =>
              isActive
                ? 'text-white text-sm font-normal px-2 py-1 rounded bg-primary border border-primary-dark shadow-lg'
                : `${
                    user
                      ? 'pointer-events-none font-semibold text-slate-500 text-sm px-2 py-1 rounded bg-slate-100 border border-slate-100'
                      : 'text-black-dark font-semibold text-sm px-2 py-1 rounded bg-slate-100 border border-slate-300 hover:bg-accent hover:border-accent-dark'
                  }`
            }
          >
            <div className="flex justify-end items-center">
              {user ? (
                <GiPadlock className="w-4 h-4 mr-1" />
              ) : (
                <GiPadlockOpen className="w-4 h-4 mr-1" />
              )}
              <span className="pointer-events-none ">Moja Pralma</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
