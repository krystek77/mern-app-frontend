import React, { useEffect, useState } from "react";
import { useLoaderData, Form, useActionData, useNavigate } from "react-router-dom";
import SpinnerOverlay from "../components/SpinnerOverlay";
import FormLinks from "../components/Form/FormLinks";
import PageTitle from "../components/PageTitle/PageTitle";
import Footer from "../containers/Footer/Footer";
import PageHeader from "../components/PageHeader/PageHeader";
import AdminData from "../components/Admin/AdminData/AdminData";
import ActionButton from "../components/Form/ActionButtons/ActionButton/ActionButton";
import ActionButtons from "../components/Form/ActionButtons/ActionButtons";
import { GiSave } from "react-icons/gi";
import InputContainer from "../components/Form/InputContainer";
import Input from "../components/Form/Input";
import RequiredIndicator from "../components/Required";
import NoItems from "../components/NoItems/NoItems";

import { isValidSupplier } from "../utils";
import userAPI from "../utils/user";
import * as api from "../api/supplier";

import { MdEmail, MdPhone } from "react-icons/md";
import { ImMobile } from "react-icons/im";
import { FaRegIdCard } from "react-icons/fa";
import FormButtonsLink from "../components/Admin/FormButtonsLink/FormButtonsLink";
import { useScrollIntoView } from "../hooks";
import Dialog from "../components/Dialog/Dialog";

