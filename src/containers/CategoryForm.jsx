/* eslint-disable no-unused-vars */
import React, { useState, Fragment, useEffect } from "react";
import { Form, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { GiSave } from "react-icons/gi";
import RequiredIndicator from "../components/Required";
import FormLinks from "../components/Form/FormLinks";
import PageTitle from "../components/PageTitle/PageTitle";
import { categoryNames } from "../constants";
import { getBase64, formatFormData } from "../utils";
import * as categoryAPI from "../api/categories";
import ActionButtons from "../components/Form/ActionButtons/ActionButtons";
import ActionButton from "../components/Form/ActionButtons/ActionButton/ActionButton";
import SpinnerOverlay from "../components/SpinnerOverlay";
import Footer from "./Footer/Footer";
import PageHeader from "../components/PageHeader/PageHeader";
import { useRef } from "react";
import AdminData from "../components/Admin/AdminData/AdminData";
import Dialog from "../components/Dialog/Dialog";
import * as userAPI from "../utils/user";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import TempCategoryImage from "../images/categoryForm/temp_category.webp";
import TempCategoryThumbnail from "../images/categoryForm/temp_category_thumbnail.webp";
import TempCategoryImageWide from "../images/categoryForm/temp_category_wide.webp";
import TempCategoryThumbnailWide from "../images/categoryForm/temp_category_thumbnail_wide.webp";

export async function loader({ params, request }) {
  const url = new URL(request.url);
  const user = userAPI.checkAdmin();
  const { categoryId } = params;
  const data = {
    user: user,
    categoryId: categoryId,
    categoryDetails: null,
    message: { categoryDetails: "" },
  };

  try {
    if (user) {
      if (categoryId && url.pathname === `/pralma/formularz-kategorii/${categoryId}/edytuj`) {
        const responseGetCategoryDetails = await categoryAPI.getCategoryDetails(categoryId);
        if (responseGetCategoryDetails.message) data.message.categoryDetails = responseGetCategoryDetails.message;
        else data.categoryDetails = responseGetCategoryDetails;
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function action({ request, params }) {
  const url = new URL(request.url);
  const queryWide = url.searchParams.get("wide");
  const queryCoin = url.searchParams.get("coin");
  const { categoryId } = params;
  const user = userAPI.checkAdmin();
  const data = {
    message: { create: "", update: "", delete: "" },
    errors: null,
    user: user,
    queryCoin: queryCoin,
  };

  try {
    if (user) {
      const formData = await request.formData();

      const tempImage = formData.get("image");
      const tempIcon = formData.get("icon");
      let image = null;
      let icon = null;

      if (!tempImage.name) image = queryWide === "true" ? TempCategoryImageWide : TempCategoryImage;
      else image = await getBase64(tempImage);

      if (!tempIcon.name) icon = queryWide === "true" ? TempCategoryThumbnailWide : TempCategoryThumbnail;
      else icon = await getBase64(tempIcon);

      formData.append("image", image);
      formData.append("icon", icon);
      const formatedFormData = {};
      for (const [key, value] of formData) {
        formatFormData(formatedFormData, key, value);
      }
      const features = formatedFormData.features
        .replace(/[\r\n]+/gm, "")
        .split(",")
        .filter((item) => {
          item.trim();
          return item !== "";
        });
      formatedFormData.features = features;
      if (!categoryId && `${url.pathname}${url.search}` === `/pralma/formularz-kategorii/?wide=${queryWide}`) {
        const responseCreateCategory = await categoryAPI.createCategory(formatedFormData);
        if (responseCreateCategory.message) {
          data.message.create = responseCreateCategory.message;
        }
      }
      if (
        categoryId &&
        `${url.pathname}${url.search}` ===
          `/pralma/formularz-kategorii/${categoryId}/edytuj/?wide=${queryWide}&coin=${queryCoin}`
      ) {
        const responseUpdateCategory = await categoryAPI.updateCategory(formatedFormData, categoryId);
        if (responseUpdateCategory.message) data.message.update = responseUpdateCategory.message;
      }
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export default function CategoryForm() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const data = useLoaderData();
  const actionData = useActionData();
  const [selectedCategoryName, setSelectedCategoryName] = useState(() =>
    data.categoryId && data.categoryDetails ? data.categoryDetails.title : categoryNames[0]
  );

  const [category, setCategory] = useState(() =>
    data.categoryId && data.categoryDetails
      ? {
          ...data.categoryDetails,
          features: data.categoryDetails.features.join(",\r\n"),
        }
      : {
          icon: TempCategoryThumbnail,
          title: categoryNames[0],
          image: TempCategoryImage,
          features: "",
          desc: "",
          position: 1,
          wide: false,
          coin: false,
        }
  );
  const handleCancel = () => {
    navigate(-1);
  };
  const handleReset = () => {
    if (data.categoryId && data.categoryDetails) {
      setCategory({
        ...data.categoryDetails,
        features: data.categoryDetails.features.join(",\r\n"),
      });
      setSelectedCategoryName(categoryNames.find((categoryName) => data.categoryDetails.title === categoryName));
    } else {
      setCategory({
        icon: TempCategoryThumbnail,
        title: categoryNames[0],
        image: TempCategoryImage,
        features: "",
        desc: "",
        position: 1,
        wide: false,
        coin: false,
      });
      setSelectedCategoryName(categoryNames[0]);
    }
    ref.current.scrollIntoView({
      block: "start",
      inline: "center",
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (data.categoryId && data.categoryDetails) {
      setCategory({
        ...data.categoryDetails,
        features: data.categoryDetails.features.join(",\r\n"),
      });
      setSelectedCategoryName(categoryNames.find((categoryName) => data.categoryDetails.title === categoryName));
    } else {
      setCategory({
        icon: TempCategoryThumbnail,
        title: categoryNames[0],
        image: TempCategoryImage,
        features: "",
        desc: "",
        position: 1,
        wide: false,
        coin: false,
      });
      setSelectedCategoryName(categoryNames[0]);
    }
  }, [data?.categoryDetails, data.categoryId, data?.categoryDetails?.title]);

  useEffect(() => {
    let ignore = false;
    const fetchCategories = async () => {
      try {
        if (!ignore) {
          const categories = await categoryAPI.getCategories();
          if (categories.length) {
            const countCOIN = categories.filter((category) => category.coin === true).length;
            const countOPL = categories.filter((category) => category.coin === false).length;

            setCategory((prevCategory) => ({
              ...prevCategory,
              position: prevCategory.coin ? countCOIN + 1 : countOPL + 1,
            }));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!data.categoryId) {
      fetchCategories();
    }
    return () => {
      ignore = true;
    };
  }, [category.coin, data.categoryId]);

  useEffect(() => {
    if (selectedCategoryName) {
      setCategory((prevCategory) => ({
        ...prevCategory,
        title: selectedCategoryName,
      }));
    }
  }, [selectedCategoryName]);
  return (
    <>
      {data.message.categoryDetails ? (
        <Dialog message={data.message.categoryDetails} navigateTo='/wyposazenie-pralni-przemyslowej' />
      ) : null}
      {actionData ? (
        <>
          <Dialog
            message={actionData.message.create}
            navigateTo={
              category.coin ? "/wyposazenie-pralni-przemyslowej-samoobslugowe" : "/wyposazenie-pralni-przemyslowej"
            }
          />
          <Dialog
            message={actionData.message.update}
            navigateTo={
              actionData?.queryCoin === "true"
                ? "/wyposazenie-pralni-przemyslowej-samoobslugowe"
                : "/wyposazenie-pralni-przemyslowej"
            }
          />
        </>
      ) : null}
      <SpinnerOverlay />
      <PageHeader ref={ref} bg='bg_admin'>
        <AdminData user={data.user} />
      </PageHeader>
      <main className='pt-8 px-8 pb-16 bg-admin-light bg-opacity-20'>
        <FormLinks categoryId={data.categoryId} />
        <PageTitle text={data.categoryId ? "Formularz edycji kategorii" : "Formularz kategorii"} />
        <Form
          id='category-form'
          method='POST'
          encType='multipart/form-data'
          className='relative max-w-4xl'
          action={
            data.categoryId
              ? `/pralma/formularz-kategorii/${data.categoryId}/edytuj/?wide=${category.wide}&coin=${category.coin}`
              : `/pralma/formularz-kategorii/?wide=${category.wide}`
          }>
          {/** title */}
          <div className='mb-4'>
            <Listbox
              value={selectedCategoryName}
              onChange={setSelectedCategoryName}
              name='title'
              as='div'
              disabled={data.categoryId ? true : false}>
              <Listbox.Label>
                <RequiredIndicator>
                  <h3 className='text-left mr-1'>Kategoria</h3>
                </RequiredIndicator>
              </Listbox.Label>
              <div className='relative'>
                <Listbox.Button className='relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md'>
                  <span className='flex justify-between items-center'>
                    <span className='truncate'>{selectedCategoryName}</span>
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
                    {categoryNames.map((name) => (
                      <Listbox.Option
                        key={name}
                        className={({ active }) => {
                          return `relative cursor-default select-none  text-sm font-normal text-black-dark   ${
                            active ? "bg-accent" : "bg-slate-50"
                          }`;
                        }}
                        value={name}>
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate py-3 pl-10 pr-4 ${
                                selected ? "font-semibold bg-primary text-white" : "font-normal"
                              }`}>
                              <span className='flex justify-between items-center'>
                                <span className='truncate'>{name}</span>
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
          {/** coin */}
          <div className='input-container max-w-min mb-4'>
            <label className='input-label flex items-center justify-start'>
              <input
                className='input form-checkbox appearance-none w-6 h-6  bg-accent-light border-accent-dark rounded-sm hover:text-accent checked:bg-primary checked:border-primary-dark focus:outline-none focus:ring-0 focus:text-primary transition duration-150 mr-2 '
                type='checkbox'
                name='coin'
                checked={category.coin === true}
                value={category.coin}
                onChange={(e) => {
                  setCategory({ ...category, coin: e.target.checked });
                }}
                disabled={data.categoryId ? true : false}
              />
              <span className='input-label__text whitespace-nowrap'>samoobsługowa</span>
            </label>
          </div>
          {/** hidden */}
          {data.categoryId ? (
            <div className='input-container max-w-min mb-4 hidden'>
              <label className='input-label flex items-center justify-start'>
                <input
                  className='input form-checkbox appearance-none'
                  type='hidden'
                  name='coin'
                  checked={category.coin === true}
                  value={category.coin}
                  onChange={(e) => {
                    setCategory({ ...category, coin: e.target.checked });
                  }}
                />
                <span className='input-label__text whitespace-nowrap'>samoobsługowa</span>
              </label>
            </div>
          ) : null}
          {/** image */}
          <div className='grid grid-cols-2 auto-rows-max border border-slate-300 p-4 rounded bg-white mb-4'>
            {/** image */}
            <div className='input-container col-span-1 self-center'>
              <label className='input-label'>
                <h3 className='input-title text-left'>Zdjęcie kategorii</h3>
                <input
                  className='input appearance-none'
                  type='file'
                  name='image'
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCategory({
                        ...category,
                        image: URL.createObjectURL(e.target.files[0]),
                      });
                    } else {
                      setCategory({
                        ...category,
                        image: URL.createObjectURL(category.wide ? TempCategoryImageWide : TempCategoryImage),
                      });
                    }
                  }}
                />
              </label>
            </div>
            {/** wide */}
            <div className='input-container cols-span-1 self-center'>
              <label className='input-label flex items-center justify-start'>
                <input
                  className='input form-checkbox appearance-none w-6 h-6  bg-accent-light border-accent-dark hover:text-accent rounded-sm checked:bg-primary checked:border-primary-dark focus:outline-none focus:ring-0 focus:text-primary transition duration-150 mr-2'
                  type='checkbox'
                  name='wide'
                  checked={category.wide === true}
                  value={category.wide}
                  onChange={(e) => {
                    setCategory({ ...category, wide: e.target.checked });
                  }}
                />
                <span className='input-label__text whitespace-nowrap'>szeroki obrazek kategorii</span>
              </label>
            </div>
            {category.image ? (
              <div className='col-span-2'>
                <h3 className='font-light italic'>Zdjęcie kategorii</h3>
                <div
                  className={
                    category.wide
                      ? "mx-auto rounded-md border-slate-200 overflow-hidden max-w-[300px] max-h-[215px]"
                      : "mx-auto rounded-md border-slate-200 overflow-hidden max-w-[150px] max-h-[215px]"
                  }>
                  <img className='object-cover w-full h-full' src={category.image} alt='obraz kategorii' />
                </div>
              </div>
            ) : (
              <div className='col-span-2'>
                <h3 className='font-light italic'>Nie wybrano zdjęcia kategorii</h3>
                <div
                  className={
                    category.wide
                      ? "mx-auto rounded-md border-slate-200 overflow-hidden max-w-[300px] max-h-[215px]"
                      : "mx-auto rounded-md border-slate-200 overflow-hidden max-w-[150px] max-h-[215px]"
                  }>
                  <img
                    className='object-cover w-full h-full'
                    src={category.wide ? TempCategoryImageWide : TempCategoryImage}
                    alt='obraz kategorii'
                  />
                </div>
              </div>
            )}
          </div>
          {/** icon */}
          <div className='grid grid-cols-2 bg-white border border-slate-300 rounded-md p-4 auto-rows-max'>
            <div className='input-container self-center'>
              <label className='input-label'>
                <h3 className='input-title text-left'>Ikona</h3>
                <input
                  className='input appearance-none'
                  type='file'
                  name='icon'
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCategory({
                        ...category,
                        icon: URL.createObjectURL(e.target.files[0]),
                      });
                    } else {
                      setCategory({
                        ...category,
                        icon: new URL.createObjectURL(
                          category.wide ? TempCategoryThumbnailWide : TempCategoryThumbnail
                        ),
                      });
                    }
                  }}
                />
              </label>
            </div>
            {category.icon ? (
              <div className='self-center'>
                <h3 className='font-light italic'>Ikona kategorii</h3>
                <div
                  className={
                    category.wide
                      ? "mx-auto rounded-md border-slate-200 overflow-hidden max-w-[128px] max-h-[92px]"
                      : "mx-auto rounded-md border-slate-200 overflow-hidden max-w-[64px] max-h-[92px]"
                  }>
                  <img className='object-cover w-full h-full' src={category.icon} alt='obraz kategorii' />
                </div>
              </div>
            ) : (
              <div className='self-center'>
                <h3 className='font-light italic'>Nie wybrano ikony kategorii</h3>
                <div
                  className={
                    category.wide
                      ? "mx-auto rounded-md border-slate-200 overflow-hidden max-w-[128px] max-h-[92px]"
                      : "mx-auto rounded-md border-slate-200 overflow-hidden max-w-[64px] max-h-[92px]"
                  }>
                  <img
                    className='object-cover w-full h-full'
                    src={category.wide ? TempCategoryThumbnailWide : TempCategoryThumbnail}
                    alt='ikona kategorii'
                  />
                </div>
              </div>
            )}
          </div>
          {/** features */}
          <div className='input-container'>
            <label className='input-label'>
              <h3 className='input-title text-left'>Cechy kategorii</h3>
              <textarea
                className='input form-textarea appearance-none resize-none w-full border-1 rounded-md border-black-dark block  focus:border-accent focus: shadow-md focus:ring-accent-dark'
                placeholder='załadunek od 10 kg do 28 kg,...'
                name='features'
                aria-label='category features'
                rows={8}
                value={category.features}
                onChange={(e) => setCategory({ ...category, features: e.target.value })}
              />
            </label>
          </div>
          {/** description*/}
          <div className='input-container'>
            <label className='input-label'>
              <h3 className='input-title text-left'>Opis kategorii</h3>
              <textarea
                className='input form-textarea appearance-none resize-none w-full border-1 rounded-md border-black-dark block  focus:border-accent focus: shadow-md focus:ring-accent-dark'
                placeholder='wstaw krótki opis kategorii'
                name='desc'
                aria-label='category description'
                rows={8}
                value={category.desc}
                onChange={(e) => setCategory({ ...category, desc: e.target.value })}
              />
            </label>
          </div>
          {/** position */}
          <div className='input-container mb-8'>
            <label className='input-label'>
              <h3 className='input-title text-left'>Pozycja (automatyczna)</h3>
              <input
                className='input form-number appearance-none pointer-events-none w-1/2 border-1 rounded-md border-slate-200 block  focus:border-accent focus: shadow-md focus:ring-accent-dark'
                type='number'
                name='position'
                aria-label='category position'
                value={category.position}
                readOnly={true}
              />
            </label>
          </div>
          <ActionButtons handleCancel={handleCancel} handleReset={handleReset}>
            <ActionButton
              type='submit'
              title={data.categoryId ? "zapisz zmiany w edytowanej kategorii" : "zapisz kategorię"}
              label={data.categoryId ? "zapisz zmiany w edytowanej kategorii" : "zapisz kategorię"}>
              {data.categoryId ? (
                <PencilSquareIcon className='w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200' />
              ) : (
                <GiSave className='w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200' />
              )}
            </ActionButton>
          </ActionButtons>
        </Form>
      </main>
      <Footer />
    </>
  );
}
