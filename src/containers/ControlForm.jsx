import React, { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useParams,
  useNavigate,
} from 'react-router-dom';
import {
  PencilSquareIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid';
import FormLinks from '../components/Form/FormLinks';
import InputContainer from '../components/Form/InputContainer';
import Input from '../components/Form/Input';
import TextArea from '../components/Form/TextArea';
import PageTitle from '../components/PageTitle/PageTitle';
import ActionButtons from '../components/Form/ActionButtons/ActionButtons';
import ActionButton from '../components/Form/ActionButtons/ActionButton/ActionButton';
import RequiredIndicator from '../components/Required';
import { GiSave } from 'react-icons/gi';
import { getBase64, formatFormData, isValidControl } from '../utils';
import { getCategories } from '../api/categories';
import SpinnerOverlay from '../components/SpinnerOverlay';
import * as api from '../api/controls';
import Footer from './Footer/Footer';
import PageHeader from '../components/PageHeader/PageHeader';
import DEFAULT_CONTROL_IMAGE from '../images/controls/temp_300_200.webp';
import Dialog from '../components/Dialog/Dialog';
import { useScrollIntoView } from '../hooks';
import { userAPI } from '../utils';
import AdminData from '../components/Admin/AdminData/AdminData';

export async function loader({ params }) {
  const { controlName } = params;
  const user = userAPI.checkAdmin();
  const data = {
    control: [],
    categories: [],
    controlName: controlName || '',
    message: { categories: '', control: '' },
    user: user,
  };
  try {
    const responseCategories = await getCategories();
    if (responseCategories.message)
      data.message.categories = responseCategories.message;
    else data.categories = responseCategories;

    if (controlName) {
      const responseControl = await api.getControlByName(controlName);
      if (responseControl.message)
        data.message.control = responseControl.message;
      else data.control = responseControl;
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
export async function action({ request, params }) {
  const { controlName } = params;
  const actionData = {
    message: { create: '', update: '' },
    errors: null,
    controlName: controlName,
  };
  try {
    const formData = await request.formData();
    const tempImage = formData.get('image');
    let image = null;
    if (!tempImage.name) {
      image = DEFAULT_CONTROL_IMAGE;
    } else {
      image = await getBase64(tempImage);
    }
    formData.append('image', image);
    const data = {};

    for (const [key, value] of formData) {
      formatFormData(data, key, value);
    }
    const list = data.list
      .replace(/[\r\n]+/gm, '')
      .split(',')
      .filter((item) => {
        item.trim();
        return item !== '';
      });

    data.list = list;
    const errors = isValidControl(data);

    if (Object.keys(errors).length) {
      actionData.errors = errors;
      return actionData;
    }
    if (controlName) {
      const responseUpdateControl = await api.updateControl(controlName, data);
      if (responseUpdateControl.message) {
        actionData.message.update = responseUpdateControl.message;
        return actionData;
      } else
        return redirect(
          `/sterowniki-urzadzen-pralniczych#${responseUpdateControl.name}`
        );
    } else {
      const responseCreateControl = await api.createControl(data);
      if (responseCreateControl.message) {
        actionData.message.create = responseCreateControl.message;
        return actionData;
      } else {
        return redirect(
          `/sterowniki-urzadzen-pralniczych#${responseCreateControl.name}`
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default function ControlForm() {
  const navigate = useNavigate();
  const actionData = useActionData();
  const { control, categories, message, user } = useLoaderData();
  const { controlName } = useParams();

  const [name, setName] = useState(() =>
    control && control.length ? control[0].name : ''
  );
  const [list, setList] = useState(() =>
    control && control.length
      ? control[0].list.join(',').replace(/,/g, ', \r\n')
      : ''
  );
  const [image, setImage] = useState(() =>
    control && control.length ? control[0].image : DEFAULT_CONTROL_IMAGE
  );
  const [selectedCategory, setSelectedCategory] = useState(() =>
    categories && categories.length ? [categories[0], categories[1]] : []
  );
  const { ref } = useScrollIntoView();

  const handleReset = () => {
    setList('');
    setName('');
    setImage(DEFAULT_CONTROL_IMAGE);
    selectedCategory(() =>
      categories && categories.length ? [categories[0], categories[1]] : []
    );
  };
  const handleCancel = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (controlName && control[0]) {
      setSelectedCategory(() =>
        controlName
          ? categories.filter((category) =>
              control[0].category.some(
                (controlCategory) => controlCategory._id === category._id
              )
            )
          : [[categories[0], categories[1]]]
      );
    }
  }, [controlName, control, categories]);

  useEffect(() => {
    setSelectedCategory((prevSelectedCategory) =>
      categories && categories.length
        ? categories.filter((category) =>
            prevSelectedCategory.some(
              (selected) => selected._id === category._id
            )
          )
        : []
    );
  }, [categories]);

  return (
    <div ref={ref}>
      {actionData ? (
        <>
          <Dialog
            message={actionData.message.create}
            navigateTo={`/sterowniki-urzadzen-pralniczych`}
          />
          <Dialog
            message={actionData.message.update}
            navigateTo={`/sterowniki-urzadzen-pralniczych`}
          />
        </>
      ) : null}
      <Dialog
        message={message.categories}
        navigateTo="/sterowniki-urzadzen-pralniczych"
      />
      <Dialog
        message={message.control}
        navigateTo="/sterowniki-urzadzen-pralniczych"
      />
      <SpinnerOverlay />
      <PageHeader bg="bg_admin">
        <AdminData user={user} />
      </PageHeader>
      <main className="pt-8 px-8 pb-16 bg-admin-light bg-opacity-20">
        <FormLinks controlName={controlName} />
        <PageTitle
          text={
            controlName ? 'Formularz edycji sterownika' : 'Formularz sterownika'
          }
        />
        <Form
          encType="multipart/form-data"
          id="tag-form"
          method="post"
          className="relative max-w-4xl"
          action={
            controlName
              ? `/pralma/formularz-sterownika/${controlName}`
              : `/pralma/formularz-sterownika`
          }
        >
          {/** category */}
          {/** category and readonly coin */}
          <div className="category mb-4 bg-slate-200 border border-slate-300 px-4 py-2 rounded">
            <Listbox
              value={selectedCategory}
              onChange={setSelectedCategory}
              multiple={true}
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
                      {selectedCategory
                        .map(
                          (category) =>
                            `${category.title} - ${
                              category.coin ? 'COIN' : 'OPL'
                            }`
                        )
                        .join(', ')}
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
          {/** end category */}
          {/** name */}
          <InputContainer>
            <RequiredIndicator>
              <Input
                error={actionData && actionData.errors?.name}
                classesText="mb-1"
                label="nazwa sterownika"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </RequiredIndicator>
          </InputContainer>
          {/** image */}
          <InputContainer classes="-mb-2">
            <Input
              ref={ref}
              classesText="mb-1"
              id="image"
              error=""
              label="Zdjęcie sterownika"
              type="file"
              name="image"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(URL.createObjectURL(e.target.files[0]));
                } else {
                  setImage(URL.createObjectURL(DEFAULT_CONTROL_IMAGE));
                }
              }}
              ariaLabel="control image"
            />

            <div className="w-80 h-52 p-2 mt-6 border border-slate-300 bg-slate-200 rounded overflow-hidden">
              <img
                className="object-contain w-full h-full"
                src={image}
                alt="dodawane zdjęcie sterownika"
              />
            </div>
            <span className="my-2 block text-xs">
              <span className="">zdjęcie:&nbsp;</span>
              <span className="font-medium text-black-dark block truncate max-w-xs">
                {image ? image : 'dodane zdjęcie sterownika'}
              </span>
            </span>
          </InputContainer>
          {/** list */}
          <InputContainer classes="pt-5">
            <TextArea
              error={actionData?.list}
              placeholder="np.: w pełni programowalny,20 programów fabrycznych ..."
              name="list"
              value={list}
              ariaLabel="control list"
              onChange={(e) => {
                setList(e.target.value);
              }}
            >
              <span
                className={`block mb-1 input-label__text whitespace-nowrap font-bold text-sm text-left text-black-dark`}
              >
                Główne cechy
              </span>
            </TextArea>
          </InputContainer>
          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton
              type="submit"
              title={controlName ? 'edytuj sterownik' : 'zapisz sterownik'}
              label={controlName ? 'edytuj sterownik' : 'zapisz sterownik'}
            >
              {controlName ? (
                <PencilSquareIcon className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              ) : (
                <GiSave className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              )}
            </ActionButton>
          </ActionButtons>
        </Form>
      </main>
      <Footer />
    </div>
  );
}
