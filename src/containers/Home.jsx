/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Link, redirect, useLoaderData } from 'react-router-dom';
import { ArrowLongUpIcon, ArrowLongDownIcon } from '@heroicons/react/24/solid';
import CircleListType from '../components/CircleListType';
import { useScrollIntoView } from '../hooks/scrollIntoView';
import PageTitle from '../components/PageTitle/PageTitle';
import ContactForm from '../components/ContactForm';
import ContactsData from '../components/ContactsData/ContactsData';
import CompanyData from '../components/CompanyData';
import MasonryGallery from './MasonryGallery/MasonryGallery';
import NewsletterForm from '../components/NewsletterForm';
import Footer from './Footer/Footer';
import { isValidContactForm, fisherYatesShuffle } from '../utils';
import { SiAboutdotme } from 'react-icons/si';
import { RiGalleryFill } from 'react-icons/ri';
import { MdContactMail, MdChildFriendly,MdHotel } from 'react-icons/md';
import {
  GiNewspaper,
  GiVacuumCleaner,
  GiSoap,
  GiWaterRecycling,
} from 'react-icons/gi';
import { TbFiretruck, TbTruckLoading, TbBarrierBlock } from 'react-icons/tb';
import { BsCoin } from 'react-icons/bs';
import { TiNews } from 'react-icons/ti';
import Logo from '../images/logo.webp';
import * as api from '../api/laundryPhoto';
import { getMarkdownPosts } from '../api/posts';
import NoItems from '../components/NoItems/NoItems';
import {userAPI} from '../utils';

