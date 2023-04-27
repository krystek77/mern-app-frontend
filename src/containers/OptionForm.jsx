import React, { useState, Fragment, useEffect } from 'react';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useNavigate,
} from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import SpinnerOverlay from '../components/SpinnerOverlay';
import FormLinks from '../components/Form/FormLinks';
import PageTitle from '../components/PageTitle/PageTitle';
import ActionButton from '../components/Form/ActionButtons/ActionButton/ActionButton';
import ActionButtons from '../components/Form/ActionButtons/ActionButtons';
import { GiSave } from 'react-icons/gi';
import {
  ChevronUpDownIcon,
  CheckIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';
import RequiredIndicator from '../components/Required';
import InputContainer from '../components/Form/InputContainer';
import Input from '../components/Form/Input';
import { getCategories } from '../api/categories';
import PageHeader from '../components/PageHeader/PageHeader';
import Footer from './Footer/Footer';
import { useScrollIntoView } from '../hooks';
import { formatFormData, isValidVHO } from '../utils';
import Message from '../components/Message';
import Dialog from '../components/Dialog/Dialog';
import * as optionAPI from '../api/option';
import NoItems from '../components/NoItems/NoItems';
import FormButton from '../components/Admin/FormButton';
import { TrashIcon } from '@heroicons/react/20/solid';
import { userAPI } from '../utils';
import AdminData from '../components/Admin/AdminData/AdminData';

export async function loader({ params, request }) {
  const { optionId } = params;
  const url = new URL(request.url);
  const user = userAPI.checkAdmin();
  const data = {
    categories: [],
    message: { option: '', categories: '' },
    option: { categoryId: [], name: '' },
    optionId: optionId,
    user: user,
  };
  try {
    const responseCategories = await getCategories();
    if (responseCategories.message)
      data.message.categories = responseCategories.message;
    else data.categories = responseCategories;
    if (
      optionId &&
      url.pathname === `/pralma/formularz-opcji/${optionId}/edytuj`
    ) {
      const responseOption = await optionAPI.getOptionById(optionId);
      if (responseOption.message) data.message.option = responseOption.message;
      else data.option = responseOption;
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function action({ request, params }) {
  const data = {
    errors: { name: '', categoryId: '' },
    message: { create: '', update: '', delete: '' },
  };
  const url = new URL(request.url);
  const { optionId } = params;
  try {
    if (
      optionId &&
      url.pathname === `/pralma/formularz-opcji/${optionId}/skasuj`
    ) {
      const responseDeleteOption = await optionAPI.deleteOption(optionId);
      if (responseDeleteOption.message)
        data.message.delete = responseDeleteOption.message;
    }
    if (
      (optionId &&
        url.pathname === `/pralma/formularz-opcji/${optionId}/edytuj`) ||
      (!optionId && url.pathname === '/pralma/formularz-opcji')
    ) {
      const formData = await request.formData();
      const formatedFormData = {};
      for (const [key, value] of formData) {
        formatFormData(formatedFormData, key, value);
      }

      const errors = isValidVHO(formatedFormData);
      if (Object.keys(errors).length) {
        data.errors = errors;
        return data;
      }
      if (!optionId && url.pathname === '/pralma/formularz-opcji') {
        const responseCreateOption = await optionAPI.createOption(
          formatedFormData
        );
        if (responseCreateOption.message)
          data.message.create = responseCreateOption.message;
      }
      if (
        optionId &&
        url.pathname === `/pralma/formularz-opcji/${optionId}/edytuj`
      ) {
        const responseEditOption = await optionAPI.updateOption(
          formatedFormData,
          optionId
        );
        if (responseEditOption.message)
          data.message.update = responseEditOption.message;
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default function OptionForm() {
  const { ref } = useScrollIntoView();
  const data = useLoaderData();
  const actionData = useActionData();
  const [options, setOptions] = useState([]);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState(() =>
    data.categories.length ? [data.categories[0]] : []
  );
  const [option, setOption] = useState({
    categoryId: data.categories.length ? [data.categories[0]] : [],
    name: '',
  });

  useEffect(() => {
    let ignore = false;
    const fetchOptions = async () => {
      try {
        if (!ignore) {
          const data = selectedCategories.map(
            (selectedCategory) => selectedCategory._id
          );
          const responseGetOptionsByCategoryIds =
            await optionAPI.getOptionsByCategoryIds(data);
          if (responseGetOptionsByCategoryIds.message) setOptions([]);
          else setOptions(responseGetOptionsByCategoryIds);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedCategories.length) {
      fetchOptions();
    }
    setOption((prevOption) => ({
      ...prevOption,
      categoryId: selectedCategories,
    }));
    return () => {
      ignore = true;
    };
  }, [selectedCategories]);

  useEffect(() => {
    setSelectedCategories((prevSelectedCategories) =>
      data.categories.filter((category) =>
        prevSelectedCategories.some(
          (selectedCategory) => selectedCategory._id === category._id
        )
      )
    );
  }, [data.categories]);

  useEffect(() => {
    if (data.option && data.optionId) {
      setOption((prevOption) => ({
        ...prevOption,
        name: data.option.name,
        categoryId: data.option.categoryId,
      }));
      setSelectedCategories(
        data.categories.filter((category) =>
          data.option.categoryId.some(
            (optionCategory) => optionCategory === category._id
          )
        )
      );
    }
  }, [data.optionId, data.option, data.categories]);

  useEffect(() => {
    if (!data.optionId) {
      setOption({
        categoryId: data.categories.length ? [data.categories[0]] : [],
        name: '',
      });
      setSelectedCategories(data.categories.length ? [data.categories[0]] : []);
    }
  }, [navigation.location, data.categories, data.optionId]);

  const handleCancel = () => {
    navigate(-1);
  };
  const handleReset = () => {
    setSelectedCategories(() =>
      data.categories.length ? [data.categories[0]] : []
    );
    setOption({
      categoryId: data.categories.length ? [data.categories[0]] : [],
      name: '',
    });
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
  };

  return (
    <>
      {actionData ? (
        <>
          <Dialog
            message={actionData.message.create}
            navigateTo="/pralma/formularz-opcji"
          />
          <Dialog
            message={actionData.message.update}
            navigateTo="/pralma/formularz-opcji"
          />
          <Dialog
            message={actionData.message.delete}
            navigateTo="/pralma/formularz-opcji"
          />
        </>
      ) : null}
      <SpinnerOverlay />
      <PageHeader ref={ref} bg="bg_Admin">
        <AdminData user={data.user} />
      </PageHeader>
      <main className="pt-8 px-8 pb-16 bg-admin-light bg-opacity-20">
        <FormLinks optionId={data.optionId} />
        <PageTitle
          text={
            data.optionId
              ? 'Formularz edycji opcji'
              : 'Formularz dodawania opcji'
          }
        />
        <Form
          id="option-form"
          method="post"
          className="relative max-w-4xl"
          action={
            data.optionId
              ? `/pralma/formularz-opcji/${data.option._id}/edytuj`
              : '/pralma/formularz-opcji'
          }
        >
          {/** category */}
          {data.categories.length ? (
            <div className="category mb-4 bg-slate-200 border border-slate-300 px-4 py-2 rounded">
              {actionData ? (
                <Message
                  text={actionData.errors.categoryId}
                  posX="left-1/2 -translate-x-1/2"
                  posY="top-1"
                />
              ) : null}
              <Listbox
                value={selectedCategories}
                onChange={setSelectedCategories}
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
                        {selectedCategories
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
          {/** name */}
          <InputContainer>
            <RequiredIndicator>
              <Input
                error={actionData ? actionData.errors.name : ''}
                classesText="mb-1"
                label="nazwa opcji"
                type="text"
                name="name"
                value={option.name}
                onChange={(e) => {
                  setOption({ ...option, name: e.target.value });
                }}
              />
            </RequiredIndicator>
          </InputContainer>
          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton
              type="submit"
              title={data.optionId ? 'zapisz edytowaną opcję' : 'dodaj opcję'}
              label={data.optionId ? 'zapisz edytowaną opcję' : 'dodaj opcję'}
            >
              {data.optionId ? (
                <PencilSquareIcon className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              ) : (
                <GiSave className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              )}
            </ActionButton>
          </ActionButtons>
        </Form>
        {/** options */}
        {options.length ? (
          <div className="rounded-md">
            <PageTitle text="Dodane opcje" />
            <div className="mb-2 text-sm font-medium grid sm:grid-cols-3 border border-slate-400 rounded-sm bg-slate-300 text-black-dark">
              <span className="border-r border-slate-400 px-2 py-1 self-center text-center">
                nazwa
              </span>
              <span className="border-r border-slate-400 px-2 py-1 self-center text-center">
                slug
              </span>
              <span className="px-2 py-1 text-center"> - </span>
            </div>
            {options.map((option) => {
              return (
                <div
                  key={option._id}
                  className="text-xs grid sm:grid-cols-3 border-b border-admin-dark bg-admin bg-opacity-20 text-black-dark "
                >
                  <span className="border-r border-admin-dark px-2 py-1 text-left self-strech font-normal">
                    {option.name}
                  </span>
                  <span className="border-r border-admin-dark px-2 py-1 text-left self-strech font-light italic">
                    {option.slug}
                  </span>
                  <div
                    className="px-2 py-1 flex justify-end items-center self-strech"
                    onClick={() => {
                      ref.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'center',
                      });
                    }}
                  >
                    <FormButton
                      id="edit-option"
                      method="GET"
                      action={`/pralma/formularz-opcji/${option._id}/edytuj`}
                      btnTitle="edytuj opcję"
                      ariaLabel="edit option"
                    />
                    <FormButton
                      id="delete-option"
                      method="POST"
                      action={`/pralma/formularz-opcji/${option._id}/skasuj`}
                      btnTitle="skasuj opcję"
                      ariaLabel="delete option"
                      Icon={TrashIcon}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <NoItems msg="Brak opcji" />
        )}
      </main>
      <Footer />
    </>
  );
}
