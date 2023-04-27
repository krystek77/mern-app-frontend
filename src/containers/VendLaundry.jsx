import React from 'react';
import AsideLinks from '../components/AsideLinks/AsideLinks';
import PageTitle from '../components/PageTitle/PageTitle';
import Header from '../components/Header/Header';
import ContactForm from '../components/ContactForm';
import ContactsData from '../components/ContactsData/ContactsData';
import CompanyData from '../components/CompanyData';
import Footer from './Footer/Footer';
import CircleListType from '../components/CircleListType';
import ModelName from '../components/ModelName/ModelName';
import { Link, useLoaderData } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useScrollIntoView } from '../hooks';
import { vend } from '../images/vendLaundry';
import Divider from '../components/Divider';
import { BsArrowRightShort } from 'react-icons/bs';
import { getProductsBasedOnSpecyfiedTags } from '../api/products';
import Card from '../components/Card/Card';
import Overlay from '../components/Overlay/Overlay';
import List from '../components/Overlay/List/List';
import Button from '../components/Overlay/Button/Button';
import Thumbnail from '../components/Overlay/Thumbnail/Thumbnail';
import NoItems from '../components/NoItems/NoItems';

const bgImages = [
  { id: uuidv4(), src: vend.BG_3, position: 'object-center' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: vend.BG_7, position: 'object-center' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: vend.BG_8, position: 'object-center' },
  { id: uuidv4(), src: vend.BG_13, position: 'object-bottom' },
];

