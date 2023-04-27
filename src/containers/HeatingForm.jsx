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
import * as heatingAPI from '../api/heating';
import NoItems from '../components/NoItems/NoItems';
import FormButton from '../components/Admin/FormButton';
import { TrashIcon } from '@heroicons/react/20/solid';
import { userAPI } from '../utils';
import AdminData from '../components/Admin/AdminData/AdminData';

export async function loader({ params, request }) {
  const { heatingId } = params;
  const url = new URL(request.url);
  const user = userAPI.checkAdmin();
  const data = {
    categories: [],
    message: { heating: '', categories: '' },
    heating: { categoryId: [], name: '' },
    heatingId: heatingId,
    user: user,
  };
  try {
    const responseCategories = await getCategories();
    if (responseCategories.message)
      data.message.categories = responseCategories.message;
    else data.categories = responseCategories;
    if (
      heatingId &&
      url.pathname === `/pralma/formularz-podgrzewu/${heatingId}/edytuj`
    ) {
      const responseHeating = await heatingAPI.getHeatingById(heatingId);
      if (responseHeating.message)
        data.message.heating = responseHeating.message;
      else data.heating = responseHeating;
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function action({ params, request }) {
  const data = {
    errors: { name: '', categoryId: '' },
    message: { create: '', update: '', delete: '' },
  };
  const url = new URL(request.url);
  const { heatingId } = params;
  try {
    if (
      heatingId &&
      url.pathname === `/pralma/formularz-podgrzewu/${heatingId}/skasuj`
    ) {
      const responseDeleteHeating = await heatingAPI.deleteHeating(heatingId);
      if (responseDeleteHeating.message)
        data.message.delete = responseDeleteHeating.message;
    }
    if (
      (heatingId &&
        url.pathname === `/pralma/formularz-podgrzewu/${heatingId}/edytuj`) ||
      (!heatingId && url.pathname === '/pralma/formularz-podgrzewu')
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
      if (!heatingId && url.pathname === '/pralma/formularz-podgrzewu') {
        const responseCreateHeating = await heatingAPI.createHeating(
          formatedFormData
        );
        if (responseCreateHeating.message)
          data.message.create = responseCreateHeating.message;
      }
      if (
        heatingId &&
        url.pathname === `/pralma/formularz-podgrzewu/${heatingId}/edytuj`
      ) {
        const responseUpdateHeating = await heatingAPI.updateHeating(
          formatedFormData,
          heatingId
        );
        if (responseUpdateHeating.message)
          data.message.update = responseUpdateHeating.message;
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default function HeatingForm() {
  const { ref } = useScrollIntoView();
  const data = useLoaderData();
  const actionData = useActionData();
  const [heatings, setHeatings] = useState([]);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState(() =>
    data.categories.length ? [data.categories[0]] : []
  );
  const [heating, setHeating] = useState({
    categoryId: data.categories.length ? [data.categories[0]] : [],
    name: '',
  });

  useEffect(() => {
    let ignore = false;
    const fetchHeatings = async () => {
      try {
        if (!ignore) {
          const data = selectedCategories.map(
            (selectedCategory) => selectedCategory._id
          );
          const responseGetHeatingsByCategoryIds =
            await heatingAPI.getHeatingsByCategoryIds(data);
          if (responseGetHeatingsByCategoryIds.message) setHeatings([]);
          else setHeatings(responseGetHeatingsByCategoryIds);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedCategories.length) {
      fetchHeatings();
    }
    setHeating((prevHeating) => ({
      ...prevHeating,
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
    if (data.heating && data.heatingId) {
      setHeating((prevHeating) => ({
        ...prevHeating,
        name: data.heating.name,
        categoryId: data.heating.categoryId,
      }));
      setSelectedCategories(
        data.categories.filter((category) =>
          data.heating.categoryId.some(
            (heatingCategory) => heatingCategory === category._id
          )
        )
      );
    }
  }, [data.heatingId, data.heating, data.categories]);

  useEffect(() => {
    if (!data.heatingId) {
      setHeating({
        categoryId: data.categories.length ? [data.categories[0]] : [],
        name: '',
      });
      setSelectedCategories(data.categories.length ? [data.categories[0]] : []);
    }
  }, [navigation.location, data.categories, data.heatingId]);

  const handleCancel = () => {
    navigate(-1);
  };
  const handleReset = () => {
    setSelectedCategories(() =>
      data.categories.length ? [data.categories[0]] : []
    );
    setHeating({
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
            navigateTo="/pralma/formularz-podgrzewu"
          />
          <Dialog
            message={actionData.message.update}
            navigateTo="/pralma/formularz-podgrzewu"
          />
          <Dialog
            message={actionData.message.delete}
            navigateTo="/pralma/formularz-podgrzewu"
          />
        </>
      ) : null}
      <SpinnerOverlay />
      <PageHeader ref={ref} bg="bg_Admin">
        <AdminData user={data.user} />
      </PageHeader>
      <main className="pt-8 px-8 pb-16 bg-admin-light bg-opacity-20">
        <FormLinks heatingId={data.heatingId} />
        <PageTitle
          text={
            data.heatingId
              ? 'Formularz edycji podgrzewu'
              : 'Formularz dodawania podgrzewu'
          }
        />
        <Form
          id="heating-form"
          method="post"
          className="relative max-w-4xl"
          action={
            data.heatingId
              ? `/pralma/formularz-podgrzewu/${data.heating._id}/edytuj`
              : '/pralma/formularz-podgrzewu'
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
                label="nazwa podgrzewu"
                type="text"
                name="name"
                value={heating.name}
                onChange={(e) => {
                  setHeating({ ...heating, name: e.target.value });
                }}
              />
            </RequiredIndicator>
          </InputContainer>
          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton
              type="submit"
              title={
                data.heatingId ? 'zapisz edytowany podgrzew' : 'dodaj podgrzew'
              }
              label={
                data.heatingId ? 'zapisz edytowany podgrzew' : 'dodaj podgrzew'
              }
            >
              {data.heatingId ? (
                <PencilSquareIcon className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              ) : (
                <GiSave className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              )}
            </ActionButton>
          </ActionButtons>
        </Form>
        {/** heatings */}
        {heatings.length ? (
          <div className="rounded-md">
            <PageTitle text="Dodane podgrzewy" />
            <div className="mb-2 text-sm font-medium grid sm:grid-cols-3 border border-slate-400 rounded-sm bg-slate-300 text-black-dark">
              <span className="border-r border-slate-400 px-2 py-1 self-center text-center">
                nazwa
              </span>
              <span className="border-r border-slate-400 px-2 py-1 self-center text-center">
                slug
              </span>
              <span className="px-2 py-1 text-center"> - </span>
            </div>
            {heatings.map((heating) => {
              return (
                <div
                  key={heating._id}
                  className="text-xs grid sm:grid-cols-3 border-b border-admin-dark bg-admin bg-opacity-20 text-black-dark "
                >
                  <span className="border-r border-admin-dark px-2 py-1 text-left self-strech font-normal">
                    {heating.name}
                  </span>
                  <span className="border-r border-admin-dark px-2 py-1 text-left self-strech font-light italic">
                    {heating.slug}
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
                      id="edit-heating"
                      method="GET"
                      action={`/pralma/formularz-podgrzewu/${heating._id}/edytuj`}
                      btnTitle="edytuj podgrzew"
                      ariaLabel="edit heating"
                    />
                    <FormButton
                      id="delete-podgrzew"
                      method="POST"
                      action={`/pralma/formularz-opcji/${heating._id}/skasuj`}
                      btnTitle="skasuj podgrzew"
                      ariaLabel="delete podgrzew"
                      Icon={TrashIcon}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <NoItems msg="Brak podgrzewów" />
        )}
      </main>
      <Footer />
    </>
  );
}
