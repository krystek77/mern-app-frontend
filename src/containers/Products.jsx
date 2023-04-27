import React, { useEffect } from "react";
import { useLoaderData, redirect, Link, useNavigation } from "react-router-dom";
import * as api from "../api/products";

import Cards from "../components/Cards/Cards";
import Card from "../components/Card/Card";
import ModelName from "../components/ModelName/ModelName";
import NoItems from "../components/NoItems/NoItems";
import Overlay from "../components/Overlay/Overlay";
import List from "../components/Overlay/List/List";
import Button from "../components/Overlay/Button/Button";
import Thumbnail from "../components/Overlay/Thumbnail/Thumbnail";
import PageTitle from "../components/PageTitle/PageTitle";
import AsideLinks from "../components/AsideLinks/AsideLinks";
import FormButton from "../components/Admin/FormButton";
import Divider from "../components/Divider";
import Footer from "./Footer/Footer";
import { TrashIcon } from "@heroicons/react/20/solid";
import { AiFillCopy } from "react-icons/ai";
import SpinnerOverlay from "../components/SpinnerOverlay";
import { getControlsByCategoryId } from "../api/controls";
import { getPriceListsByCategoryId } from "../api/pricelist";
import { getAvarageExchangeRate } from "../api/nbp";
import PriceListProductsTable from "../components/PricesTable/PriceListProductsTable";
import Header from "../components/Header/Header";
import SearchForm from "../components/SearchFrom";
import Tips from "../components/Admin/Tips/Tips";
import * as userAPI from "../utils/user";
import { v4 as uuidV4 } from "uuid";
import ContactForm from "../components/ContactForm";
import CompanyData from "../components/CompanyData";
import ContactsData from "../components/ContactsData/ContactsData";

const tipItems = [
  {
    _id: uuidV4(),
    to: "/pralma/formularz-sterownika",
    text: "Dodaj sterowniki, gdy ich brak na formularzu produktu",
  },
  {
    _id: uuidV4(),
    to: "/pralma/formularz-dokumentu",
    text: "Dodaj dokumenty, gdy ich brak na formularzu produktu",
  },
  {
    _id: uuidV4(),
    to: "/pralma/formularz-tagu",
    text: "Dodaj tagi, gdy ich brak na formularzu produktu",
  },
  {
    _id: uuidV4(),
    to: "/pralma/formularz-produktu",
    text: "Następnie dodaj produkt",
  },
];