export async function loader({ params, request }) {

  const { supplierId } = params;
  const url = new URL(request.url);
  const data = {
    message: { supplier: "", suppliers: "" },
    suppliers: [],
    supplier: null,
    user: userAPI.getUser(),
  };
  try {
    const responseGetSuppliers = await api.getAllSuppliers();
    if (responseGetSuppliers.message) {
      data.message.suppliers = responseGetSuppliers.message;
    } else {
      data.suppliers = responseGetSuppliers;
    }
    if (supplierId && url.pathname === `/pralma/formularz-dostawcy/${supplierId}/edytuj`) {
      const responseGetSupplierDetails = await api.getSupplierDetails(supplierId);
      if (responseGetSupplierDetails.message) {
        data.message.supplier = responseGetSupplierDetails.message;
      } else {
        data.supplier = responseGetSupplierDetails;
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function action({ request, params }) {
  const data = { errors: null, message: { create: "", update: "", delete: "" } };
  const { supplierId } = params;
  const url = new URL(request.url);

  try {
    let formatedFormData;
    if (
      (supplierId && url.pathname === `/pralma/formularz-dostawcy/${supplierId}/edytuj`) ||
      url.pathname === "/pralma/formularz-dostawcy"
    ) {
      const formData = await request.formData();
      formatedFormData = Object.fromEntries(formData);

      const errors = isValidSupplier(formatedFormData);

      if (Object.keys(errors).length) {
        data.errors = errors;
        return data;
      }
    }
    if (url.pathname === "/pralma/formularz-dostawcy") {
      const responseCreateSupplier = await api.createSupplier(formatedFormData);
      if (responseCreateSupplier.message) {
        data.message.create = responseCreateSupplier.message;
      }
    }
    if (supplierId && url.pathname === `/pralma/formularz-dostawcy/${supplierId}/edytuj`) {
      const responseUpdateSupplier = await api.updateSupplier(supplierId, formatedFormData);
      if (responseUpdateSupplier.message) {
        data.message.update = responseUpdateSupplier.message;
      }
    }

    if (supplierId && url.pathname === `/pralma/formularz-dostawcy/${supplierId}/skasuj`) {
      const responseDeleteSupplier = await api.deleteSupplier(supplierId);
      if (responseDeleteSupplier.message) {
        data.message.delete = responseDeleteSupplier.message;
      }
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export default function SupplierForm() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const actionData = useActionData();
  const { ref } = useScrollIntoView();
  const [supplier, setSupplier] = useState(() =>
    data.supplier
      ? data.supplier
      : {
          _id: "",
          companyName: "",
          street: "",
          streetNumber: "",
          localNumber: "",
          zipCode: "",
          city: "",
          phone: "",
          mobilePhone: "",
          email: "",
          www: "",
          nip: "",
        }
  );
  const handleReset = () => {
    setSupplier({
      _id: "",
      companyName: "",
      street: "",
      streetNumber: "",
      localNumber: "",
      zipCode: "",
      city: "",
      phone: "",
      mobilePhone: "",
      email: "",
      www: "",
      nip: "",
    });
    navigate("/pralma/formularz-dostawcy");
  };
  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (data.supplier) {
      setSupplier(data.supplier);
    } else {
      setSupplier({
        _id: "",
        companyName: "",
        street: "",
        streetNumber: "",
        localNumber: "",
        zipCode: "",
        city: "",
        phone: "",
        mobilePhone: "",
        email: "",
        www: "",
        nip: "",
      });
    }
  }, [data.supplier]);

  return (
    <>
      <Dialog message={data.message.suppliers} navigateTo='/pralma/formularz-dostawcy' />
      <Dialog message={data.message.supplier} navigateTo={`/pralma/formularz-dostawcy/${supplier._id}/edytuj`} />
      {actionData ? (
        <div>
          <Dialog message={actionData.message.create} navigateTo='/pralma/formularz-dostawcy' />
          <Dialog message={actionData.message.update} navigateTo='/pralma/formularz-dostawcy' />
          <Dialog message={actionData.message.delete} navigateTo='/pralma/formularz-dostawcy' />
        </div>
      ) : null}
      <SpinnerOverlay />
      <PageHeader ref={ref} bg='bg_admin'>
        <AdminData user={data.user} />
      </PageHeader>
      <main className='pt-8 px-8 pb-16 bg-admin-light bg-opacity-20'>
        <FormLinks supplierId={data?.supplier?._id} />
        <PageTitle text={data?.supplier?._id ? "Edytowanie danych dostawcy" : "Dodawanie dostawcy"} />
        <Form
          id='supplier-form'
          method='POST'
          action={
            data?.supplier?._id ? `/pralma/formularz-dostawcy/${supplier._id}/edytuj` : "/pralma/formularz-dostawcy"
          }
          className='relative max-w-4xl'>
          <InputContainer classes='mb-8'>
            <RequiredIndicator>
              <Input
                error={actionData?.errors?.companyName}
                type='text'
                name='companyName'
                value={supplier.companyName}
                onChange={(e) => setSupplier({ ...supplier, companyName: e.target.value })}
                label='nazwa firmy'
                ariaLabel='company name'
                placeholder='nazwa firmy'
              />
            </RequiredIndicator>
          </InputContainer>
          <InputContainer classes='mb-8 w-full md:w-1/2'>
            <RequiredIndicator>
              <Input
                error={actionData?.errors?.nip}
                type='text'
                name='nip'
                value={supplier.nip}
                onChange={(e) => setSupplier({ ...supplier, nip: e.target.value })}
                label='NIP'
                ariaLabel='NIP'
                placeholder='np.: 6570081116'
              />
            </RequiredIndicator>
          </InputContainer>
          <div className='grid grid-cols-1 md:grid-cols-4 md:gap-x-4'>
            <InputContainer classes='mb-12 md:col-span-2'>
              <Input
                error=''
                type='text'
                name='street'
                value={supplier.street}
                onChange={(e) => setSupplier({ ...supplier, street: e.target.value })}
                label='ulica'
                ariaLabel='street'
                placeholder='ulica'
              />
            </InputContainer>
            <InputContainer classes='mb-8'>
              <Input
                error=''
                type='text'
                name='streetNumber'
                value={supplier.streetNumber}
                onChange={(e) => setSupplier({ ...supplier, streetNumber: e.target.value })}
                label='numer ulicy'
                ariaLabel='street number'
                placeholder='numer ulicy'
              />
            </InputContainer>
            <InputContainer classes='mb-8'>
              <Input
                error=''
                type='text'
                name='localNumber'
                value={supplier.localNumber}
                onChange={(e) => setSupplier({ ...supplier, localNumber: e.target.value })}
                label='numer lokalu'
                ariaLabel='local number'
                placeholder='numer lokalu'
              />
            </InputContainer>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-4'>
            <InputContainer classes='mb-8'>
              <RequiredIndicator>
                <Input
                  error={actionData?.errors?.city}
                  type='text'
                  name='city'
                  value={supplier.city}
                  onChange={(e) => setSupplier({ ...supplier, city: e.target.value })}
                  label='miasto'
                  ariaLabel='city'
                  placeholder='miasto'
                />
              </RequiredIndicator>
            </InputContainer>
            <InputContainer classes='mb-8'>
              <RequiredIndicator>
                <Input
                  error={actionData?.errors?.zipCode}
                  type='text'
                  name='zipCode'
                  value={supplier.zipCode}
                  onChange={(e) => setSupplier({ ...supplier, zipCode: e.target.value })}
                  label='kod pocztowy'
                  ariaLabel='zip code'
                  placeholder='kod pocztowy'
                />
              </RequiredIndicator>
            </InputContainer>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-4'>
            <InputContainer classes='mb-8'>
              <Input
                error={actionData?.errors?.phone}
                type='text'
                name='phone'
                value={supplier.phone}
                onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })}
                label='tel:'
                ariaLabel='phone'
                placeholder='np.: +48 41-345-05-61 / +420 41-345-05-61'
              />
            </InputContainer>
            <InputContainer classes='mb-8'>
              <Input
                error={actionData?.errors?.mobilePhone}
                type='text'
                name='mobilePhone'
                value={supplier.mobilePhone}
                onChange={(e) => setSupplier({ ...supplier, mobilePhone: e.target.value })}
                label='komórka'
                ariaLabel='mobile phone'
                placeholder='np.: +48 602-191-607'
              />
            </InputContainer>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-4'>
            <InputContainer classes='mb-8'>
              <RequiredIndicator>
                <Input
                  error={actionData?.errors?.email}
                  type='text'
                  name='email'
                  value={supplier.email}
                  onChange={(e) => setSupplier({ ...supplier, email: e.target.value })}
                  label='email'
                  ariaLabel='email'
                  placeholder='np.: biuro@pralma.pl'
                />
              </RequiredIndicator>
            </InputContainer>
            <InputContainer classes='mb-8'>
              <Input
                error={actionData?.errors?.www}
                type='text'
                name='www'
                value={supplier.www}
                onChange={(e) => setSupplier({ ...supplier, www: e.target.value })}
                label='strona internetowa'
                ariaLabel='website'
                placeholder='np.: http://www.pralma.pl'
              />
            </InputContainer>
          </div>
          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton
              type='submit'
              title={data?.supplier?._id ? "zapisz edycję dostawcy" : "zapisz dostawcę"}
              label={data?.supplier?._id ? "zapisz edycję dostawcy" : "zapisz dostawcę"}>
              <GiSave className='w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200' />
            </ActionButton>
          </ActionButtons>
        </Form>
        {data.suppliers.length ? (
          <>
            <PageTitle text='Lista dostawców' />
            <div className='grid grid-cols-1 gap-4 auto-rows-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-white py-8 px-8 rounded border border-slate-200'>
              {data.suppliers.map((supplier) => (
                <div
                  className={
                    data?.supplier?._id === supplier._id
                      ? "border-2 border-accent-dark rounded shadow-lg bg-accent"
                      : "flex flex-col justify-between"
                  }
                  key={supplier._id}>
                  <div className='bg-white  rounded text-xs text-black-dark shadow-md'>
                    <div className='flex flex-wrap justify-between items-center font-medium text-sm uppercase bg-slate-200 border border-slate-300 rounded-tl rounded-tr p-1'>
                      <span>{supplier.companyName}</span>
                      <FaRegIdCard className='w-6 h-6 text-primary' />
                    </div>
                    <div className='p-2'>
                      {/** street */}
                      <div className=''>
                        <div className='flex justify-start items-center'>
                          <span className='font-medium mr-1'>ul.</span>
                          <div className='mr-1'>
                            <span className='mr-1'>{supplier.street || "-"}</span>
                            <span className='mr-1'>{supplier.streetNumber || "-"}</span>
                            <span className='mx-px'>/</span>
                            <span className=''>{supplier.localNumber || "-"}</span>
                          </div>
                        </div>
                        {/** city */}
                        <div>
                          <span className='mr-1'>{supplier.zipCode || "-"}</span>
                          <span className=''>{supplier.city || "-"}</span>
                        </div>
                      </div>
                      {/** NIP */}
                      <div className='flex justify-start items-center'>
                        <span className='mr-1'>NIP:</span>
                        <span>{supplier.nip || "-"}</span>
                      </div>
                      <div className='border-t border-t-slate-100 mt-2 pt-2'>
                        {/** phone */}
                        <div className='flex justify-start items-center mb-1'>
                          <MdPhone className='mr-1 text-accent-dark w-4 h-4' />
                          {supplier.phone ? (
                            <a className='hover:text-slate-500' href={`tel:${supplier.phone.replace(/[\s-]/gm, "")}`}>
                              {supplier.phone}
                            </a>
                          ) : (
                            "-"
                          )}
                        </div>
                        {/** mobilePhone */}
                        <div className='flex justify-start items-center mb-1'>
                          <ImMobile className='mr-1 text-accent-dark w-4 h-4' />
                          {supplier.mobilePhone ? (
                            <a
                              className='hover:text-slate-500'
                              href={`tel:${supplier.mobilePhone.replace(/[\s-]/gm, "")}`}>
                              {supplier.mobilePhone}
                            </a>
                          ) : (
                            "-"
                          )}
                        </div>
                        {/** email */}
                        <div className='flex justify-start items-center mb-2'>
                          <MdEmail className='mr-1 text-accent-dark w-4 h-4' />
                          {supplier.email ? (
                            <a className='hover:text-slate-500' href={`mailto:${supplier.email}`}>
                              {supplier.email}
                            </a>
                          ) : (
                            "-"
                          )}
                        </div>
                        {/** wwww */}
                        <div className='font-medium italic'>
                          {supplier.www ? (
                            <a
                              target='_blank'
                              rel='noreferrer'
                              className='group flex justify-center bg-slate-100 rounded py-px px-1'
                              href={supplier.www}>
                              <span className='group-hover:text-slate-500'>{supplier.www}</span>
                            </a>
                          ) : (
                            <div className='group flex justify-center bg-slate-100 rounded py-px px-1'>-</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      ref.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "center",
                      });
                    }}>
                    <FormButtonsLink
                      urlAdd='/pralma/formularz-dostawcy'
                      urlEdit={`/pralma/formularz-dostawcy/${supplier._id}`}
                      urlDelete={`/pralma/formularz-dostawcy/${supplier._id}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <NoItems msg='Brak dostawców' />
        )}
        ` `
      </main>
      <Footer />
    </>
  );
}
