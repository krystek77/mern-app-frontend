import React, { useEffect } from "react";
import { useActionData, useLoaderData, useLocation } from "react-router-dom";
import PageTitle from "../components/PageTitle/PageTitle";
import AsideLinks from "../components/AsideLinks/AsideLinks";
import NoItems from "../components/NoItems/NoItems";
import CardImage from "../components/CardImage/CardImage";
import CircleListType from "../components/CircleListType";
import * as api from "../api/controls";
import Divider from "../components/Divider";
import FormButton from "../components/Admin/FormButton";
import Footer from "./Footer/Footer";
import Header from "../components/Header/Header";
import SearchForm from "../components/SearchFrom";
import { TrashIcon } from "@heroicons/react/20/solid";
import { deleteControl } from "../api/controls";
import Dialog from "../components/Dialog/Dialog";
import { v4 as uuidv4 } from "uuid";
import { useScrollIntoView } from "../hooks";
import ContactForm from "../components/ContactForm";
import ContactsData from "../components/ContactsData/ContactsData";
import CompanyData from "../components/CompanyData";

const bgImages = [
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-bottom" },
];

export async function loader({ request }) {
  const url = new URL(request.url);
  const queryTitle = url.searchParams.get("title");
  const data = { controls: [], message: { controls: "" }, queryTitle: queryTitle };
  try {
    const controls = await api.getControls();
    if (controls.message) data.message.controls = controls.message;
    else data.controls = controls;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
export async function action({ params }) {
  const { controlName } = params;
  const actionData = { message: { delete: "" } };
  try {
    if (controlName) {
      const responseDelete = await deleteControl(controlName);
      if (responseDelete.message) {
        actionData.message.delete = responseDelete.message;
        return actionData;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default function Controls() {
  const { controls, queryTitle } = useLoaderData();
  const actionData = useActionData();
  const url = useLocation();
  const { ref } = useScrollIntoView();

  const admin = true;

  useEffect(() => {
    const hash = decodeURIComponent(url.hash);
    if (hash) {
      const controlDOM = document.getElementById(hash.slice(1));
      if (controlDOM) {
        controlDOM.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "center",
        });
      }
    }
  }, [url.hash]);
  return (
    <div className="pt-12" ref={ref}>
      {actionData ? (
        <Dialog
          message={actionData.message.delete}
          navigateTo="/sterowniki-urzadzen-pralniczych"
        />
      ) : null}
      <Header
        bgGradient="bg-gradient-radial-circle-from-cc-dedicated"
        images={bgImages}
        title="Szeroka gama sterowników dostępnych w przemysłowych urządzeniach pralniczych to możliwość dopasowania procesu do konkretnych potrzeb"
      >
        <SearchForm queryTitle={queryTitle} />
      </Header>
      <main className="px-8 pb-8 w-full">
        <PageTitle text="Sterowniki przemysłowych urządzeń pralniczych" />
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <div className="controls">
            {admin ? (
              <div>
                <FormButton
                  btnTitle="dodaj sterownik"
                  formClasses="my-2"
                  id="add-control"
                  action="/pralma/formularz-sterownika"
                  btnClasses="w-auto h-auto px-2 py-1"
                >
                  <span className="ml-2">Dodaj sterownik</span>
                </FormButton>
                <Divider classes="h-px bg-admin-dark" />
              </div>
            ) : null}
            {controls.length ? (
              controls.map((control) => (
                <div key={control._id} id={control.name}>
                  <article className="mb-6 grid xl:grid-cols-2 gap-4 auto-rows-max relative">
                    <div>
                      <h3>{control.name}</h3>
                      <figure className="mx-auto flex flex-col justify-center items-center border border-slate-300 rounded bg-slate-100 p-2 max-w-[300px]">
                        <CardImage src={control.image} alt={control.name} />
                        <figcaption className="text-xs font-medium text-black-dark order-3 py-2">
                          {control.name}
                        </figcaption>
                      </figure>
                    </div>
                    <div>
                      {control.list.length ? (
                        <div className="flex flex-col justify-center">
                          <h4 className="text-xs font-semibold text-left">
                            Podstawowe cechy
                          </h4>
                          <ul className="flex flex-col justify-center">
                            {control.list.map((item, index) => (
                              <li
                                className="relative max-w-max pl-4 py-0.5 text-sm font-normal text-black-dark"
                                key={`${control._id}_${index}_${item}`}
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
                        </div>
                      ) : null}
                      {admin ? (
                        <div className="flex ">
                          <FormButton
                            btnTitle="edytuj sterownik"
                            formClasses="my-2"
                            id="edit-control"
                            action={`/pralma/formularz-sterownika/${control.name}`}
                            btnClasses="w-auto h-auto px-2 py-1"
                            ariaLabel="edit control"
                          >
                            <span className="ml-2">Edytuj</span>
                          </FormButton>
                          <FormButton
                            btnTitle="skasuj sterownik"
                            method="POST"
                            formClasses="my-2"
                            id="delete-control"
                            action={`/sterowniki-urzadzen-pralniczych/${control.name}`}
                            btnClasses="w-auto h-auto px-2 py-1"
                            ariaLabel="delete control"
                            Icon={TrashIcon}
                          >
                            <span className="ml-2">Skasuj</span>
                          </FormButton>
                        </div>
                      ) : null}
                    </div>
                  </article>
                  <Divider classes="h-px" />
                </div>
              ))
            ) : (
              <NoItems msg="Brak sterowników" />
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
