import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, useNavigation } from 'react-router-dom';
import PageTitle from '../PageTitle/PageTitle';
import Tips from '../Admin/Tips/Tips';
import FormButton from '../Admin/FormButton';
import Divider from '../Divider';
import TableLegend from './TableLegend';
import Pictogram from './Pictogram';
import { GiSave } from 'react-icons/gi';
import { AiFillWarning } from 'react-icons/ai';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import InputContainer from '../Form/InputContainer';
import Input from '../Form/Input';
import { RxReset } from 'react-icons/rx';
import { v4 as uuidV4 } from 'uuid';

const itemsForTips = [
  {
    _id: uuidV4(),
    to: '/pralma/formularz-sterownika',
    text: 'Dodaj sterowniki, gdy go brak w cenniku',
  },
  {
    _id: uuidV4(),
    to: '/pralma/formularz-podgrzewu',
    text: 'Dodaj podgrzew, gdy go brak w cenniku',
  },
  {
    _id: uuidV4(),
    to: '/pralma/formularz-opcji',
    text: 'Dodaj opcje, gdy ich brak w cenniku',
  },
  {
    _id: uuidV4(),
    to: '/pralma/formularz-zasilania',
    text: 'Dodaj zasilanie, gdy go brak w cenniku',
  },
  {
    _id: uuidV4(),
    to: '/pralma/formularz-cennika',
    text: 'Następnie dodaj cennik dla okreslonego modelu z określonej kategorii',
  },
];
export default function PricesTable({
  priceList,
  avarageExchangeRate,
  controlPrices,
  setControlPrices,
  heatingPrices,
  setHeatingPrices,
  voltagePrices,
  setVoltagePrices,
  optionPrices,
  setOptionPrices,
}) {
  const [edited, setEdited] = useState('');

  const {
    code = 'EUR',
    rates = [
      {
        ask: 1,
        bid: 1,
        effectiveData: new Date(
          new Date().setDate(new Date().getDate() - 1)
        ).toLocaleDateString('pl-PL'),
        no: '031/C/NBP/2023',
      },
    ],
  } = avarageExchangeRate;
  const navigation = useNavigation();
  useEffect(() => {
    if (navigation.state === 'idle') {
      setEdited('');
    }
  }, [navigation.state]);

  return (
    <section className="">
      <PageTitle text="Cennik">
        {rates[0].ask === 1 ? (
          <div className="flex justify-start items-center flex-wrap">
            <AiFillWarning
              className="m-2 w-8 h-8 text-primary-dark rounded-md p-1 border border-slate-100 "
              title="Brak aktualnego kursu EURO"
            />
            <span className="text-xs font-light italic">
              uwaga: brak aktualnego kursu EURO
            </span>
          </div>
        ) : null}
      </PageTitle>

      {priceList && !priceList.message ? (
        <>
          <div className="EURO flex justify-start items-center flex-wrap bg-slate-100 mb-2 border border-slate-300 rounded overflow-hidden">
            <div className="border border-slate-50 flex-grow p-2">
              <span className="text-xs mr-2 font-medium">KOD:</span>
              <span className="text-sm">{code}</span>
            </div>
            <div className="border border-slate-50 flex-grow p-2">
              <span className="text-xs mr-2 font-medium">Kurs kupna:</span>
              <span className="bg-primary border border-primary-dark text-white font-semibold px-1 py-1 rounded">
                {rates && rates[0]?.ask && rates[0].ask === 1
                  ? '-'
                  : rates[0].ask}
              </span>
            </div>
            <div className="border border-slate-50 flex-grow p-2">
              <span className="text-xs mr-2 font-medium">Kurs sprzedaży:</span>
              <span className="text-sm">
                {rates && rates[0]?.bid && rates[0].bid === 1
                  ? '-'
                  : rates[0].bid}
              </span>
            </div>
            <div className="border border-slate-50 flex-grow p-2">
              <span className="text-xs mr-2 font-medium">z dnia:</span>
              <span className="text-sm">
                {rates && rates[0]?.effectiveDate}
              </span>
            </div>
          </div>
          <div className="mb-8">
            <div className="price-list mb-8">
              {/** table header */}
              <div className="price-list_header mb-2 grid grid-cols-3 auto-rows-max bg-slate-300 border border-slate-400">
                <div className="text-left text-sm font-medium p-1 col-span-2 border border-slate-200 self-stretch flex items-center">
                  -
                </div>
                <div className="text-center text-sm font-medium p-1 border border-slate-200">
                  <span>{priceList.product.model}</span>
                  <span className="bg-accent border border-accent-dark rounded px-4 py-0.5 text-sm font-semibold block max-w-max mx-auto">{`${priceList.discount} %`}</span>
                </div>
              </div>
              {/** tabel body */}
              <div className="price-list_body">
                {/** controls */}
                <div className="bg-admin border border-admin-dark grid grid-cols-3 auto-rows-max mb-2">
                  {priceList.controls.length
                    ? priceList.controls.map((control, index) => (
                        <React.Fragment key={control.name}>
                          <div className="col-span-2 text-left whitespace-normal text-xs font-medium p-1 border border-slate-100">
                            {control.name}
                          </div>
                          <div className="text-center text-sm font-medium p-1 border border-slate-100">
                            <Form
                              className="relative flex justify-between items-center"
                              id="control-price-form"
                              method="POST"
                              action={`priceList/${priceList._id}/control`}
                            >
                              <input
                                type="text"
                                hidden
                                name="control.price"
                                value={controlPrices[index].price}
                                readOnly={true}
                              />
                              <input
                                type="text"
                                hidden
                                name="control._id"
                                value={controlPrices[index]._id}
                                readOnly={true}
                              />
                              {edited === control.name ? (
                                <InputContainer classes="mb-0">
                                  <Input
                                    error=""
                                    ariaLabel="edit control price"
                                    inputStyles="text-xs py-1 px-2"
                                    type="text"
                                    value={controlPrices[index].price}
                                    onChange={(e) => {
                                      const copyControlPrices = [
                                        ...controlPrices,
                                      ];
                                      copyControlPrices[index] = {
                                        _id: control._id,
                                        price: e.target.value,
                                      };
                                      setControlPrices(copyControlPrices);
                                    }}
                                  />
                                </InputContainer>
                              ) : (
                                <Pictogram
                                  price={controlPrices[index].price}
                                  rate={rates[0].ask}
                                />
                              )}
                              <div className="hidden sm:flex justify-end items-center flex-shrink-1">
                                <button
                                  id={control.name}
                                  onClick={(e) => {
                                    if (edited === control.name) {
                                      setEdited('');
                                    } else {
                                      setEdited(e.currentTarget.id);
                                    }
                                  }}
                                  type="button"
                                  className="w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark"
                                >
                                  <PencilSquareIcon className="w-4 h-4 self-center justify-self-center" />
                                </button>
                                <button
                                  type="submit"
                                  className={
                                    control.price !== controlPrices[index].price
                                      ? 'w-6 h-6 ml-1 bg-primary-light flex items-center justify-center border border-primary-dark text-white rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark'
                                      : 'w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark'
                                  }
                                >
                                  <GiSave className="w-4 h-4 self-center justify-self-center" />
                                </button>
                                <button
                                  type="reset"
                                  onClick={(e) => {
                                    setEdited('');
                                    setControlPrices(
                                      priceList.controls.map((item, index) => {
                                        if (item._id === control._id) {
                                          return {
                                            _id: item._id,
                                            price: item.price,
                                          };
                                        } else {
                                          return {
                                            _id: controlPrices[index]._id,
                                            price: controlPrices[index].price,
                                          };
                                        }
                                      })
                                    );
                                  }}
                                  className="w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark"
                                >
                                  <RxReset className="w-4 h-4 self-center justify-self-center" />
                                </button>
                              </div>
                            </Form>
                          </div>
                        </React.Fragment>
                      ))
                    : null}
                </div>

                {/** heatings */}
                <div className="bg-admin-light border border-admin-dark grid grid-cols-3 auto-rows-max mb-2">
                  {priceList.heatings.length
                    ? priceList.heatings.map((heating, index) => (
                        <React.Fragment key={heating.name}>
                          <div className="flex justify-between items-center col-span-2 text-left whitespace-normal text-xs font-medium p-1 border border-slate-100">
                            <span>{heating.name}</span>
                          </div>
                          <div className="text-center text-sm font-medium p-1 border border-slate-100">
                            <Form
                              className="relative flex justify-between items-center"
                              id="heating-price-form"
                              method="POST"
                              action={`priceList/${priceList._id}/heating`}
                            >
                              <input
                                type="text"
                                hidden
                                name="heating.price"
                                value={heatingPrices[index].price}
                                readOnly={true}
                              />
                              <input
                                type="text"
                                hidden
                                name="heating._id"
                                value={heatingPrices[index]._id}
                                readOnly={true}
                              />
                              {edited === heating.name ? (
                                <InputContainer classes="mb-0">
                                  <Input
                                    error=""
                                    ariaLabel="edit heating price"
                                    inputStyles="text-xs py-1 px-2"
                                    type="text"
                                    value={heatingPrices[index].price}
                                    onChange={(e) => {
                                      const copyHeatingPrices = [
                                        ...heatingPrices,
                                      ];
                                      copyHeatingPrices[index] = {
                                        _id: heating._id,
                                        price: e.target.value,
                                      };
                                      setHeatingPrices(copyHeatingPrices);
                                    }}
                                  />
                                </InputContainer>
                              ) : (
                                <Pictogram
                                  price={heatingPrices[index].price}
                                  rate={rates[0].ask}
                                />
                              )}
                              <div className="hidden sm:flex justify-end items-center flex-shrink-1">
                                <button
                                  id={heating.name}
                                  onClick={(e) => {
                                    if (edited === heating.name) {
                                      setEdited('');
                                    } else {
                                      setEdited(e.currentTarget.id);
                                    }
                                  }}
                                  type="button"
                                  className="w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark"
                                >
                                  <PencilSquareIcon className="w-4 h-4 self-center justify-self-center" />
                                </button>
                                <button
                                  type="submit"
                                  className={
                                    heating.price !== heatingPrices[index].price
                                      ? 'w-6 h-6 ml-1 bg-primary-light flex items-center justify-center border border-primary-dark text-white rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark'
                                      : 'w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark'
                                  }
                                >
                                  <GiSave className="w-4 h-4 self-center justify-self-center" />
                                </button>
                                <button
                                  type="reset"
                                  onClick={() => {
                                    setHeatingPrices(
                                      priceList.heatings.map((item, index) => {
                                        if (item._id === heating._id) {
                                          return {
                                            _id: item._id,
                                            price: item.price,
                                          };
                                        } else {
                                          return {
                                            _id: heatingPrices[index]._id,
                                            price: heatingPrices[index].price,
                                          };
                                        }
                                      })
                                    );
                                  }}
                                  className="w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark"
                                >
                                  <RxReset className="w-4 h-4 self-center justify-self-center" />
                                </button>
                              </div>
                            </Form>
                          </div>
                        </React.Fragment>
                      ))
                    : null}
                </div>

                {/** voltages */}
                <div className=" bg-admin border border-admin-dark grid grid-cols-3 auto-rows-max mb-2">
                  {priceList.voltages.length
                    ? priceList.voltages.map((voltage, index) => (
                        <React.Fragment key={voltage.name}>
                          <div className="flex justify-between items-center col-span-2 text-left whitespace-normal text-xs font-medium p-1 border border-slate-100">
                            <span>{voltage.name}</span>
                          </div>
                          <div className="text-center text-sm font-medium p-1 border border-slate-100">
                            <Form
                              className="relative flex justify-between items-center"
                              id="voltage-price-form"
                              method="POST"
                              action={`priceList/${priceList._id}/voltage`}
                            >
                              <input
                                type="text"
                                hidden
                                name="voltage.price"
                                value={voltagePrices[index].price}
                                readOnly={true}
                              />
                              <input
                                type="text"
                                hidden
                                name="voltage._id"
                                value={voltagePrices[index]._id}
                                readOnly={true}
                              />
                              {edited === voltage.name ? (
                                <InputContainer classes="mb-0">
                                  <Input
                                    error=""
                                    ariaLabel="edit voltage price"
                                    inputStyles="text-xs py-1 px-2"
                                    type="text"
                                    value={voltagePrices[index].price}
                                    onChange={(e) => {
                                      const copyVoltagePrices = [
                                        ...voltagePrices,
                                      ];
                                      copyVoltagePrices[index] = {
                                        _id: voltage._id,
                                        price: e.target.value,
                                      };
                                      setVoltagePrices(copyVoltagePrices);
                                    }}
                                  />
                                </InputContainer>
                              ) : (
                                <Pictogram
                                  price={voltagePrices[index].price}
                                  rate={rates[0].ask}
                                />
                              )}
                              <div className="hidden sm:flex justify-end items-center flex-shrink-1">
                                <button
                                  id={voltage.name}
                                  onClick={(e) => {
                                    if (edited === voltage.name) {
                                      setEdited('');
                                    } else {
                                      setEdited(e.currentTarget.id);
                                    }
                                  }}
                                  type="button"
                                  className="w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark"
                                >
                                  <PencilSquareIcon className="w-4 h-4 self-center justify-self-center" />
                                </button>
                                <button
                                  type="submit"
                                  className={
                                    voltage.price !== voltagePrices[index].price
                                      ? 'w-6 h-6 ml-1 bg-primary-light flex items-center justify-center border border-primary-dark text-white rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark'
                                      : 'w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark'
                                  }
                                >
                                  <GiSave className="w-4 h-4 self-center justify-self-center" />
                                </button>
                                <button
                                  type="reset"
                                  onClick={(e) => {
                                    setVoltagePrices(
                                      priceList.voltages.map((item, index) => {
                                        if (item._id === voltage._id) {
                                          return {
                                            _id: item._id,
                                            price: item.price,
                                          };
                                        } else {
                                          return {
                                            _id: voltagePrices[index]._id,
                                            price: voltagePrices[index].price,
                                          };
                                        }
                                      })
                                    );
                                  }}
                                  className="w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark"
                                >
                                  <RxReset className="w-4 h-4 self-center justify-self-center" />
                                </button>
                              </div>
                            </Form>
                          </div>
                        </React.Fragment>
                      ))
                    : null}
                </div>

                {/** options */}
                <div className="bg-admin-light border border-admin-dark grid grid-cols-3 auto-rows-max mb-2">
                  {priceList.options.length
                    ? priceList.options.map((option, index) => (
                        <React.Fragment key={option.name}>
                          <div className="flex justify-between items-center col-span-2 text-left whitespace-normal text-xs font-medium p-1 border border-slate-100">
                            <span>{option.name}</span>
                          </div>
                          <div className="text-center text-sm font-medium p-1 border border-slate-100">
                            <Form
                              className="relative flex justify-between items-center"
                              id="option-price-form"
                              method="POST"
                              action={`priceList/${priceList._id}/option`}
                            >
                              <input
                                type="text"
                                hidden
                                name="option.price"
                                value={optionPrices[index].price}
                                readOnly={true}
                              />
                              <input
                                type="text"
                                hidden
                                name="option._id"
                                value={optionPrices[index]._id}
                                readOnly={true}
                              />
                              {edited === option.name ? (
                                <InputContainer classes="mb-0">
                                  <Input
                                    error=""
                                    ariaLabel="edit option price"
                                    inputStyles="text-xs py-1 px-2"
                                    type="text"
                                    value={optionPrices[index].price}
                                    onChange={(e) => {
                                      const copyOptionPrices = [
                                        ...optionPrices,
                                      ];
                                      copyOptionPrices[index] = {
                                        _id: option._id,
                                        price: e.target.value,
                                      };
                                      setOptionPrices(copyOptionPrices);
                                    }}
                                  />
                                </InputContainer>
                              ) : (
                                <Pictogram
                                  price={optionPrices[index].price}
                                  rate={rates[0].ask}
                                />
                              )}
                              <div className="hidden sm:flex justify-end items-center flex-shrink-1">
                                <button
                                  id={option.name}
                                  onClick={(e) => {
                                    if (edited === option.name) {
                                      setEdited('');
                                    } else {
                                      setEdited(e.currentTarget.id);
                                    }
                                  }}
                                  type="button"
                                  className="w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark"
                                >
                                  <PencilSquareIcon className="w-4 h-4 self-center justify-self-center" />
                                </button>
                                <button
                                  type="submit"
                                  className={
                                    option.price !== optionPrices[index].price
                                      ? 'w-6 h-6 ml-1 bg-primary-light flex items-center justify-center border border-primary-dark text-white rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark'
                                      : 'w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark'
                                  }
                                >
                                  <GiSave className="w-4 h-4 self-center justify-self-center" />
                                </button>
                                <button
                                  type="reset"
                                  onClick={() => {
                                    setOptionPrices(
                                      priceList.options.map((item, index) => {
                                        if (item._id === option._id) {
                                          return {
                                            _id: item._id,
                                            price: item.price,
                                          };
                                        } else {
                                          return {
                                            _id: optionPrices[index]._id,
                                            price: optionPrices[index].price,
                                          };
                                        }
                                      })
                                    );
                                  }}
                                  className="w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark"
                                >
                                  <RxReset className="w-4 h-4 self-center justify-self-center" />
                                </button>
                              </div>
                            </Form>
                          </div>
                        </React.Fragment>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <Divider />
            <TableLegend />
          </div>
        </>
      ) : (
        <div className="py-1">
          <Tips title="Dodaj cennik" items={itemsForTips}>
            <FormButton
              btnTitle="dodaj cennik"
              formClasses="my-2"
              id="add-pricelist"
              action="/pralma/formularz-cennika"
              btnClasses="w-auto h-auto px-2 py-1"
            >
              <span className="ml-2">Dodaj cennik</span>
            </FormButton>
          </Tips>
        </div>
      )}
    </section>
  );
}
PricesTable.propTypes = {
  priceList: PropTypes.object,
  avarageExchangeRate: PropTypes.shape({
    table: PropTypes.string,
    currency: PropTypes.string,
    code: PropTypes.string,
    rates: PropTypes.arrayOf(
      PropTypes.shape({
        no: PropTypes.string,
        ask: PropTypes.number,
        bid: PropTypes.number,
        effectiveData: PropTypes.string,
      })
    ),
  }),
};
PricesTable.defaultProps = {
  priceList: null,
  avarageExchangeRate: {
    table: 'C',
    currency: 'euro',
    code: 'EUR',
    rates: [
      {
        no: '046/C/NBP/2023',
        effectiveDate: new Date(
          new Date().setDate(new Date().getDate() - 1)
        ).toLocaleDateString('pl-PL'),
        bid: 1,
        ask: 1,
      },
    ],
  },
};
