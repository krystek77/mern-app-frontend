import React, { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import {
  useLoaderData,
  Form,
  useNavigate,
  useActionData,
  redirect,
} from 'react-router-dom';
import SpinnerOverlay from '../components/SpinnerOverlay';
import FormLinks from '../components/Form/FormLinks';
import PageTitle from '../components/PageTitle/PageTitle';
import Footer from '../containers/Footer/Footer';
import Message from '../components/Message';
import PageHeader from '../components/PageHeader/PageHeader';
import ActionButton from '../components/Form/ActionButtons/ActionButton/ActionButton';
import ActionButtons from '../components/Form/ActionButtons/ActionButtons';
import { GiSave } from 'react-icons/gi';
import InputContainer from '../components/Form/InputContainer';
import Input from '../components/Form/Input';
import TextArea from '../components/Form/TextArea';
import RequiredIndicator from '../components/Required';
import { getCategories } from '../api/categories';
import { getProductsByCategoryId } from '../api/products';
import { getAllSuppliers } from '../api/supplier';

import * as api from '../api/sparepart';
import * as userAPI from '../utils/user';
import NoItems from '../components/NoItems/NoItems';
import { useScrollIntoView } from '../hooks';
import AdminData from '../components/Admin/AdminData/AdminData';
import { formatFormData, getBase64, isValidSparePart } from '../utils';
import Dialog from '../components/Dialog/Dialog';

export async function loader({ params }) {
  const user = userAPI.checkAdmin();
  const { sparePartId } = params;
  const data = {
    message: {},
    user: user,
    categories: [],
    suppliers: [],
    sparePartId: sparePartId,
    sparePart: null,
  };
  try {
    const responseCategories = await getCategories();
    if (responseCategories.message)
      data.message.categories = responseCategories.message;
    else data.categories = responseCategories;
    const responseSuppliers = await getAllSuppliers();
    if (responseSuppliers.message)
      data.message.suppliers = responseSuppliers.message;
    else data.suppliers = responseSuppliers;
    if (sparePartId) {
      const responseSparePartDetails = await api.getSparePartDetails(
        sparePartId
      );
      if (responseSparePartDetails.message) {
        data.message.sparePartDetails = responseSparePartDetails.message;
      } else data.sparePart = responseSparePartDetails;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function action({ request, params }) {
  const { sparePartId } = params;
  const url = new URL(request.url);
  const data = { message: { create: '', update: '' }, errors: null };

  try {
    const formData = await request.formData();
    const imagesLength = document.getElementById('images').files.length;

    for (let index = 0; index < imagesLength; index++) {
      const image = await getBase64(
        document.getElementById('images').files[index]
      );
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
    let dataToSave = null;
    if (images.length) {
      dataToSave = { ...formatedFormData, images };
    } else {
      delete formatedFormData.images;
      dataToSave = {...formatedFormData}
    }

    const errors = isValidSparePart(dataToSave);
    if (Object.keys(errors).length) {
      data.errors = errors;
      return data;
    }

    if (url.pathname === '/pralma/formularz-czesci-zamiennej') {
      const responseCreateSparePart = await api.createSparePart(dataToSave);
      if (responseCreateSparePart.message) {
        data.message.create = responseCreateSparePart.message;
      } else {
        return redirect(`/czesci-zamienne/${responseCreateSparePart._id}`);
      }
    }

    if (
      sparePartId &&
      url.pathname ===
        `/pralma/formularz-czesci-zamiennej/${sparePartId}/edytuj`
    ) {
      const responseUpdateSparePart = await api.updateSparePart(
        dataToSave,
        sparePartId
      );
      if (responseUpdateSparePart.message) {
        data.message.update = responseUpdateSparePart.message;
      } else {
        return redirect(`/czesci-zamienne/${responseUpdateSparePart._id}`);
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

const AVAILABLE_VALUES = ['NIE', 'TAK'];

export default function SparePartForm() {
  const { ref } = useScrollIntoView();
  const navigate = useNavigate();

  const data = useLoaderData();
  const actionData = useActionData();
  const [selectedCategory, setSelectedCategory] = useState(() =>
    data.categories.length ? data.categories[0] : null
  );
  const [selectedSupplier, setSelectedSupplier] = useState(() =>
    data.suppliers.length ? data.suppliers[0] : null
  );
  const [selectedAvailable, setSelectedAvailable] = useState(
    () => AVAILABLE_VALUES[0]
  );
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [sparePart, setSparePart] = useState({
    _id: '',
    categoryId: selectedCategory,
    products: selectedProducts,
    name: '',
    netPurchasePrice: '0.0',
    netSalePrice: '0.0',
    countryOfOrigin: 'Polska',
    available: selectedAvailable,
    supplier: selectedSupplier,
    netWeight: '0.0',
    grossWeight: '0.0',
    comment: '',
    images: [],
    stock: 0,
  });

  useEffect(() => {
    let ignore = false;
    const fetchProducts = async () => {
      try {
        if (!ignore) {
          const responseProducts = await getProductsByCategoryId(
            selectedCategory._id
          );
          if (!responseProducts.message) {
            setProducts(responseProducts);
            setSelectedProducts([responseProducts[0]]);
          } else {
            setProducts([]);
            setSelectedProducts([]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedCategory) {
      fetchProducts();
    }

    return () => {
      ignore = true;
    };
  }, [selectedCategory]);

  useEffect(() => {
    setSparePart((prevSparePart) => ({
      ...prevSparePart,
      supplier: selectedSupplier,
    }));
    setSparePart((prevSparePart) => ({
      ...prevSparePart,
      available: selectedAvailable,
    }));
    setSparePart((prevSparePart) => ({
      ...prevSparePart,
      categoryId: selectedCategory,
    }));
    setSparePart((prevSparePart) => ({
      ...prevSparePart,
      products: selectedProducts,
    }));
  }, [selectedCategory, selectedAvailable, selectedSupplier, selectedProducts]);

  useEffect(() => {
    if (data.sparePartId && data.sparePart) {
      setSparePart(data.sparePart);
      setSelectedCategory(data.sparePart.categoryId);
      setSelectedSupplier(data.sparePart.supplier);
      setSelectedAvailable(data.sparePart.available);
      setSelectedProducts(data.sparePart.products);
    }
  }, [data?.sparePartId, data.sparePart]);

  const handleReset = () => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <Dialog
        message={data.message.categories}
        navigateTo="/pralma/formularz-czesci-zamiennej"
      />
      <Dialog
        message={data.message.suppliers}
        navigateTo={`/pralma/formularz-czesci-zamiennej`}
      />
      <Dialog
        message={data.message.sparePartDetails}
        navigateTo={`/pralma/formularz-czesci-zamiennej/${data.sparePartId}/edytuj`}
      />
      {actionData ? (
        <div>
          <Dialog
            message={actionData.message.create}
            navigateTo="/pralma/formularz-czesci-zamiennej"
          />
          <Dialog
            message={actionData.message.update}
            navigateTo={`/pralma/formularz-czesci-zamiennej/${data.sparePartId}/edytuj`}
          />
        </div>
      ) : null}
      <SpinnerOverlay />
      <PageHeader ref={ref} bg="bg_admin">
        <AdminData user={data.user} />
      </PageHeader>
      <main className="pt-8 px-8 pb-16 bg-admin-light bg-opacity-20">
        <FormLinks sparePartId={data.sparePartId} />
        <PageTitle
          text={
            data.sparePartId
              ? 'Edytowanie części zamiennej'
              : 'Dodawanie części zamiennej'
          }
        />
        <Form
          id="sparepart-form"
          method="POST"
          className="relative max-w-4xl"
          encType="multipart/form-data"
          action={
            data.sparePartId
              ? `/pralma/formularz-czesci-zamiennej/${data.sparePartId}/edytuj`
              : '/pralma/formularz-czesci-zamiennej'
          }
        >
          {/** category */}
          {data.categories.length ? (
            <div className="category mb-4 bg-slate-200 border border-slate-300 px-4 pb-4 rounded">
              <Listbox
                value={selectedCategory}
                onChange={setSelectedCategory}
                name="categoryId"
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
                      {data.categories.map((category) => (
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
          ) : null}
          {/** products */}
          {products.length ? (
            <div className="relative category mb-4 bg-slate-200 border border-slate-300 px-4 pb-4 rounded">
              {actionData?.errors?.products ? (
                <Message
                  text={actionData?.errors?.products}
                  posX="left-1/2 -translate-x-1/2"
                  posY="top-1"
                />
              ) : null}
              <Listbox
                value={selectedProducts}
                onChange={setSelectedProducts}
                name="products"
                multiple={true}
              >
                <Listbox.Label>
                  <RequiredIndicator>
                    <h3 className="text-left mr-1">Produkty</h3>
                  </RequiredIndicator>
                </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md">
                    <span className="flex justify-between items-center">
                      <span className="block truncate whitespace-normal">
                        {selectedProducts
                          .map((product) => product.model)
                          .join(' ')}
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
          ) : (
            <div className="relative py-2">
              {actionData && actionData.errors.products ? (
                <Message
                  text={actionData.errors.products}
                  posX="left-1/2 -translate-x-1/2"
                  posY="top-1"
                />
              ) : null}
              <NoItems
                msg="Brak produktów w danej kategorii. Musisz najpierw dodać produkt"
                classes="my-4 px-8 italic"
              />
            </div>
          )}
          {/** suppliers */}
          {data.suppliers.length ? (
            <div className="relative category mb-4 bg-slate-200 border border-slate-300 px-4 pb-4 rounded">
              {actionData?.errors?.suppliers ? (
                <Message
                  text={actionData?.errors?.suppliers}
                  posX="left-1/2 -translate-x-1/2"
                  posY="top-1"
                />
              ) : null}
              <Listbox
                value={selectedSupplier}
                onChange={setSelectedSupplier}
                name="supplier"
              >
                <Listbox.Label>
                  <RequiredIndicator>
                    <h3 className="text-left mr-1">Dostawca</h3>
                  </RequiredIndicator>
                </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md">
                    <span className="flex justify-between items-center">
                      <span className="block truncate whitespace-normal">
                        {selectedSupplier.companyName}
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
                      {data.suppliers.map((supplier) => (
                        <Listbox.Option
                          key={supplier._id}
                          className={({ active }) => {
                            return `relative cursor-default select-none  text-sm font-normal text-black-dark   ${
                              active ? 'bg-accent' : 'bg-slate-50'
                            }`;
                          }}
                          value={supplier}
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
                                    {supplier.companyName}
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
          ) : (
            <NoItems
              msg="Brak produktów w danej kategorii. Musisz najpierw dodać produkt"
              classes="my-4 px-8 italic"
            />
          )}
          {/** name */}
          <InputContainer classes="mb-10">
            <RequiredIndicator>
              <Input
                id="name"
                type="text"
                name="name"
                error={actionData?.errors?.name}
                label="nazwa"
                ariaLabel="sparepart name"
                placeholder="np.: zawór spustowy MDB-03RA"
                value={sparePart.name}
                onChange={(e) =>
                  setSparePart({ ...sparePart, name: e.target.value })
                }
              />
            </RequiredIndicator>
          </InputContainer>
          {/**image */}
          <div className="border border-slate-300 bg-white px-4 py-4 mb-4 rounded ">
            <InputContainer>
              <RequiredIndicator>
                <Input
                  id="images"
                  type="file"
                  name="images"
                  multiple={true}
                  label="zdjęcie części zamiennej"
                  onChange={(e) => {
                    if (e.target.files) {
                      setSparePart({
                        ...sparePart,
                        images: [...e.target.files].map((image) => {
                          return URL.createObjectURL(image);
                        }),
                      });
                    }
                  }}
                  ariaLabel="sparepart images"
                />
              </RequiredIndicator>
            </InputContainer>
            {sparePart.images.length ? (
              <div className="bg-white p-2 border border-slate-200 rounded">
                <h3 className="">Zdjęcia</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {sparePart.images.map((image, index) => (
                    <div
                      className="max-w-52 max-h-52 border border-slate-200 bg-slate-100 rounded overflow-hidden"
                      key={`sparepartimage_${index}`}
                    >
                      <img
                        className="object-cover w-full h-full block"
                        src={image}
                        alt="części zamienne do przemysłowych urządzeń pralniczych - Primus, Unimac, Electrolux, Ipso, Speed Queen"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <NoItems
                msg="Nie wybrano żadmego zdjęcia"
                classes="italic px-2"
              />
            )}
          </div>
          {/** net purchase and sale price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <InputContainer>
              <RequiredIndicator>
                <Input
                  id="netPurchasePrice"
                  type="text"
                  name="netPurchasePrice"
                  error=""
                  label="cena netto zakupu [PLN]"
                  ariaLabel="sparepart net purchase price"
                  value={sparePart.netPurchasePrice}
                  onChange={(e) => {
                    setSparePart({
                      ...sparePart,
                      netPurchasePrice: e.target.value,
                    });
                  }}
                />
              </RequiredIndicator>
            </InputContainer>
            <InputContainer>
              <RequiredIndicator>
                <Input
                  id="netSalePrice"
                  type="text"
                  name="netSalePrice"
                  error=""
                  label="cena netto sprzedaży [PLN]"
                  ariaLabel="sparepart net sale price"
                  value={sparePart.netSalePrice}
                  onChange={(e) =>
                    setSparePart({ ...sparePart, netSalePrice: e.target.value })
                  }
                />
              </RequiredIndicator>
            </InputContainer>
          </div>
          {/** country of origin */}
          <InputContainer>
            <Input
              id="countryOfOrigin"
              type="text"
              name="countryOfOrigin"
              error=""
              label="kraj pochodzenia"
              ariaLabel="country of origin"
              placeholder="np.: Polska"
              value={sparePart.countryOfOrigin}
              onChange={(e) =>
                setSparePart({ ...sparePart, countryOfOrigin: e.target.value })
              }
            />
          </InputContainer>
          {/** available */}
          {AVAILABLE_VALUES.length ? (
            <div className="category mb-4 bg-slate-200 border border-slate-300 px-4 pb-4 rounded">
              <Listbox
                value={selectedAvailable}
                onChange={setSelectedAvailable}
                name="available"
              >
                <Listbox.Label>
                  <RequiredIndicator>
                    <h3 className="text-left mr-1">Dostępna</h3>
                  </RequiredIndicator>
                </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md">
                    <span className="flex justify-between items-center">
                      <span className="block truncate whitespace-normal">
                        {selectedAvailable}
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
                      {AVAILABLE_VALUES.map((available, index) => (
                        <Listbox.Option
                          key={`available_${index}`}
                          className={({ active }) => {
                            return `relative cursor-default select-none  text-sm font-normal text-black-dark   ${
                              active ? 'bg-accent' : 'bg-slate-50'
                            }`;
                          }}
                          value={available}
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
                                  <span className="truncate">{available}</span>
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
          {/** stock */}
          <InputContainer>
            <Input
              id="stock"
              type="number"
              name="stock"
              error=""
              label="Ilość na magazynie"
              ariaLabel="quantity in stock"
              value={sparePart.stock}
              onChange={(e) =>
                setSparePart({ ...sparePart, stock: e.target.value })
              }
            />
          </InputContainer>
          {/** net weight and gross weight  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <InputContainer>
              <Input
                id="netWeight"
                type="text"
                name="netWeight"
                error=""
                label="masa netto [kg]"
                ariaLabel="net weight"
                value={sparePart.netWeight}
                onChange={(e) =>
                  setSparePart({ ...sparePart, netWeight: e.target.value })
                }
              />
            </InputContainer>
            <InputContainer>
              <Input
                id="grossWeight"
                type="text"
                name="grossWeight"
                error=""
                label="masa brutto [kg]"
                ariaLabel="gross weight"
                value={sparePart.grossWeight}
                onChange={(e) =>
                  setSparePart({ ...sparePart, grossWeight: e.target.value })
                }
              />
            </InputContainer>
          </div>
          {/** comment */}
          <TextArea
            value={sparePart.comment}
            onChange={(e) =>
              setSparePart({ ...sparePart, comment: e.target.value })
            }
            placeholder="np.: nie występuje w podzespołach"
            name="comment"
            ariaLabel="comment"
            error=""
            classes="mb-8"
          >
            <h3 className="text-left my-0">Uwagi</h3>
          </TextArea>

          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton
              type="submit"
              title={
                data.sparePartId
                  ? 'zapisz edytowaną część zamienną'
                  : 'zapisz część zamienną'
              }
              label={
                data.sparePartId
                  ? 'zapisz edytowaną część zamienną'
                  : 'zapisz część zamienną'
              }
            >
              <GiSave className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
            </ActionButton>
          </ActionButtons>
        </Form>
      </main>
      <Footer />
    </>
  );
}