export async function loader({ params, request }) {
  const { categoryName } = params;
  const url = new URL(request.url);
  const queryTitle = url.searchParams.get("title");
  const user = userAPI.checkAdmin();
  const data = {
    user: user,
    priceLists: [],
    controls: [],
    message: "",
    categoryId: null,
    products: [],
    avarageExchangeRate: null,
    queryTitle: queryTitle,
  };

  try {
    const responseProducts = await api.getProductsByCategoryName(categoryName);
    if (responseProducts.message) {
      data.message = responseProducts.message;
    } else {
      data.products = responseProducts;
    }
    const avarageExchangeRate = await getAvarageExchangeRate();
    data.avarageExchangeRate = avarageExchangeRate;

    const productsOPL = data.products.filter((product) => product.cat[0].coin === false);
    const productsCOIN = data.products.filter((product) => product.cat[0].coin === true);

    if (
      productsOPL.length &&
      url.pathname === `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${categoryName}`
    ) {
      data.categoryId = productsOPL[0].cat[0]._id;
      if (data.categoryId) {
        const responseControls = await getControlsByCategoryId(data.categoryId);
        if (responseControls.message) {
          data.message = responseControls.message;
        } else {
          data.controls = responseControls;
        }
      }
    }
    if (
      productsCOIN.length &&
      url.pathname === `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${categoryName}`
    ) {
      data.categoryId = productsCOIN[0].cat[0]._id;
      if (data.categoryId) {
        const responseControls = await getControlsByCategoryId(data.categoryId);
        if (responseControls.message) {
          data.message = responseControls.message;
        } else {
          data.controls = responseControls;
        }
      }
    }
    if (data.categoryId) {
      const responseRriceLists = await getPriceListsByCategoryId(data.categoryId);
      if (responseRriceLists.message) {
        data.message = responseRriceLists.message;
      } else {
        data.priceLists = responseRriceLists;
      }
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
export async function action({ params, request }) {
  const { model, categoryName } = params;
  const url = new URL(request.url);

  if (
    model &&
    url.pathname ===
      `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${categoryName}/model/${encodeURIComponent(
        model
      )}/skasuj`
  ) {
    await api.deleteProduct(model);
    return redirect(`/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${categoryName}`);
  }
  if (
    model &&
    url.pathname ===
      `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${categoryName}/model/${encodeURIComponent(model)}/skasuj`
  ) {
    await api.deleteProduct(model);
    return redirect(`/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${categoryName}`);
  }
}

export default function Products({ coin }) {
  const navigation = useNavigation();
  const { products, controls, priceLists, avarageExchangeRate, user, queryTitle } = useLoaderData();

  const data = coin ? products.filter((p) => p.coin === true) : products.filter((p) => p.coin === false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [navigation.location]);

  return (
    <div className="pt-16">
      <SpinnerOverlay />
      <Header
        bgGradient={
          coin
            ? 'bg-gradient-radial-circle-from-cc-accent'
            : 'bg-gradient-radial-circle-from-cc-primary'
        }
        title={
          coin
            ? 'Wyposażenie nowoczesnej pralni samoobsługowej'
            : 'Wyposażenie nowoczesnej i ekonomicznej pralni przemysłowej każdego rodzaju i wielkości'
        }
      >
        <SearchForm queryTitle={queryTitle} />
      </Header>
      <main className="px-8 pb-12 relative">
        <PageTitle text={data[0]?.cat[0].title} />

        <p className="text-md font-light mb-6 max-w-4xl">{data[0]?.cat[0].desc}</p>
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          {/** Products cards */}
          <div className="">
            {data.length ? (
              <Cards>
                {data.map((product) => (
                  <div
                    key={product._id}
                    className={
                      product.wide
                        ? 'md:col-span-2 flex flex-col justify-between'
                        : 'flex flex-col justify-between'
                    }
                  >
                    <Card
                      item={product}
                      to={`model/${product.model}`}
                      btnLabel="poznaj produkty"
                      widthImg={`${
                        product.wide ? 'max-w-[400px]' : 'max-w-[200px]'
                      }`}
                      heightImg="max-h-[290px]"
                    >
                      <ModelName name={product.model} />
                      <h3 className="order-3">{product.title}</h3>
                      <Overlay>
                        <Thumbnail
                          src={product.icon}
                          alt={`${product.title}_thumbnail`}
                        />
                        <List list_items={product.features} />
                        <Button label="szczegóły" />
                      </Overlay>
                    </Card>
                    {user ? (
                      <div className="py-2 flex justify-end items-center flex-wrap">
                        <FormButton
                          btnTitle="kopiuj produkt i utwórz nowy na jego podstawie"
                          formClasses=""
                          id="copy-product-and-create-one-new"
                          action={`/pralma/formularz-produktu/${product.cat[0].slug}/model/${product.model}/kopiuj`}
                          btnClasses="w-auto h-auto px-2 py-1"
                          method="GET"
                          Icon={AiFillCopy}
                        />
                        <FormButton
                          btnTitle="edytuj produkt"
                          formClasses=""
                          id="edit-product"
                          action={`/pralma/formularz-produktu/${product.cat[0].slug}/model/${product.model}/edytuj`}
                          btnClasses="w-auto h-auto px-2 py-1"
                        />
                        <FormButton
                          btnTitle="skasuj produkt"
                          formClasses=""
                          id="delete-product"
                          action={`model/${product.model}/skasuj`}
                          btnClasses="w-auto h-auto px-2 py-1"
                          Icon={TrashIcon}
                          method="post"
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </Cards>
            ) : (
              <NoItems msg="Brak produktów w tej kategorii" />
            )}
            {user ? (
              <>
                <div className="xl:col-span-2">
                  <Tips title="Dodawanie produktu" items={tipItems}>
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
                {priceLists.length ? (
                  <PriceListProductsTable
                    priceLists={priceLists}
                    avarageExchangeRate={avarageExchangeRate}
                    cols={priceLists.length && priceLists.length + 2}
                  />
                ) : (
                  <NoItems msg="Żaden cennik nie został dodany" />
                )}
              </>
            ) : null}
            {/** controls */}
            <div className="controls mb-8">
              <PageTitle text="Dostępne sterowniki urządzeń" />
              {controls.length ? (
                <div className="controls-list grid gap-y-4 gap-x-4 auto-rows-max sm:grid-cols-2 lg:grid-cols-3">
                  {controls.map((control) => (
                    <Link
                      title="więcej informacji"
                      to={`/sterowniki-urzadzen-pralniczych#${control.name}`}
                      className="group border border-slate-300 block control-item relative min-w-[210px] max-w-[300px] mx-auto p-4 rounded hover:bg-accent-light hover:border-accent-dark transition-all duration-300"
                      key={control._id}
                    >
                      <h3 className="absolute bottom-0 left-0 bg-slate-300 text-black-dark w-full my-0 p-2 group-hover:bg-slate-100 transition-all duration-300">
                        {control.name}
                      </h3>
                      <div className="">
                        <img
                          className=""
                          src={control.image}
                          alt={control.name}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <NoItems msg="Brak dodanych sterowników" />
              )}
            </div>
          </div>

          <AsideLinks />
        </div>
      </main>
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
    </div>
  );
}
