import React, { useEffect } from 'react';
import { useActionData, useLoaderData, useNavigation } from 'react-router-dom';
import * as categoryAPI from '../api/categories';

import Cards from '../components/Cards/Cards';
import Card from '../components/Card/Card';
import NoItems from '../components/NoItems/NoItems';
import Overlay from '../components/Overlay/Overlay';
import List from '../components/Overlay/List/List';
import Button from '../components/Overlay/Button/Button';
import Thumbnail from '../components/Overlay/Thumbnail/Thumbnail';
import PageTitle from '../components/PageTitle/PageTitle';
import AsideLinks from '../components/AsideLinks/AsideLinks';
import FormButton from '../components/Admin/FormButton';
import Divider from '../components/Divider';
import Header from '../components/Header/Header';
import SearchForm from '../components/SearchFrom';
import Footer from './Footer/Footer';
import * as userAPI from '../utils/user';
import SpinnerOverlay from '../components/SpinnerOverlay';
import { v4 as uuidv4 } from 'uuid';
import BG_1 from '../images/bg_header/bg_urzadzenia_pralnicze_coin_1.webp';
import BG_2 from '../images/bg_header/bg_urzadzenia_pralnicze_coin_2.webp';
import BG_5 from '../images/bg_header/bg_urzadzenia_pralnicze_coin_5.webp';
import BG_6 from '../images/bg_header/bg_urzadzenia_pralnicze_coin_6.webp';
import BG_7 from '../images/bg_header/bg_urzadzenia_pralnicze_coin_7.webp';
import Dialog from '../components/Dialog/Dialog';
import ContactForm from '../components/ContactForm';
import CompanyData from '../components/CompanyData';
import ContactsData from '../components/ContactsData/ContactsData';
import { TrashIcon } from '@heroicons/react/20/solid';

const bgImages = [
  { id: uuidv4(), src: BG_2, position: 'object-top' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: BG_1, position: 'object-center' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: BG_7, position: 'object-center' },
  { id: uuidv4(), src: BG_5, position: 'object-top' },
  { id: uuidv4(), src: BG_6, position: 'object-center' },
];
const boxes = [
  [
    0, 0, 4, 5, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 4, 1, 2,
  ],
  [
    0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 3, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 5, 2,
  ],
  [
    0, 4, 5, 4, 0, 0, 0, 0, 0, 0, 0, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 3,
  ],
];

export async function loader({ request }) {
  const user = userAPI.checkAdmin();
  const url = new URL(request.url);
  const queryTitle = url.searchParams.get('title');
  const data = {
    categories: [],
    user: user,
    message: '',
    queryTitle: queryTitle,
  };
  try {
    const responseCategories = await categoryAPI.getCategories();
    if (responseCategories.message) {
      data.message = responseCategories.message;
    } else {
      data.categories = responseCategories;
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
export async function action({ params }) {
  const user = userAPI.checkAdmin();
  const { categoryId } = params;
  const data = { message: { delete: '' } };

  try {
    if (user) {
      const responseDeleteCategory = await categoryAPI.deleteCategory(
        categoryId
      );
      if (responseDeleteCategory.message)
        data.message.delete = responseDeleteCategory.message;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
export default function Categories({ coin }) {
  const data = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();

  const filteredCategories = coin
    ? data.categories.filter((c) => c.coin === true)
    : data.categories.filter((c) => c.coin === false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [navigation.location]);

  return (
    <div className="pt-16">
      {actionData && (
        <Dialog
          message={actionData.message.delete}
          navigateTo={
            coin
              ? '/wyposazenie-pralni-przemyslowej-samoobslugowe'
              : '/wyposazenie-pralni-przemyslowej'
          }
        />
      )}
      <SpinnerOverlay />
      <Header
        boxes={coin && boxes}
        images={coin && bgImages}
        bgGradient={
          coin
            ? 'bg-gradient-radial-circle-from-cc-accent'
            : 'bg-gradient-radial-circle-from-cc-primary'
        }
        title={
          coin
            ? 'Najbardziej ekonomiczne i ergonomiczne urządzenia pralnicze do pralni samoobsługowych na rynku'
            : 'Najbardziej ekonomiczne i wydajne urządzenia pralnicze na rynku'
        }
      >
        <SearchForm queryTitle={data.queryTitle} />
      </Header>
      <main className="px-8 pb-12">
        <PageTitle text="Przemysłowe wyposażenie pralni wodnej" />
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <div>
            {filteredCategories.length ? (
              <Cards>
                {filteredCategories.map((category) => (
                  <div
                    key={category._id}
                    className={
                      category.wide
                        ? 'md:col-span-2 flex flex-col justify-between'
                        : 'flex flex-col justify-between'
                    }
                  >
                    <Card
                      item={category}
                      to={`urzadzenia-pralnicze/${category.slug}`}
                      btnLabel="poznaj proukty"
                      widthImg={`${
                        category.wide ? 'max-w-[400px]' : 'max-w-[200px]'
                      }`}
                      heightImg="max-h-[290px]"
                    >
                      <h3 className="order-3">{category.title}</h3>
                      <Overlay>
                        <Thumbnail
                          src={category.icon}
                          alt={`${category.title}_thumbnail`}
                        />
                        <List list_items={category.features} />
                        <Button label="poznaj produkty" />
                      </Overlay>
                    </Card>
                    {data.user ? (
                      <div
                        className="py-2 flex justify-end items-center max-w-min ml-auto"
                        onClick={() =>
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                          })
                        }
                      >
                        <FormButton
                          btnTitle="skasuj kategorię"
                          formClasses=""
                          id="delete-category"
                          action={
                            coin
                              ? `/wyposazenie-pralni-przemyslowej-samoobslugowe/${category._id}/skasuj`
                              : `/wyposazenie-pralni-przemyslowej/${category._id}/skasuj`
                          }
                          btnClasses="w-auto h-auto p-1 ml-0"
                          method="POST"
                          Icon={TrashIcon}
                        />
                        <FormButton
                          btnTitle="edytuj kategorię"
                          formClasses=""
                          id="edit-category"
                          action={`/pralma/formularz-kategorii/${category._id}/edytuj`}
                          btnClasses="w-auto h-auto p-1"
                          method="GET"
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </Cards>
            ) : (
              <NoItems msg="Nie ma żadnych kategorii" />
            )}
            {data.user ? (
              <div className="xl:col-span-2">
                <FormButton
                  btnTitle="dodaj kategorię"
                  formClasses="my-2"
                  id="add-category"
                  action="/pralma/formularz-kategorii"
                  btnClasses="w-auto h-auto px-2 py-1"
                >
                  <span className="ml-2">Dodaj kategorię</span>
                </FormButton>
                <Divider classes="h-px bg-admin-dark" />
              </div>
            ) : null}
          </div>
          <AsideLinks />
        </div>
      </main>
      <section id="contactForm" className="py-12 bg-slate-200">
        <div className="pl-4">
          <PageTitle text="Formularz kontaktowy" />
        </div>
        <ContactForm />
        <ContactsData />
        <CompanyData />
      </section>
      <Footer />
    </div>
  );
}
