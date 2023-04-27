import React from "react";
import Divider from "../Divider";
import PageTitle from "../PageTitle/PageTitle";
import TableLegend from "./TableLegend";
import Pictogram from "./Pictogram";
import { v4 as uuidV4 } from "uuid";
import Tips from "../Admin/Tips/Tips";
import FormButton from "../Admin/FormButton";

const itemsForTips = [
  {
    _id: uuidV4(),
    to: "/pralma/formularz-produktu",
    text: "Dodaj produkt, dla którego chcesz dodac cennik",
  },
  {
    _id: uuidV4(),
    to: "/pralma/formularz-sterownika",
    text: "Dodaj sterowniki, gdy go brak w cenniku",
  },
  {
    _id: uuidV4(),
    to: "/pralma/formularz-podgrzewu",
    text: "Dodaj podgrzew, gdy go brak w cenniku",
  },
  {
    _id: uuidV4(),
    to: "/pralma/formularz-opcji",
    text: "Dodaj opcje, gdy ich brak w cenniku",
  },
  {
    _id: uuidV4(),
    to: "/pralma/formularz-zasilania",
    text: "Dodaj zasilanie, gdy go brak w cenniku",
  },
  {
    _id: uuidV4(),
    to: "/pralma/formularz-cennika",
    text: "Następnie dodaj cennik dla okreslonego modelu z określonej kategorii",
  },
];

export default function PriceListProductsTable({ priceLists, avarageExchangeRate }) {
  const {
    code = "EUR",
    rates = [
      {
        ask: 4.85,
        bid: 4.75,
        effectiveData: new Date().toLocaleDateString(),
        no: "031/C/NBP/2023",
      },
    ],
  } = avarageExchangeRate;

  const generatePriceLists = (priceLists) => {
    return priceLists.map((_, index) => {
      

      return (
        index % 2 === 0 && (
          <div key={_._id}>
            <div className='price-lists overflow-hidden max-w-4xl mx-auto mb-4'>
              {/** table header */}
              <div className='grid grid-cols-4 bg-slate-300 border border-slate-400 mb-2'>
                <div className='text-left text-sm font-medium p-1 col-span-2 border border-slate-200 self-stretch flex items-center'>
                  -
                </div>
                {priceLists.slice(index, index + 2).map((priceList) => (
                  <div key={priceList._id} className='text-center text-sm font-medium p-1 border border-slate-200'>
                    <span>{priceList.product?.model}</span>
                    <span className='bg-accent border border-accent-dark rounded px-4 py-0.5 text-sm font-semibold block max-w-max mx-auto'>{`${priceList.discount} %`}</span>
                  </div>
                ))}
              </div>
              {/** table body */}
              <div className='grid grid-cols-4 bg-slate-100'>
                <div className='col-span-2 overflow-hidden'>
                  {/** controls */}
                  <div className='mb-2 bg-admin border border-slate-400 '>
                    {priceLists[0].controls.map((item) => (
                      <div
                        className='whitespace-nowrap border border-slate-100 py-1 px-1 text-left text-xs font-medium h-[34px] '
                        key={item.name}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                  {/** heatings */}
                  <div className='mb-2 bg-admin-light border border-slate-400'>
                    {priceLists[0].heatings.map((item) => (
                      <div
                        className='whitespace-nowrap border border-slate-100 py-1 px-1 text-left text-xs font-medium h-[34px] '
                        key={item.name}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                  {/** voltages */}
                  <div className='mb-2 bg-admin border border-slate-400'>
                    {priceLists[0].voltages.map((item) => (
                      <div
                        className='whitespace-nowrap border border-slate-100 py-1 px-1 text-left text-xs font-medium h-[34px] '
                        key={item.name}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                  {/** options */}
                  <div className='mb-2 bg-admin-light border border-slate-400'>
                    {priceLists[0].options.map((item) => (
                      <div
                        className='whitespace-nowrap border border-slate-100 py-1 px-1 text-left text-xs font-medium h-[34px] '
                        key={item.name}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
                {priceLists.slice(index, index + 2).map((priceList) => (
                  <div key={priceList._id}>
                    {/** controls */}
                    <div className='mb-2 bg-admin border border-slate-400'>
                      {priceList.controls.map((item) => (
                        <div
                          className='whitespace-nowrap border border-slate-100 py-1 px-1 text-center text-sm'
                          key={item._id}>
                          <Pictogram price={item.price} rate={rates[0].ask} />
                        </div>
                      ))}
                    </div>
                    {/** heatings */}
                    <div className='mb-2 bg-admin-light border border-slate-400'>
                      {priceList.heatings.map((item) => (
                        <div
                          className='whitespace-nowrap border border-slate-100 py-1 px-1 text-center text-sm'
                          key={item._id}>
                          <Pictogram price={item.price} rate={rates[0].ask} />
                        </div>
                      ))}
                    </div>
                    {/** voltages */}
                    <div className='mb-2 bg-admin border border-slate-400'>
                      {priceList.voltages.map((item) => (
                        <div
                          className='whitespace-nowrap border border-slate-100 py-1 px-1 text-center text-sm'
                          key={item._id}>
                          <Pictogram price={item.price} rate={rates[0].ask} />
                        </div>
                      ))}
                    </div>
                    {/** options */}
                    <div className='mb-2 bg-admin-light border border-slate-400'>
                      {priceList.options.map((item) => (
                        <div
                          className='whitespace-nowrap border border-slate-100 py-1 px-1 text-center text-sm'
                          key={item._id}>
                          <Pictogram price={item.price} rate={rates[0].ask} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <TableLegend />
            <Divider />
          </div>
        )
      );
    });
  };

  return (
    <section className=''>
      <PageTitle text='Cennik produktów danej kategorii' />

      {priceLists && priceLists.length ? (
        <>
          <div className='EURO flex justify-start items-center flex-wrap bg-slate-100 mb-2 border border-slate-300 rounded overflow-hidden max-w-4xl mx-auto'>
            <div className='border border-slate-50 flex-grow p-2'>
              <span className='text-xs mr-2 font-medium'>KOD:</span>
              <span className='text-sm'>{code}</span>
            </div>
            <div className='border border-slate-50 flex-grow p-2'>
              <span className='text-xs mr-2 font-medium'>Kurs kupna:</span>
              <span className='bg-primary border border-primary-dark text-white font-semibold px-1 py-1 rounded'>
                {rates && rates[0]?.ask}
              </span>
            </div>
            <div className='border border-slate-50 flex-grow p-2'>
              <span className='text-xs mr-2 font-medium'>Kurs sprzedaży:</span>
              <span className='text-sm'>{rates && rates[0]?.bid}</span>
            </div>
            <div className='border border-slate-50 flex-grow p-2'>
              <span className='text-xs mr-2 font-medium'>z dnia:</span>
              <span className='text-sm'>{rates && rates[0]?.effectiveDate}</span>
            </div>
          </div>
          {generatePriceLists(priceLists)}
        </>
      ) : (
        <div className='py-1'>
          <Tips title='Dodaj cennik' items={itemsForTips}>
            <FormButton
              btnTitle='dodaj cennik'
              formClasses='my-2'
              id='add-pricelist'
              action='/pralma/formularz-cennika'
              btnClasses='w-auto h-auto px-2 py-1'>
              <span className='ml-2'>Dodaj cennik</span>
            </FormButton>
          </Tips>
        </div>
      )}
    </section>
  );
}
