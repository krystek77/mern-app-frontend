import React, { useReducer, useState } from 'react';
import { useLoaderData, Form, useNavigate, redirect } from 'react-router-dom';
import CircleListType from '../components/CircleListType';

import { fileTypeIcon, getExtensionFile } from '../utils';
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import * as api from '../api/products';
import { useScrollIntoView } from '../hooks/scrollIntoView';
import Cards from '../components/Cards/Cards';
import Card from '../components/Card/Card';
import CardImage from '../components/CardImage/CardImage';
import NoItems from '../components/NoItems/NoItems';
import ModelName from '../components/ModelName/ModelName';
import Overlay from '../components/Overlay/Overlay';
import List from '../components/Overlay/List/List';
import Button from '../components/Overlay/Button/Button';
import AsideLinks from '../components/AsideLinks/AsideLinks';
import { TOGGLE_TAB, openMultipleTabReducer } from '../reducers/tabs';
import FormButton from '../components/Admin/FormButton';
import Divider from '../components/Divider';
import Footer from './Footer/Footer';
import SpinnerOverlay from '../components/SpinnerOverlay';
import {
  getPriceList,
  updatePriceControl,
  updatePriceHeating,
  updatePriceOption,
  updatePriceVoltage,
} from '../api/pricelist';
import { getAvarageExchangeRate } from '../api/nbp';
import PricesTable from '../components/PricesTable/PricesTable';
import { IoReturnDownBackSharp } from 'react-icons/io5';
import Header from '../components/Header/Header';
import SearchForm from '../components/SearchFrom';
import { formatFormData } from '../utils';
import * as userAPI from '../utils/user';
import Tips from '../components/Admin/Tips/Tips';
import Dates from '../components/Dates';
import PageTitle from '../components/PageTitle/PageTitle';
import ContactForm from '../components/ContactForm';
import CompanyData from '../components/CompanyData';
import ContactsData from '../components/ContactsData/ContactsData';

