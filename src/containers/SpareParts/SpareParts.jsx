/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useRef } from "react";
import { useLoaderData, Link, redirect, useActionData } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import AsideLinks from "../../components/AsideLinks/AsideLinks";
import SparePartCard from "./SparePartCard/SparePartCard";
import NoItems from "../../components/NoItems/NoItems";
import SpinnerOverlay from "../../components/SpinnerOverlay";
import CountIndicator from "../../components/CountIndicator";
import Footer from "../Footer/Footer";
import * as api from "../../api/sparepart";
import { categoryNames } from "../../constants";
import { useScrollIntoView } from "../../hooks";
import FormButtonsLink from "../../components/Admin/FormButtonsLink/FormButtonsLink";
import Dialog from "../../components/Dialog/Dialog";
import * as userAPI from "../../utils/user";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Header/Header";
import ContactForm from "../../components/ContactForm";
import ContactsData from "../../components/ContactsData/ContactsData";
import CompanyData from "../../components/CompanyData";

export async function loader() {
  const data = { user: userAPI.checkAdmin(), mappedSparePartsList: [] };
  try {
    const sparePartsList = await api.getAllSpareParts();
    categoryNames.forEach((categoryName) => {
      const tmp = {};
      tmp[categoryName] = [];
      sparePartsList.forEach((sparepart) => {
        if (sparepart.categoryId.title === categoryName) {
          tmp[categoryName].push(sparepart);
        }
      });
      data.mappedSparePartsList.push(tmp);
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function action({ params }) {
  const { sparePartId } = params;
  const data = { message: "" };
  try {
    const responseDeleteSparePart = await api.deleteSparePart(sparePartId);
    if (responseDeleteSparePart.message) {
      data.message = responseDeleteSparePart.message;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

const bgImages = [
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-bottom" },
];

export default function SpareParts() {
  const { ref } = useScrollIntoView();
  const data = useLoaderData();
  const actionData = useActionData();

  return (
    <div className="pt-16" ref={ref}>
      {actionData ? (
        <Dialog message={actionData.message} navigateTo="/czesci-zamienne" />
      ) : null}
      <SpinnerOverlay />
      <Header
        bgGradient="bg-gradient-radial-circle-from-cc-dedicated"
        images={bgImages}
        title="Centrum części zamiennych do przemysłowych urządzeń pralniczych"
      />
      <main className="px-8 pb-8 w-full relative">
        <PageTitle text="Części eksploatacyjne" />
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <div>
            {data.mappedSparePartsList.length ? (
              data.mappedSparePartsList.map((section) => {
                const categoryName = Object.keys(section)[0];
                const spareParts = section[categoryName];
                const count = spareParts.length;

                return (
                  <section
                    key={categoryName}
                    className="border border-slate-100 rounded mb-2 relative pb-4 px-2"
                  >
                    <h3 className="mb-6  text-left text-xs font-medium  border-t border-b border-primary max-w-max rounded text-black-dark">
                      <span className="border-t-2 border-b-2 border-accent rounded px-4 py-1 block w-full">
                        {categoryName.toLowerCase()}
                      </span>
                      <CountIndicator count={count} />
                    </h3>
                    <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-4 auto-rows-max">
                      {spareParts.length ? (
                        spareParts.map((sparepart) => (
                          <div
                            className="justify-self-center"
                            key={sparepart._id}
                          >
                            <Link
                              to={`/czesci-zamienne/${sparepart._id}`}
                              title={sparepart.name}
                              className="flex flex-col sparepart-card border border-accent-dark max-w-[300px] overflow-hidden rounded shadow-lg hover:bg-accent-light hover:shadow-2xl transition-all duration-150"
                            >
                              <div className="sparepart-card__image-outler max-w-[300px] h-auto ">
                                <SparePartCard items={sparepart.images} />
                              </div>
                              <h4 className="sparepart-card__name my-0 py-2 h-[60px] bg-accent-light flex-grow">
                                {sparepart.name}
                              </h4>
                            </Link>
                            {data.user ? (
                              <FormButtonsLink
                                urlAdd="/pralma/formularz-czesci-zamiennej"
                                urlEdit={`/pralma/formularz-czesci-zamiennej/${sparepart._id}`}
                                urlDelete={`/czesci-zamienne/${sparepart._id}`}
                              />
                            ) : null}
                          </div>
                        ))
                      ) : (
                        <NoItems msg="Nie ma żadnych części dla tej kategorii" />
                      )}
                    </div>
                  </section>
                );
              })
            ) : (
              <NoItems msg="Brak części zamiennych" />
            )}
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
