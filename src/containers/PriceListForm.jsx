/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState, useRef } from 'react';
import {
  Form,
  useLoaderData,
  Link,
  useNavigate,
  useSubmit,
  useActionData,
} from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import RequiredIndicator from '../components/Required';
import SpinnerOverlay from '../components/SpinnerOverlay';
import FormLinks from '../components/Form/FormLinks';
import PageTitle from '../components/PageTitle/PageTitle';
import Message from '../components/Message';
import ActionButtons from '../components/Form/ActionButtons/ActionButtons';
import ActionButton from '../components/Form/ActionButtons/ActionButton/ActionButton';
import { GiSave } from 'react-icons/gi';
import {
  CheckIcon,
  ChevronUpDownIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { getCategories } from '../api/categories';
import { getProductsByCategoryId } from '../api/products';
import { formatFormData } from '../utils';
import { getControlsByCategoryId } from '../api/controls';
import { getHeatingsByCategoryId } from '../api/heating';
import { getOptionsByCategoryId } from '../api/option';
import { getVoltagesByCategoryId } from '../api/voltage';
import InputContainer from '../components/Form/InputContainer';
import Input from '../components/Form/Input';
import * as api from '../api/pricelist';
import ButtonToForm from '../components/Admin/ButtonToForm';
import Footer from './Footer/Footer';
import PageHeader from '../components/PageHeader/PageHeader';

export async function loader() {
  try {
    const categories = await getCategories();
    return { categories };
  } catch (error) {
    console.log(error.message);
  }
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = {};
  for (const [key, value] of formData) {
    formatFormData(data, key, value);
  }

  console.log('PriceListForm', data);
  let message = null;
  try {
    const createPriceListResponse = await api.createPriceList(data);
    console.log(createPriceListResponse);
    if (createPriceListResponse.message) {
      message = createPriceListResponse;
    }
    return { message };
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

export default function PriceListForm() {
  const { categories } = useLoaderData();
  const actionData = useActionData();
  const ref = useRef(null);

  const navigate = useNavigate();
  const submit = useSubmit();

  const [discount, setDiscount] = useState('0');
  const [controlPrices, setControlPrices] = useState([]);
  const [heatingPrices, setHeatingPrices] = useState([]);
  const [optionPrices, setOptionPrices] = useState([]);
  const [voltagePrices, setVoltagePrices] = useState([]);

  const [controls, setControls] = useState([]);
  const [heatings, setHeatings] = useState([]);
  const [options, setOptions] = useState([]);
  const [voltages, setVoltages] = useState([]);

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const handleReset = () => {
    setControls([]);
    setHeatings([]);
    setOptions([]);
    setVoltages([]);
    setSelectedCategory(categories[0]);
    setSelectedProduct('');
    setControlPrices([]);
    setHeatingPrices([]);
    setOptionPrices([]);
    setVoltagePrices([]);
    setDiscount('0');
  };
  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    let ignore = false;
    // console.log('REFRESH');
    // console.log('SelectedCategpry', selectedCategory);

    const fetchModels = async () => {
      try {
        if (!ignore) {
          const products = await getProductsByCategoryId(selectedCategory._id);
          setProducts(products);
          setSelectedProduct(products[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchControls = async () => {
      try {
        if (!ignore) {
          const controls = await getControlsByCategoryId(selectedCategory._id);
          setControls(controls);
          setControlPrices(
            Array.from({ length: controls.length }).map(() => ({
              price: 'N/A',
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchHeatings = async () => {
      try {
        if (!ignore) {
          const heatings = await getHeatingsByCategoryId(selectedCategory._id);
          setHeatings(heatings);
          setHeatingPrices(
            Array.from({ length: heatings.length }).map(() => ({
              price: 'N/A',
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchOptions = async () => {
      try {
        if (!ignore) {
          const options = await getOptionsByCategoryId(selectedCategory._id);

          setOptions(options);
          setOptionPrices(
            Array.from({ length: options.length }).map(() => ({
              product: '',
              option: '',
              price: 'N/A',
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchVoltages = async () => {
      try {
        if (!ignore) {
          const voltages = await getVoltagesByCategoryId(selectedCategory._id);

          setVoltages(voltages);
          setVoltagePrices(
            Array.from({ length: voltages.length }).map(() => ({
              price: 'N/A',
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (selectedCategory) {
      fetchModels();
      fetchControls();
      fetchHeatings();
      fetchOptions();
      fetchVoltages();
    }

    return () => {
      ignore = true;
    };
  }, [selectedCategory]);

  return (
    <>
      <SpinnerOverlay />
      <PageHeader ref={ref} bg="bg_admin" />
      <main className="pt-8 px-8 pb-16 bg-admin-light bg-opacity-20 relative">
        <Message
          text={actionData?.message.message}
          posY="top-4"
          posX="right-4"
        />
        <FormLinks />
        <PageTitle text="Formularz cennika" />
        <Form id="pricelist-form" method="post" className="relative max-w-4xl">
          <Message text="" posY="-bottom-8" posX="left-1/2 -translate-x-1/2" />
          {/** category */}
          <div className="category mb-4 bg-slate-200 border border-slate-300 px-4 pb-4 rounded">
            <Listbox
              value={selectedCategory}
              onChange={setSelectedCategory}
              name="category"
            >
              <Listbox.Label>
                <RequiredIndicator>
                  <h3 className="text-left mr-1">Kategoria</h3>
                </RequiredIndicator>
              </Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md">
                  <span className="flex justify-between items-center">
                    <span className="block truncate whitespace-normal">
                      {selectedCategory.title}
                    </span>
                    <span className="truncate font-semibold">
                      {selectedCategory.coin ? 'COIN' : 'OPL'}
                    </span>
                  </span>
                  <span className="absolute right-0 inset-y-0 flex items-center bg-accent border border-accent-dark rounded-tr-md rounded-br-md h-full">
                    <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="bg-slate-50 absolute z-[1] mt-2 max-h-60 w-full overflow-auto rounded-md py-2 text-base shadow-2xl focus: outline focus:outline-offset-0 focus: outline-1 focus: outline-accent-dark">
                    {categories.map((category) => (
                      <Listbox.Option
                        key={category._id}
                        className={({ active }) => {
                          return `relative cursor-default select-none  text-sm font-normal text-black-dark   ${
                            active ? 'bg-accent' : 'bg-slate-50'
                          }`;
                        }}
                        value={category}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate py-3 pl-10 pr-4 ${
                                selected
                                  ? 'font-semibold bg-primary text-white'
                                  : 'font-normal'
                              }`}
                            >
                              <span className="flex justify-between items-center">
                                <span className="truncate">
                                  {category.title}
                                </span>
                                <span className="truncate font-semibold">
                                  {category.coin ? 'COIN' : 'OPL'}
                                </span>
                              </span>
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          {/** end category */}
          {/** products */}
          {products.length ? (
            <div className="category mb-4 bg-slate-200 border border-slate-300 px-4 pb-4 rounded">
              <Listbox
                value={selectedProduct}
                onChange={setSelectedProduct}
                name="product"
              >
                <Listbox.Label>
                  <RequiredIndicator>
                    <h3 className="text-left mr-1">Produkt</h3>
                  </RequiredIndicator>
                </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md">
                    <span className="flex justify-between items-center">
                      <span className="block truncate whitespace-normal">
                        {selectedProduct?.model}
                      </span>
                    </span>
                    <span className="absolute right-0 inset-y-0 flex items-center bg-accent border border-accent-dark rounded-tr-md rounded-br-md h-full">
                      <ChevronUpDownIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="bg-slate-50 absolute z-[1] mt-2 max-h-60 w-full overflow-auto rounded-md py-2 text-base shadow-2xl focus: outline focus:outline-offset-0 focus: outline-1 focus: outline-accent-dark">
                      {products.map((product) => (
                        <Listbox.Option
                          key={product._id}
                          className={({ active }) => {
                            return `relative cursor-default select-none  text-sm font-normal text-black-dark   ${
                              active ? 'bg-accent' : 'bg-slate-50'
                            }`;
                          }}
                          value={product}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate py-3 pl-10 pr-4 ${
                                  selected
                                    ? 'font-semibold bg-primary text-white'
                                    : 'font-normal'
                                }`}
                              >
                                <span className="flex justify-between items-center">
                                  <span className="truncate">
                                    {product.model}
                                  </span>
                                </span>
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          ) : null}
          {/** end products */}
          {/** controls */}
          {controls.length ? (
            <div className="p-4 border border-slate-300 bg-slate-200 mb-4 rounded">
              <h3 className="text-left uppercase bg-slate-300 border border-slate-400 text-black-dark px-2 py-3 rounded">
                Sterowniki
              </h3>
              {controls.map((control, index) => {
                return (
                  <div
                    id={control._id}
                    key={control._id}
                    className="grid sm:grid-cols-2 auto-rows-max gap-4 py-1"
                  >
                    <Link
                      to={`/sterowniki-urzadzen-pralniczych#${control.name}`}
                      className="self-center font-semibold bg-accent border border-accent-dark p-1 max-w-[200px] text-center hover:bg-accent-light transition-all duration-150"
                    >
                      {control.name}
                    </Link>
                    <input
                      hidden
                      name={`controls[${index}].name`}
                      defaultValue={control.name}
                      readOnly={true}
                    />
                    <InputContainer classes="self-center mb-0">
                      <Input
                        ariaLabel="price"
                        id={`Price_${control._id}`}
                        type="text"
                        error=""
                        classes=""
                        name={`controls[${index}].price`}
                        value={controlPrices[index].price}
                        onChange={(e) => {
                          const copyControlPrices = [...controlPrices];
                          copyControlPrices[index].price = e.target.value;
                          setControlPrices(copyControlPrices);
                        }}
                        onFocus={() => {}}
                        placeholder="cena,N/A,N/E,-"
                      />
                    </InputContainer>
                  </div>
                );
              })}
            </div>
          ) : null}
          {/** heatings */}
          {heatings.length ? (
            <div className="p-4 border border-slate-300 bg-slate-200 mb-4 rounded">
              <h3 className="text-left uppercase bg-slate-300 border border-slate-400 text-black-dark px-2 py-3 rounded">
                Podgrzew
              </h3>
              {heatings.map((heating, index) => {
                return (
                  <div
                    id={heating._id}
                    key={heating._id}
                    className="grid sm:grid-cols-2 auto-rows-max gap-4  py-1"
                  >
                    <div className="relative self-center font-medium text-sm">
                      {heating.name}
                    </div>
                    <input
                      hidden
                      name={`heatings[${index}].name`}
                      defaultValue={heating.name}
                      readOnly={true}
                    />
                    <InputContainer classes="self-center mb-0">
                      <Input
                        ariaLabel="price"
                        id={`Price_${heating._id}`}
                        type="text"
                        error=""
                        classes=""
                        name={`heatings[${index}].price`}
                        value={heatingPrices[index].price}
                        onChange={(e) => {
                          const copyHeatingPrices = [...heatingPrices];
                          copyHeatingPrices[index].price = e.target.value;
                          setHeatingPrices(copyHeatingPrices);
                        }}
                        onFocus={() => {}}
                        placeholder="cena,N/A,N/E,-"
                      />
                    </InputContainer>
                  </div>
                );
              })}
            </div>
          ) : null}
          {/** options */}
          {options.length ? (
            <div className="p-4 border border-slate-300 bg-slate-200 mb-4 rounded">
              <h3 className="text-left uppercase bg-slate-300 border border-slate-400 text-black-dark px-2 py-3 rounded">
                Opcje
              </h3>
              {options.map((option, index) => {
                return (
                  <div
                    id={option._id}
                    key={option._id}
                    className="grid sm:grid-cols-2 auto-rows-max gap-4  py-1"
                  >
                    <div className="self-center font-medium text-sm">
                      {option.name}
                    </div>
                    <input
                      hidden
                      name={`options[${index}].name`}
                      defaultValue={option.name}
                      readOnly={true}
                    />
                    <InputContainer classes="self-center mb-0">
                      <Input
                        ariaLabel="price"
                        id={`Price_${option._id}`}
                        type="text"
                        error=""
                        classes=""
                        name={`options[${index}].price`}
                        value={optionPrices[index].price}
                        onChange={(e) => {
                          const copyOptionPrices = [...optionPrices];
                          copyOptionPrices[index].price = e.target.value;
                          setOptionPrices(copyOptionPrices);
                        }}
                        onFocus={() => {}}
                        placeholder="cena,N/A,N/E,-"
                      />
                    </InputContainer>
                  </div>
                );
              })}
            </div>
          ) : null}
          {/** voltages */}
          {voltages.length ? (
            <div className="p-4 border border-slate-300 bg-slate-200 mb-4 rounded">
              <h3 className="text-left uppercase bg-slate-300 border border-slate-400 text-black-dark px-2 py-3 rounded">
                Zasilanie
              </h3>
              {voltages.map((voltage, index) => {
                return (
                  <div
                    id={voltage._id}
                    key={voltage._id}
                    className="grid sm:grid-cols-2 auto-rows-max gap-4  py-1"
                  >
                    <div className="self-center font-medium text-sm">
                      {voltage.name}
                    </div>
                    <input
                      hidden
                      name={`voltages[${index}].name`}
                      defaultValue={voltage.name}
                      readOnly={true}
                    />
                    <InputContainer classes="self-center mb-0">
                      <Input
                        ariaLabel="price"
                        id={`Price_${voltage._id}`}
                        type="text"
                        error=""
                        classes=""
                        name={`voltages[${index}].price`}
                        value={voltagePrices[index].price}
                        onChange={(e) => {
                          const copyVoltagePrices = [...voltagePrices];
                          copyVoltagePrices[index].price = e.target.value;
                          setVoltagePrices(copyVoltagePrices);
                        }}
                        onFocus={() => {}}
                        placeholder="cena,N/A,N/E,-"
                      />
                    </InputContainer>
                  </div>
                );
              })}
            </div>
          ) : null}
          {/** discount */}
          <InputContainer classes="w-1/2">
            <Input
              classes=""
              type="text"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              label="Upust od Primus'a"
              onFocus={() => setDiscount('')}
              placeholder="procent upustu od Primus'a"
            />
          </InputContainer>
          {/** action buttons */}
          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton
              type="submit"
              title={`zapisz cennik`}
              label={`zapisz cennik`}
            >
              <GiSave className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
            </ActionButton>
          </ActionButtons>
          {/** end action buttons */}
        </Form>
      </main>
      <Footer />
    </>
  );
}