export async function loader({ params, request }) {
  const { model, categoryName } = params;
  const user = userAPI.checkAdmin();
  const url = new URL(request.url);
  const queryTags = url.searchParams.get('tags');
  const queryTitle = url.searchParams.get('title');
  const data = {
    message: '',
    priceList: null,
    user: user,
    product: null,
    similarProducts: [],
    avarageExchangeRate: null,
    queryTags: queryTags,
    queryTitle: queryTitle,
    url: url,
    categoryName: categoryName,
  };

  try {
    const responseProduct = await api.getProductDetailsByModel(model);
    if (responseProduct.message) {
      data.message = responseProduct.message;
    } else {
      data.product = responseProduct;
    }
    const responseSimilarProducts = await api.getProductsByTags(
      queryTags,
      model
    );
    if (responseSimilarProducts.message) {
      data.message = responseSimilarProducts.message;
    } else {
      data.similarProducts = responseSimilarProducts;
    }
    const responseAvarageExchangeRate = await getAvarageExchangeRate();
    data.avarageExchangeRate = responseAvarageExchangeRate;

    const responsePriceList = await getPriceList(data.product._id);
    if (responsePriceList.message) {
      data.message = responsePriceList.message;
    } else {
      data.priceList = responsePriceList;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function action({ params, request }) {
  const url = new URL(request.url);
  const { priceListId } = params;
  const data = {};
  try {
    const formData = await request.formData();
    for (let [key, value] of formData) {
      formatFormData(data, key, value);
    }

    if (data.control) {
      await updatePriceControl(data, priceListId);
    }
    if (data.heating) {
      await updatePriceHeating(data, priceListId);
    }
    if (data.voltage) {
      await updatePriceVoltage(data, priceListId);
    }
    if (data.option) {
      await updatePriceOption(data, priceListId);
    }
    const pathToRedirect = url.pathname.split('/').slice(0, -3).join('/');
    return redirect(pathToRedirect);
  } catch (error) {
    console.log(error.message);
  }
}

export default function ProductDetails() {
  const {
    product,
    queryTags,
    queryTitle,
    similarProducts,
    priceList,
    avarageExchangeRate,
    user,
    categoryName,
  } = useLoaderData();

  const [tabIndexes, dispatch] = useReducer(openMultipleTabReducer, [0]);
  const [tags, setTags] = useState(() => (queryTags ? queryTags : ''));

  const navigate = useNavigate();
  const { ref } = useScrollIntoView(product.model);
  const [controlPrices, setControlPrices] = useState(
    priceList?.controls.map((item) => ({ _id: item._id, price: item.price }))
  );
  const [heatingPrices, setHeatingPrices] = useState(
    priceList?.heatings.map((item) => ({ _id: item._id, price: item.price }))
  );
  const [voltagePrices, setVoltagePrices] = useState(
    priceList?.voltages.map((item) => ({ _id: item._id, price: item.price }))
  );
  const [optionPrices, setOptionPrices] = useState(
    priceList?.options.map((item) => ({ _id: item._id, price: item.price }))
  );

  const handleTags = (tag) => {
    if (tags.split(',').includes(tag)) {
      setTags(
        tags
          .split(',')
          .filter((t) => t !== tag)
          .join(',')
      );
    } else {
      if (tags === '') {
        setTags(tags.concat(tag));
      } else {
        setTags(tags.concat(`,${tag}`));
      }
    }
  };

  return (
    <>
      <SpinnerOverlay />
      <Header
        ref={ref}
        bgGradient={
          product.coin
            ? 'bg-gradient-radial-circle-from-cc-accent'
            : 'bg-gradient-radial-circle-from-cc-primary'
        }
        title={
          product.coin
            ? `Ekonomia i ekologia - ${product.title} samoobsługowa, model: --- ${product.model} ---`
            : `Ekonomia i ekologia - ${product.title}, model: --- ${product.model} --- `
        }
      >
        <SearchForm queryTitle={queryTitle} />
      </Header>
      <main className="px-8 pb-8 pt-16 mx-auto relative">
        {/** back to category of product */}
        <button
          title="powrót do kategorii produktu"
          className="group flex flexc-col justify-center items-center absolute top-4 right-4 w-6 h-6 rounded-sm border border-slate-700 bg-slate-400 hover:bg-slate-200 hover:border-slate-500 transition-all duration-150"
          onClick={() => {
            navigate(
              product.coin
                ? `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${categoryName}`
                : `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${categoryName}`
            );
          }}
        >
          <IoReturnDownBackSharp className="text-slate-50 font-bold group-hover:text-slate-500" />
        </button>
        {user ? (
          <div>
            <Tips>
              <FormButton
                btnTitle="dodaj produkt"
                formClasses="my-2"
                id="add-product"
                action="/pralma/formularz-produktu"
                btnClasses="w-auto h-auto px-2 py-1"
              >
                <span className="ml-2">Dodaj produkt</span>
              </FormButton>
            </Tips>
            <Divider classes="h-px bg-admin-dark" />
          </div>
        ) : null}
        <Dates createdAt={product.createdAt} updatedAt={product.updatedAt} />
        <Divider classes="h-px bg-slate-200 max-w-md mx-auto" />
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <article
            className={
              product.wide
                ? 'grid grid-cols-1 xl:gap-y-4 auto-rows-max'
                : 'grid lg:grid-cols-2 xl:gap-x-4 self-baseline'
            }
          >
            {/** LEFT SIDE */}
            <header className="justify-self-center">
              <ModelName name={product.model} textSize="text-lg" />
              <CardImage
                src={product.image}
                alt={product.title}
                height={product.wide ? 'max-h-[430px]' : 'max-h-[430px]'}
                width={product.wide ? 'max-h-[600px]' : 'max-w-[300px]'}
              />
              <h2
                className={
                  product.wide
                    ? 'lowercase text-center text-lg max-w-xs text-black-dark mx-auto'
                    : 'lowercase text-center text-lg max-w-xs text-black-dark mx-auto'
                }
              >
                {product.title}
              </h2>
            </header>
            {/** RIGHT SIDE */}
            <div className="self-center">
              {user ? (
                <>
                  <div className="md:hidden flex">
                    <FormButton
                      btnTitle="edytuj produkt"
                      id="edit-product"
                      action={`/pralma/formularz-produktu/${product.category.slug}/model/${product.model}/edytuj`}
                      btnClasses="w-auto h-auto px-2 py-1"
                    >
                      <span className="ml-2">Edytuj</span>
                    </FormButton>
                    <FormButton
                      btnTitle="skasuj produkt"
                      formClasses=""
                      id="delete-product"
                      action="skasuj"
                      btnClasses="w-auto h-auto px-2 py-1"
                      Icon={TrashIcon}
                      method="post"
                    >
                      <span className="ml-2">Skasuj</span>
                    </FormButton>
                  </div>
                  <Divider classes="md:hidden h-px bg-admin-dark" />
                </>
              ) : null}
              <h3 className="text-left text-base">Podstawowe cechy</h3>
              <ul className="relative mb-4">
                {product.features.map((feature, index) => (
                  <li
                    key={`${index + 1}.${feature}`}
                    className="relative max-w-max pl-4 py-1 text-md font-normal text-black-dark "
                  >
                    <CircleListType size={'8px'} top={'50%'} left={'0'} />
                    {feature}
                  </li>
                ))}
              </ul>
              {user ? (
                <>
                  <div className="hidden md:flex">
                    <FormButton
                      btnTitle="edytuj produkt"
                      id="edit-product"
                      action={`/pralma/formularz-produktu/${product.category.slug}/model/${product.model}/edytuj`}
                      btnClasses="w-auto h-auto px-2 py-1"
                    >
                      <span className="ml-2">Edytuj</span>
                    </FormButton>
                    <FormButton
                      btnTitle="skasuj produkt"
                      formClasses=""
                      id="delete-product"
                      action="skasuj"
                      btnClasses="w-auto h-auto px-2 py-1"
                      Icon={TrashIcon}
                      method="post"
                    >
                      <span className="ml-2">Skasuj</span>
                    </FormButton>
                  </div>
                  <Divider classes="h-px bg-admin-dark" />
                </>
              ) : null}
            </div>
            {/** FULL WIDTH */}
            <div className={product.wide ? 'col-span-1' : 'lg:col-span-2'}>
              <p className="text-md text-black-dark my-8 max-w-4xl">{product.body}</p>
              {/** SPECYFICATION */}
              <div className="specyfication w-full mb-4">
                <h3 className="text-left text-base">Parametry techniczne</h3>
                <div className="table-head grid grid-cols-3 items-center border bg-primary text-white border-primary-dark rounded-tr rounded-tl">
                  <span className="pl-4 py-2 justify-self-start font-bold">
                    nazwa
                  </span>
                  <span className="py-2 justify-self-center font-bold">
                    jednostka
                  </span>
                  <span className="pr-4 py-2 justify-self-end font-bold">
                    wartość
                  </span>
                </div>
                <div className="[&>*:nth-child(even)]:bg-accent-light">
                  {product.parameters.map((parameter) => (
                    <div
                      key={parameter._id}
                      className="grid grid-cols-3 items-center border-b border-accent-dark "
                    >
                      <span className="pl-4 py-2 font-medium">
                        {parameter.name}
                      </span>
                      <span className="py-2 font-medium justify-self-center">
                        {parameter.unit}
                      </span>
                      <span className="pr-4 py-2 font-medium justify-self-end">
                        {parameter.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/** DOCUMENTS */}
              <div className="documents mb-4">
                <h3 className="text-left text-base">Dokumenty</h3>
                {product.documents.map((document) => (
                  <a
                    className="flex justify-start items-center py-2 mb-1"
                    key={document._id}
                    target="_blank"
                    rel="noreferrer"
                    href={`http://localhost:4000/assets/documents/${document.filename}`}
                  >
                    {fileTypeIcon(getExtensionFile(document.filename))}
                    <span>{document.displayFileName}</span>
                  </a>
                ))}
              </div>
              {/** CONTROLS */}
              <div className="controls mb-4">
                <h3 className="text-left text-base">Sterowniki</h3>
                <div className="controls-tabs grid">
                  {product.controls.map((control, index) => {
                    return (
                      <div className="tab" key={control._id}>
                        <button
                          className="group tab-button flex justify-between items-center cursor-pointer w-full bg-primary border border-primary-dark text-white px-4 py-2 rounded-tr rounded-tl hover:bg-primary-light"
                          type="button"
                          onClick={() => dispatch({ type: TOGGLE_TAB, index })}
                        >
                          <span>{control.name}</span>
                          <span className="flex justify-end items-center">
                            {tabIndexes.includes(index) ? (
                              <ArrowSmallUpIcon className=" group-hover:bg-accent group-hover:border-accent-dark group-hover:text-black-dark w-6 h-6 mb-2 bg-primary flex items-center justify-center border border-primary-dark rounded text-sm font-medium text-white hover:shadow-lg" />
                            ) : (
                              <ArrowSmallDownIcon className=" group-hover:bg-accent group-hover:border-accent-dark w-6 h-6 bg-slate-50 flex items-center justify-center border border-slate-200 rounded text-sm font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark" />
                            )}
                          </span>
                        </button>
                        <div
                          className={`overflow-hidden mt-2 max-h-0 ${
                            tabIndexes.includes(index) && 'max-h-[800px]'
                          } transition-all`}
                        >
                          <div className="tab-content border mb-2 border-accent-dark rounded-bl rounded-br bg-slate-100 py-2 px-4 grid grid-cols-2 gap-x-4">
                            <div className="tab-image justify-self-center self-center max-w-[300px] max-h-[200px] ">
                              <img
                                className="object-fit w-full h-full"
                                src={control.image}
                                alt={control.name}
                              />
                            </div>
                            {control.list.length ? (
                              <ul className="tab-list justify-self-center self-center">
                                {control.list.map((item) => (
                                  <li
                                    className="relative max-w-max pl-4 py-1 text-md font-normal text-black-dark "
                                    key={item}
                                  >
                                    <CircleListType
                                      size={'8px'}
                                      top={'50%'}
                                      left={'0'}
                                    />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/** pricelist */}
            {user ? (
              <div
                className={
                  product.wide
                    ? 'max-w-2xl col-span-1 relative'
                    : 'max-w-2xl lg:col-span-2 relative'
                }
              >
                <PricesTable
                  priceList={priceList}
                  avarageExchangeRate={avarageExchangeRate}
                  setControlPrices={setControlPrices}
                  setHeatingPrices={setHeatingPrices}
                  setOptionPrices={setOptionPrices}
                  setVoltagePrices={setVoltagePrices}
                  controlPrices={controlPrices}
                  heatingPrices={heatingPrices}
                  optionPrices={optionPrices}
                  voltagePrices={voltagePrices}
                />
              </div>
            ) : null}
          </article>
          {/** ASIDE LINKS */}
          <AsideLinks />
        </div>
      </main>
      <section className="container px-8 pb-12 mx-auto">
        <h3 className="text-left text-base">Tagi</h3>
        <div className="">
          <div className="tags bg-slate-200 py-4 px-4 rounded">
            {product.tags.length ? (
              <Form className="flex items-center justify-start flex-wrap">
                <input type="hidden" name="tags" value={tags} />
                {product.tags.map((t) => (
                  <label
                    className="block border py-1 px-2 mb-2 mr-2 rounded text-sm cursor-pointer bg-accent-light border-accent hover:bg-accent hover:border-accent-dark"
                    key={t._id}
                  >
                    <input
                      className="mr-4"
                      type="checkbox"
                      checked={tags.split(',').includes(t.name)}
                      value={t.name}
                      onChange={(e) => {
                        handleTags(e.target.value);
                      }}
                    />
                    <span>{t.name}</span>
                  </label>
                ))}
                <div className="w-full action-buttons flex justify-center mt-2">
                  <button
                    className="grid grid-cols-2 items-center border border-slate-800 px-2 py-1 mx-2 rounded text-xs hover:shadow-lg"
                    type="submit"
                    title="szukaj"
                  >
                    <ArchiveBoxArrowDownIcon className="w-6 h-6 self-center justify-self-center" />
                    <span className="self-center justify-self-center lowercase">
                      Szukaj
                    </span>
                  </button>
                  <button
                    className="grid grid-cols-2 items-center border border-slate-800 px-2 py-1 mx-2 rounded text-xs hover:shadow-lg"
                    type="button"
                    title="anuluj"
                    onClick={() => {
                      setTags('');
                      navigate('', { relative: true });
                    }}
                  >
                    <ArchiveBoxXMarkIcon className="w-6 h-6 self-center justify-self-center" />
                    <span className="self-center justify-self-center lowercase">
                      Anuluj
                    </span>
                  </button>
                </div>
              </Form>
            ) : (
              <div className="col-span-5 text-lg font-light text-slate-500">
                Produkt nie ma zdefiniowanycyh tagów
              </div>
            )}
          </div>
          <h3 className="text-left text-lg">Podobne urządzenia</h3>

          {/** Similar product cards */}
          {similarProducts.length ? (
            <Cards>
              {similarProducts.map((item) => (
                <Card
                  key={item._id}
                  item={item}
                  to={`/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${item.category.slug}/model/${item.model}`}
                  btnLabel="poznaj szczegóły"
                  widthImg={item.wide ? 'max-w-[300px]' : 'max-w-[150px]'}
                  heightImg={item.wide ? 'max-h-[215px]' : 'max-h-[215px]'}
                >
                  <ModelName name={item.model} textSize="text-sm" />
                  <h4 className=" order-3 lowercase font-bold text-center text-sm max-w-xs text-black-dark">
                    {item.title}
                  </h4>
                  <Overlay>
                    <List list_items={item.features} />
                    <Button label="poznaj szczegóły" />
                  </Overlay>
                </Card>
              ))}
            </Cards>
          ) : (
            <NoItems msg="Brak podobnych produktów" />
          )}
        </div>
      </section>
      {/** contact form */}
      <section id="contactForm" className="py-12 bg-slate-200">
        <div className="pl-4">
          <PageTitle text="Formularz kontaktowy" />
        </div>
        <ContactForm />
        <ContactsData />
        <CompanyData />
      </section>
      <Footer />
    </>
  );
}
