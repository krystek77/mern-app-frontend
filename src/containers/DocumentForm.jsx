import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  useNavigate,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import {
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/20/solid';
import InputContainer from '../components/Form/InputContainer';
import Input from '../components/Form/Input';
import ActionButtons from '../components/Form/ActionButtons/ActionButtons';
import ActionButton from '../components/Form/ActionButtons/ActionButton/ActionButton';
import { GiSave } from 'react-icons/gi';
import FormLinks from '../components/Form/FormLinks';
import PageTitle from '../components/PageTitle/PageTitle';
import NoItems from '../components/NoItems/NoItems';
import Message from '../components/Message';
import SpinnerOverlay from '../components/SpinnerOverlay';
import * as api from '../api/document';
import { fileTypeIcon, getExtensionFile, isValidDocument } from '../utils';
import Footer from './Footer/Footer';
import PageHeader from '../components/PageHeader/PageHeader';
import {server} from '../config/config'

export async function loader() {
  try {
    const documents = await api.getDocuments();
    return { documents };
  } catch (error) {
    console.log(error.message);
  }
}
export async function action({ params, request }) {
  const { slug } = params;
  const url = new URL(request.url);

  const formData = new FormData();
  const documentsLength = document.getElementById('document').files.length;

  for (let index = 0; index < documentsLength; index++) {
    formData.append(
      `document`,
      document.getElementById('document').files[index],
      document.getElementById('document').files[index].name
    );
  }
  try {
    // edit display document name
    if (slug && url.pathname === `/pralma/formularz-dokumentu/${slug}/edytuj`) {
      const docs = await api.getDocuments();
      const documentSlug = docs.find((d) => d.slug === slug).slug;
      const displayFileName = document.getElementById(documentSlug).value;
      formData.append('displayFileName', displayFileName);

      const errors = isValidDocument(formData);
      if (Object.keys(errors).length) {
        return errors;
      }
      await api.updateDisplayFileName(slug, displayFileName);
      return redirect('/pralma/formularz-dokumentu');
    }
    // delete document
    if (slug && url.pathname === `/pralma/formularz-dokumentu/${slug}/skasuj`) {
      console.log('DELETE');
      await api.deleteDocument(slug);
      return redirect('/pralma/formularz-dokumentu');
    }
    // create document
    if (!slug && url.pathname === `/pralma/formularz-dokumentu`) {
      const response = await api.createDocuments(formData);
      return response;
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default function DocumentForm() {
  const actionData = useActionData();
  const ref = useRef(null);
  const { documents } = useLoaderData();
  const [key, setKey] = useState(Math.random().toString(36));
  const [displayFileName, setDisplayFileName] = useState('Karta Informacyjna');
  const [documentSlug, setDocumentSlug] = useState('');
  const navigate = useNavigate();
  const navigation = useNavigation();

  const handleCancel = () => {
    setKey(Math.random().toString(36));
    setDocumentSlug('');
    setDisplayFileName('Karta Informacyjna');
    navigate('/pralma/formularz-dokumentu');
  };
  const handleReset = () => {
    setKey(Math.random().toString(36));
    setDocumentSlug('');
    setDisplayFileName('Karta Informacyjna');
    navigate('/pralma/formularz-dokumentu');
  };

  useEffect(() => {
    setKey(Math.random().toString(36));
  }, [documents]);

  useEffect(() => {
    if (navigation?.location?.pathname === '/pralma/formularz-dokumentu') {
      setDocumentSlug('');
    }
  }, [navigation?.location]);

  return (
    <>
      <SpinnerOverlay />
      <PageHeader ref={ref} bg="bg_admin" />
      <main className="pt-8  px-8 pb-12 bg-admin-light bg-opacity-20">
        <FormLinks documentSlug={documentSlug} />
        <PageTitle text="Formularz dokumentu" />
        <Form
          id="document-form"
          method="post"
          encType="multipart/form-data"
          className="relative max-w-4xl"
          action={
            documentSlug
              ? `/pralma/formularz-dokumentu/${documentSlug}/edytuj`
              : `/pralma/formularz-dokumentu`
          }
        >
          <Message
            text={actionData?.message}
            posY="-bottom-8"
            posX="left-1/2 -translate-x-1/2"
          />
          <InputContainer>
            <Input
              classesText="mb-1"
              id="document"
              error=""
              label="Dokument / dokumenty"
              type="file"
              name="document"
              multiple
              key={key}
            />
          </InputContainer>
          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton
              type="submit"
              title={
                documentSlug
                  ? `edutyj nazwę wyświetlania`
                  : `dodaj dokument / dokumenty`
              }
              label={
                documentSlug
                  ? 'edutyj nazwę wyświetlania'
                  : 'dodaj dokument / dokumenty'
              }
            >
              <GiSave className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
            </ActionButton>
          </ActionButtons>
        </Form>
        <PageTitle text="Dodane dokumenty" />
        {documents.length ? (
          <ul className="mt-4 max-w-4xl">
            {documents.map((document) => (
              <li
                className="flex flex-wrap items-center justify-between border-b py-px border-b-slate-300"
                key={document._id}
              >
                <div className="flex items-center justify-start">
                  {fileTypeIcon(getExtensionFile(document.originalname))}
                  <span className="text-sm text-slate-500">
                    <a
                      href={`${server}/${
                        document.path.split('public')[1]
                      }`}
                    >
                      {document.originalname}
                    </a>
                  </span>
                </div>
                <div className="flex items-center justify-end flex-wrap">
                  <InputContainer classes="mb-[0px] mr-1">
                    <Input
                      id={document.slug}
                      error={
                        documentSlug === document.slug
                          ? actionData?.filename
                          : ''
                      }
                      label=""
                      type="text"
                      name="displayFileName"
                      value={
                        documentSlug === document.slug
                          ? displayFileName
                          : document.displayFileName
                      }
                      onChange={(e) => {
                        if (documentSlug) {
                          setDisplayFileName(e.target.value);
                        } else {
                          setDisplayFileName(document.displayFileName);
                        }
                      }}
                      onFocus={() =>
                        documentSlug &&
                        navigate(
                          `/pralma/formularz-dokumentu/${document.slug}/edytuj`
                        )
                      }
                      readOnly={documentSlug === document.slug ? false : true}
                      disabled={documentSlug === document.slug ? false : true}
                    />
                  </InputContainer>
                  <span className="text-sm text-slate-500 w-20">{`${Math.ceil(
                    document.size / 1000
                  )} kB`}</span>
                  <div className="flex items-center justify-end ml-4">
                    <button
                      className={
                        documentSlug === document.slug
                          ? `w-6 h-6 ml-1 flex items-center justify-center text-black-dark border border-accent-dark bg-accent   rounded text-xs hover:shadow-lg hover:bg-accent hover:border-accent-dark`
                          : `w-6 h-6 ml-1 flex items-center justify-center border border-slate-800 rounded text-xs hover:shadow-lg hover:bg-accent hover:border-accent-dark`
                      }
                      type="button"
                      onClick={() => {
                        if (documentSlug === document.slug) {
                          if (documentSlug) {
                            setDocumentSlug('');
                            navigate('/pralma/formularz-dokumentu');
                          } else {
                            setDocumentSlug(document.slug);
                            setDisplayFileName('');
                            navigate(
                              `/pralma/formularz-dokumentu/${document.slug}/edytuj`
                            );
                          }
                        } else {
                          setDocumentSlug(document.slug);
                          setDisplayFileName('');
                          navigate(
                            `/pralma/formularz-dokumentu/${document.slug}/edytuj`
                          );
                        }
                      }}
                      title="edutyj nazwę wyświetlania"
                      aria-label="Edit display file name"
                    >
                      <PencilSquareIcon className="w-4 h-4 self-center justify-self-center" />
                    </button>
                    <a
                      href={`${server}/${
                        document.path.split('public')[1]
                      }`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-6 h-6 ml-1 flex items-center justify-center border border-slate-800 rounded text-xs hover:shadow-lg hover:bg-accent hover:border-accent-dark"
                      type="button"
                      title="Zobacz dokument"
                      aria-label="View or save document"
                    >
                      <EyeIcon className="w-4 h-4 self-center justify-self-center" />
                    </a>

                    <Form
                      id="delete-document"
                      method="post"
                      action={`/pralma/formularz-dokumentu/${document.slug}/skasuj`}
                    >
                      <button
                        className="w-6 h-6 ml-1 flex items-center justify-center border border-slate-800 rounded text-xs hover:shadow-lg hover:bg-accent hover:border-accent-dark"
                        type="submit"
                        title="Skasuj dokument"
                        aria-label="Delete document"
                      >
                        <TrashIcon className="w-4 h-4 self-center justify-self-center" />
                      </button>
                    </Form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <NoItems msg="Brak dokumentów" />
        )}
      </main>
      <Footer />
    </>
  );
}