export async function loader({ request }) {
  const user = userAPI.checkAdmin();
  const url = new URL(request.url);
  let page = url.searchParams.get('page');
  let onpage = url.searchParams.get('onpage');
  if (!page) page = '1';
  if (!onpage) onpage = '12';
  const data = {user:user, shuffleLaundryPhotos: [], count: '', posts: [], onpage, page };
  try {
    const { images: laundryPhotos, count } = await api.getLaundryPhotos(
      page,
      onpage
    );
    data.count = count;
    const shuffleLaundryPhotos = fisherYatesShuffle(laundryPhotos);
    data.shuffleLaundryPhotos = shuffleLaundryPhotos;
    const posts = await getMarkdownPosts();
    data.posts = posts.slice(0, 5).sort((postA, postB) => {
      return new Date(postA.date).getTime() < new Date(postB.date).getTime();
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function action({ request, params }) {
  const { laundryPhotoId } = params;
  const url = new URL(request.url);
  try {
    if (laundryPhotoId && url.pathname === `/${laundryPhotoId}/skasuj`) {
      await api.deleteLaundryPhoto(laundryPhotoId);
      return redirect('/');
    }
  } catch (error) {
    console.log(error.message);
  }

  const errors = isValidContactForm();
  if (Object.keys(errors.person).length || Object.keys(errors.company).length) {
    return { errors };
  }
  // send data to sendgrid
  return { message: 'Wiadomość wysłana' };
}

export default function Home() {
  const [active, setActive] = useState('header');
  const header = useRef(null);
  const ecology = useRef(null);
  const aboutUs = useRef(null);
  const contactForm = useRef(null);
  const footer = useRef(null);
  const newsletter = useRef(null);
  const masonryGallery = useRef(null);
  const additionalEquipment = useRef(null);
  const mop = useRef(null);
  const nursery = useRef(null);
  const civilServices = useRef(null);
  const softWash = useRef(null);
  const hygieneBarrier = useRef(null);
  const latestNews = useRef(null);
  const vendLaundry = useRef(null);
  const hospitality = useRef(null)
  const { ref: reference } = useScrollIntoView();
  const { shuffleLaundryPhotos, count, onpage, page, posts,user } = useLoaderData();

  return (
    <div ref={reference} className=''>
      <header id='header' ref={header} className='relative overflow-hidden min-h-screen'>
        <div className='header-bg bg-slate-50 absolute inset-y-0 inset-x-0'></div>
        <div className='px-8 landscape:px-16 py-12 flex flex-col justify-center min-h-screen overflow-hidden '>
          <h2 className='text-3xl sm:text-4xl uppercase font-medium'>
            <div className='relative animate-producent text-primary'>Producent przemysłowych</div>
            <div className='relative animate-przemyslowych'>urządzeń pralniczych</div>
          </h2>
          <ul className='max-w-xs landscape:text-lg'>
            <li className='relative text-md pl-8 py-1 font-light text-black-dark '>
              <CircleListType size={"16px"} top={"50%"} left={"0"} />
              projekt wyposażenia pralni wodnej
            </li>
            <li className='relative text-md pl-8 py-1 font-light text-black-dark'>
              <CircleListType size={"16px"} top={"50%"} left={"0"} />
              dostawa urządzeń
            </li>
            <li className='relative text-md pl-8 py-1 font-light text-black-dark'>
              <CircleListType size={"16px"} top={"50%"} left={"0"} />
              montaż
            </li>
            <li className='relative pl-8 py-1 font-light text-black-dark'>
              <CircleListType size={"16px"} top={"50%"} left={"0"} />
              pierwsze uruchomienie
            </li>
            <li className='relative text-md pl-8 py-1 font-light text-black-dark'>
              <CircleListType size={"16px"} top={"50%"} left={"0"} />
              szkolenie z obsługi i eksploatacji
            </li>
            <li className='relative text-md pl-8 py-1 font-light text-black-dark'>
              <CircleListType size={"16px"} top={"50%"} left={"0"} />
              realne wsparcie techniczne
            </li>
            <li className='relative text-md pl-8 py-1 font-light text-black-dark'>
              <CircleListType size={"16px"} top={"50%"} left={"0"} />
              serwis gwarancyjny i pogwarancyjny
            </li>
            <li className='relative text-md pl-8 py-1 font-light text-black-dark'>
              <CircleListType size={"16px"} top={"50%"} left={"0"} />
              autoryzwany serwis marki <strong>Primus</strong>
            </li>
            <li className='relative text-md pl-8 py-1 font-light text-black-dark'>
              <CircleListType size={"16px"} top={"50%"} left={"0"} />
              naprawa urządzeń pralniczych
            </li>
            <li className='relative text-md pl-8 py-1 font-light text-black-dark'>
              <CircleListType size={"16px"} top={"50%"} left={"0"} />
              remonty generalne
            </li>
          </ul>
        </div>
        {/** Quick links */}
        <div className='hidden fixed z-20 top-1/2 -translate-y-1/2 right-4 py-2 rounded-md bg-accent-light bg-opacity-10 lg:grid grid-cols-2'>
          {/** header */}
          <button
            className={`${
              active === "header"
                ? "col-span-2 justify-self-center mb-2 w-4 h-4 sm:w-6 sm:h-6 mx-1 sm:mb-1 bg-primary flex items-center justify-center border border-primary-dark rounded text-sm font-medium text-white hover:shadow-lg"
                : "col-span-2 justify-self-center mb-2 w-4 h-4 sm:w-6 sm:h-6 mx-1 sm:mb-1 bg-slate-50 flex items-center justify-center border border-slate-200 rounded text-sm font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              header.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(header.current.id);
            }}
            title='Przewiń w górę'
            aria-label='Scroll up'>
            {" "}
            <ArrowLongUpIcon className='w-3 h-3 sm:w-4 sm:h-4 self-center justify-self-center' />{" "}
          </button>
          {/**aboutUs*/}
          <button
            className={`${
              active === "aboutUs"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              aboutUs.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(aboutUs.current.id);
            }}
            title='O Przedsiębiorstwie Produkcji Urządzeń Pralniczych Pralma sp. z o.o., Kielce'
            aria-label='About Us'>
            {" "}
            <SiAboutdotme className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/** hospitality */}
          <button
            className={`${
              active === "hospitality"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              hospitality.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(hospitality.current.id);
            }}
            title='Urządzenia pralnicze do hotelu, motelu, resturacji'
            aria-label='Industrial Washing Machines for hospitality'>
            <MdHotel className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />
          </button>
          {/** save water and energy - ecology */}
          <button
            className={`${
              active === "ecology"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              ecology.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(ecology.current.id);
            }}
            title='Odzysk wody i energii elektrycznej w procesie prania przemysłowego'
            aria-label='Save water and energy in the process of the industry washing'>
            {" "}
            <GiWaterRecycling className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/**mop*/}
          <button
            className={`${
              active === "mop"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              mop.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(mop.current.id);
            }}
            title='Pralnicowirówki i suszarki do prania mopów. Urządzenia pralnicze dla firm sprzątających'
            aria-label='mop'>
            {" "}
            <GiVacuumCleaner className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/**nursery*/}
          <button
            className={`${
              active === "nursery"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              nursery.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(nursery.current.id);
            }}
            title='Pralnicowirówki i suszarki dla żłobków i przedszkoli'
            aria-label='Mursery'>
            {" "}
            <MdChildFriendly className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/** vend laundry */}
          <button
            className={`${
              active === "vendLaundry"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              vendLaundry.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(vendLaundry.current.id);
            }}
            title='Rozwiązania dedykowane do pralni samoobsługowej'
            aria-label='Vend Laundry'>
            {" "}
            <BsCoin className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/**civilServices*/}
          <button
            className={`${
              active === "civilServices"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              civilServices.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(civilServices.current.id);
            }}
            title='Pralnicowirówki i suszarki dedykowane dla służb cywilnych, straży pożarnej, wojska, marynarki wojennej, policji'
            aria-label='Civil Services'>
            {" "}
            <TbFiretruck className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/**softWash*/}
          <button
            className={`${
              active === "softWash"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              softWash.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(softWash.current.id);
            }}
            title='Pranie chemiczne w pralni wodnej. Ekologiczne pranie chemiczne. SoftWash'
            aria-label='SoftWash'>
            {" "}
            <GiSoap className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/** additionalEquipment */}
          <button
            className={`${
              active === "additionalEquipment"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              additionalEquipment.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(additionalEquipment.current.id);
            }}
            title='Wózki, regały, stoły do pralni przemysłowej. Trasport i składowanie prania w pralni przemysłowej'
            aria-label='Additional Equipment in Industrial Laundry'>
            {" "}
            <TbTruckLoading className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/** hygieneBarrier */}
          <button
            className={`${
              active === "hygieneBarrier"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              hygieneBarrier.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(hygieneBarrier.current.id);
            }}
            title='Pralnia przemysłowa z barierą higieny. Urządzenia pralnicze do pralni z barierą higieny.'
            aria-label='Hygienic barrier'>
            {" "}
            <TbBarrierBlock className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/**masoneryGallery*/}
          <button
            className={`${
              active === "masonryGallery"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              masonryGallery.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(masonryGallery.current.id);
            }}
            title='Galeria przykladowych pralni'
            aria-label='Zdjęcia przemysłowych pralni'>
            {" "}
            <RiGalleryFill className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/** contact form */}
          <button
            className={`${
              active === "contactForm"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              contactForm.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(contactForm.current.id);
            }}
            title='Skontaktuj sie z nami'
            aria-label='Contact form'>
            {" "}
            <MdContactMail className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/** latest news */}
          <button
            className={`${
              active === "latestNews"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              latestNews.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(latestNews.current.id);
            }}
            title='Najnowsze wiadomości z rynku urządzeń pralniczych'
            aria-label='Latest news'>
            {" "}
            <TiNews className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/** newsletter */}
          <button
            className={`${
              active === "newsletter"
                ? "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-primary border border-primary-dark rounded  font-medium text-white hover:shadow-lg"
                : "text-xs flex-shrink-0 px-1 py-1 mx-1 sm:mb-1 bg-slate-50 border border-slate-200 rounded font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              newsletter.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(newsletter.current.id);
            }}
            title='Zapisz się na newsletter Pralmy'
            aria-label='Newsletter'>
            {" "}
            <GiNewspaper className='w-4 h-4 sm:w-6 sm:h-6 text-black-dark' />{" "}
          </button>
          {/** footer */}
          <button
            className={`${
              active === "footer"
                ? " col-span-2 justify-self-center mt-2 w-4 h-4 sm:w-6 sm:h-6 mx-1 bg-primary flex items-center justify-center border border-primary-dark rounded text-sm font-medium text-white hover:shadow-lg"
                : " col-span-2 justify-self-center mt-2 w-4 h-4 sm:w-6 sm:h-6 mx-1 bg-slate-50 flex items-center justify-center border border-slate-200 rounded text-sm font-medium text-black-dark hover:shadow-lg hover:bg-accent hover:border-accent-dark"
            } `}
            type='button'
            onClick={() => {
              footer.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
              setActive(footer.current.id);
            }}
            title='Przewiń na dół'
            aria-label='Scroll down'>
            {" "}
            <ArrowLongDownIcon className='w-3 h-3 sm:w-4 sm:h-4 self-center justify-self-center' />{" "}
          </button>
        </div>
        {/** and quick links */}
      </header>

      {/** about us */}
      <section id='aboutUs' ref={aboutUs} className='px-8 py-24 relative'>
        <Link
          to='/'
          className='bg-white absolute left-1/2 -translate-x-1/2 top-0 -translate-y-2/3 justify-self-center flex justify-center items-center p-4 w-36 h-36 shadow-xl rounded-full'>
          <img
            className='object-contain w-full h-full block'
            src={Logo}
            alt='Przedsiębiorstwo Produkcji Urządzeń Pralniczych Pralma sp. z o.o., Kielce'
          />
        </Link>

        <div>
          <p className='prose max-w-xl mb-8 font-light mx-auto text-center italic text-black-dark'>
            To prawie <strong>30 lat</strong> obecności na rynku rozwiązań dla pralni przemysłowych - różne wyzwania
            oraz bagaż wielu doświadczeń. Mimo
            <strong> realizacji 1000-ca pralni przemysłowych</strong>, zarówno od podstaw jak i doposażeń już
            istniejących, jeszcze bardziej się angażuejmy w kolejne projekty. Potrzeby rosną, wyposażenie pralnicze
            zmienia się, a razem z nimi my rozwijamy się, by tworzyć dla Ciebie jeszcze bardziej wydajne, ekologiczne i
            optymalne do Twóich potrzeb, przemysłowe wyposażenie pralnicze.
          </p>
          <p className=' max-w-xl mb-2 font-extrabold text-black-dark text-lg mx-auto text-center italic underline'>
            &quot;Dbamy o Twoją pralnię tak samo jak dbamy o swój biznes&quot;
          </p>
        </div>
      </section>
      {/** hospitality */}
      <section id='hospitality' ref={hospitality} className='grid sm:grid-cols-2 auto-rows-max'>
        <div className='bg bg_hospitality min-h-[320px] self-stretch'></div>
        <div className='px-4 py-8'>
          <div className=''>
            <PageTitle text='Podążaj za rozwiązaniami pralniczymi jutra, aby świadczyć usługi gościnności na najwyższym poziomie' />
          </div>
          <p className='font-light mb-6 text-md text-left max-w-xl'>
            Prowadzenie hotelu to konieczność dbania o zadowolenie Twoich Klientów. Na satysfakcję ich składa się szeroki
            zakres usług związanych z gościnnością m.in., rezerwacja, obsługa w recepcji, dbanie o czystość hotelu i pokoi gościnnych,
            wyżywienie, atrakcje. Duże znaczenie goście przywiązaują do świeżej pościeli, firanek i wszystkich rzeczy, z których korzystają a związane są z higieną.
            Dlatego też wybór przemysłowych urządzeń pralniczych do pralni hotelowej to też wybór jakiej jakości usługi chcesz świadczyć.
            Wieloletnie doświadczenie i szeroka gama urządzeń pralniczych, wyposażonych w innowacyjne technologie pralnicze, wydajne i ekonomiczne, 
            pozwolą Ci osiągnąć najwyższy standard czystości prania a tym samym zadowolenie Twoich klientów i poszerzanie stałej grupy odbiorców Twoich usług.
            Pranie na zewnątrz, nie gwarnatuje jakości i terminowości dostaw. Zainwestuj w wyposażenie pralnicze sprawdzonego partnera, urządzenia marki Primus lub Pralma,
            i zapewnij sobie spokój w praniu na lata.
          </p>
          <Link
            className='py-1 px-2 border border-slate-300 rounded bg-slate-100 text-black-dark hover:bg-accent hover:border-accent-dark transition-all duration-150'
            title='pralnicowirówki, suszarki, prasownice do hotelu, pensjonatu, motelu i dla restauracji'
            to='/wyposazenie-pralni-przemyslowej/wyposazenie-pralni-dla-hotelu'>
            więcej
          </Link>
        </div>
      </section>
      {/** ecology */}
      <section id='ecology' ref={ecology} className='grid sm:grid-cols-2'>
        <div className='bg_save_water_energy h-[320px] sm:min-h-[480px]'></div>
        <div className='px-4 py-8'>
          <div className=''>
            <PageTitle text='Nowoczesne systemy odzysku wody i energii w procesie prania przemysłowego' />
          </div>
          <p className='font-light mb-6 text-md text-left max-w-xl'>
            Wybierz dedykowane rozwiązania do prania mop-ów i skup się tylko na swoich Klientach. Korzystaj ze
            specjalnie stworzonych programów do prania mopów i nie martw się o koszty eksploatacji urządzeń.
          </p>
          <Link
            className='py-1 px-2 border border-slate-300 rounded bg-slate-100 text-black-dark hover:bg-accent hover:border-accent-dark transition-all duration-150'
            title='odzysk wody i energii w procesie prania przemysłowego'
            to='/wyposazenie-pralni-przemyslowej/odzysk-wody-i-energii-w-pralni-przemyslowej'>
            więcej
          </Link>
        </div>
      </section>
      {/** mop */}
      <section id='mop' ref={mop} className='grid sm:grid-cols-2'>
        <div className='bg bg_mop h-[320px] sm:min-h-[480px]'></div>
        <div className='px-4 py-8'>
          <PageTitle text='Pralnicowirówki do prania mopów' />
          <p className='font-light mb-6 text-md text-left max-w-xl'>
            Wybierz dedykowane rozwiązania do prania mop-ów i skup się tylko na swoich Klientach. Korzystaj ze
            specjalnie stworzonych programów do prania mopów i nie martw się o koszty eksploatacji urządzeń.
          </p>
          <Link
            className='py-1 px-2 border border-slate-300 rounded bg-slate-100 text-black-dark hover:bg-accent hover:border-accent-dark transition-all duration-150'
            title='pralnicowirówki do mopów'
            to='/wyposazenie-pralni-przemyslowej/pranie-mop'>
            więcej
          </Link>
        </div>
      </section>
      {/** nursery */}
      <section id='nursery' ref={nursery} className='grid sm:grid-cols-2'>
        <div className='bg_nursery h-[320px] sm:min-h-[480px]'></div>
        <div className='px-8 py-8'>
          <PageTitle text='Polecane pralki i suszarki dla żłobków i przedszkoli' />
          <p className='font-light mb-6 text-md text-left max-w-xl'>
            Idealne rozwiązania do zapewnienia higieny, eliminacji bakterii oraz uproszczenia dbania o czyste pranie. Z
            wyposażeniem pralni w szczegolnie polecane i popularne, małe komercyjne pralnicowirówki oraz suszarki serii
            SF/SD, przejdź na wyższy standard opieki.
          </p>
          <Link
            className='py-1 px-2 border border-slate-300 rounded bg-slate-100 text-black-dark hover:bg-accent hover:border-accent-dark transition-all duration-150'
            title='pralnicowirówki i suszarki do żłobków i przedszkoli'
            to='/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/zlobki-i-przedszkola'>
            więcej
          </Link>
        </div>
      </section>
      {/** vend laundry */}
      <section id='vendLaundry' ref={vendLaundry} className='grid sm:grid-cols-2'>
        <div className='bg bg_vendLaundry  h-[320px] sm:min-h-[480px]'></div>
        <div className='px-4 py-8'>
          <PageTitle text='Dogoń przyszłość z inteligentną pralnią samoobsługową' />
          <p className='font-light mb-6 text-md text-left max-w-xl'>
            Whether you’re into cash/card laundry, route laundry or both, choose Primus to improve your bottom line. We
            innovate with purpose to help you grow. Our European heritage of inventive technology and eco-friendly
            efficiency makes business sense.
          </p>
          <Link
            className='py-1 px-2 border border-slate-300 rounded bg-slate-100 text-black-dark hover:bg-accent hover:border-accent-dark transition-all duration-150'
            title='urządzenia pralnicze do pralni samoobslugowej'
            to='/wyposazenie-pralni-przemyslowej/pralnia-samoobslugowa'>
            więcej
          </Link>
        </div>
      </section>
      {/** civil services */}
      <section id='civilServices' ref={civilServices} className='grid sm:grid-cols-2'>
        <div className='bg bg_civilservices h-[320px] sm:min-h-[480px]'></div>
        <div className='px-4 py-8'>
          <PageTitle text='Rozwiązania pralnicze dedykowane dla służb cywilnych (straży pożarnej)' />
          <p className='font-light mb-6 text-md text-left max-w-xl'>
            Chronicie nas, dbacie o nasze bezpieczeństwo. Odwdzięczyć się możemy, dostarczając Wam rozwiązań
            dedykowanych do prania specjalistycznej odzieży ochronnej, w tym kombinezonów strażackich i odzieży
            zewnętrznej, aby jak najdłużej zachowała swoje właściwości ochronne, chroniąc Was podczas niebezpiecznej
            służby.
          </p>
          <Link
            className='py-1 px-2 border border-slate-300 rounded bg-slate-100 text-black-dark hover:bg-accent hover:border-accent-dark transition-all duration-150'
            title='urządzenia pralnicze dla straży pożarnej, wojska, marynarki i policji'
            to='/wyposazenie-pralni-przemyslowej/sluzby-cywilne'>
            więcej
          </Link>
        </div>
      </section>
      {/** softWash */}
      <section id='softWash' ref={softWash} className='grid sm:grid-cols-2'>
        <div className='bg bg_softwash h-[320px] sm:min-h-[480px]'></div>
        <div className='px-4 py-8'>
          <PageTitle text='Ekologiczne rozwiązania dla prania chemicznego' />
          <p className='font-light mb-6 text-md text-left max-w-xl'>
            Gdy masz specjalne wymagania dotyczące prania, urządzenia pralnicze z technologią Softwash gwarantują ich
            spełnienie. Zachowaj jakość delikatnych tkanin, specjalistycznej odzieży ochronnej lub sportowej,
            oszczedzając przy tym środowisko oraz swoje pieniądze, przy niższych kosztach inwestycji z Twojej strony, w
            porównaniu do spotykanych i przestarzałych rozwiązań.
          </p>
          <Link
            className='py-1 px-2 border border-slate-300 rounded bg-slate-100 text-black-dark hover:bg-accent hover:border-accent-dark transition-all duration-150'
            title='softwash, softclean, pranie chemiczne w pralni wodnej'
            to='/wyposazenie-pralni-przemyslowej/softwash'>
            więcej
          </Link>
        </div>
      </section>
      {/** additionalEquipment */}
      <section
        id='additionalEquipment'
        ref={additionalEquipment}
        className='grid sm:grid-cols-2 border-t-8 border-b-8 border-primary py-8'>
        <div className='bg bg_additionalEquipment h-[320px] sm:min-h-[480px]'></div>
        <div className='px-4 py-8'>
          <PageTitle text='Wózki, regały i kontenery do pralni przemysłowej' />
          <p className='font-light mb-6 text-md text-left max-w-xl'>
            Wybierz dedykowane rozwiązania do prania mop-ów i skup się tylko na swoich Klientach. Korzystaj ze
            specjalnie stworzonych programów do prania mopów i nie martw się o koszty eksploatacji urządzeń.
          </p>

          <Link
            className='py-1 px-2 border border-slate-300 rounded bg-slate-100 text-black-dark hover:bg-accent hover:border-accent-dark transition-all duration-150'
            title='urządzenia do transportu i składowania prania w pralni oprzemysłowej - wózki na mokre pranie, wózki na suche pranie'
            to='/wyposazenie-pralni-przemyslowej/wozki-i-regaly'>
            więcej
          </Link>
        </div>
      </section>
      {/** hygieneBarrier */}
      <section id='hygieneBarrier' ref={hygieneBarrier} className='grid sm:grid-cols-2'>
        <div className='bg bg_hygieneBarrier h-[320px] sm:min-h-[480px]'></div>
        <div className='px-4 py-8'>
          <PageTitle text='Pralnia z barierą higieny - idealne rozwiązanie dla szpitali i zakładów opieki leczniczej' />
          <p className='font-light mb-6 text-md text-left max-w-xl'>
            Najlepsza ochrona przed zanieczyszczeniem prania przed super bakteriami i zarazkami. Teraz najwyższą
            czystość prania, bezpieczeństwo i ochronę przed zakażeniem zapewnisz sobie dzięki naszym rozwiązanią do
            pralni przemysłowych z tzw. &quot;barierą higieny&quot;. Szeroka gama urządzeń pralniczych z &quot;barierą
            higieny&quot; - pralnice, pralnicowirówki sztywnomocowane i wolnostojące - pozwolą Ci zrealizować każdą
            pralnię, w której wymóg higieny i czystości prania ma najwyższe znaczenie.
          </p>
          <Link
            className='py-1 px-2 border border-slate-300 rounded bg-slate-100 text-black-dark hover:bg-accent hover:border-accent-dark transition-all duration-150'
            title='pralnia przemysłowa i urządzenia do pralni z barierą higieny. Pralnia dla zakałdu opieki leczniczej, szpitala'
            to='/wyposazenie-pralni-przemyslowej/bariera-higieny'>
            więcej
          </Link>
        </div>
      </section>
      {/** masonry gallery */}
      <section id='masonryGallery' ref={masonryGallery} className='mt-8 px-2 pb-12 pt-2 relative overflow-hidden'>
        <MasonryGallery items={shuffleLaundryPhotos} user={user} count={count} onpage={onpage} page={page} />
      </section>
      {/** contact form */}
      <section id='contactForm' ref={contactForm} className='bg-slate-200 pt-4'>
        <div className='pl-4'>
          <PageTitle text='Formularz kontaktowy' />
        </div>
        <ContactForm />
        <ContactsData />
        <CompanyData />
      </section>
      {/** latest news */}
      <section id='latest-news' ref={latestNews} className='bg-white min-h-[480px]  py-12 px-8'>
        <div className=''>
          <PageTitle text='Najnowsze wiadomości' />
        </div>
        {posts.length ? (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center items-start auto-rows-max'>
            {posts.map((post) => (
              <div
                key={post._id}
                className='relative border border-slate-300  max-w-[360px] h-[270px] rounded overflow-hidden group'>
                <Link to={`/wiadomosci/${post._id}`}>
                  <img
                    className=' group-hover:scale-110 transition-all duration-150 object-cover w-full h-full block'
                    src={post.image}
                    alt={post.title}
                  />
                  <h3 className='absolute bottom-0 left-0 bg-white w-full p-2 my-0 flex flex-col justify-center items-center'>
                    <span className='font-medium mb-1'>{post.title}</span>
                    <span className='font-light'>{`Dodany: ${post.date}`}</span>
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <NoItems msg='Nie ma żadnych wiadomości' />
        )}
      </section>
      {/** newsletter */}
      <section id='newsletter' ref={newsletter} className='py-12 bg-accent px-8 flex flex-col items-center'>
        <NewsletterForm home />
      </section>

      <Footer ref={footer} />
    </div>
  );
}
