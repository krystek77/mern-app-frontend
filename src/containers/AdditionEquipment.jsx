import React, { useEffect, useState, Fragment, useRef } from "react";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import AsideLinks from "../components/AsideLinks/AsideLinks";
import PageTitle from "../components/PageTitle/PageTitle";
import Header from "../components/Header/Header";
import SearchForm from "../components/SearchFrom";
import SpinnerOverlay from "../components/SpinnerOverlay";
import Footer from "./Footer/Footer";
import NoItems from "../components/NoItems/NoItems";
import ModelName from "../components/ModelName/ModelName";
import FormButton from "../components/Admin/FormButton";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useLoaderData } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import userAPI from "../utils/user";
import { getPrice, getBase64, formatFormData, isValidAdditionalEquipment } from "../utils";
import * as additionalEquipmentAPI from "../api/additionalEquipment";
import TEMP_ADDITIONAL_EQUIPMET_IMAGE from "../images/additionalEquipment/temp_additionalEquipment.webp";
import Divider from "../components/Divider";
import CircleListType from "../components/CircleListType";
import Dialog from "../components/Dialog/Dialog";
import ActionButtons from "../components/Form/ActionButtons/ActionButtons";
import ActionButton from "../components/Form/ActionButtons/ActionButton/ActionButton";
import { GiSave } from "react-icons/gi";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import InputContainer from "../components/Form/InputContainer";
import Input from "../components/Form/Input";
import RequiredIndicator from "../components/Required";
import TextArea from "../components/Form/TextArea";
import { getCategories } from "../api/categories";
import Message from "../components/Message";
import Dates from "../components/Dates";
import { useScrollIntoView } from "../hooks";
import ContactForm from "../components/ContactForm";
import ContactsData from "../components/ContactsData/ContactsData";
import CompanyData from "../components/CompanyData";

const bgImages = [
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
];