export async function loader() {
  const data = { message: '', products: [] };
  try {
    const responseProducts = await getProductsBasedOnSpecyfiedTags(
      'samoobsługa'
    );
    if (responseProducts.message) data.message = responseProducts.message;
    else data.products = responseProducts;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default function VendLaundry() {
  const { ref } = useScrollIntoView();
  const data = useLoaderData();
  return (
    <div className="pt-16" ref={ref}>
      <Header
        bgGradient="bg-gradient-radial-circle-from-cc-dedicated"
        images={bgImages}
        title="Wyprzedź przyszłość z inteligentną pralnią samoobsługową"
      />
      <main className="px-8">
        <PageTitle text="Pomagamy przedsiębiorcom budować nowoczesne pralnie samoobsługowe" />
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <div>
            {/** help */}
            <section>
              <div className="">
                <div className="relative max-w-[1032px] max-h-[480px] mx-auto">
                  <div className="absolute w-14 h-14 md:w-28 md:h-28 md:bg-accent-light top-0 left-0 bg-white"></div>
                  <div className="absolute w-14 h-14 md:w-28 md:h-28 md:bg-primary-light bottom-0 right-0 bg-white"></div>
                  <img
                    className="object-cover w-full h-full object-center"
                    src={vend.BG_2}
                    alt="Wyposażenie pralni samoobsługowej, pralnice, pralnicowirówki i suszarki na monety lub żetony"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 auto-rows-max">
                <div>
                  <h3 className="text-accent-dark uppercase my-4 text-center font-light text-2xl">
                    SUPERIOR CUSTOMER EXPERIENCES{' '}
                    <span className="text-black-dark">
                      WITH FASTER, CLEANER LAUNDRY
                    </span>
                  </h3>
                  <p className="font-light text-justify">
                    Primus is made to keep your laundry customers coming back
                    for more. They quickly learn our machines are easier, faster
                    and produce better results. Plus Primus Digital Laundry
                    technology learns what your customers want – and helps you
                    give it to them.
                  </p>
                </div>
                <div>
                  <h3 className="text-accent-dark uppercase my-4 text-center font-light text-2xl">
                    HIGHER PROFITS{' '}
                    <span className="text-black-dark">
                      FOR LAUNDROMATS AND MULTI-HOUSING LAUNDRIES
                    </span>
                  </h3>
                  <p className="font-light text-justify">
                    Whether you’re into cash/card laundry, route laundry or
                    both, choose Primus to improve your bottom line. We innovate
                    with purpose to help you grow. Our European heritage of
                    inventive technology and eco-friendly efficiency makes
                    business sense.
                  </p>
                </div>
              </div>
            </section>
            <Divider />
            {/** innovating for performance */}
            <div className="relative">
              <div className="h-[480px] w-full top-0 left-0 absolute sm:top-1/2 sm:-translate-y-1/2">
                <div className="absolute inset-x-0 inset-y-0 bg-white -mx-8">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={vend.BG_5}
                    alt="Projket pralni samoobslugowej"
                  />
                </div>
              </div>
              <div className="relative grid sm:grid-cols-2 md:grid-cols-4 gap-8 auto-rows-max bg-white  bg-opacity-50 sm:bg-opacity-20 -mx-8 px-8">
                <div className="flex flex-col justify-between">
                  <p className="font-medium  text-sm md:text-xs mb-2">
                    Primus professional laundry equipment is designed to keep
                    your operation running reliably. Upgrade with Primus Digital
                    Laundry technology for the advantages of a networked
                    approach to vend management. We innovate for your business
                    performance.
                  </p>
                  <div className="min-h-[360px] flex flex-col justify-center">
                    <h4>NETWORKED EFFICIENCY</h4>
                    <p className="font-normal text-sm md:text-xs mb-2">
                      Primus Digital Laundry control solutions let you monitor
                      and manage your business through your preferred device
                      whenever you want.
                    </p>
                    <div className="bg-accent-dark text-white flex flex-wrap md:flex-nowrap justify-between items-center px-2 py-4 rounded-sm">
                      <span className="text-xs">biznes w sieci</span>
                      <BsArrowRightShort className="w-6 h-6" />
                      <span className="text-xs">
                        prostsze zarządzanie, lepszy biznes
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4>USER FRIENDLY</h4>
                    <p className="font-normal text-sm md:text-xs mb-2">
                      Primus laundry controls do all the hard thinking. Your
                      customers will come to rely on the simple, effortless
                      routine.
                    </p>
                    <div className="bg-accent-dark text-white flex flex-wrap md:flex-nowrap justify-between items-center px-2 py-4 rounded-sm">
                      <span className="text-xs">łatwa obsługa</span>
                      <BsArrowRightShort className="w-6 h-6" />
                      <span className="text-xs">
                        lojalność klienta, wyższa wydajność
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h4>SUPERB CUSTOMER EXPERIENCE</h4>
                    <p className="font-normal text-sm md:text-xs mb-2">
                      Ergonomic designs keep the workflow moving. The I-Trace
                      app helps customers use the machines and pay via mobile.
                      People love the ease and reliability of the experience.
                    </p>
                    <div className="bg-accent-dark text-white flex flex-wrap md:flex-nowrap justify-between items-center px-2 py-4 rounded-sm">
                      <span className="text-xs">zadowoleni klienci</span>
                      <BsArrowRightShort className="w-6 h-6" />
                      <span className="text-xs">
                        większe przychody, stała baza klientów
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4>TOUGH, DURABLE MACHINES</h4>
                    <p className="font-normal text-sm md:text-xs mb-2">
                      Primus equipment is built to last. If you do need parts,
                      they are available fast via our unequalled customer
                      service.
                    </p>
                    <div className="bg-accent-dark text-white flex flex-wrap md:flex-nowrap justify-between items-center px-2 py-4 rounded-sm">
                      <span className="text-xs">wyższa niezawodność</span>
                      <BsArrowRightShort className="w-6 h-6" />
                      <span className="text-xs">
                        większy ruch, mniejsze koszty
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h4>SPACE SAVING EFFICIENCY</h4>
                    <p className="font-normal text-sm md:text-xs mb-2">
                      Primus equipment comes in a wide range of capacity and
                      footprints so your laundry is precisely matched to your
                      needs.
                    </p>
                    <div className="bg-accent-dark text-white flex flex-wrap md:flex-nowrap justify-between items-center px-2 py-4 rounded-sm">
                      <span className="text-xs">idealny rozmiar</span>
                      <BsArrowRightShort className="w-6 h-6" />
                      <span className="text-xs">
                        większa przepustowość i wydajność
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4>SUPERIOR FABRIC CARE</h4>
                    <p className="font-normal text-sm md:text-xs mb-2">
                      Primus applies power gently and precisely to deliver a
                      perfectly clean hygienic wash. It’s tough on dirt and easy
                      on fabrics.
                    </p>
                    <div className="bg-accent-dark text-white flex flex-wrap md:flex-nowrap justify-between items-center px-2 py-4 rounded-sm">
                      <span className="text-xs">trwalsze tkaniny</span>
                      <BsArrowRightShort className="w-6 h-6" />
                      <span className="text-xs">
                        lepszy serwis, większa satysfakcja
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h4>FAST TURNAROUND TIMES</h4>
                    <p className="font-normal text-sm md:text-xs mb-2">
                      Our powerful, smart equipment cuts laundry time. Sensors
                      and load analysis optimize processes and resource use.
                    </p>
                    <div className="bg-accent-dark text-white flex flex-wrap md:flex-nowrap justify-between items-center px-2 py-4 rounded-sm">
                      <span className="text-xs">maksymalna wydajność</span>
                      <BsArrowRightShort className="w-6 h-6" />
                      <span className="text-xs">
                        niższe koszty, większa kontrola
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4>ECO-FRIENDLY</h4>
                    <p className="font-normal text-sm md:text-xs mb-2">
                      Many laundry owners appreciate how Primus hardware meets
                      or exceeds stringent water and energy consumption
                      regulations and standards.
                    </p>
                    <div className="bg-accent-dark text-white flex flex-wrap md:flex-nowrap justify-between items-center px-2 py-4 rounded-sm">
                      <span className="text-xs">miniejsze zużycie mediów</span>
                      <BsArrowRightShort className="w-6 h-6" />
                      <span className="text-xs">
                        niższe koszty, wyższa wydajność
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            {/** packages */}
            <section className="grid md:grid-cols-2 auto-rows-max min-h-[480px] mb-8">
              <div className="p-4 self-center mb-8">
                <h3 className="text-accent-dark uppercase my-8 text-center font-light text-2xl max-w-xs mx-auto">
                  <span className="text-black-dark">CHOOSE</span> THE PRIMUS
                  PREFERRED{' '}
                  <span className="text-black-dark">
                    PACKAGE, PERFECT FOR YOUR NEEDS
                  </span>
                </h3>
                <p className="font-light max-w-sm mx-auto text-center">
                  The vend laundry business is changing. Customers now prefer
                  digital payments to coin boxes. Some owners are
                  differentiating with new services. Some differentiate with
                  experience. At the core is making sure you have the right
                  equipment.
                </p>
              </div>
              <div className="w-full h-auto mb-4">
                <div className="relative max-w-max mx-auto mb-1">
                  <div className="absolute w-14 h-14 bg-accent-light top-0 left-0"></div>
                  <div className="absolute w-14 h-14 bg-accent-dark top-[56px] left-0"></div>
                  <div className="absolute w-20 h-20 md:w-24 md:h-24 bg-accent top-[112px] left-0"></div>
                  <div className="absolute w-14 h-14 bg-primary-light bottom-0 right-0"></div>
                  <img
                    className="object-cover w-full h-full object-center"
                    src={vend.BG_4}
                    alt="Szeroki wybór pralnic, pralnicowirówek i suszarek do samoobsługi"
                  />
                </div>
              </div>
              <div className="mx-auto max-w-md">
                <h3 className="text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center">
                  <span className="text-black-dark">CONNECTED</span>{' '}
                  SOFT-MOUNTED PREFERRED
                </h3>
                <span className="mb-2 text-black-dark text-xs block font-medium text-center">
                  WITH REMOTE DASHBOARD AND CUSTOMER APP
                </span>
                <p className="font-light text-sm text-center">
                  Primus high performance softmount washers offer exceptional
                  efficiency. Pair with T line dryers and promote your service
                  as the green, upmarket option. Add an ironer and offer
                  professionally finished flat linen services on-site.
                </p>
                <div className="machine_series">
                  {/** FX Line */}
                  <div>
                    <div className="w-[170px] h-[140px] mx-auto my-4">
                      <img
                        className="object-cover w-full h-full object-center"
                        src={vend.M_1}
                        alt="pralnicowirówki wolnostojące wysokoobrotowe"
                      />
                    </div>
                    <div>
                      <ModelName name="pralnicowirówki FX" textSize="text-md" />
                      <ul className="columns-2 list-inside">
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          From 6.5kg/13lb to 28kg/61lb
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          XControl FLEX ®
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          Stainless steel panel
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          Cascade™ drum technology
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          Patented Soap Hopper
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          Large drain valve (Ø 76mm)
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          Easy access to all vital parts from the front
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          Large door opening for easy loading and unloading
                        </li>
                      </ul>
                      <Link
                        title="pralnicowirówki wolnostojące samoobsługowe"
                        className="block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-2 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                        to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/pralnicowirowki-wysokoobrotowe"
                      >
                        poznaj
                      </Link>
                    </div>
                  </div>
                  {/** DX Line */}
                  <div>
                    <div className="w-[190px] h-[180px] mx-auto my-4">
                      <img
                        className="object-cover w-full h-full object-center"
                        src={vend.M_2}
                        alt="pralnicowirówki wolnostojące wysokoobrotowe"
                      />
                    </div>
                    <div>
                      <ModelName name="suszarki DX" textSize="text-md" />
                      <ul className="columns-2 list-inside">
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          From 11kg /220lb to 2 X 13kg/300lb
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          XControl FLEX ®
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          Electrical, gas and steam heating
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          Large door opening
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          Axial airflow
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          Stainless steel front panel with black painted door
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          Grey painted side panel
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          SafeTech™ Fire Suppression System
                        </li>
                      </ul>
                      <Link
                        title="suszarki bębnowe samoobsługowe"
                        className="block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-2 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                        to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/suszarki-bebnowe"
                      >
                        poznaj
                      </Link>
                    </div>
                  </div>
                  {/** I Line */}
                  <div>
                    <div className="w-[190px] h-[140px] mx-auto my-4">
                      <img
                        className="object-cover w-full h-full object-center"
                        src={vend.M_3}
                        alt="pralnicowirówki wolnostojące wysokoobrotowe"
                      />
                    </div>
                    <div>
                      <ModelName
                        name="prasownice walcowe I"
                        textSize="text-md"
                      />
                      <ul className="columns-2 list-inside">
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          indykacja temperatury i prędkości prasowania
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          napęd z przemiennikiem częstotliwości
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          możliwość instlacji przy ścianie - oszczędność
                          miejsca,przednie wywiezienie prania
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          automatyczny system schładzania pasów prasujących
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          łatwy w obsłudze sterownik
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          opatentowany system napędu bezpośredniego
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          opatentowany system odprowadzania wilgoci
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          palnik z włókna metalowego
                        </li>
                      </ul>
                      <Link
                        title="prasownice walcowe samoobsługowe"
                        className="block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-2 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                        to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/prasownice-walcowe"
                      >
                        poznaj
                      </Link>
                    </div>
                  </div>
                  {/** STC SDC */}
                  <div>
                    <div className="w-[200px] h-[140px] mx-auto my-4">
                      <img
                        className="object-cover w-full h-full object-center"
                        src={vend.SPC_SDC}
                        alt="pralnicowirówka z wbudowanym układem do samoobsługi i suszarka z wbudowanym układem do samoobsługi"
                      />
                    </div>
                    <div>
                      <ModelName name="STC10 i  SDC10" textSize="text-md" />
                      <span className="text-black-dark text-sm block my-2 font-semibold">
                        STC10
                      </span>
                      <ul className="columns-2 list-inside">
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          załadunek 10 kg
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          najnowsza technologia wyważenia
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          wysoki współczynnik odwirowania prania tzw. G-faktor:
                          440
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          obroty wirowania 1200 obr./min.
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          łatwy i intuicyjny w obsłudze sterownik Quantum ®
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          instalacja możliwa na dowolnym podłożu - w pełni
                          wolnostojąca
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          pojemnik na środki piorące 4 komorowy
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          drzwi otwierane pod kątem 180 stopni
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />6
                          programów prania
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          możliwość zaprogramowania opcji modyfikujących cykl
                          prania
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          odliczanie czasu do końca cyklu
                        </li>
                      </ul>
                      <span className="text-black-dark text-sm block my-2 font-semibold">
                        SDC10
                      </span>
                      <ul>
                        <li className="relative pl-4">
                          <CircleListType size="8px" top="50%" left="0px" />
                          załadunek 10 kg
                        </li>
                        <li className="relative pl-4">
                          <CircleListType size="8px" top="50%" left="0px" />
                          bęben ze stali ocynkowanej
                        </li>
                        <li className="relative pl-4">
                          <CircleListType size="8px" top="50%" left="0px" />
                          duży filtr pruszu w przedniej części ułatwia
                          czyszczenie
                        </li>
                        <li className="relative pl-4">
                          <CircleListType size="8px" top="50%" left="0px" />
                          silna dmuchawa zapewnia szybkie suszenie i niskie
                          koszty eksploatacji
                        </li>
                        <li className="relative pl-4">
                          <CircleListType size="8px" top="50%" left="0px" />
                          szeroko otwierane drzwi dla łatwego załadunku i
                          rozładunku
                        </li>
                        <li className="relative pl-4">
                          <CircleListType size="8px" top="50%" left="0px" />4
                          programy suszenia
                        </li>
                        <li className="relative pl-4">
                          <CircleListType size="8px" top="50%" left="0px" />
                          łatwy i intuicyjny w obsludze sterownik
                          mikroprocesorowy Quantum ®
                        </li>
                      </ul>
                      <div>
                        <Link
                          title="pralnicowirówka STC10 do samoobsługi"
                          className="block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-2 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                          to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/male-profesionalne-pralnicowirowki"
                        >
                          poznaj STC10
                        </Link>
                        <Link
                          title="suszarka SDC10 do samoobsługi"
                          className="block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-2 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                          to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/male-profesionalne-suszarki"
                        >
                          poznaj SDC10
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto max-w-md">
                <h3 className="text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center">
                  <span>HARDMOUNT</span> PREFERRED
                </h3>
                <span className="mb-2 text-black-dark text-xs block font-medium text-center">
                  FOR EFFICIENT, RELIABLE LAUNDRY STORE PERFORMANCE
                </span>
                <p className="font-light text-sm text-center">
                  Primus hardmount washers apply brute force with finesse. They
                  go perfectly with our DX dryers. Long lasting and efficient,
                  they deliver commercial grade performance, for a lower initial
                  investment.
                </p>
                <div className="machine_series">
                  {/** RX Line */}
                  <div>
                    <div className="w-[170px] h-[140px] mx-auto my-4">
                      <img
                        className="object-cover w-full h-full object-center"
                        src={vend.M_4}
                        alt="pralnicowirówki sztywnomocowane"
                      />
                    </div>
                    <div>
                      <ModelName name="pralnicowirówki RX" textSize="text-md" />
                      <ul className="columns-2 list-inside">
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          załadunek od 8 do 52 kg
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          XControl ®
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          nierdzewny panel górny
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          bęben wewnętrzny z technologią Cascade™ drum
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          optentowany pojemnik na środki piorące
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          duża średnica zaworu spustowego (Ø 76mm)
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          łatwy dostęp do wszystkich istotnych częśći od przodu
                          pralnicowirówki
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          duża średnica okna dla łatwego załadunku i rozładunku
                          prania
                        </li>
                      </ul>
                      <div>
                        <Link
                          title="pralnicowirówki sztywnomocowane normalnoobrotowe samoobsługowe"
                          className="block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-2 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                          to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/pralnicowirowki-normalnoobrotowe"
                        >
                          poznaj pralnicowirówki normalnoobrotowe
                        </Link>
                        <Link
                          title="pralnicowirówki sztywnomocowane normalnoobrotowe samoobsługowe"
                          className="block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-2 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                          to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/pralnicowirowki-szybkoobrotowe"
                        >
                          poznaj pralnicowirówki szybkoobrotowe
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/** T Line */}
                  <div>
                    <div className="w-[200px] h-[230px] mx-auto my-4">
                      <img
                        className="object-cover w-full h-full object-center"
                        src={vend.M_5}
                        alt="suszarki bębnowe samoobsługowe serii T"
                      />
                    </div>
                    <div>
                      <ModelName name="suszarki T" textSize="text-md" />
                      <ul className="columns-2 list-inside">
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          załadunek od 9 kg do 24 kg
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          dostępne suszarki z pompą ciepła - technologia EVO4 ®
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          system Radax™ - połączenie radialnego i osiowego
                          przepływu powietrza w suszarkach do załadunku aż 16 kg
                          włącznie
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          duża średnica okna dla łatwego załadunku i wyładunku
                          prania
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          łatwy i intuicyjny w uzyciu sterownik mikroprocesorowy
                          ECT ®
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          radialny lub osiowy przepływ powietrza wraz z
                          technologią power dry™
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          łatwy dostęp do wszystkich istotnych częśći od przodu
                          pralnicowirówki
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          bęben wewnętrzny o dużej średnicy
                        </li>
                      </ul>

                      <Link
                        title="suszarki bębnowe serii T samoobsługowe"
                        className="block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-2 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                        to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/suszarki-bebnowe"
                      >
                        poznaj
                      </Link>
                    </div>
                  </div>
                  {/** STWC STDC */}
                  <div>
                    <div className="w-[200px] h-[290px] mx-auto my-4">
                      <img
                        className="object-cover w-full h-full object-center"
                        src={vend.STWC_STDC}
                        alt="słupek pralniczy tj. pralnicowiówka i suszarka bębnowa z układami do samoobsługi"
                      />
                    </div>
                    <div>
                      <ModelName
                        name="słupek STWC10 i STDC10"
                        textSize="text-md"
                      />
                      <ul className="columns-2 list-inside">
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          załadunek 2 x 10 kg
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          kompaktowa budowa
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          oszczędność miejsca
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          ergonomiczne położenie panelu sterowania
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          prosta obsługa
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          6-ść programów prania, 4 programy suszenia
                        </li>
                        <li className="relative pl-4 mb-1">
                          <CircleListType size="8px" top="50%" left="0px" />
                          wbudowane układy do samoobsługi zapobiegają ich
                          dewastacji
                        </li>
                      </ul>
                      <div>
                        <Link
                          title="słupek pralko - suszarka do samoobsługi"
                          className="block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-2 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                          to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/zestawy-pralko-suszarka"
                        >
                          poznaj STWC10
                        </Link>
                        <Link
                          title="słupek suszarko - suszarka do samoobsługi"
                          className="block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-2 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                          to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/zestawy-suszarko-suszarka"
                        >
                          poznaj STDC10
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Divider />
            {/** get ahead laundromat technology */}
            <section className="mb-8 relative">
              <div className="grid sm:grid-cols-2 auto-rows-max -mx-8 mb-8 relative z-[1]">
                <div className="relative">
                  <div className="absolute w-14 h-14 bg-accent top-0 left-0"></div>
                  <div className="w-[150px] h-[150px] ml-auto relative">
                    <div className="absolute w-14 h-14 bg-accent-light top-0 -left-[52px]"></div>
                    <div className="absolute w-14 h-14 bg-accent bottom-[56px] right-0"></div>
                    <div className="absolute w-14 h-14 bg-accent-light bottom-0 right-0"></div>
                    <img
                      className="object-cover w-full h-full object-top ml-1"
                      src={vend.BG_8}
                      alt="wyprzedź techmologie pralncize z urządzeniamim marki Pralma i Primus"
                    />
                  </div>
                  <h3 className="text-accent-dark uppercase my-4 text-center font-light text-2xl relative mr-4">
                    <span className="text-black-dark">Wyprzedź</span>{' '}
                    technologie pralnicze
                    <span className="hidden sm:block absolute -bottom-4 left-0 w-full h-px bg-slate-600">
                      <span className="absolute w-2 h-2 bg-slate-600 right-0 top-1/2 -translate-y-1/2 rounded-sm"></span>
                    </span>
                  </h3>
                </div>
                <div className="w-full h-auto relative">
                  <div className="absolute w-14 h-14 bg-white bottom-0 left-0"></div>
                  <div className="absolute w-14 h-14 bg-accent bottom-[56px] right-0"></div>
                  <div className="absolute w-14 h-14 bg-accent-light bottom-0 right-0"></div>
                  <div className="absolute w-14 h-14 bg-white bottom-0 right-[56px]"></div>
                  <img
                    className="object-cover w-full h-full object-center"
                    src={vend.BG_6}
                    alt=""
                  />
                </div>
              </div>
              {/** technologies */}
              <div className="grid sm:grid-cols-2 auto-rows-max gap-8 relative z-[1] -mx-8 px-8">
                <div>
                  {/** ECO */}
                  <div>
                    <div className="w-[140px] h-[70px] rounded-sm overflow-hidden mx-auto">
                      <img
                        className="object-cover w-full h-full object-center"
                        src={vend.ECO}
                        alt=""
                      />
                    </div>
                    <div>
                      <h4 className="text-accent-dark uppercase text-left font-normal">
                        Pranie ekologiczne i przyjazne środowisku
                      </h4>
                      <b className="block text-xs text-left text-black-dark font-semibold mb-2">
                        ECO
                      </b>
                      <p className="font-light mb-4 text-sm">
                        Featured on our FX range of washers, the ECO3 system
                        optimizes water levels for economy and environmental
                        friendliness without losing washing quality. This means
                        as much as -15% water, -20% energy consumption and -25%
                        residual moisture compared to previous models.
                      </p>
                    </div>
                  </div>
                  {/** sensodry */}
                  <div>
                    <div className="w-[140px] h-[70px] rounded-sm overflow-hidden mx-auto mb-2">
                      <img
                        className="object-cover w-full h-full object-center"
                        src={vend.SENSODRY}
                        alt="system pomiaru wilgotności"
                      />
                    </div>
                    <div>
                      <h4 className="text-accent-dark uppercase text-left font-normal">
                        SENSOR CONTROLLED DRYING
                      </h4>
                      <b className="block text-xs text-left text-black-dark font-semibold mb-2">
                        senso.dry
                      </b>
                      <p className="font-light mb-4 text-sm">
                        Our innovative humidity sensors protect your linen from
                        over-drying. This saves energy and ensures you always
                        get outstanding results.
                      </p>
                    </div>
                  </div>
                  {/** radax */}
                  <div>
                    <div className="w-[140px] h-[70px] rounded-sm overflow-hidden mx-auto mb-2">
                      <img
                        className="object-cover w-full h-full object-center"
                        src={vend.RADAX}
                        alt="połączony radialny i osiowy przeplyw powietrza, niższe żużycie energii"
                      />
                    </div>
                    <div>
                      <h4 className="text-accent-dark uppercase text-left font-normal">
                        Airflow Radax
                      </h4>
                      <b className="block text-xs text-left text-black-dark font-semibold mb-2">
                        RADAX
                      </b>
                      <p className="font-light mb-4 text-sm">
                        Using a combination of radial and axial airflow, this
                        innovation reduces energy consumption while maintaining
                        outstanding drying performance.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-accent-dark font-normal">
                    PRIMUS DIGITAL LAUNDRY
                  </h4>
                  <p className="font-light mb-4">
                    Laundry entrepreneurs worldwide are experiencing the
                    benefits of the networked laundry. Now it’s your turn.
                  </p>
                  <div className="w-[150px] h-[25px] mb-4 mx-auto">
                    <img
                      className="object-cover w-full h-full object-center"
                      src={vend.TRACE_TECH}
                      alt="system śledzeia procesu prania"
                    />
                  </div>
                  <p className="font-light mb-2">
                    <b className="block text-xs text-black-dark font-semibold mb-2">
                      i-Trace Monitoring Dashboard
                    </b>
                    Make your business smarter with networked machines connected
                    digitally to you.
                  </p>
                  <ul className="list-inside text-sm font-light mb-4">
                    <li className="relative pl-4 mb-1">
                      <CircleListType size="6px" top="50%" left="0" />
                      View the performance of your entire laundry in real time
                      from any web browser
                    </li>
                    <li className="relative pl-4 mb-1">
                      <CircleListType size="6px" top="50%" left="0" />
                      Remote control any machine and check its status
                    </li>
                    <li className="relative pl-4">
                      <CircleListType size="6px" top="50%" left="0" />
                      Monitor your business from anywhere, obtain detailed
                      reports, develop customer offers to maximize uptime
                    </li>
                  </ul>
                  <div className="w-[230px] h-[170px] mb-4 mx-auto">
                    <img
                      className="object-cover w-full h-full object-center"
                      src={vend.TABLET}
                      alt="aplikacja do zarządzania procesem prania przemysłowego"
                    />
                  </div>
                  <p className="font-light mb-2">
                    <b className="block text-xs text-black-dark font-semibold mb-2">
                      The Primus App
                    </b>
                    The Primus App makes your laundry more attractive to
                    customers. It’s full of opportunities to build your
                    business. Get it from the Apple or Android app store and see
                    for yourself.
                  </p>
                  <ul className="list-inside text-sm font-light mb-2">
                    <li className="relative pl-4 mb-1">
                      <CircleListType size="6px" top="50%" left="0" />
                      Easy card payment for customers
                    </li>
                    <li className="relative pl-4 mb-1">
                      <CircleListType size="6px" top="50%" left="0" />
                      Better control for customers over wash and dry options,
                      queueing and more
                    </li>
                    <li className="relative pl-4">
                      <CircleListType size="6px" top="50%" left="0" />
                      Endless opportunities for loyalty programs and digital
                      customer engagement initiatives
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <Divider />
            {/** new xcontrol flex platform */}
            <section className="mb-12">
              <div className="px-8 -mx-8 relative mb-8">
                <div className="absolute w-14 h-14 bg-accent-light top-0 left-0"></div>
                <div className="absolute w-14 h-14 bg-accent-dark top-[56px] left-0"></div>
                <div className="absolute w-24 h-24 md:w-24 md:h-24 bg-accent top-[112px] left-0"></div>
                <div className="absolute w-14 h-14 bg-primary-light top-0 right-0"></div>
                <div className="w-full h-auto">
                  <div className="max-w-max mx-auto relative">
                    <div className="absolute w-24 h-24 bg-white bottom-0 left-0"></div>
                    <div className="absolute w-14 h-14 bg-accent-light bottom-[56px] right-0"></div>
                    <div className="absolute w-14 h-14 bg-white bottom-0 right-0"></div>
                    <img
                      className=""
                      src={vend.BG_9}
                      alt="sterownik mikroprocesorowy xcontrol flex dla pralni samoobsługowej"
                    />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 max-w-4xl mx-auto mb-8">
                <div>
                  <h4 className="text-accent-dark font-normal uppercase text-left">
                    GET AHEAD IN CUSTOMER EXPERIENCE AND CLOUD BASED PROGRAMMING
                    CAPABILITIES
                  </h4>
                  <p className="font-normal mb-2">
                    Primus’ latest control, XControl FLEX platform, features an
                    enhanced customer experience and brand-new functionalities
                    for connectivity and data accessibility available anywhere,
                    everywhere, in the cloud.
                  </p>
                  <h4 className="text-accent-dark font-normal uppercase text-left mb-2">
                    XCONTROL FLEX PLATFORM
                  </h4>
                  <ul className="list-inside text-sm font-light mb-2">
                    <li className="relative pl-4 mb-1">
                      <CircleListType size="6px" top="50%" left="0" />
                      7‘‘ (5‘‘ on stack tumbler dryers), full color, touch
                      screen display Easy to read from any angle and
                      customizable display
                    </li>
                    <li className="relative pl-4 mb-1">
                      <CircleListType size="6px" top="50%" left="0" />
                      Intuitive user-friendly interface Offering all data at a
                      glance. This best-in-class interface offers an excellent
                      operator guidance
                    </li>
                    <li className="relative pl-4">
                      <CircleListType size="6px" top="50%" left="0" />
                      Clear step-by-step instructions available in 34 languages.
                      Simplifies operation for users, any selection is no more
                      than two touches away
                    </li>
                  </ul>
                  <h4 className="text-accent-dark font-normal uppercase text-left mb-2">
                    WASHER EXTRACTOR FEATURES
                  </h4>
                  <ul className="list-inside text-sm font-light mb-2">
                    <li className="relative pl-4 mb-1">
                      <CircleListType size="6px" top="50%" left="0" />
                      15 wash cycles for OPL (12 for VEND) & 8 easy
                      -to-understand cycle modifiers
                    </li>
                    <li className="relative pl-4 mb-1">
                      <CircleListType size="6px" top="50%" left="0" />
                      Wash cycles can be customized for specific needs
                    </li>
                    <li className="relative pl-4">
                      <CircleListType size="6px" top="50%" left="0" />
                      Machine programming & performance data accessible through
                      cloud. Allows owners to remotely access live machine data
                      on mobile device
                    </li>
                  </ul>
                  <h4 className="text-accent-dark font-normal uppercase text-left mb-2">
                    WASHER EXTRACTOR FEATURES
                  </h4>
                  <p className="font-light font-sm">
                    Connect i-Trace and Primus app to provide the best-in-class
                    laundromat experience to your users.
                  </p>
                </div>
                <div className="self-center hidden sm:block">
                  <div className="mx-auto w-[153px] h-[273px]">
                    <img
                      className="object-cover w-full h-full object-center"
                      src={vend.M_6}
                      alt="samoobslugowa pralnicowirówka wysokoobrotowa ze sterownikiem xcontrol flex"
                    />
                  </div>
                  <Link
                    title="pralnicowirówki wolnostojące samoobsługowe ze sterownikiem dotykowym"
                    className="text-center block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-4 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                    to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/pralnicowirowki-wolnostojace"
                  >
                    poznaj pralnicowirówki ze sterownikiem dotykowym
                  </Link>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 max-w-4xl mx-auto mb-8">
                <div className="hidden sm:block">
                  <div className="mx-auto w-[177px] h-[425px]">
                    <img
                      className="object-cover w-full h-full object-center"
                      src={vend.M_7}
                      alt="samoobslugowa suszarka bębnowa ze sterownikiem xcontrol flex"
                    />
                  </div>
                  <Link
                    title="suszarki bębnowe samoobsługowe ze sterownikiem dotykowym"
                    className="text-center block max-w-max border border-accent-dark rounded-sm bg-accent text-black-dark px-2 py-1 my-4 mx-auto text-xs hover:bg-accent-light transition-all duration-150"
                    to="/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/suszarki-bebnowe"
                  >
                    poznaj suszarki ze sterownikiem dotykowym
                  </Link>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="mx-auto mb-8">
                    <img
                      src={vend.XCONTROL_FLEX}
                      alt="samoobslugowa pralnicowirówka wysokoobrotowa ze sterownikiem xcontrol flex"
                    />
                  </div>
                  <h4 className="text-accent-dark font-normal uppercase text-left mb-2">
                    DRYER FEATURES
                  </h4>
                  <ul className="list-inside text-sm font-light mb-2">
                    <li className="relative pl-4 mb-1">
                      <CircleListType size="6px" top="50%" left="0" />5 cycles +
                      2 modifiers (Reversing and Anti-wrinkle) for Vend and up
                      to 99 cycles for OPL
                    </li>
                    <li className="relative pl-4 mb-1">
                      <CircleListType size="6px" top="50%" left="0" />
                      Auto dry capability (OPL only)
                    </li>
                    <li className="relative pl-4">
                      <CircleListType size="6px" top="50%" left="0" />
                      Moisture sensing option (OPL only)
                    </li>
                    <li className="relative pl-4">
                      <CircleListType size="6px" top="50%" left="0" />
                      Advanced cycle programmability (OPL only)
                    </li>
                    <li className="relative pl-4">
                      <CircleListType size="6px" top="50%" left="0" />
                      Count up timer (OPL only)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="-mx-8 relative h-[162px] hidden sm:block">
                <div className="absolute w-14 h-14 bg-accent-light top-0 left-0"></div>
                <div className="absolute w-14 h-14 bg-accent-dark top-[56px] left-0"></div>
                <div className="absolute w-14 h-14 bg-accent top-[56px] left-[56px]"></div>
                <div className="absolute w-14 h-14 bg-primary-light top-[112px] left-[112px]"></div>
                <div className="absolute right-0 bottom-0 max-w-[436px] max-h-[162px]">
                  <div className="absolute w-24 h-24 bg-white top-0 right-0"></div>
                  <div className="absolute w-24 h-24 bg-white top-0 left-0"></div>
                  <img
                    className="object-cover w-full h-full object-center"
                    src={vend.BG_11}
                    alt="urządzenia pralnicze do samoobsługi, urządzenia samoobsługowe"
                  />
                </div>
              </div>
            </section>
            {/** payment options  */}
            <section className="mb-12 max-w-4xl mx-auto">
              <header>
                <h3 className="text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center">
                  <span className="text-black-dark">
                    Opcje płatności, które Ty i
                  </span>{' '}
                  Twoi klienci lubią
                </h3>
              </header>
              <div className="text-center">
                <h4 className="text-accent-dark uppercase font-normal">
                  Urządzenia pralnicze marki Primus wyposażone mogą być w opcje
                  płatności, które chcesz mieć w swojej pralni
                </h4>
                <p className="font-normal text-md mb-4">
                  You can have a completely digital pay-at-machine store with no
                  central cash collection. Or collect all your cash in one
                  place.... Which works best for you and your customers?
                </p>
              </div>
              <div className="grid sm:grid-cols-2 auto-rows-max gap-8">
                {/** coin */}
                <div className="flex justify-center flex-nowrap">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={vend.COINS}
                      alt="pralnia samoobsługowa na monety"
                    />
                  </div>
                  <div className="flex-grow">
                    <b className="block text-xs text-black-dark font-semibold mb-2">
                      Coin pay
                    </b>
                    <p className="text-sm font-light">
                      The traditional laundromat coin box option. Collect cash
                      on the go every day.
                    </p>
                  </div>
                </div>
                {/** value center */}
                <div className="flex justify-center flex-nowrap">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={vend.VALUE_CENTER}
                      alt="pralnia samoobsługowa na kartę"
                    />
                  </div>
                  <div className="flex-grow">
                    <b className="block text-xs text-black-dark font-semibold mb-2">
                      Primus value center
                    </b>
                    <p className="text-sm font-light">
                      The perfect bridge between cash and mobile payment: your
                      customers easily enter cash money in the value center to
                      load into their Primus app to pay their laundry.
                    </p>
                  </div>
                </div>
                {/** tokens */}
                <div className="flex justify-center flex-nowrap">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={vend.TOKENS}
                      alt="pralnia samoobsługowa na żetony"
                    />
                  </div>
                  <div className="flex-grow">
                    <b className="block text-xs text-black-dark font-semibold mb-2">
                      Tokens or loyalty card
                    </b>
                    <p className="text-sm font-light">
                      The closest thing you can get to issuing your own
                      currency. Great for customer bonding.
                    </p>
                  </div>
                </div>
                {/** app payment */}
                <div className="flex justify-center flex-nowrap">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={vend.APP_PAYMENT}
                      alt="pralnia samoobsługowa obsługiwana za pomocą aplikacji mobilnej"
                    />
                  </div>
                  <div className="flex-grow">
                    <b className="block text-xs text-black-dark font-semibold mb-2">
                      App payment
                    </b>
                    <p className="text-sm font-light">
                      Hassle-free digital mobile payment offers multiple
                      opportunities to deepen your customer relationships,
                      including offering rewards.
                    </p>
                  </div>
                </div>
                {/** central payment system */}
                <div className="flex justify-center flex-nowrap">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={vend.CPS}
                      alt="pralnia samoobsługowa podłączona do centralnego systemu płatności"
                    />
                  </div>
                  <div className="flex-grow">
                    <b className="block text-xs text-black-dark font-semibold mb-2">
                      Central payment system
                    </b>
                    <p className="text-sm font-light">
                      Customers can pay any way they want, and you’re ready to
                      take it: cash and credit cards.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/** */}
            <section className="mb-12">
              <div>
                <PageTitle text="Powszechnie stosowane i dedykowane, przemysłowe urządzenia pralnicze wyposażone w układy do samoobsługi" />
              </div>
              {data.products.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {data.products.map((product) => (
                    <Card
                      to={`/wyposazenie-pralni-przemyslowej-samoobslugowe/urzadzenia-pralnicze/${product.category.slug}/model/${product.model}`}
                      widthImg={`${
                        product.wide ? 'max-w-[400px]' : 'max-w-[200px]'
                      }`}
                      heightImg="max-h-[290px]"
                      item={product}
                      key={product._id}
                    >
                      <ModelName name={product.model} />
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
                <NoItems msg="Brak przemysłowych urządzeń pralniczych do samoobsługi" />
              )}
            </section>
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
