import React, { useState, useRef } from 'react';
import { useLoaderData, Link,useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle/PageTitle';
import AsideLinks from '../../../components/AsideLinks/AsideLinks';
import { useScrollIntoView } from '../../../hooks';
import * as api from '../../../api/sparepart';
import Footer from '../../Footer/Footer';
import Message from '../../../components/Message';
import Divider from '../../../components/Divider';
import SparePartCard from '../SparePartCard/SparePartCard';
import ImageSliderNavigation from '../../../components/ImageSliderNavigation/ImageSliderNavigation';
import NoItems from '../../../components/NoItems/NoItems';
import SpinnerOverlay from '../../../components/SpinnerOverlay';
import { getPrice } from '../../../utils';
import FormButtonsLink from '../../../components/Admin/FormButtonsLink/FormButtonsLink';
import Dates from '../../../components/Dates';
import * as userAPI from '../../../utils/user';
import ContactForm from '../../../components/ContactForm';
import ContactsData from '../../../components/ContactsData/ContactsData';
import CompanyData from '../../../components/CompanyData';
import Header from '../../../components/Header/Header';
import { v4 as uuidv4 } from 'uuid';
import { IoReturnDownBackSharp } from 'react-icons/io5';

const bgImages = [
  { id: uuidv4(), src: '', position: 'object-center' },
  { id: uuidv4(), src: '', position: 'object-top' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: '', position: 'object-center' },
  { id: uuidv4(), src: '', position: 'object-center' },
  { id: uuidv4(), src: '', position: 'object-center' },
  { id: uuidv4(), src: '', position: 'object-center' },
  { id: uuidv4(), src: '', position: 'object-bottom' },
];

export async function loader({ params }) {
  const { sparePartId } = params;
  const data = {
    message: '',
    sparePartDetails: null,
    sparePartsForGivenCategory: [],
    user: userAPI.checkAdmin(),
  };

  try {
    let categoryId = null;
    const sparePartDetailsResponse = await api.getSparePartDetails(sparePartId);
    if (sparePartDetailsResponse.message) {
      data.message = sparePartDetailsResponse.message;
    } else {
      data.sparePartDetails = sparePartDetailsResponse;
      categoryId = data.sparePartDetails.categoryId._id;
      const sparePartsForGivenCategoryResponse =
        await api.getSparePartsByCategoryId(categoryId);
      if (sparePartsForGivenCategoryResponse.message) {
        data.message = sparePartsForGivenCategoryResponse.message;
      } else {
        data.sparePartsForGivenCategory =
          sparePartsForGivenCategoryResponse.filter(
            (sparepart) => sparepart._id !== sparePartId
          );
      }
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function action() {
  console.log('sparepart details action - skasuj');
  const data = { message: '' };
  return data;
}

export default function SparePartDetails() {
  const data = useLoaderData();
  const { ref } = useScrollIntoView();
  const [currentImage, setCurrentImage] = useState(-1);
  const timerID = useRef();
  const navigate = useNavigate();
  return (
    <div ref={ref} className="pt-16">
      <SpinnerOverlay />
      <Header
        bgGradient="bg-gradient-radial-circle-from-cc-dedicated"
        images={bgImages}
        title={`Część zamienna - ${data.sparePartDetails.name}`}
      ></Header>
      <main className="px-8 pb-8 w-full relative">
        {/** back to spareparts page */}
        <button
          title="powrót do kategorii produktu"
          className="group flex flex-col justify-center items-center absolute top-4 right-4 w-6 h-6 rounded-sm border border-slate-700 bg-slate-400 hover:bg-slate-200 hover:border-slate-500 transition-all duration-150"
          onClick={() => {
            navigate("/czesci-zamienne");
          }}
        >
          <IoReturnDownBackSharp className="text-slate-50 font-bold group-hover:text-slate-500" />
        </button>
        <PageTitle text="Część zamienna">
          {data.sparePartDetails ? (
            <p className="font-light text-sm">{` - (${data.sparePartDetails.categoryId.title})`}</p>
          ) : (
            <p className="font-light text-sm">&nbsp;---</p>
          )}

          {data.message ? (
            <Message text={data.message} posX="right-4" posY="top-1" />
          ) : null}
        </PageTitle>
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <div>
            {data.sparePartDetails ? (
              <article className="sparepart-details grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4 mb-8 max-w-5xl auto-rows-max ">
                <h3 className="lg:col-span-2 border-t border-b border-primary rounded text-black-dark mb-8">
                  <span className="border-t-2 py-1 border-b-2 border-accent rounded px-4  block w-full">
                    {' '}
                    {data.sparePartDetails.products[0].title}{' '}
                  </span>
                </h3>

                <div className="self-baseline justify-self-center lg:col-span-1">
                  <div className="flex flex-col items-start justify-center mb-8 relative">
                    <aside className="w-[300px] mx-auto mb-4 border border-accent-dark bg-accent-light rounded overflow-hidden ">
                      <div className="sparepart-card__image-outler w-full h-[300px] bg-white ">
                        <SparePartCard
                          items={data.sparePartDetails.images}
                          currentImage={currentImage}
                          name={data.sparePartDetails.name}
                          setCurrentImage={setCurrentImage}
                          timerID={timerID}
                        />
                      </div>
                      <h4 className="sparepart-card__name my-0 py-2 bg-accent-light">
                        {data.sparePartDetails.name}
                      </h4>
                    </aside>

                    <ImageSliderNavigation
                      items={data.sparePartDetails.images}
                      currentImage={currentImage}
                      setCurrentImage={setCurrentImage}
                      timerID={timerID}
                    />
                  </div>
                  {data.user ? (
                    <>
                      <h5>Zarządzaj częścią zamienną</h5>
                      <FormButtonsLink
                        urlAdd="/pralma/formularz-czesci-zamiennej"
                        urlEdit={`/pralma/formularz-czesci-zamiennej/${data.sparePartDetails._id}`}
                        urlDelete={`/czesci-zamienne/${data.sparePartDetails._id}`}
                      />
                    </>
                  ) : null}

                  {data.sparePartDetails.products.length ? (
                    <div>
                      <Divider classes="h-px" />
                      <h5 className="text-left">Modele urządzeń:</h5>
                      <ul className="list-inside list-disc mb-4">
                        {data.sparePartDetails &&
                          data.sparePartDetails.products.map((product) => (
                            <li key={product._id}>
                              <Link
                                className="text-xs font-medium text-primary hover:text-primary-light hover:underline"
                                to={
                                  product.coin
                                    ? `/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${data.sparePartDetails.categoryId.slug}/model/${product.model}`
                                    : `/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/${data.sparePartDetails.categoryId.slug}/model/${product.model}`
                                }
                              >
                                {product.model}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ) : (
                    <div>---</div>
                  )}
                </div>
                <div className="sparepart-details__content lg-col-span-1">
                  {/** dates */}
                  <Dates
                    createdAt={data.sparePartDetails.createdAt}
                    updatedAt={data.sparePartDetails.updatedAt}
                  />

                  {data.user ? (
                    <>
                      <div>
                        <h5>Dane</h5>
                        {/** purchase price */}
                        <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center bg-admin-light bg-opacity-20">
                          <span>Cena zakupu:</span>
                          <span className="font-medium">
                            {data.sparePartDetails.netPurchasePrice
                              ? getPrice(
                                  data.sparePartDetails.netPurchasePrice,
                                  'PLN'
                                )
                              : '0.0'}
                          </span>
                        </div>
                        {/** sale price */}
                      </div>
                      <div className="text-sm border-b border-t border-slate-200 py-1 px-1 my-2  flex justify-between items-center bg-admin-light bg-opacity-20">
                        <span className="">Cena sprzedaży:</span>
                        <span className="font-extrabold text-lg text-black-dark ">
                          {data.sparePartDetails.netSalePrice
                            ? getPrice(
                                data.sparePartDetails.netSalePrice,
                                'PLN'
                              )
                            : '0.0'}
                        </span>
                      </div>
                    </>
                  ) : null}

                  {/** net weight */}
                  <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                    <span>Waga netto:</span>
                    <span className="font-medium">
                      {data.sparePartDetails.netWeight
                        ? `${data.sparePartDetails.netWeight} kg`
                        : '0.0'}
                    </span>
                  </div>
                  {/** gross weight */}
                  <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                    <span>Waga brutto:</span>
                    <span className="font-medium">
                      {data.sparePartDetails.grossWeight
                        ? `${data.sparePartDetails.grossWeight} kg`
                        : '0.0'}
                    </span>
                  </div>
                  {/** available */}
                  <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                    <span>Dostępna:</span>
                    <span className="font-medium">
                      {data.sparePartDetails.available}
                    </span>
                  </div>
                  {data.user ? (
                    <>
                      {/** stock */}
                      <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center bg-admin-light bg-opacity-20">
                        <span>Magazyn:</span>
                        <span className="font-extrabold">{`${data.sparePartDetails.stock} szt.`}</span>
                      </div>
                      {/** country of origin */}
                      <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center bg-admin-light bg-opacity-20">
                        <span>Kraj pochodzenia:</span>
                        <span className="font-medium">
                          {data.sparePartDetails.countryOfOrigin}
                        </span>
                      </div>
                      <h5>Dostawca</h5>
                      <div className="bg-admin-light bg-opacity-20">
                        {/** company name */}
                        {data.sparePartDetails.supplier.companyName ? (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span>Firma:</span>
                            <span className="font-medium">
                              {data.sparePartDetails.supplier.companyName}
                            </span>
                          </div>
                        ) : (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">Firma:</span>
                            <span>-</span>
                          </div>
                        )}
                        {/** street */}
                        {data.sparePartDetails.supplier.street ? (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">ulica:</span>
                            <span className="font-medium">
                              {data.sparePartDetails.supplier.street}
                            </span>
                          </div>
                        ) : (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">ulica:</span>
                            <span>-</span>
                          </div>
                        )}
                        {/** street number*/}
                        {data.sparePartDetails.supplier.streetNumber ? (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">numer ulicy:</span>
                            <span className="font-medium">
                              {data.sparePartDetails.supplier.streetNumber}
                            </span>
                          </div>
                        ) : (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">numer ulicy:</span>
                            <span>-</span>
                          </div>
                        )}
                        {/** local number*/}
                        {data.sparePartDetails.supplier.localNumber ? (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">numer lokalu:</span>
                            <span className="font-medium">
                              {data.sparePartDetails.supplier.localNumber}
                            </span>
                          </div>
                        ) : (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">numer lokalu:</span>
                            <span>-</span>
                          </div>
                        )}

                        {/** city */}
                        {data.sparePartDetails.supplier.city ? (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">miasto:</span>
                            <span className="font-medium">
                              {data.sparePartDetails.supplier.city}
                            </span>
                          </div>
                        ) : (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">miasto:</span>
                            <span>-</span>
                          </div>
                        )}
                        {/** zip code */}
                        {data.sparePartDetails.supplier.zipcode ? (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">kod pocztowy:</span>
                            <span className="font-medium">
                              {data.sparePartDetails.supplier.zipcode}
                            </span>
                          </div>
                        ) : (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">kod pocztowy:</span>
                            <span>-</span>
                          </div>
                        )}
                        {/** nip */}
                        {data.sparePartDetails.supplier.nip ? (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">NIP:</span>
                            <span className="font-medium">
                              {data.sparePartDetails.supplier.nip}
                            </span>
                          </div>
                        ) : (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">NIP:</span>
                            <span>-</span>
                          </div>
                        )}
                      </div>
                      <h5>Kontakt</h5>
                      <div className="bg-admin-light bg-opacity-20">
                        {data.sparePartDetails.supplier.email ? (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">e-mail:</span>
                            <a
                              href={`mailto:${data.sparePartDetails.supplier.email}`}
                              className="font-medium text-accent-dark hover:text-accent-light text-xs"
                            >
                              {data.sparePartDetails.supplier.email}
                            </a>
                          </div>
                        ) : (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">email:</span>
                            <span>-</span>
                          </div>
                        )}
                        {data.sparePartDetails.supplier.phone ? (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">tel:</span>
                            <a
                              href={`tel:${data.sparePartDetails.supplier.phone.replace(
                                /[+\s-]/gm,
                                ''
                              )}`}
                              className="font-medium text-black-dark hover:text-accent-light text-xs"
                            >
                              {data.sparePartDetails.supplier.phone}
                            </a>
                          </div>
                        ) : (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">tel:</span>
                            <span>-</span>
                          </div>
                        )}

                        {data.sparePartDetails.supplier.mobilePhone ? (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">komórka:</span>
                            <a
                              href={`tel:${data.sparePartDetails.supplier.mobilePhone.replace(
                                /[+\s-]/gm,
                                ''
                              )}`}
                              className="font-medium text-black-dark hover:text-accent-light text-xs"
                            >
                              {data.sparePartDetails.supplier.mobilePhone}
                            </a>
                          </div>
                        ) : (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">komórka:</span>
                            <span>-</span>
                          </div>
                        )}

                        {data.sparePartDetails.supplier.www ? (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">wwww:</span>
                            <a
                              href={data.sparePartDetails.supplier.wwww}
                              className="font-medium text-accent-dark hover:text-accent-light text-xs"
                            >
                              {data.sparePartDetails.supplier.wwww}
                            </a>
                          </div>
                        ) : (
                          <div className="text-sm border-b border-slate-200 py-1 px-1 flex justify-between items-center">
                            <span className="text-xs">www:</span>
                            <span>-</span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : null}
                </div>

                {/** comment */}
                <section className="lg:col-span-2">
                  <h5 className="text-left">Uwagi</h5>
                  {data.sparePartDetails.comment ? (
                    <p className="border-t border-b border-slate-200 rounded bg-slate-100 px-2 py-4 text-sm font-light">
                      {data.sparePartDetails.comment}
                    </p>
                  ) : (
                    <p className="border-t border-b border-slate-200 rounded bg-slate-100 px-2 py-4 text-sm font-light">
                      ---
                    </p>
                  )}
                </section>
              </article>
            ) : null}
            {data.sparePartsForGivenCategory.length ? (
              <div>
                <PageTitle text="Pozostałe części zamienne">
                  {data.sparePartDetails ? (
                    <p className="font-light text-sm">{` - (${data.sparePartDetails.categoryId.title})`}</p>
                  ) : (
                    <p className="font-light text-sm">&nbsp;---</p>
                  )}
                </PageTitle>
                <div className="mb-8 grid grid-cols-1 gap-y-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-2 lg:grid-cols-4">
                  {data.sparePartsForGivenCategory.map((sparepart) => (
                    <Link
                      onClick={() => {
                        ref.current.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                          inline: 'center',
                        });
                        setCurrentImage(-1);
                      }}
                      to={`/czesci-zamienne/${sparepart._id}`}
                      title={sparepart.name}
                      key={sparepart._id}
                      className="sparepart-card flex flex-col border border-accent-dark max-w-[300px] justify-self-center sm:max-w-[200px] overflow-hidden rounded shadow-lg hover:bg-accent-light hover:shadow-2xl transition-all duration-150"
                    >
                      <div className="sparepart-card__image-outler w-full h-[300px] justify-self-center sm:h-[200px] ">
                        <SparePartCard items={sparepart.images} />
                      </div>
                      <h4 className="sparepart-card__name my-0 py-2 bg-accent-light flex-grow">
                        {sparepart.name}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NoItems msg="Brak innych części zamiennych" />
            )}
          </div>
          <AsideLinks />
        </div>
      </main>
      {/** contact form */}
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
