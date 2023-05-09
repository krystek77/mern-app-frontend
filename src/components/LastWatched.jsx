import React from "react";
import { Link } from "react-router-dom";


export default function LastWatched({ items }) {

  return items.length ? (
    <div className='relative pt-6 pb-12 group'>
      <div className='absolute inset-x-0 inset-y-0 bg-accent-light bg-opacity-30 clip-me group-hover:clip-hover transition-all duration-300 ease-in-out'></div>
      <section className='px-4'>
        <h2 className="text-accent-dark uppercase font-light text-2xl py-8 text-center md:max-w-md lg:max-w-xl mx-auto my-0">Ostatnio oglądane wyposażenie <strong className="text-black-dark font-normal">pralni przemysłowej</strong></h2>
        <div className='flex flex-wrap justify-center'>
          {items[0].models.map((item) => {
            return (
              <Link
                title={`${item.title} - ${item.model}`}
                className={
                  item.wide
                    ? "relative border border-slate-400 rounded bg-slate-200 m-2 p-2 max-w-[430px] overflow-hidden shadow-lg group hover:bg-accent-light transition-all duration-150"
                    : "relative border border-slate-400 rounded bg-slate-200 m-2 p-2 max-w-[230px] overflow-hidden shadow-lg group hover:bg-accent-light transition-all duration-150"
                }
                to={
                  item.coin
                    ? `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${item.category.slug}/model/${item.model}`
                    : `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${item.category.slug}/model/${item.model}`
                }
                key={item.model}>
                <div className='flex flex-col items-center'>
                  <span className='text-white text-sm font-semibold rounded-sm bg-black-dark px-2 py-1'>
                    {item.model}
                  </span>
                  <div className='p-2 overflow-hidden'>
                    <img
                      className='hover:scale-105 transition-all duration-150'
                      loading='lazy'
                      src={item.image}
                      alt={`${item.title} - ${item.model}`}
                    />
                  </div>
                </div>
                <p className='absolute bottom-0 left-0 w-full text-white text-xs font-medium h-14 flex items-center justify-center text-center overflow-hidden bg-black-dark px-2 bg-opacity-90 rounded-bl rounded-br'>
                  {item.title}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  ) : null;
}
