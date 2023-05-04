import React from "react";
import PropTypes from "prop-types";
import { FolderPlusIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { Form, useHref } from "react-router-dom";

export default function FormLinks({
  tagName,
  model,
  controlName,
  documentSlug,
  downloadImageId,
  supplierId,
  sparePartId,
  optionId,
  voltageId,
  heatingId,
}) {
  const url = useHref();
  
  return (
    <div className=' max-w-4xl px-8 border py-8 bg-white rounded  '>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-max'>
        {/** product */}
        <div className='flex flex-col justify-start items-start border border-accent-dark bg-accent px-2 rounded overflow-hidden '>
          {/** kategoria */}
          <Form className='my-1 w-full' action='/pralma/formularz-kategorii'>
            <button
              className={
                url === "/pralma/formularz-kategorii"
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              <FolderPlusIcon className='w-6 h-6 mr-1' />
              <span className='lowercase'>kategoria</span>
            </button>
          </Form>
          {/** tag */}
          <Form className='mb-1 w-full' action='/pralma/formularz-tagu'>
            <button
              className={
                url === "/pralma/formularz-tagu" || tagName
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              {url === `/pralma/formularz-tagu/edytuj-tag/${tagName}` || url === `/pralma/formularz-tagu/${tagName}` ? (
                <PencilSquareIcon className='w-6 h-6 mr-1 group-hover:text-slate-200' />
              ) : (
                <FolderPlusIcon className='w-6 h-6 mr-1' />
              )}
              <span className='lowercase'>tag</span>
            </button>
          </Form>
          {/** document */}
          <Form
            className='mb-1 w-full'
            action={
              documentSlug ? `/pralma/formularz-dokumentu/${documentSlug}/edytuj` : "/pralma/formularz-dokumentu"
            }>
            <button
              className={
                url === "/pralma/formularz-dokumentu" || documentSlug
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              {documentSlug ? (
                <PencilSquareIcon className='w-6 h-6 mr-1' />
              ) : (
                <FolderPlusIcon className='w-6 h-6 mr-1' />
              )}

              <span className='lowercase'>dokument</span>
            </button>
          </Form>
          {/** product */}
          <Form className='w-full' action='/pralma/formularz-produktu'>
            <button
              className={
                url === "/pralma/formularz-produktu" || model
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              {model ? (
                <PencilSquareIcon className='w-6 h-6 mr-1 group-hover:text-slate-200' />
              ) : (
                <FolderPlusIcon className='w-6 h-6 mr-1' />
              )}

              <span className='lowercase'>produkt</span>
            </button>
          </Form>
        </div>

        {/** pricelist of product */}
        <div className='flex flex-col justify-start items-start border border-accent-dark bg-accent px-2 rounded'>
          {/** control */}
          <Form className='w-full my-1' action='/pralma/formularz-sterownika'>
            <button
              className={
                url === "/pralma/formularz-sterownika" || controlName
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              {controlName ? (
                <PencilSquareIcon className='w-6 h-6  mr-1 group-hover:text-slate-200' />
              ) : (
                <FolderPlusIcon className='w-6 h-6 mr-1' />
              )}

              <span className='lowercase'>sterownik</span>
            </button>
          </Form>
          {/** heating */}
          <Form
            className='w-full mb-1'
            action={heatingId ? `/pralma/formularz-podgrzewu/${heatingId}/edytuj` : `/pralma/formularz-podgrzewu`}>
            <button
              className={
                url === "/pralma/formularz-podgrzewu" || heatingId
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              {heatingId ? <PencilSquareIcon className='w-6 h-6 mr-1' /> : <FolderPlusIcon className='w-6 h-6 mr-1' />}
              <span className='lowercase'>podgrzew</span>
            </button>
          </Form>
          {/** voltage */}
          <Form
            className='w-full mb-1'
            action={voltageId ? `/pralma/formularz-zasilania/${voltageId}/edytuj` : "/pralma/formularz-zasilania"}>
            <button
              className={
                url === "/pralma/formularz-zasilania" || voltageId
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              {voltageId ? <PencilSquareIcon className='w-6 h-6 mr-1' /> : <FolderPlusIcon className='w-6 h-6 mr-1' />}

              <span className='lowercase'>zasilanie</span>
            </button>
          </Form>
          {/** option */}
          <Form
            className='w-full mb-1'
            action={optionId ? `/pralma/formularz-opcji/${optionId}/edytuj` : "/pralma/formularz-opcji"}>
            <button
              className={
                url === "/pralma/formularz-opcji" || optionId
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              {optionId ? <PencilSquareIcon className='w-6 h-6 mr-1' /> : <FolderPlusIcon className='w-6 h-6 mr-1' />}

              <span className='mr-1 lowercase'>opcje</span>
            </button>
          </Form>
          {/** pricelist */}
          <Form className='w-full mb-1' action='/pralma/formularz-cennika'>
            <button
              className={
                url === "/pralma/formularz-cennika"
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              <FolderPlusIcon className='w-6 h-6 mr-1' />
              <span className='lowercase'>cennik produktu</span>
            </button>
          </Form>
        </div>

        {/** post add link */}
        <div className='flex flex-col justify-start items-start border border-accent-dark bg-accent px-2 rounded'>
          <Form className='my-1 w-full' action='/pralma/formularz-wiadomosci'>
            <button
              className={
                url === "/pralma/formularz-wiadomosci"
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              <FolderPlusIcon className='w-6 h-6 mr-1' />
              <span className='lowercase'>wiadomość</span>
            </button>
          </Form>
        </div>

        {/** laundry photo */}
        <div className='flex flex-col justify-start items-start border border-accent-dark bg-accent px-2 rounded'>
          <Form
            className='my-1 w-full'
            action={
              downloadImageId ? `/pralma/formularz-pralni/${downloadImageId}/edytuj` : "/pralma/formularz-pralni"
            }>
            <button
              className={
                url === "/pralma/formularz-pralni" || downloadImageId
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              {downloadImageId ? (
                <PencilSquareIcon className='w-6 h-6 mr-1' />
              ) : (
                <FolderPlusIcon className='w-6 h-6 mr-1' />
              )}

              <span className='lowercase'>zdjęcie pralni</span>
            </button>
          </Form>
        </div>

        {/** supplier and sparepart */}
        <div className='flex flex-col justify-start items-start border border-accent-dark bg-accent px-2 rounded'>
          <Form className='w-full my-1' action='/pralma/formularz-dostawcy'>
            <button
              className={
                url === "/pralma/formularz-dostawcy" || supplierId
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              {supplierId ? <PencilSquareIcon className='w-6 h-6 mr-1' /> : <FolderPlusIcon className='w-6 h-6 mr-1' />}
              <span className='lowercase'>dostawca</span>
            </button>
          </Form>
          <Form className='w-full mb-1' action='/pralma/formularz-czesci-zamiennej'>
            <button
              className={
                url === "/pralma/formularz-czesci-zamiennej" || sparePartId
                  ? "flex flex-wrap justify-start items-center w-full border border-primary-dark px-2 text-xs bg-primary text-white font-medium"
                  : "flex flex-wrap justify-start items-center w-full border border-slate-200 px-2 text-xs bg-slate-100 hover:shadow-lg hover:bg-accent hover:border-accent-dark"
              }
              type='submit'>
              {sparePartId ? (
                <PencilSquareIcon className='w-6 h-6 mr-1' />
              ) : (
                <FolderPlusIcon className='w-6 h-6 mr-1' />
              )}
              <span className='lowercase'>część zamienna</span>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

FormLinks.propTypes = {
  tagName: PropTypes.string,
  model: PropTypes.string,
  controlName: PropTypes.string,
  documentSlug: PropTypes.string,
  downloadImageId: PropTypes.string,
  supplierId: PropTypes.string,
  sparePartId: PropTypes.string,
  optionId: PropTypes.string,
  heatingId: PropTypes.string,
  voltageId: PropTypes.string,
};
FormLinks.defaultProps = {
  tagName: "",
  model: "",
  controlName: "",
  documentSlug: "",
  downloadImageId: "",
  supplierId: "",
  sparePartId: "",
  optionId: "",
  heatingId: "",
  voltageId: "",
};
