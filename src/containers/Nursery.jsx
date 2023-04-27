import React from 'react';
import AsideLinks from '../components/AsideLinks/AsideLinks';
import PageTitle from '../components/PageTitle/PageTitle';
import Header from '../components/Header/Header';
import Footer from './Footer/Footer';
import NoItems from '../components/NoItems/NoItems';
import Card from '../components/Card/Card';
import ModelName from '../components/ModelName/ModelName';
import Overlay from '../components/Overlay/Overlay';
import Thumbnail from '../components/Overlay/Thumbnail/Thumbnail';
import List from '../components/Overlay/List/List';
import Button from '../components/Overlay/Button/Button';
import { v4 as uuidv4 } from 'uuid';
import { useScrollIntoView } from '../hooks';
import { getProductsBasedOnSpecyfiedTags } from '../api/products';
import { useLoaderData } from 'react-router-dom';
import ContactForm from "../components/ContactForm";
import ContactsData from "../components/ContactsData/ContactsData";
import CompanyData from "../components/CompanyData";

const bgImages = [
  { id: uuidv4(), src: '', position: 'object-center' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: '', position: 'object-center' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: '', position: 'object-center' },
  { id: uuidv4(), src: '', position: 'object-bottom' },
];

export async function loader() {
  const data = { message: '', products: [] };
  try {
    const responseProducts = await getProductsBasedOnSpecyfiedTags(
      'żłobek,przedszkole'
    );
    if (responseProducts.message) data.message = responseProducts.message;
    else data.products = responseProducts;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default function Nursery() {
  const data = useLoaderData();
  const { ref } = useScrollIntoView();
  return (
    <div className="pt-16" ref={ref}>
      <Header
        bgGradient="bg-gradient-radial-circle-from-cc-dedicated"
        images={bgImages}
        title="Podnieś standard przedszkola bądź żłobka zapewniając dzieciom zawsze czyste i świeże pranie oraz zapewnij spokój im, sobie i rodzicom."
      />
      <main className="pl-8 pr-8">
        <PageTitle text="Technologie pralnicze dla żłobków i przedszkoli" />
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <section className="">
            <div>
              <PageTitle text="Powszechnie stosowane i dedykowane, przemysłowe urządzenia pralnicze tj. pralnicowirówki i suszarki w żłobkach lub przedszkolach" />
            </div>
            {data.products.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {data.products.map((product) => (
                  <Card
                    to={
                      product.coin
                        ? `//wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${product.category.slug}/model/${product.model}`
                        : `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${product.category.slug}/model/${product.model}`
                    }
                    widthImg={`${
                      product.wide ? 'max-w-[400px]' : 'max-w-[200px]'
                    }`}
                    heightImg="max-h-[290px]"
                    item={product}
                    key={product._id}
                  >
                    <ModelName
                      name={
                        product.model.split('-')[0] === 'SE' ||
                        product.model.split('-')[0] === 'FX'
                          ? product.model.split('-')[0] +
                            '-' +
                            product.model.split('-')[1]
                          : product.model.split('-')[0]
                      }
                    />
                    <h3 className="order-3">{product.title}</h3>
                    <Overlay>
                      <Thumbnail
                        src={product.icon}
                        alt={`${product.title}_thumbnail`}
                      />
                      <List list_items={product.features} />
                      <Button label="szczegóły" />
                    </Overlay>
                  </Card>
                ))}
              </div>
            ) : (
              <NoItems msg="Brak przemysłowych urządzeń pralniczych dedykowanych dla żłobków, przedszkoli i domów opieki rodzinnej" />
            )}
          </section>
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