export async function loader({ request, params }) {
  const url = new URL(request.url);
  const queryTitle = url.searchParams.get("title");
  const user = userAPI.checkAdmin();
  const { slug } = params;
  const data = {
    queryTitle: queryTitle,
    user: user,
    slug: slug,
    additionalEquipments: [],
    additionalEquipment: null,
    message: {
      additionalEquipments: "",
      additionalEquipment: "",
      categories: "",
    },
    categories: [],
  };
  try {
    if (user) {
      const respponseCategoriesGet = await getCategories();
      if (respponseCategoriesGet.message) data.message.categories = respponseCategoriesGet;
      else data.categories = respponseCategoriesGet;

      if (slug && url.pathname === `/wyposazenie-pralni-przemyslowej/wozki-i-regaly/${slug}/edytuj`) {
        const responseGetAdditionalEquipment = await additionalEquipmentAPI.getAdditionalEquipment(slug);
        if (responseGetAdditionalEquipment.message) {
          data.message.additionalEquipment = responseGetAdditionalEquipment;
        } else {
          data.additionalEquipment = responseGetAdditionalEquipment;
        }
      }
    }

    const responseAdditionalEquipmentsGet = await additionalEquipmentAPI.getAdditionalEquipments();
    if (responseAdditionalEquipmentsGet.message)
      data.message.additionalEquipments = responseAdditionalEquipmentsGet.message;
    else data.additionalEquipments = responseAdditionalEquipmentsGet;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function action({ params, request }) {
  const url = new URL(request.url);
  const { slug } = params;
  const data = {
    errors: null,
    message: { create: "", update: "", delete: "" },
  };

  let dataToSave = null;

  if (
    (slug && url.pathname === `/wyposazenie-pralni-przemyslowej/wozki-i-regaly/${slug}/edytuj`) ||
    (!slug && url.pathname === "/wyposazenie-pralni-przemyslowej/wozki-i-regaly")
  ) {
    const formData = await request.formData();
    const imagesLength = document.getElementById("images").files.length;

    for (let index = 0; index < imagesLength; index++) {
      const image = await getBase64(document.getElementById("images").files[index]);
      formData.append(`images[${index}]`, image);
    }

    const formatedFormData = {};
    for (const [key, value] of formData) {
      formatFormData(formatedFormData, key, value);
    }
    const images = [];
    for (let index = 0; index < imagesLength; index++) {
      images.push(formatedFormData.images[index]);
    }

    const technicalData = formatedFormData.technicalData
      .replace(/,/gm, " ")
      .split(/\r\n/gm)
      .filter((item) => item.trim() !== "");
    formatedFormData.technicalData = technicalData;

    dataToSave = { ...formatedFormData, images };

    const errors = isValidAdditionalEquipment(dataToSave);
    if (Object.keys(errors).length) {
      data.errors = errors;
      return data;
    }
  }

  if (slug) {
    if (url.pathname === `/wyposazenie-pralni-przemyslowej/wozki-i-regaly/${slug}/edytuj`) {
      const responseUpdateAdditionalEquipment = await additionalEquipmentAPI.updateAdditionalEquipment(
        dataToSave,
        slug
      );
      if (responseUpdateAdditionalEquipment.message) {
        data.message.update = responseUpdateAdditionalEquipment.message;
      }
    }

    if (url.pathname === `/wyposazenie-pralni-przemyslowej/wozki-i-regaly/${slug}/skasuj`) {
      const responseDeleteAdditionalEquipment = await additionalEquipmentAPI.deleteAdditionalEquipment(slug);
      if (responseDeleteAdditionalEquipment.message) {
        data.message.delete = responseDeleteAdditionalEquipment.message;
      }
    }
  } else {
    const responseCreateAdditionalEquipment = await additionalEquipmentAPI.createAdditionalEquipment(dataToSave);
    if (responseCreateAdditionalEquipment.message) data.message.create = responseCreateAdditionalEquipment.message;
  }
  return data;
}
export default function AdditionEquipment() {
  const { ref } = useScrollIntoView();
  const refForm = useRef(null);
  const navigate = useNavigate();
  const data = useLoaderData();
  const actionData = useActionData();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [additionalEquipment, setAdditionalEquipment] = useState(() =>
    data.slug && data.additionalEquipment
      ? {
          ...data.additionalEquipment,
          technicalData: data.additionalEquipment.technicalData.join(",\r\n"),
        }
      : {
          model: "",
          name: "",
          description: "",
          images: [TEMP_ADDITIONAL_EQUIPMET_IMAGE],
          technicalData: "",
          price: "0.1",
          featuredFor: selectedCategories,
        }
  );

  useEffect(() => {
    if (data.slug && data.additionalEquipment) {
      setAdditionalEquipment({
        ...data.additionalEquipment,
        technicalData: data.additionalEquipment.technicalData.join(",\r\n"),
      });
      setSelectedCategories(() =>
        data.categories.filter((category) =>
          data.additionalEquipment.featuredFor.some((featuredForCategory) => category._id === featuredForCategory._id)
        )
      );
    } else {
      setAdditionalEquipment({
        model: "",
        name: "",
        description: "",
        images: [TEMP_ADDITIONAL_EQUIPMET_IMAGE],
        technicalData: "",
        price: "0.1",
      });
    }
  }, [data.slug, data.additionalEquipment, data.categories]);

  useEffect(() => {
    setAdditionalEquipment((prevAdditionalEquipment) => ({
      ...prevAdditionalEquipment,
      featuredFor: selectedCategories,
    }));
  }, [selectedCategories]);

  const handleReset = () => {
    setAdditionalEquipment({
      model: "",
      name: "",
      description: "",
      images: [TEMP_ADDITIONAL_EQUIPMET_IMAGE],
      technicalData: "",
      price: "0.0",
    });
    setSelectedCategories([]);
    refForm.current.scrollIntoView({
      block: "start",
      inline: "center",
      behavior: "smooth",
    });
    navigate("/wyposazenie-pralni-przemyslowej/wozki-i-regaly");
  };
  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <div ref={ref} className='pt-12'>
      <SpinnerOverlay />
      <Dialog
        message={data.message.additionalEquipments}
        navigateTo='/wyposazenie-pralni-przemyslowej/wozki-i-regaly'
      />
      {actionData ? (
        <>
          <Dialog message={actionData.message.create} navigateTo='/wyposazenie-pralni-przemyslowej/wozki-i-regaly' />
          <Dialog message={actionData.message.update} navigateTo='/wyposazenie-pralni-przemyslowej/wozki-i-regaly' />
          <Dialog message={actionData.message.delete} navigateTo='/wyposazenie-pralni-przemyslowej/wozki-i-regaly' />
        </>
      ) : null}
      <Header
        images={bgImages}
        title='Wszystko czego potrzebujesz aby poprawić organizację pracy w pralni przemysłowej. Urządzenia do transportu i skałdowania prania w pralni przemysłowej'>
        <SearchForm queryTitle={data.queryTitle} />
      </Header>
      <main className='pl-8 pr-8'>
        <PageTitle text='Urządzenia do transportu i składowania prania w pralni przemysłowej. Wózki - do transportu międzyoperacyjnego, regały - do składowania, kontenry - do trasportu prania do obiektu pralni przemysłowej' />
        <div className='grid xl:grid-cols-1-300 xl:gap-x-6'>
          <div className='mb-4'>
            {/** additional equipments list */}
            <div className='grid grid-cols-1 auto-rows-min'>
              {data.additionalEquipments.length ? (
                data.additionalEquipments.map((additionalEquipment) => (
                  <div key={additionalEquipment._id}>
                    <article className='grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max'>
                      {/** model */}
                      <div className='additional-equipment_model col-span-1 sm:col-span-2'>
                        <ModelName name={additionalEquipment.model} textSize='text-md' />
                      </div>
                      {/** image */}
                      <div className='additional-equipment_image justify-self-center'>
                        <aside className='w-[320px] h-[430px] p-2 mb-2 border border-slate-300 rounded-md'>
                          <img
                            className='object-cover w-full h-full object-center rounded-md'
                            src={
                              additionalEquipment.images.length
                                ? additionalEquipment.images[0]
                                : TEMP_ADDITIONAL_EQUIPMET_IMAGE
                            }
                            alt={additionalEquipment.name}
                          />
                        </aside>
                        {data.user ? (
                          <div className='flex justify-center items-center'>
                            <div
                              onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>
                              <FormButton
                                btnTitle='skasuj dodatkowe wyposażenie'
                                formClasses=''
                                id='delete-additional-equipment'
                                action={`/wyposazenie-pralni-przemyslowej/wozki-i-regaly/${additionalEquipment.slug}/skasuj`}
                                btnClasses='w-auto h-auto p-1 ml-0'
                                method='POST'
                                Icon={TrashIcon}
                              />
                            </div>
                            <div
                              onClick={() => {
                                refForm.current.scrollIntoView({
                                  block: "start",
                                  inline: "center",
                                  behavior: "smooth",
                                });
                              }}>
                              <FormButton
                                btnTitle='edytuj dodatkowe wyposażenie'
                                formClasses=''
                                id='edit-additional-equipment'
                                action={`/wyposazenie-pralni-przemyslowej/wozki-i-regaly/${additionalEquipment.slug}/edytuj`}
                                btnClasses='w-auto h-auto p-1'
                                method='GET'
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                      {/** content */}
                      <div className='additional-equipment_content'>
                        <header>
                          <h3 className='text-base'>{additionalEquipment.name}</h3>
                        </header>
                        <p className='font-light text-md'>{additionalEquipment.description}</p>
                        {additionalEquipment.technicalData.length ? (
                          <div>
                            <Divider classes='h-px' />
                            <h4 className='text-md'>Dane techniczne</h4>
                            <ul>
                              {additionalEquipment.technicalData.map((technicalItem, index) => (
                                <li className='relative list-none text-sm font-light' key={index}>
                                  <CircleListType size='8px' top='50%' left='-16px' />
                                  <span>{technicalItem}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                      {/** featured for */}
                      {additionalEquipment.featuredFor.length ? (
                        <div className='additional-equipment_featured-for col-span-1 sm:col-span-2 flex flex-wrap justify-start items-center'>
                          <h3 className='w-full text-center'>Polecane dla kategorii produktów:</h3>
                          {additionalEquipment.featuredFor.map((featured) => {
                            return featured.coin ? (
                              <Link
                                title={`${featured.title} - samoobsługowe`}
                                to={`/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${featured.slug}`}
                                key={featured._id}
                                className='text-xs px-2 py-1 border border-accent-dark  bg-accent-light rounded-md shadow-md mx-1 whitespace-nowrap mb-2 hover:bg-accent hover:shadow-md transition-all duration-150'>
                                {featured.title}
                              </Link>
                            ) : (
                              <Link
                                title={`${featured.title}`}
                                to={`/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${featured.slug}`}
                                key={featured._id}
                                className='text-xs px-2 py-1 border border-accent-dark  bg-accent-light rounded-md shadow-md mx-1 whitespace-nowrap mb-2 hover:bg-accent hover:shadow-md transition-all duration-150'>
                                {featured.title}
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                      {/** footer */}
                      {data.user ? (
                        <footer className='additional-equipment_footer col-span-1 sm:col-span-2 px-4 py-1 rounded-md bg-admin-light border  border-admin-dark flex justify-end items-center'>
                          <span className='mr-1'>Cena netto: </span>
                          <span className='font-bold text-xl'>{getPrice(additionalEquipment.price, "PLN")}</span>
                        </footer>
                      ) : null}
                    </article>
                    {/** dates */}
                    <Dates createdAt={additionalEquipment.createdAt} updatedAt={additionalEquipment.updatedAt} />
                    <Divider />
                  </div>
                ))
              ) : (
                <NoItems msg='Brak wyposażenia dodatkowego do pralni przemysłowej' />
              )}
            </div>
            {/** additionl-equipment form */}
            {data.user ? (
              <div className='relative mb-4' ref={refForm}>
                <PageTitle
                  text={
                    data.slug
                      ? "Formularz zapisu edytowanego wyposażenia"
                      : "Formularz dodawania wyposażenia dodatkowego"
                  }
                />
                <Form
                  id='additional-equipment-form'
                  method={"POST"}
                  encType='multipart/form-data'
                  action={
                    data.slug
                      ? `/wyposazenie-pralni-przemyslowej/wozki-i-regaly/${data.slug}/edytuj`
                      : `/wyposazenie-pralni-przemyslowej/wozki-i-regaly`
                  }>
                  {/** model */}
                  <InputContainer classes=''>
                    <RequiredIndicator>
                      <Input
                        id='model'
                        type='text'
                        name='model'
                        error={actionData?.errors && actionData.errors.model}
                        label='model'
                        ariaLabel='Additional Equipment model'
                        placeholder='np.: WM-150'
                        value={additionalEquipment.model}
                        onChange={(e) =>
                          setAdditionalEquipment({
                            ...additionalEquipment,
                            model: e.target.value,
                          })
                        }
                      />
                    </RequiredIndicator>
                  </InputContainer>
                  {/** name */}
                  <InputContainer classes=''>
                    <RequiredIndicator>
                      <Input
                        id='name'
                        type='text'
                        name='name'
                        error={actionData?.errors && actionData.errors.name}
                        label='nazwa'
                        ariaLabel='Additional Equipment name'
                        placeholder='np.: wózek na mokre pranie'
                        value={additionalEquipment.name}
                        onChange={(e) =>
                          setAdditionalEquipment({
                            ...additionalEquipment,
                            name: e.target.value,
                          })
                        }
                      />
                    </RequiredIndicator>
                  </InputContainer>
                  {/** description */}
                  <div className='mb-2'>
                    <h3 className='text-left mb-0'>opis wyposażenia</h3>
                    <TextArea
                      error={actionData?.errors && actionData.errors.description}
                      placeholder='opis wyposażenia'
                      name='description'
                      value={additionalEquipment.description}
                      onChange={(e) =>
                        setAdditionalEquipment({
                          ...additionalEquipment,
                          description: e.target.value,
                        })
                      }
                      ariaLabel='Additional Equipment description'
                    />
                  </div>
                  {/** technical data */}
                  <div className='mb-2'>
                    <h3 className='text-left mb-0'>dane techniczne</h3>
                    <TextArea
                      error={actionData?.errors && actionData?.errors.technicalData}
                      placeholder='lista danych technicznych'
                      name='technicalData'
                      value={additionalEquipment.technicalData}
                      onChange={(e) =>
                        setAdditionalEquipment({
                          ...additionalEquipment,
                          technicalData: e.target.value,
                        })
                      }
                      ariaLabel='Additional Equipment technical data'
                    />
                  </div>
                  {/**image */}
                  <div className='border border-slate-300 bg-white px-4 py-4 mb-4 rounded '>
                    <InputContainer>
                      <RequiredIndicator>
                        <Input
                          errors={actionData?.errors && actionData.errors.image}
                          id='images'
                          type='file'
                          name='images'
                          multiple={true}
                          label='zdjęcia/zdjęcie'
                          onChange={(e) => {
                            if (e.target.files) {
                              setAdditionalEquipment({
                                ...additionalEquipment,
                                images: [...e.target.files].map((image) => {
                                  return URL.createObjectURL(image);
                                }),
                              });
                            } else {
                              setAdditionalEquipment({
                                ...additionalEquipment,
                                images: [URL.createObjectURL(TEMP_ADDITIONAL_EQUIPMET_IMAGE)],
                              });
                            }
                          }}
                          ariaLabel='additional equipment images'
                        />
                      </RequiredIndicator>
                    </InputContainer>
                    {additionalEquipment.images.length ? (
                      <div className='bg-white p-2 border border-slate-200 rounded'>
                        <h3 className=''>Zdjęcia</h3>
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                          {additionalEquipment.images.map((image, index) => (
                            <div
                              className='max-w-52 max-h-52 border border-slate-200 bg-slate-100 rounded overflow-hidden'
                              key={`sparepartimage_${index}`}>
                              <img
                                className='object-cover w-full h-full block'
                                src={image}
                                alt='Wózki na mokre pranie, wózki na suche pranie, regały stacjonarne i jezdne do pralni przemysłowej'
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <NoItems msg='Nie wybrano żadmego zdjęcia' classes='italic px-2' />
                    )}
                  </div>
                  {/** featuredFor */}
                  <div className='mb-4'>
                    <Listbox value={selectedCategories} onChange={setSelectedCategories} name='featuredFor' multiple>
                      <Listbox.Label>
                        <RequiredIndicator>
                          <h3 className='text-left mr-1'>Polecany dla kategorii urządzeń</h3>
                        </RequiredIndicator>
                      </Listbox.Label>
                      <div className='relative'>
                        <Listbox.Button className='relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md'>
                          <span className='flex justify-between items-center'>
                            <span className='truncate whitespace-normal '>
                              {selectedCategories
                                .map((cat) => `${cat.title} - ${cat.coin ? "COIN" : "OPL"}`)
                                .join(", ")}
                            </span>
                          </span>
                          <span className='absolute right-0 inset-y-0 flex items-center bg-accent border border-accent-dark rounded-tr-md rounded-br-md h-full'>
                            <ChevronUpDownIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave='transition ease-in duration-200'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'>
                          <Listbox.Options className='bg-slate-50 absolute z-[1] mt-2 max-h-60 w-full overflow-auto rounded-md py-2 text-base shadow-2xl focus: outline focus:outline-offset-0 focus: outline-1 focus: outline-accent-dark'>
                            {data.categories.map((category) => (
                              <Listbox.Option
                                key={category._id}
                                className={({ active }) => {
                                  return `relative cursor-default select-none  text-sm font-normal text-black-dark   ${
                                    active ? "bg-accent" : "bg-slate-50"
                                  }`;
                                }}
                                value={category}>
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate py-3 pl-10 pr-4 ${
                                        selected ? "font-semibold bg-primary text-white" : "font-normal"
                                      }`}>
                                      <span className='flex justify-between items-center'>
                                        <span className='truncate'>{`${category.title} - ${
                                          category.coin ? "COIN" : "OPL"
                                        }`}</span>
                                      </span>
                                    </span>
                                    {selected ? (
                                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-white'>
                                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
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
                  {/** price */}
                  <InputContainer classes=''>
                    <RequiredIndicator>
                      <Input
                        id='price'
                        type='text'
                        name='price'
                        error={actionData?.errors && actionData.errors.price}
                        label='cena netto'
                        ariaLabel='Additional Equipment price'
                        placeholder='np.: 1200.00'
                        value={additionalEquipment.price}
                        onChange={(e) =>
                          setAdditionalEquipment({
                            ...additionalEquipment,
                            price: e.target.value,
                          })
                        }
                      />
                    </RequiredIndicator>
                  </InputContainer>
                  <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
                    <ActionButton
                      type='submit'
                      title={data.slug ? "zapisz edytowane wyposażenie dodatkowe" : "dodaj wyposażenie dodatkowe"}
                      label={data.slug ? "zapisz edytowane wyposażenie dodatkowe" : "dodaj wyposażenie dodatkowe"}>
                      <GiSave className='w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200' />
                    </ActionButton>
                  </ActionButtons>
                </Form>
                {actionData && actionData.errors ? (
                  <Message
                    text='Formularz posiada błędne wartości pól'
                    posX='left-1/2 -translate-x-1/2'
                    posY='bottom-0 translate-y-full'
                  />
                ) : null}
              </div>
            ) : null}
          </div>
          <AsideLinks />
        </div>
      </main>
      <section id='contactForm' className='py-12 bg-slate-200 px-8'>
        <PageTitle text='Formularz kontaktowy' />
        <ContactForm />
        <ContactsData />
        <CompanyData />
      </section>
      <Footer />
    </div>
  );
}
