import React, { useState, useRef, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, PlusCircleIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { GiSave } from "react-icons/gi";
import { Form, useLoaderData, useActionData, redirect, useNavigate } from "react-router-dom";
import { formatFormData, getBase64 } from "../utils";
import { units } from "../constants";
import { getCategories } from "../api/categories";
import { getControls } from "../api/controls";
import { createProduct } from "../api/products";
import { getTags } from "../api/tags";
import { getDocuments } from "../api/document";
import { getProductDetailsByModel } from "../api/products";
import { updateProduct } from "../api/products";

import RequiredIndicator from "../components/Required";
import FormLinks from "../components/Form/FormLinks";
import PageTitle from "../components/PageTitle/PageTitle";
import ActionButtons from "../components/Form/ActionButtons/ActionButtons";
import ActionButton from "../components/Form/ActionButtons/ActionButton/ActionButton";
import InputContainer from "../components/Form/InputContainer";
import Input from "../components/Form/Input";
import TextArea from "../components/Form/TextArea";
import Required from "../components/Required";
import { isValidProduct } from "../utils";
import SpinnerOverlay from "../components/SpinnerOverlay";
import Footer from "./Footer/Footer";
import PageHeader from "../components/PageHeader/PageHeader";
import {DEFAULT_IMAGES_PRODUCT_FORM as images} from '../images/productForm';
import Dialog from "../components/Dialog/Dialog";
import Message from "../components/Message";

export async function loader({ params }) {
  const { model } = params;
  const data = {
    categories: [],
    controls: [],
    tags: [],
    files: [],
    productDetails: null,
    message: {
      productDetails: "",
      categories: "",
      controls: "",
      tags: "",
      files: "",
    },
  };
  try {
    if (model) {
      const productDetails = await getProductDetailsByModel(model);
      if (productDetails && productDetails.message) data.message.productDetails = productDetails.message;
      else data.productDetails = productDetails;
    }

    const categories = await getCategories();
    if (categories.message) data.message.categories = categories.message;
    else data.categories = categories;
    const controls = await getControls();
    if (controls.message) data.message.controls = controls.message;
    else data.controls = controls;
    const tags = await getTags();
    if (tags.message) data.message.tags = tags.message;
    else data.tags = tags;
    const files = await getDocuments();
    if (files.message) data.message.files = files.message;
    else data.files = files;

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function action({ request, params }) {
  const { model: ProductModel, categoryName } = params;
  const url = new URL(request.url);
  const actionData = {
    message: { create: "", update: "", copy: "" },
    data: null,
    errors: null,
  };

  try {
    const formData = await request.formData();

    const tempImage = formData.get('image');
    const tempIcon = formData.get('icon');
    const wide = formData.get('wide') === 'on' ? true : false;
    if (tempImage.name === '') {
      formData.delete('image');
    } else formData.append('image', await getBase64(tempImage));
    if (tempIcon.name === '') {
      formData.delete('icon');
    } else formData.append('icon', await getBase64(tempIcon));

    // let image = null;
    // let icon = null;
    // if (!tempImage.name) image = wide ? images.DEFAULT_LANDSCAPE_IMAGE : images.DEFAULT_PORTRAIT_IMAGE;
    // else image = await getBase64(tempImage);
    // if (!tempIcon.name) icon = wide ? images.DEFAULT_LANDSCAPE_THUMBNAIL : images.DEFAULT_PORTRAIT_THUMBNAIL;
    // else icon = await getBase64(tempIcon);

    // formData.append("image", await getBase64(tempImage));
    // formData.append("icon", await getBase64(tempIcon));

    const data = {};
    for (const [key, value] of formData) {
      formatFormData(data, key, value);
    }

    const features = data.features
      .replace(/[\r\n]+/gm, "")
      .split(",")
      .filter((item) => {
        item.trim();
        return item !== "";
      });
    data.features = features;
    data.wide = wide;
    const model = data.model.toUpperCase();
    data.model = model;
    actionData.data = data;

    const errors = isValidProduct(data);
    if (Object.keys(errors).length) {
      actionData.errors = errors;
      return actionData;
    }

    if (ProductModel) {
      if (url.pathname === `/pralma/formularz-produktu/${categoryName}/model/${model}/edytuj`) {
        const responseUpdateProduct = await updateProduct(ProductModel, data);
        if (responseUpdateProduct.message) {
          actionData.message.update = responseUpdateProduct.message;
          return actionData;
        } else {
          return redirect(
            data.coin
              ? `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${data.category.slug}/model/${data.model}`
              : `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${data.category.slug}/model/${data.model}`
          );
        }
      } else {
        const responseCopyProduct = await createProduct(data);
        if (responseCopyProduct.message) {
          actionData.message.copy = responseCopyProduct.message;
          return actionData;
        } else {
          return redirect(
            data.coin
              ? `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${data.category.slug}/model/${data.model}`
              : `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${data.category.slug}/model/${data.model}`
          );
        }
      }
    } else {
      const responseCreateProduct = await createProduct(data);
      if (responseCreateProduct.message) {
        actionData.message.create = responseCreateProduct.message;
        return actionData;
      } else {
        return redirect(
          data.coin
            ? `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${data.category.slug}`
            : `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${data.category.slug}`
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default function ProductForm() {
  const { categories, controls, tags, files, productDetails, message } = useLoaderData();
  const navigate = useNavigate();
  const ref = useRef(null);

  const actionData = useActionData();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedControls, setSelectedControls] = useState([controls[0], controls[1]]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedTags, setSelectedTags] = useState([tags[0]]);
  const [p, setP] = useState({ name: "", unit: "kg", value: "" });
  const [parameters, setParameters] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(units[0]);
  const [parameterIndexes, setParameterIndexes] = useState([]);
  const [isWide, setIsWide] = useState(false);
  const productFormRef = useRef(null);

  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [body, setBody] = useState("");
  const [features, setFeatures] = useState("");
  const [image, setImage] = useState(() =>
    productDetails && productDetails.image
      ? productDetails.image
      : isWide
      ? images.DEFAULT_LANDSCAPE_IMAGE
      : images.DEFAULT_PORTRAIT_IMAGE
  );
  const [icon, setIcon] = useState(() =>
    productDetails && productDetails.icon
      ? productDetails.icon
      : isWide
      ? images.DEFAULT_LANDSCAPE_IMAGE
      : images.DEFAULT_PORTRAIT_IMAGE
  );

  const handleReset = () => {
    if (productDetails) {
      setModel(productDetails.model);
      setTitle(productDetails.title);
      setSelectedCategory(
        categories.filter(
          (c) => productDetails.category.title === c.title && productDetails.category.coin === c.coin
        )[0]
      );
      setSelectedControls(controls.filter((c) => productDetails.controls.some((pdc) => c.name === pdc.name)));
      setBody(productDetails.body);
      setSelectedTags(tags.filter((t) => productDetails.tags.some((pdt) => pdt.name === t.name)));
      setFeatures(productDetails.features.join(","));
      setSelectedFiles(files.filter((f) => productDetails.documents.some((pdd) => pdd.filename === f.filename)));
      setParameters(productDetails.parameters);
      setIsWide(productDetails.wide);
      setImage(productDetails.image);
      setIcon(productDetails.icon);
    } else {
      setSelectedCategory(categories[0]);
      setSelectedControls([controls[0], controls[1]]);
      setSelectedFiles([]);
      setSelectedTags([tags[0]]);
      setParameters([]);
      setSelectedUnit(units[0]);
      setParameterIndexes([]);
      setIsWide(false);
      setTitle("");
      setModel("");
      setBody("");
      setFeatures("");
      setImage(images.DEFAULT_PORTRAIT_IMAGE);
      setIcon(images.DEFAULT_PORTRAIT_THUMBNAIL);
    }
  };
  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (productDetails) {
      setModel(productDetails.model);
      setTitle(productDetails.title);
      setImage(productDetails.image);
      setIcon(productDetails.icon);
      setSelectedCategory(
        categories.filter(
          (c) => productDetails.category.title === c.title && productDetails.category.coin === c.coin
        )[0]
      );
      setSelectedControls(controls.filter((c) => productDetails.controls.some((pdc) => c.name === pdc.name)));
      setBody(productDetails.body);
      setSelectedTags(tags.filter((t) => productDetails.tags.some((pdt) => pdt.name === t.name)));
      setFeatures(productDetails.features.join(",\r\n"));
      setSelectedFiles(files.filter((f) => productDetails.documents.some((pdd) => pdd.filename === f.filename)));
      setParameters(productDetails.parameters);
      setIsWide(productDetails.wide);
    } 
  }, [productDetails, controls, categories, tags, files]);

  useEffect(() => {
    if(!productDetails){
      if (isWide) {
        setImage(images.DEFAULT_LANDSCAPE_IMAGE);
        setIcon(images.DEFAULT_LANDSCAPE_THUMBNAIL);
      } else {
        setImage(images.DEFAULT_PORTRAIT_IMAGE);
        setIcon(images.DEFAULT_PORTRAIT_THUMBNAIL);
      }
    }
  }, [isWide,productDetails]);

  return (
    <>
      <SpinnerOverlay />
      {actionData ? (
        <>
          <Dialog
            message={actionData.message.create}
            navigateTo={
              actionData.data.coin
                ? `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${actionData.data.category.slug}`
                : `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${actionData.data.category.slug}`
            }
          />
          <Dialog
            message={actionData.message.copy}
            navigateTo={
              actionData.data.coin
                ? `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${actionData.data.category.slug}`
                : `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${actionData.data.category.slug}`
            }
          />
          <Dialog
            message={actionData.message.update}
            navigateTo={
              actionData.data.coin
                ? `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${actionData.data.category.slug}/model/${actionData.data.model}`
                : `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${actionData.data.category.slug}/model/${actionData.data.model}`
            }
          />
        </>
      ) : null}

      <>
        <Dialog
          message={message.productDetails}
          navigateTo="/pralma/formularz-produktu"
        />
        <Dialog
          message={message.categories}
          navigateTo="/pralma/formularz-produktu"
        />
        <Dialog
          message={message.controls}
          navigateTo="/pralma/formularz-produktu"
        />
        <Dialog
          message={message.tags}
          navigateTo="/pralma/formularz-produktu"
        />
        <Dialog
          message={message.files}
          navigateTo="/pralma/formularz-produktu"
        />
      </>
      <PageHeader ref={ref} bg="bg_admin" />
      <main className="pt-8 px-8 pb-16 bg-admin-light bg-opacity-20">
        <FormLinks model={productDetails?.model} />
        <PageTitle
          text={
            productDetails?.model ? 'Edytowanie produktu' : 'Dodawanie produktu'
          }
        />
        <Form
          id="product-form"
          aria-label="product-form"
          className="relative max-w-4xl"
          method="post"
          encType="multipart/form-data"
          ref={productFormRef}
        >
          {/** category and readonly coin */}
          <div className="category mb-4 bg-slate-200 border border-slate-300 px-4 py-2 rounded">
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
                    <span className="truncate">{selectedCategory.title}</span>
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
            {/** is it coin */}
            <InputContainer>
              <Input
                classesLabel="flex flex-row-reverse justify-end items-center py-2  pointer-events-none "
                classesText="ml-2"
                label="samoobsługa"
                type="checkbox"
                name="coin"
                checked={selectedCategory.coin}
                value={selectedCategory.coin}
                readOnly={true}
              />
            </InputContainer>
          </div>
          {/** title */}
          <InputContainer>
            <Input
              error={actionData && actionData.errors?.title}
              label="Tytuł"
              type="text"
              name="title"
              value={title}
              placeholder="tytuł"
              ariaLabel="product title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputContainer>
          {/** model */}
          <InputContainer>
            <Required>
              <Input
                error={actionData && actionData.errors?.model}
                label="Model"
                type="text"
                name="model"
                value={model}
                ariaLabel="product model"
                onChange={(e) => setModel(e.target.value)}
              />
            </Required>
          </InputContainer>
          {/** product image */}
          <div className="group-inputs  px-4 py-2 mb-4 rounded bg-slate-200 border border-slate-300 grid gap-y-4">
            <InputContainer>
              <Input
                id="image"
                error=""
                label={
                  image === images.DEFAULT_LANDSCAPE_IMAGE ||
                  image === images.DEFAULT_PORTRAIT_IMAGE
                    ? 'Zdjęcie produktu - UWAGA!: ustawione domyślne zdjęcie '
                    : 'Zdjęcie produktu'
                }
                type="file"
                name="image"
                ariaLabel="product image"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </InputContainer>

            <div className="bg-white p-2 border border-slate-200 rounded">
              <h3 className="">Zdjęcie</h3>
              <div className="">
                <div
                  className={
                    isWide
                      ? 'mx-auto max-w-[600px] max-h-[430px] border border-slate-200 bg-slate-100 rounded overflow-hidden'
                      : 'mx-auto max-w-[300px] max-h-[430px] border border-slate-200 bg-slate-100 rounded overflow-hidden'
                  }
                >
                  <img
                    className="object-cover w-full h-full block"
                    src={image}
                    alt="Przemysłowe urządzenia pralnicze, pralnicowirówki, suszarki, pralnice"
                  />
                </div>
              </div>
            </div>

            <InputContainer classes="self-center mb-0">
              <Input
                classesLabel="flex flex-row-reverse justify-end items-center py-2"
                classesText="ml-2"
                label="Czy szeroki obrazek produktu"
                type="checkbox"
                name="wide"
                checked={isWide === true}
                onChange={(e) => {
                  setIsWide(e.target.checked);
                }}
              />
            </InputContainer>
          </div>
          {/** product icon */}
          <div className="grid md:grid-cols-2 gap-4 px-4 py-2 mb-4 rounded bg-slate-200 border border-slate-300 ">
            <InputContainer classes="self-center">
              <Input
                id="icon"
                error=""
                label={
                  icon === images.DEFAULT_PORTRAIT_THUMBNAIL ||
                  icon === images.DEFAULT_LANDSCAPE_THUMBNAIL
                    ? 'Miniatura produktu - UWAGA!: ustawione domyślne zdjęcie'
                    : 'Miniatura produktu'
                }
                type="file"
                name="icon"
                ariaLabel="product icon - thumbneil"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setIcon(URL.createObjectURL(e.target.files[0]));
                  } 
                }}
              />
            </InputContainer>
            <div className="bg-white p-2 border border-slate-200 rounded self-center">
              <h3 className="">Ikona</h3>
              <div className="">
                <div
                  className={
                    isWide
                      ? 'mx-auto max-w-[128px] max-h-[92px] border border-slate-200 bg-slate-100 rounded overflow-hidden'
                      : 'mx-auto max-w-[64px] max-h-[92px] border border-slate-200 bg-slate-100 rounded overflow-hidden'
                  }
                >
                  <img
                    className="object-cover w-full h-full block"
                    src={icon}
                    alt="Przemysłowe urządzenia pralnicze, pralnicowirówki, suszarki, pralnice"
                  />
                </div>
              </div>
            </div>
          </div>
          {/** controls */}
          <div className="controls mb-4">
            <Listbox
              value={selectedControls}
              onChange={setSelectedControls}
              multiple={true}
              name="controls"
            >
              <Listbox.Label>
                <h3 className="text-left">Sterowniki</h3>
              </Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md">
                  <span className="block truncate whitespace-normal">
                    {selectedControls.map((control) => control.name).join(', ')}
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
                  <Listbox.Options className="bg-slate-50 z-[1] absolute mt-2 max-h-60 w-full overflow-auto rounded-md py-2 text-base shadow-2xl focus: outline focus:outline-offset-0 focus: outline-1 focus: outline-accent-dark">
                    {controls.map((control) => (
                      <Listbox.Option
                        key={control._id}
                        className={({ active }) => {
                          return `relative cursor-default select-none  text-sm font-normal text-black-dark   ${
                            active ? 'bg-accent' : 'bg-slate-50'
                          }`;
                        }}
                        value={control}
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
                              {control.name}
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
          {/** body - description */}
          <InputContainer classes="pt-5">
            <TextArea
              error=""
              placeholder="opis produktu"
              name="body"
              ariaLabel="product description"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            >
              <span
                className={`input-label__text whitespace-nowrap font-bold text-sm text-center text-black-dark`}
              >
                Krótki opis produktu
              </span>
            </TextArea>
          </InputContainer>
          {/** tags */}
          <div className="tags mb-4">
            <Listbox
              value={selectedTags}
              onChange={setSelectedTags}
              multiple={true}
              name="tags"
            >
              <Listbox.Label>
                <h3 className="text-left">Tagi</h3>
              </Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md">
                  <span className="block truncate whitespace-normal">
                    {selectedTags.map((tag) => tag.name).join(', ')}
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
                  <Listbox.Options className="bg-slate-50 absolute z-[2] mt-2 max-h-60 w-full overflow-auto rounded-md py-2 text-base shadow-2xl focus: outline focus:outline-offset-0 focus: outline-1 focus: outline-accent-dark">
                    {tags.map((tag) => (
                      <Listbox.Option
                        key={tag._id}
                        className={({ active }) => {
                          return `relative cursor-default select-none  text-sm font-normal text-black-dark   ${
                            active ? 'bg-accent' : 'bg-slate-50'
                          }`;
                        }}
                        value={tag}
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
                              {tag.name}
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
          {/** parameters */}
          <div className="relative parameters px-4 py-4 mb-4 rounded bg-slate-200 border border-slate-300">
            {actionData ? (
              <Message
                text={actionData.errors?.parameters}
                posX="bottom-1"
                posY="left-1/2 -translate-x-1/2"
              />
            ) : null}
            <Required>
              <span
                className={`input-label__text whitespace-nowrap font-bold text-sm text-center text-black-dark`}
              >
                Parametry
              </span>
            </Required>
            <div className="flex flex-col justify-between ">
              {parameters.map((parameter, index) => {
                return (
                  <div
                    key={index}
                    className="group-inputs mb-4 flex items-center flex-wrap w-full"
                  >
                    <input
                      className={`form-input grow border-2 rounded-md border-slate-200 block mx-1 pointer-events-none ${
                        parameterIndexes.includes(index) &&
                        'border-black-dark pointer-events-auto focus:border-accent focus: shadow-md focus:ring-accent-dark'
                      }`}
                      type="text"
                      placeholder="nazwa parametru"
                      aria-label="parameter name"
                      name={`parameters[${index}].name`}
                      value={parameter.name}
                      readOnly={parameterIndexes.includes(index) ? false : true}
                      onChange={(e) => {
                        const edited = parameters.find((p) => p === parameter);
                        const index = parameters.findIndex(
                          (p) => p === parameter
                        );
                        edited.name = e.target.value;
                        const copy = [...parameters];
                        copy[index] = edited;
                        setParameters(copy);
                      }}
                    />
                    <input
                      className={`form-input grow border-2 rounded-md border-slate-200 block mx-1 pointer-events-none ${
                        parameterIndexes.includes(index) &&
                        'border-black-dark pointer-events-auto focus:border-accent focus: shadow-md focus:ring-accent-dark'
                      }`}
                      type="text"
                      placeholder="jednostka parametru"
                      aria-label="parameter unit"
                      name={`parameters[${index}].unit`}
                      value={parameter.unit}
                      readOnly={parameterIndexes.includes(index) ? false : true}
                      onChange={(e) => {
                        const edited = parameters.find((p) => p === parameter);
                        const index = parameters.findIndex(
                          (p) => p === parameter
                        );
                        edited.unit = e.target.value;
                        const copy = [...parameters];
                        copy[index] = edited;
                        setParameters(copy);
                      }}
                    />
                    <input
                      className={`form-input grow border-2 rounded-md border-slate-200 block mx-1 pointer-events-none ${
                        parameterIndexes.includes(index) &&
                        'border-black-dark pointer-events-auto focus:border-accent focus: shadow-md focus:ring-accent-dark'
                      }`}
                      type="text"
                      placeholder="wartość parametru"
                      aria-label="parameter value"
                      name={`parameters[${index}].value`}
                      value={parameter.value}
                      readOnly={parameterIndexes.includes(index) ? false : true}
                      onChange={(e) => {
                        const edited = parameters.find((p) => p === parameter);
                        const index = parameters.findIndex(
                          (p) => p === parameter
                        );
                        edited.value = e.target.value;
                        const copy = [...parameters];
                        copy[index] = edited;
                        setParameters(copy);
                      }}
                    />
                    <div className="flex items-center justify-center ml-4">
                      <button
                        id={index}
                        className={`w-6 h-6 mr-1 flex items-center justify-center ml-auto border border-slate-800 rounded text-xs hover:shadow-lg ${
                          parameterIndexes.includes(index) &&
                          'bg-accent border-accent-dark'
                        }`}
                        type="button"
                        onClick={() => {
                          if (parameterIndexes.includes(index)) {
                            setParameterIndexes(
                              parameterIndexes.filter((i) => i !== index)
                            );
                          } else {
                            setParameterIndexes([...parameterIndexes, index]);
                          }
                        }}
                        title="Edit parameter"
                        aria-label="Edit parameter"
                      >
                        <PencilSquareIcon className="w-4 h-4 self-center justify-self-center" />
                      </button>
                      <button
                        className="w-6 h-6 flex items-center justify-center ml-auto border border-slate-800 rounded text-xs hover:shadow-lg"
                        type="button"
                        onClick={() => {
                          setParameters(
                            parameters.filter(
                              (item) => item.name !== parameter.name
                            )
                          );
                        }}
                        title="Delete parameter"
                        aria-label="Delete parameter"
                      >
                        <TrashIcon className="w-4 h-4 self-center justify-self-center" />
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="realtive group-inputs mb-4 flex flex-wrap w-full">
                {actionData ? (
                  <div className="">
                    <Message
                      text={actionData.errors?.parameterName}
                      posX="left-16"
                      posY="bottom-1"
                    />
                    <Message
                      text={actionData.errors?.parameterUnit}
                      posX="left-1/2 -translate-x-1/2"
                      posY="bottom-4"
                    />
                    <Message
                      text={actionData.errors?.parameterValue}
                      posX="right-16"
                      posY="bottom-8"
                    />
                  </div>
                ) : null}
                <input
                  className="form-input grow border-2 rounded-md border-black-dark block mx-1  focus:border-accent focus: shadow-md focus:ring-accent-dark"
                  type="text"
                  placeholder="nazwa parametru"
                  aria-label="parameter name"
                  value={p.name}
                  onChange={(e) => {
                    setP({ ...p, name: e.target.value });
                  }}
                />
                <div className="unit">
                  <Listbox value={selectedUnit} onChange={setSelectedUnit}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md">
                        <span className="block truncate">{selectedUnit}</span>
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
                        <Listbox.Options
                          onClick={(e) => {
                            // console.log(e.target.textContent);
                            const unit = e.target.textContent;
                            setP({ ...p, unit });
                          }}
                          className="bg-slate-50 absolute z-[1] mt-2 max-h-60 w-24 overflow-auto rounded-md py-2 text-base shadow-2xl focus: outline focus:outline-offset-0 focus: outline-1 focus: outline-accent-dark"
                        >
                          {units.map((unit) => (
                            <Listbox.Option
                              key={unit}
                              className={({ active }) => {
                                return `relative cursor-default select-none text-sm font-normal text-black-dark ${
                                  active ? 'bg-accent' : 'bg-slate-50'
                                }`;
                              }}
                              value={unit}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected
                                        ? 'font-semibold bg-primary text-white'
                                        : 'font-normal'
                                    }`}
                                  >
                                    {unit}
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
                <input
                  className="form-input grow border-2 rounded-md border-black-dark block mx-1  focus:border-accent focus: shadow-md focus:ring-accent-dark"
                  type="text"
                  placeholder="wartość parametru"
                  aria-label="parameter value"
                  value={p.value}
                  onChange={(e) => {
                    setP({ ...p, value: e.target.value });
                  }}
                />
              </div>
              <button
                className="w-8 h-8 flex items-center justify-center ml-auto border border-slate-800 rounded text-xs hover:shadow-lg"
                type="button"
                title="Add parameter"
                onClick={() => {
                  setParameters([...parameters, p]);
                  setP({ name: '', unit: 'kg', value: '' });
                }}
              >
                <PlusCircleIcon className="w-6 h-6 self-center justify-self-center" />
              </button>
            </div>
          </div>
          {/** documents */}
          <div className="documents px-4 pb-4 rounded bg-slate-200 border border-slate-300">
            <Listbox
              value={selectedFiles}
              onChange={setSelectedFiles}
              multiple={true}
              name="documents"
            >
              <Listbox.Label>
                <h3 className="text-left">Dokumenty</h3>
              </Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md">
                  <span className="block truncate whitespace-normal">
                    {selectedFiles.map((file) => file.originalname).join(', ')}
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
                    {files.map((file) => (
                      <Listbox.Option
                        key={file._id}
                        className={({ active }) => {
                          return `relative cursor-default select-none  text-sm font-normal text-black-dark   ${
                            active ? 'bg-accent' : 'bg-slate-50'
                          }`;
                        }}
                        value={file}
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
                              {file.filename}
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

          {/**features */}
          <InputContainer classes="pt-5">
            <TextArea
              error=""
              placeholder="załadunek: 10 kg,pojemność bębna: 100 litrów,G-faktor: 400,"
              name="features"
              ariaLabel="product features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            >
              <span
                className={`input-label__text whitespace-nowrap font-bold text-sm text-center text-black-dark`}
              >
                Główne cechy
              </span>
            </TextArea>
          </InputContainer>

          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton
              type="submit"
              title={productDetails?.model ? 'edytuj' : 'zapisz'}
              label={productDetails?.model ? 'edytuj' : 'zapisz'}
            >
              {productDetails?.model ? (
                <PencilSquareIcon className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              ) : (
                <GiSave className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              )}
            </ActionButton>
          </ActionButtons>
        </Form>
      </main>
      <Footer />
    </>
  );
}
