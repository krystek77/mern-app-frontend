import React from 'react';
import { Link } from 'react-router-dom';

export default function MostPopular({ items }) {
  return items.length ? (
    <section className="relative pt-12 pb-28">
    
    <div className='absolute inset-x-0 inset-y-0 clip-me2 bg-primary-light bg-opacity-90 hover:clip-me2-hover transition-all duration-300'></div>
      <h2 className="relative text-accent-dark uppercase font-light text-2xl py-8 text-center md:max-w-md lg:max-w-xl mx-auto my-0">
        Popularne rodzaje
        <span className="text-black-dark font-normal">
          &nbsp; przemysłowych urządzeń pralniczych
        </span>
      </h2>
      <div className="pt-12 flex flex-wrap justify-center items-center">
        {items.map((item) => (
          <div pageView = {item.pageView} className={`relative before:absolute before:z-10 md:even:before:bottom-0 md:even:before:translate-y-1/2 odd:before:top-0 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:w-10 before:h-10 before:rounded-full before:content-[attr(pageView)] before:flex before:justify-center before:items-center before:shadow-lg before:bg-primary-light before:border-4 before:border-white before:text-white before:text-sm before:font-normal m-4 md:m-3`}>
            <Link
              title={item.title}
              to={
                item.coin
                  ? `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${item.slug}`
                  : `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${item.slug}`
              }
              className="block relative group rounded-full bg-accent w-56 h-56 overflow-hidden shadow-xl"
              key={`${item._id}-most-popular`}
            >
              <img
                className="object-cover w-full h-full object-center"
                src={item.image}
                alt={item.title}
              />
              <div className="overflow-hidden absolute inset-x-0 inset-y-0 bg-primary top-full group-hover:top-0 transition-all duration-300 flex flex-col justify-center items-center text-center">
                <span className="text-slate-200 font-medium text-sm px-4">
                  {item.title}
                </span>
                {item.coin ? <span className='text-slate-50 font-normal text-xs'>samoobsługowe</span>:null}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  ) : null;
}
