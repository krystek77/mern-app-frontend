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
import * as voltageAPI from '../api/voltage';
import NoItems from '../components/NoItems/NoItems';
import FormButton from '../components/Admin/FormButton';
import { TrashIcon } from '@heroicons/react/20/solid';
import { userAPI } from '../utils';
import AdminData from '../components/Admin/AdminData/AdminData';

export async function loader({ params, request }) {
  const { voltageId } = params;
  const url = new URL(request.url);
  const user = userAPI.checkAdmin();
  const data = {
    categories: [],
    message: { voltage: '', categories: '' },
    voltage: { categoryId: [], name: '' },
    voltageId: voltageId,
    user: user,
  };
  try {
    const responseCategories = await getCategories();
    if (responseCategories.message)
      data.message.categories = responseCategories.message;
    else data.categories = responseCategories;
    if (
      voltageId &&
      url.pathname === `/pralma/formularz-zasilania/${voltageId}/edytuj`
    ) {
      const responseVoltage = await voltageAPI.getVoltageById(voltageId);
      if (responseVoltage.message)
        data.message.voltage = responseVoltage.message;
      else data.voltage = responseVoltage;
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
  const { voltageId } = params;
  try {
    if (
      voltageId &&
      url.pathname === `/pralma/formularz-zasilania/${voltageId}/skasuj`
    ) {
      const responseDeleteVoltage = await voltageAPI.deleteVoltage(voltageId);
      if (responseDeleteVoltage.message)
        data.message.delete = responseDeleteVoltage.message;
    }
    if (
      (voltageId &&
        url.pathname === `/pralma/formularz-zasilania/${voltageId}/edytuj`) ||
      (!voltageId && url.pathname === '/pralma/formularz-zasilania')
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
      if (!voltageId && url.pathname === '/pralma/formularz-zasilania') {
        const responseCreateVoltage = await voltageAPI.createVoltage(
          formatedFormData
        );
        if (responseCreateVoltage.message)
          data.message.create = responseCreateVoltage.message;
      }
      if (
        voltageId &&
        url.pathname === `/pralma/formularz-zasilania/${voltageId}/edytuj`
      ) {
        const responseUpdateVoltage = await voltageAPI.updateVoltage(
          formatedFormData,
          voltageId
        );
        if (responseUpdateVoltage.message)
          data.message.update = responseUpdateVoltage.message;
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default function VoltageForm() {
  const { ref } = useScrollIntoView();
  const data = useLoaderData();
  const actionData = useActionData();
  const [voltages, setVoltages] = useState([]);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState(() =>
    data.categories.length ? [data.categories[0]] : []
  );
  const [voltage, setVoltage] = useState({
    categoryId: data.categories.length ? [data.categories[0]] : [],
    name: '',
  });

  useEffect(() => {
    let ignore = false;
    const fetchVoltage = async () => {
      try {
        if (!ignore) {
          const data = selectedCategories.map(
            (selectedCategory) => selectedCategory._id
          );
          const responseGetVoltagesByCategoryIds =
            await voltageAPI.getVoltagesByCategoryIds(data);
          if (responseGetVoltagesByCategoryIds.message) setVoltages([]);
          else setVoltages(responseGetVoltagesByCategoryIds);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedCategories.length) {
      fetchVoltage();
    }
    setVoltage((prevVoltage) => ({
      ...prevVoltage,
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
    if (data.voltage && data.voltageId) {
      setVoltage((prevVoltage) => ({
        ...prevVoltage,
        name: data.voltage.name,
        categoryId: data.voltage.categoryId,
      }));
      setSelectedCategories(
        data.categories.filter((category) =>
          data.voltage.categoryId.some(
            (voltageCategory) => voltageCategory === category._id
          )
        )
      );
    }
  }, [data.voltageId, data.voltage, data.categories]);

  useEffect(() => {
    if (!data.voltageId) {
      setVoltage({
        categoryId: data.categories.length ? [data.categories[0]] : [],
        name: '',
      });
      setSelectedCategories(data.categories.length ? [data.categories[0]] : []);
    }
  }, [navigation.location, data.categories, data.voltageId]);

  const handleCancel = () => {
    navigate(-1);
  };
  const handleReset = () => {
    setSelectedCategories(() =>
      data.categories.length ? [data.categories[0]] : []
    );
    setVoltage({
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
            navigateTo="/pralma/formularz-zasilania"
          />
          <Dialog
            message={actionData.message.update}
            navigateTo="/pralma/formularz-zasilania"
          />
          <Dialog
            message={actionData.message.delete}
            navigateTo="/pralma/formularz-zasilania"
          />
        </>
      ) : null}
      <SpinnerOverlay />
      <PageHeader ref={ref} bg="bg_Admin">
        <AdminData user={data.user} />
      </PageHeader>
      <main className="pt-8 px-8 pb-16 bg-admin-light bg-opacity-20">
        <FormLinks voltageId={data.voltageId} />
        <PageTitle
          text={
            data.voltageId
              ? 'Formularz edycji zasilania'
              : 'Formularz dodawania zasilania'
          }
        />
        <Form
          id="voltage-form"
          method="post"
          className="relative max-w-4xl"
          action={
            data.voltageId
              ? `/pralma/formularz-zasilania/${data.voltage._id}/edytuj`
              : '/pralma/formularz-zasilania'
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
                label="nazwa zasilania"
                type="text"
                name="name"
                value={voltage.name}
                onChange={(e) => {
                  setVoltage({ ...voltage, name: e.target.value });
                }}
              />
            </RequiredIndicator>
          </InputContainer>
          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton
              type="submit"
              title={
                data.voltageId
                  ? 'zapisz edytowane zasilanie'
                  : 'dodaj zasilanie'
              }
              label={
                data.voltageId
                  ? 'zapisz edytowane zasilanie'
                  : 'dodaj zasilanie'
              }
            >
              {data.voltageId ? (
                <PencilSquareIcon className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              ) : (
                <GiSave className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
              )}
            </ActionButton>
          </ActionButtons>
        </Form>
        {/** voltages */}
        {voltages.length ? (
          <div className="rounded-md">
            <PageTitle text="Dodane zasilania" />
            <div className="mb-2 text-sm font-medium grid sm:grid-cols-3 border border-slate-400 rounded-sm bg-slate-300 text-black-dark">
              <span className="border-r border-slate-400 px-2 py-1 self-center text-center">
                nazwa
              </span>
              <span className="border-r border-slate-400 px-2 py-1 self-center text-center">
                slug
              </span>
              <span className="px-2 py-1 text-center"> - </span>
            </div>
            {voltages.map((voltage) => {
              return (
                <div
                  key={voltage._id}
                  className="text-xs grid sm:grid-cols-3 border-b border-admin-dark bg-admin bg-opacity-20 text-black-dark "
                >
                  <span className="border-r border-admin-dark px-2 py-1 text-left self-strech font-normal">
                    {voltage.name}
                  </span>
                  <span className="border-r border-admin-dark px-2 py-1 text-left self-strech font-light italic">
                    {voltage.slug}
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
                      id="edit-voltage"
                      method="GET"
                      action={`/pralma/formularz-zasilania/${voltage._id}/edytuj`}
                      btnTitle="edytuj zasilanie"
                      ariaLabel="edit voltage"
                    />
                    <FormButton
                      id="delete-voltage"
                      method="POST"
                      action={`/pralma/formularz-zasilania/${voltage._id}/skasuj`}
                      btnTitle="skasuj zasilanie"
                      ariaLabel="delete voltage"
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
