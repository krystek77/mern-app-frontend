import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  useNavigate,
  useActionData,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import FormLinks from '../components/Form/FormLinks';
import PageTitle from '../components/PageTitle/PageTitle';
import ActionButtons from '../components/Form/ActionButtons/ActionButtons';
import ActionButton from '../components/Form/ActionButtons/ActionButton/ActionButton';
import { GiSave } from 'react-icons/gi';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import InputContainer from '../components/Form/InputContainer';
import Input from '../components/Form/Input';
import Message from '../components/Message';
import NoItems from '../components/NoItems/NoItems';
import { isValidTags } from '../utils';
import * as api from '../api/tags';
import FormButton from '../components/Admin/FormButton';
import SpinnerOverlay from '../components/SpinnerOverlay';
import PageHeader from '../components/PageHeader/PageHeader';
import Footer from './Footer/Footer';

export async function loader({ request, params }) {
  const { tagName } = params;

  let tags = null;
  let tag = null;
  try {
    tags = await api.getTags();

    tags.sort((t1, t2) => {
      if (new Date(t1?.createdAt).getTime() < new Date(t2?.createdAt).getTime())
        return 1;
      if (new Date(t1?.createdAt).getTime() > new Date(t2?.createdAt).getTime())
        return -1;
      return 0;
    });
    if (
      tagName &&
      request.url !==
        `http://localhost:3000/pralma/formularz-tagu/edytuj-tag/${encodeURIComponent(
          tagName
        )}` &&
      request.url !==
        `http://localhost:3000/pralma/formularz-tagu/skasuj-tag/${encodeURIComponent(
          tagName
        )}`
    ) {
      tag = await api.getTagByName(tagName);
    }
    return { tags, tag };
  } catch (error) {
    console.log(error.message);
  }
}

export async function action({ request, params }) {
  const { tagName } = params;
  let response = null;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (!tagName) {
    const formattedTags = data.tags
      .split(',')
      .map((tag) => {
        return tag.trim().toLowerCase();
      })
      .join(',');
    data.tags = formattedTags;
    const errors = isValidTags(data);

    if (Object.keys(errors).length) {
      return errors;
    }

    try {
      response = await api.createTags(data);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    try {
      if (
        request.url ===
        `http://localhost:3000/pralma/formularz-tagu/skasuj-tag/${encodeURIComponent(
          tagName
        )}`
      ) {
        response = await api.deleteTag(tagName);
      }
      if (
        request.url ===
        `http://localhost:3000/pralma/formularz-tagu/edytuj-tag/${encodeURIComponent(
          tagName
        )}`
      ) {
        response = await api.editTag(tagName, data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return response;
}

export default function TagForm() {
  const actionData = useActionData();
  const params = useParams();
  const ref = useRef(null);

  const { tags: loadsTags, tag } = useLoaderData();

  const navigate = useNavigate();
  const [tags, setTags] = useState('');
  const [tagName, setTagName] = useState('');

  const handleReset = () => {
    setTags('');
    navigate('/pralma/formularz-tagu');
  };
  const handleCancel = () => {
    handleFocus();
    handleReset();
  };
  const handleFocus = () => {
    if (tag?.name) {
      navigate(`/pralma/formularz-tagu/${tag.name}`);
    } else {
      handleReset();
    }
  };
  useEffect(() => {
    if (tag?.name) {
      setTagName(tag.name);
    } else {
      setTagName('');
    }
  }, [tag?.name]);

  return (
    <>
      <SpinnerOverlay />
      <PageHeader ref={ref} bg='bg_admin' />
      <main
        className=" pt-8 px-8 pb-16 bg-admin-light bg-opacity-20"
      >
        <FormLinks tagName={params?.tagName} />
        <PageTitle text="Formularz tagu" />
        <Form
          id="tag-form"
          method="post"
          className="relative max-w-4xl"
          action={
            tag?.name
              ? `/pralma/formularz-tagu/edytuj-tag/${tag.name}`
              : `/pralma/formularz-tagu`
          }
        >
          <Message
            text={actionData?.message}
            posY="-bottom-8"
            posX="left-1/2 -translate-x-1/2"
          />
          {tag?.name ? (
            <InputContainer>
              <input
                type="text"
                name="tagId"
                className="hidden"
                defaultValue={tag._id}
              />
              <input
                type="text"
                name="tagUpdatedAt"
                className="hidden"
                defaultValue={new Date().toISOString()}
              />
              <Input
                error={actionData?.tag}
                label="Edytowany tag"
                type="text"
                name="tagName"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                onFocus={handleFocus}
              />
            </InputContainer>
          ) : (
            <InputContainer>
              <Input
                error={actionData?.tags}
                placeholder="np.: żłobek,przedszkole,SE,10,70kg/godz"
                label="tagi"
                type="text"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                onFocus={handleFocus}
              />
            </InputContainer>
          )}
          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton
              type="submit"
              title={tag?.name ? 'edytuj tag' : 'zapisz tag'}
              label={tag?.name ? 'edytuj' : 'zapisz'}
            >
              {tag?.name ? (
                <PencilSquareIcon className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              ) : (
                <GiSave className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              )}
            </ActionButton>
          </ActionButtons>
        </Form>
        <PageTitle text="Dodane tagi" />
        {loadsTags.length ? (
          <div className="grid auto-rows-max grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {loadsTags.map((tag) => (
              <div
                className="tag border border-slate-400 rounded bg-slate-200 flex justify-center items-center flex-wrap py-2 px-4 self-strech justify-self-stretch shadow-lg"
                key={tag._id}
              >
                <span className="block text-center text-sm p-1 font-semibold">
                  {tag.name}
                </span>
                <div className="actions flex justify-center items-center">
                  <div
                    onClick={() =>
                      ref.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'center',
                      })
                    }
                  >
                    <FormButton
                      id="edit-tag"
                      action={`/pralma/formularz-tagu/${tag.name}`}
                    />
                  </div>
                  <FormButton
                    id="delete-tag"
                    method="post"
                    action={`/pralma/formularz-tagu/skasuj-tag/${tag.name}`}
                    Icon={TrashIcon}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoItems msg="Nie ma żadnych tagów" />
        )}
      </main>
      <Footer />
    </>
  );
}
