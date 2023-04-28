import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from 'react-router-dom';
import ActionButtons from '../components/Form/ActionButtons/ActionButtons';
import ActionButton from '../components/Form/ActionButtons/ActionButton/ActionButton';
import InputContainer from '../components/Form/InputContainer';
import Input from '../components/Form/Input';
import Divider from '../components/Divider';
import NoItems from '../components/NoItems/NoItems';
import SpinnerOverlay from '../components/SpinnerOverlay';
import Message from '../components/Message';
import FormLinks from '../components/Form/FormLinks';
import PageTitle from '../components/PageTitle/PageTitle';
import Footer from './Footer/Footer';
import { GiSave } from 'react-icons/gi';
import { FaFileImage } from 'react-icons/fa';
import FormButton from '../components/Admin/FormButton';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import * as api from '../api/laundryPhoto';
import {
  formatFormData,
  isValidLaundryPhotos,
  isValidLaundryPhoto,
} from '../utils';
import RequiredIndicator from '../components/Required';
import PageHeader from '../components/PageHeader/PageHeader';
import {server} from '../config/config'

export async function loader({ params }) {
  const { laundryPhotoId } = params;
  let message = '';
  let downloadImage = null;
  try {
    if (laundryPhotoId) {
      const responseGetLaundryPhoto = await api.getLaundryPhoto(laundryPhotoId);
      if (responseGetLaundryPhoto.message) {
        message = responseGetLaundryPhoto;
      } else {
        downloadImage = responseGetLaundryPhoto;
      }
    }
    const uploadsImages = await api.getAllLaundryPhotos();
    return { uploadsImages, message, downloadImage };
  } catch (error) {
    console.log(error.message);
  }
}
export async function action({ request, params }) {
  const url = new URL(request.url);
  const { laundryPhotoId } = params;

  try {
    let message = '';

    if (
      laundryPhotoId &&
      url.pathname === `/pralma/formularz-pralni/${laundryPhotoId}/skasuj`
    ) {
      await api.deleteLaundryPhoto(laundryPhotoId);
      return redirect('/pralma/formularz-pralni');
    }

    if (
      laundryPhotoId &&
      url.pathname === `/pralma/formularz-pralni/${laundryPhotoId}/edytuj`
    ) {
      /** validation of the update photo form */
      const dataToValidation = await request.formData();
      const data = {};
      for (const [key, value] of dataToValidation) {
        formatFormData(data, key, value);
      }
      const errors = isValidLaundryPhoto(data);
      if (Object.keys(errors).length) {
        console.log(errors);
        return errors;
      }
      /** end validation of the update photo form */

      const formData = new FormData();
      const alt = document.getElementById('alt').value;
      const title = document.getElementById('title').value;
      formData.append(
        `image`,
        document.getElementById('image').files[0],
        document.getElementById('image').files[0].name
      );
      formData.append(`alt`, alt);
      formData.append(`title`, title);
      await api.updateLaundryPhoto(laundryPhotoId, formData);
      return redirect('/pralma/formularz-pralni');
    }

    if (url.pathname === '/pralma/formularz-pralni') {
      /** validation of the create photos form */
      const dataToValidation = new FormData();
      const imagesLength = document.getElementById('images').files.length;
      for (let index = 0; index < imagesLength; index++) {
        const alt = document.getElementById(`alt_${index}`).value;
        const title = document.getElementById(`title_${index}`).value;
        dataToValidation.append(
          `images[${index}]`,
          document.getElementById('images').files[index],
          document.getElementById('images').files[index].name
        );
        dataToValidation.append(`alts[${index}]`, alt);
        dataToValidation.append(`titles[${index}]`, title);
      }
      const data = {};
      for (const [key, value] of dataToValidation) {
        formatFormData(data, key, value);
      }
      const errors = isValidLaundryPhotos(data);

      if (Object.keys(errors).length) {
        return errors;
      }
      /** end validation create photos form */
      const formData = new FormData();
      for (let index = 0; index < imagesLength; index++) {
        const alt = document.getElementById(`alt_${index}`).value;
        const title = document.getElementById(`title_${index}`).value;
        formData.append(
          `images`,
          document.getElementById('images').files[index],
          document.getElementById('images').files[index].name
        );
        formData.append(`alts`, alt);
        formData.append(`titles`, title);
      }

      const responseCreateLaundryPhoto = await api.createLaundryPhotos(
        formData
      );
      if (responseCreateLaundryPhoto.message) {
        message = responseCreateLaundryPhoto;
        return message;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default function LaundryForm() {
  const { uploadsImages, downloadImage, message } = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [addiTionalData, setAdditionalData] = useState([]);

  const [image, setImage] = useState('');
  const [alt, setAlt] = useState('');
  const [title, setTitle] = useState('');
  const ref = useRef(null);
  const refPageHeader = useRef(null);

  useEffect(() => {
    setAdditionalData(
      Array.from({ length: images.length }).map(() => ({ alt: '', title: '' }))
    );
    if (downloadImage?._id) {
      setAlt(downloadImage.alt);
      setTitle(downloadImage.title);
    }
  }, [
    images.length,
    downloadImage?.alt,
    downloadImage?._id,
    downloadImage?.title,
  ]);

  useEffect(() => {
    if (actionData !== undefined && actionData.message) {
      setAdditionalData([]);
      setImages([]);
      ref.current.value = '';
    }
  }, [actionData, message]);

  const handleReset = () => {
    setAdditionalData([]);
    setImages([]);
    navigate('/pralma/formularz-pralni');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <SpinnerOverlay />
      <PageHeader ref={refPageHeader} bg="bg_admin"/>
      <main className="pt-8 px-8 pb-16 bg-admin-light bg-opacity-20 relative">
        <Message text={actionData?.message} posY="top-24" posX="right-4" />
        <FormLinks downloadImageId={downloadImage?._id} />
        <PageTitle text="Formularz zdjęć pralni przemysłowych" />
        <Form
          encType="multipart/form-data"
          id="laundry-form"
          method="POST"
          className="relative max-w-4xl"
          action={
            downloadImage
              ? `/pralma/formularz-pralni/${downloadImage._id}/edytuj`
              : '/pralma/formularz-pralni'
          }
        >
          <Message text={message?.message} posY="top-32" posX="right-4" />
          {/** images */}
          {downloadImage?._id ? (
            <>
              <InputContainer>
                <RequiredIndicator posX="right-2" posY="-top-6">
                  <Input
                    error={actionData?.image}
                    id="image"
                    name="image"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={(e) => {
                      setImage([e.target.files[0]]);
                    }}
                  />
                </RequiredIndicator>
              </InputContainer>
              <div className="border border-admin-dark mb-2 px-2 py-4 rounded bg-admin-light">
                <h3 className="flex justify-between items-center">
                  <span>{downloadImage.filename}</span>
                  <span className="bg-primary border border-primary-dark rounded p-1 text-white">{`${(
                    downloadImage.size / 1024
                  ).toFixed(2)} kB`}</span>
                </h3>
                <div className="grid gap-x-4 sm:grid-cols-2">
                  <div className="w-80 h-52 p-2  border border-slate-300 bg-slate-200 rounded overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src={
                        image
                          ? URL.createObjectURL(image[0])
                          : `${server}/${downloadImage.path.replace(
                              'public',
                              ''
                            )}`
                      }
                      alt={downloadImage.filename}
                    />
                  </div>
                  <div>
                    {/** alt */}
                    <InputContainer classes="mb-1">
                      <RequiredIndicator posX="right-2" posY="-top-2">
                        <Input
                          id="alt"
                          type="text"
                          name="alt"
                          error={actionData?.alt}
                          value={alt}
                          onChange={(e) => setAlt(e.target.value)}
                          label="Tekst alternatywny"
                          ariaLabel="Alternative text"
                          placeholder="np,: Pralnia przemysłowa z 'barierą higieny'"
                        />
                      </RequiredIndicator>
                    </InputContainer>
                    {/** title */}
                    <InputContainer classes="mb-0">
                      <RequiredIndicator posX="right-2" posY="-top-2">
                        <Input
                          id="title"
                          type="text"
                          name="title"
                          error={actionData?.title}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          label="Tytuł"
                          ariaLabel="Title"
                          placeholder="np.: Szpital - 'bariera higieny'"
                        />
                      </RequiredIndicator>
                    </InputContainer>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <InputContainer classes="mb-8">
                <RequiredIndicator posY="-top-6" posX="right-2">
                  <Input
                    ref={ref}
                    error={actionData?.images}
                    id="images"
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/webp"
                    onChange={(e) => {
                      setImages([...e.target.files]);
                    }}
                  />
                </RequiredIndicator>
              </InputContainer>
              <Divider />
              {images.length ? (
                images.map((image, index) => (
                  <div
                    key={image.name}
                    className="border border-admin-dark mb-2 px-2 py-4 rounded bg-admin-light"
                  >
                    <h3 className="flex justify-between items-center">
                      <span>{image.name}</span>
                      <span className="bg-primary border border-primary-dark rounded p-1 text-white">{`${(
                        image.size / 1024
                      ).toFixed(2)} kB`}</span>
                    </h3>
                    <div className="grid gap-x-4 sm:grid-cols-2">
                      <div className="w-80 h-52 p-2  border border-slate-300 bg-slate-200 rounded overflow-hidden">
                        <img
                          className="object-cover w-full h-full"
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                        />
                      </div>
                      <div>
                        {/** alt */}
                        <InputContainer classes="mb-1">
                          <RequiredIndicator posY="-top-2" posX="right-2">
                            <Input
                              id={`alt_${index}`}
                              type="text"
                              error={actionData?.alts}
                              value={addiTionalData[index]?.alt || ''}
                              onChange={(e) => {
                                const copy = [...addiTionalData];
                                copy[index] = {
                                  ...copy[index],
                                  alt: e.target.value,
                                };
                                setAdditionalData(copy);
                              }}
                              label="Tekst alternatywny"
                              ariaLabel="Alternative text"
                              placeholder="np,: Pralnia przemysłowa z 'barierą higieny'"
                            />
                          </RequiredIndicator>
                        </InputContainer>
                        {/** title */}
                        <InputContainer classes="mb-0">
                          <RequiredIndicator posY="-top-2" posX="right-2">
                            <Input
                              id={`title_${index}`}
                              type="text"
                              error={actionData?.titles}
                              value={addiTionalData[index]?.title || ''}
                              onChange={(e) => {
                                const copy = [...addiTionalData];
                                copy[index] = {
                                  ...copy[index],
                                  title: e.target.value,
                                };
                                setAdditionalData(copy);
                              }}
                              label="Tytuł"
                              ariaLabel="Title"
                              placeholder="np.: Szpital - 'bariera higieny'"
                            />
                          </RequiredIndicator>
                        </InputContainer>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <NoItems msg="Nie wybrano żadnych zdjęć pralni" />
              )}
            </>
          )}

          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton
              type="submit"
              title={
                downloadImage?._id
                  ? 'zapisz edytowane zdjęcie'
                  : 'zapisz zdjęcie'
              }
              label={
                downloadImage?._id
                  ? 'zapisz edytowane zdjęcie'
                  : 'zapisz zdjęcie'
              }
            >
              {downloadImage?._id ? (
                <PencilSquareIcon className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              ) : (
                <GiSave className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              )}
            </ActionButton>
          </ActionButtons>
        </Form>
        <Divider />
        <PageTitle text="Dodane zdjęcia pralni przemysłowej" />
        {uploadsImages.length ? (
          <div className="max-w-6xl">
            <div className="header-table flex flex-col md:flex-row flex-wrap justify-start items-center border border-slate-300 bg-slate-200 p-1 mb-2 rounded-tr rounded-tl">
              <div className="flex-grow-1 flex-shrink-0 text-center font-semibold text-sm md:w-[280px]">
                Nazwa pliku
              </div>
              <div className="flex-grow-1 flex-shrink-0 text-center font-semibold text-sm md:w-[280px]">
                Tytuł
              </div>
              <div className="flex-grow-1 flex-shrink-0 text-center font-semibold text-sm md:w-[280px]">
                Tekst alternatywny
              </div>
              <div className="flex-grow-1 flex-shrink-0 text-center font-semibold text-sm md:w-[100px] md:ml-auto md:text-right">
                Rozmiar
              </div>
              <div className="flex-grow-1 flex-shrink-0 text-center font-semibold text-sm md:w-[100px] md:ml-auto md:text-right">
                --
              </div>
            </div>
            {uploadsImages.map((uploadImage) => (
              <div
                key={uploadImage._id}
                className={
                  uploadImage._id === downloadImage?._id
                    ? 'flex flex-wrap flex-col md:flex-row justify-start items-center border-b border-b-accent-dark py-1 bg-accent-light '
                    : 'flex flex-wrap flex-col md:flex-row justify-start items-center border-b border-b-slate-300 py-1'
                }
              >
                <div className="flex justify-start items-center flex-grow-1 flex-shrink-0 text-left text-xs">
                  <span>
                    <FaFileImage
                      className={
                        uploadImage._id === downloadImage?._id
                          ? 'w-6 h-6 mr-2 text-accent-dark'
                          : 'w-6 h-6 mr-2 text-primary'
                      }
                    />
                  </span>
                  <div className="flex justify-start items-center flex-wrap md:w-[280px]">
                    <span className="whitespace-nowrap font-semibold">
                      {uploadImage.filename}
                    </span>
                    {uploadImage._id === downloadImage?._id && (
                      <span className="mx-2 italic font-semibold">
                        [edytowany]
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-grow-1 flex-shrink-0 text-left text-xs pointer-events-none md:w-[280px] ">
                  {uploadImage.title}
                </div>
                <div className="flex-grow-1 flex-shrink-0 text-left text-xs md:w-[280px]">
                  {uploadImage.alt}
                </div>
                <div className="flex-grow-1 flex-shrink-0 text-right text-xs md:w-[100px] md:ml-auto">{`${(
                  uploadImage.size / 1024
                ).toFixed(2)} kB`}</div>
                <div className="flex-grow-1 flex-shrink-0 flex justify-end items-center md:w-[100px] md:ml-auto">
                  <FormButton
                    id="edit-laundry-photo"
                    method="GET"
                    btnTitle="edytuj zdjęcie"
                    ariaLabel="edit photo"
                    action={`/pralma/formularz-pralni/${uploadImage._id}/edytuj`}
                    disabled={uploadImage._id === downloadImage?._id}
                    btnClasses={
                      uploadImage._id === downloadImage?._id
                        ? 'pointer-events-none border-0 text-slate-400'
                        : ''
                    }
                  />
                  <FormButton
                    id="delete-laundry-photo"
                    method="POST"
                    action={`/pralma/formularz-pralni/${uploadImage._id}/skasuj`}
                    btnTitle="skasuj zdjęcie"
                    ariaLabel="delete photo"
                    Icon={TrashIcon}
                  ></FormButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoItems msg="Brak zdjęć pralni" />
        )}
      </main>
      <Footer />
    </>
  );
}
