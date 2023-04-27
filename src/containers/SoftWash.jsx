import React from "react";
import {Link} from 'react-router-dom';
import AsideLinks from "../components/AsideLinks/AsideLinks";
import PageTitle from "../components/PageTitle/PageTitle";
import Header from "../components/Header/Header";
import Footer from "./Footer/Footer";
import { v4 as uuidv4 } from "uuid";
import { useScrollIntoView } from "../hooks";
import ContactForm from "../components/ContactForm";
import ContactsData from "../components/ContactsData/ContactsData";
import CompanyData from "../components/CompanyData";
import { softwash_images as images } from "../images/softwash";
import {hospitality} from "../images/hospitality"
import Divider from "../components/Divider";
import CircleListType from "../components/CircleListType";

const bgImages = [
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: images.BG_4, position: "object-top" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: images.ART, position: "object-center" },
  { id: uuidv4(), src: images.BG_8, position: "object-center" },
  { id: uuidv4(), src: images.BG_10, position: "object-center" },
  { id: uuidv4(), src: "", position: "object-bottom" },
];

const regular_vs_softwash = [
  {
    _id: uuidv4(),
    step: "-",
    regular: "tradycyjne czyszczenie na mokro",
    softwash: "softwash® +",
  },
  {
    _id: uuidv4(),
    step: "pralnicowirówka",
    regular: "wolnostojąca wysokoobrotowa",
    softwash: "sztywnomocowana lub wolnostojąca z bardzo niską prędkością obrotów - 15 obr./min.",
  },
  {
    _id: uuidv4(),
    step: "suszarka",
    regular: "każda suszarka z pomiarem wilgotności",
    softwash: "każda suszarka z pomiarem wilgotności, suszarka z pompą ciepła z pomiarem wilgotności",
  },
  {
    _id: uuidv4(),
    step: "pompy",
    regular: "dowolne pompy",
    softwash: "dedykowane pompy",
  },
  {
    _id: uuidv4(),
    step: "chemia",
    regular: "dowolne środki piorące",
    softwash: "zalecane środki piorące i środek odplamiający",
  },
  {
    _id: uuidv4(),
    step: "programy prania",
    regular: "typowe programy",
    softwash: "zalecane programy prania",
  },
  {
    _id: uuidv4(),
    step: "wymagania instalacyjne",
    regular: "brak",
    softwash: "zmiękczacz wody* i elektroniczny podgrzewacz wody**",
  },
  {
    _id: uuidv4(),
    step: "wyposażenie do prasowania fasonowego",
    regular: "urządzenia rozciągające",
    softwash: "urządzenia tradycyjne",
  },
  {
    _id: uuidv4(),
    step: "szkolenie",
    regular: "szczególnie zalecane",
    softwash: "niewielkie szkolenie wymagane",
  },
  {
    _id: uuidv4(),
    step: "dostęp do sieci",
    regular: "-",
    softwash: "tak",
  },
];

const finishingEquipment = [
  {
    _id: uuidv4(),
    amount: { title: 'ubrań / dzień' },
    spotting: { title: 'odplamianie' },
    ironing: { title: 'prasowanie' },
    formFinishing: { title: 'forma do wykańczania' },
    shirtFormFinishing: { title: 'forma do koszul' },
    topperPress: { title: 'prasa' },
  },
  {
    _id: uuidv4(),
    amount: { title: '< do 50', subtitle: '', image: '' },
    spotting: {
      title: 'podstawowy stół do odplamiania',
      subtitle: '',
      image: images.P_1,
    },
    ironing: {
      title: 'standardowy stół do prasowania',
      subtile: '',
      image: images.P_2,
    },
    formFinishing: {
      title: 'manekin z uniwersalną formą',
      subtitle: 'do wykańczania odzieży zewnętrznej',
      image: images.P_3,
    },
    shirtFormFinishing: {
      title: '-',
      subtitle: '',
      image: '',
    },
    topperPress: {
      title: '-',
      subtitle: '',
      image: '',
    },
  },
  {
    _id: uuidv4(),
    amount: { title: 'od 50 do 120', subtitle: '', image: '' },
    spotting: {
      title: 'Standardowy stół do odplamiania',
      subtitle: '',
      image: images.P_4,
    },
    ironing: {
      title: 'zestaw do prasowania z odsysaniem',
      subtile: '',
      image: images.P_5,
    },
    formFinishing: {
      title: 'manekin',
      subtitle: '',
      image: images.P_6,
    },
    shirtFormFinishing: {
      title: 'prasa kabinowa do marynarek, sukienek i spodni',
      subtitle: '',
      image: images.P_7,
    },
    topperPress: {
      title: '-',
      subtitle: '',
      image: '',
    },
  },
  {
    _id: uuidv4(),
    amount: { title: 'powyżej 120', subtitle: '', image: '' },
    spotting: {
      title: 'kabina do odplamiania',
      subtitle: 'wstępnego i końcowego',
      image: images.P_8,
    },
    ironing: {
      title: 'zestaw do prasowania z odsysaniem i nadmuchem',
      subtile: '',
      image: images.P_9,
    },
    formFinishing: {
      title: 'manekin napinający',
      subtitle: '',
      image: images.P_10,
    },
    shirtFormFinishing: {
      title: 'manekin uniwersalny',
      subtitle: '',
      image: images.P_11,
    },
    topperPress: {
      title: 'prasa do spodni',
      subtitle: '',
      image: images.P_12,
    },
  },
];

const setUp = [
  {
    _id:uuidv4(),
    size:"typ sklepu",
    perDay:'ilość na dzień',
    pack:"urządzenia - pralnicowirówka / suszarka",
    perCycle:"ilość na cykl",
    advantages:'zalety'
  },
  {
    _id:uuidv4(),
    size:{
      title:"małe sklepy",
      subtitle:["zastąpienie pralni chemicznej"]
    },
    perDay:54,
    pack:'pralnicowirówka FX-80 / suszarka T9 lub TX9 HP',
    perCycle:6,
    advantages:["niskie koszty inwestycji","niskie koszty uruchomienia","elastyczność"]
  },
  {
    _id:uuidv4(),
    size:{
      title:"małe sklepy",
      subtitle:["zastąpienie pralni chemicznej","dodatkowe wyposażenie"]
    },
    perDay:63,
    pack:'pralnicowirówka FX-80 / suszarka TX9 HP',
    perCycle:7,
    advantages:["niskie koszty inwestycji","idealna do czyszczenia tylko na mokro","elastyczność"]
  },
  {
    _id:uuidv4(),
    size:{
      title:"małe sklepy",
      subtitle:["zastąpienie pralni chemicznej"]
    },
    perDay:72,
    pack:'pralnicowirówka FX-105 / suszarka T-11 HP lub T-11',
    perCycle:8,
    advantages:["niskie koszty inwestycji","idealna do czyszczenia tylko na mokro","elastyczność"]
  },
  {
    _id:uuidv4(),
    size:{
      title:"średnie sklepy",
      subtitle:["zastąpienie pralni chemicznej"]
    },
    perDay:90,
    pack:'pralnicowirówka FX-135 / suszarka T-13 lub T-13 HP',
    perCycle:10,
    advantages:["idealna do czyszczenia tylko na mokro","duża pojemność bębna","kompromis pomiędzy elastycznością a wydajnością"]
  },
  {
    _id:uuidv4(),
    size:{
      title:"średnie sklepy",
      subtitle:["zastąpienie pralni chemicznej","nowy sklep"]
    },
    perDay:150,
    pack:'pralnicowirówka FX-180 / suszarka T-13_13 lub ( T-16, T-16 HP )',
    perCycle:15,
    advantages:["idealna do czyszczenia na mokro i prania regularnego","możliwość prania dużych poszew","wszechstronność"]
  },
  {
    _id:uuidv4(),
    size:{
      title:"duże sklepy",
      subtitle:["zastąpienie pralni chemicznej","nowy sklep"]
    },
    perDay:180,
    pack:'pralnicowirówka FX-240 / suszarka T-24HP',
    perCycle:20,
    advantages:["idealna do czyszczenia na mokro i prania regularnego","możliwość prania dużych poszew","wydajność"]
  },
  {
    _id:uuidv4(),
    size:{
      title:"duże sklepy",
      subtitle:["zakłady"]
    },
    perDay:207,
    pack:'pralnicowirówka FX-280 / suszarka T-24 HP',
    perCycle:23,
    advantages:["zaprojektowan bardziej dla pralni przemysłowej","wydajnośc pralni przemysłowej","wydajność czyszczenia na mokro"]
  }
]

export default function SoftWash() {
  const { ref } = useScrollIntoView();
  return (
    <div className="pt-16" ref={ref}>
      <Header
        bgGradient="bg-gradient-radial-circle-from-cc-dedicated"
        images={bgImages}
        title="Sposób na ekologiczną pralnię chemiczną bez kosztownych agregatów chemicznych i szkodliwych rozpuszczalników"
      />
      <main className="pl-8 pr-8">
        <PageTitle text="Czyszczenie na mokro dle lepszego jutra" />
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <div>
            <p className="font-light text-md mb-8 max-w-3xl mx-auto">
              Na całym świecie standardy środowiskowe są coraz bardziej
              rygorystyczne, ponieważ coraz więcej osób staje się świadomych
              ekologicznie. Tendencja ta ma również zastosowanie w branży prania
              i czyszczenia na sucho. System czyszczenia na mokro &qout;
              <b>SoftWash</b>&quot; pozwala wykorzystać ten trend.
            </p>
            <div className=" h-[260px] lg:h-[380px] lg:max-w-xl mx-auto mb-8">
              <img
                className="object-cover w-full h-full"
                src={images.BG_2}
                alt="czyszczenie na mokro dla lepszego jutra"
              />
            </div>
            <p className="font-light text-md mb-8 max-w-3xl mx-auto">
              <b>SoftWash</b> to dostosowany do potrzeb proces, który umożliwia
              czyszczenie nawet najbardziej delikatnych tkanin oraz odzieży
              specjalistycznej np. ochronnej bądź sportowej, na mokro, bez
              rozpuszczalników. Stwarza to nowe możliwości w segmentach rynku,
              takich jak pralnie chemiczne, domy opieki, usługi pogotowia
              ratunkowego itp. SoftWash - czyszczenie na mokro zapewnia
              zrównoważony i długoterminowy biznes.
            </p>

            <article className="mb-8">
              <header className="mb-8">
                <h3 className="text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center max-w-2xl mx-auto">
                  Stan się{' '}
                  <span className="text-black-dark">
                    {' '}
                    wysokowydajną i ekologiczną{' '}
                  </span>{' '}
                  firmą czyszczącą jutra już dzisiaj
                </h3>
              </header>
              <p className="font-light text-md mb-8 max-w-3xl mx-auto">
                Wyobraź sobie przez chwilę, że to była Twoja firma: nie używasz
                już kosztownych i toksycznych chemikaliów w swoim proces
                czyszczenia. Wzrosła gama tkanin, na których można pracować, w
                tym delikatnych. Nadal pracujesz w ten sam sposób, tylko teraz
                wydajniej. A co najważniejsze, spada zużycie energii i wody –
                więc teraz jesteś bardziej dochodowy. To jest obraz tego, jak
                może wyglądać Twoja operacja.
              </p>
              <div className="grid md:grid-cols-3 gap-8 auto-rows-max mx-auto">
                <div className="self-start justify-self-center flex flex-col items-center">
                  <img
                    className="w-[138px] h-[139px] mb-2"
                    src={images.JACKET_ICON}
                    alt="Softwash - czyszczenie na mokro delikatnych tkanin, agregaty chemiczne"
                  />
                  <span className="text-center text-md font-light max-w-sm block mx-auto">
                    {' '}
                    rewolucyjny proces czyszczenia na mokro{' '}
                  </span>
                </div>

                <div className="self-start justify-self-center flex flex-col items-center">
                  <img
                    className="w-[77px] h-[119px] mb-2"
                    src={images.HOURGLASS_ICON}
                    alt="Softwash - czyszczenie na mokro delikatnych tkanin, agregaty chemiczne"
                  />
                  <span className="text-center text-md font-light max-w-sm block mx-auto">
                    {' '}
                    proces prania tak szybki jak za pomocą rozpuszczalników{' '}
                  </span>
                </div>

                <div className="self-start justify-self-center flex flex-col items-center">
                  <img
                    className="w-[133px] h-[151px] mb-2"
                    src={images.DRESS_ICON}
                    alt="Softwash - czyszczenie na mokro delikatnych tkanin, agregaty chemiczne"
                  />
                  <span className="text-center text-md font-light max-w-sm block mx-auto">
                    {' '}
                    usuwa plamy oleju{' '}
                  </span>
                </div>
              </div>
            </article>
            <div className="mb-8">
              {/** --- */}
              <div className="grid lg:grid-cols-2 auto-rows-max lg:gap-y-8 relative">
                <img
                  className="hidden lg:block absolute top-4 right-4 rounded-sm w-[175px] h-[107px]"
                  src={images.SOFTWASH_2_ICON}
                  alt="urządzenia pralnicze do prania na mokro garniturów, jedwabiu - softwash"
                />
                <div className="h-[480px] rounded-md md:rounded-br-none overflow-hidden border border-slate-900">
                  <img
                    className="object-cover w-full h-full object-top"
                    src={images.BG_3}
                    alt="Delikatne czyszczenie utrzymuje świeżość prania dłużej"
                  />
                </div>
                <p className="self-center max-w-lg mx-auto text-accent-dark uppercase font-light text-3xl text-center p-4">
                  Delikatne czyszczenie utrzymuje świeżość prania dłużej
                </p>
              </div>
              {/** --- */}
              <div
                id="softwash_silk"
                className="grid lg:grid-cols-2 auto-rows-max lg:gap-y-8 relative"
              >
                <img
                  className="hidden lg:block absolute bottom-4 left-4 rounded-sm w-[175px] h-[107px]"
                  src={images.SOFTWASH_2_ICON}
                  alt="urządzenia pralnicze do prania na mokro garniturów, jedwabiu - softwash"
                />
                <p className="self-center max-w-lg mx-auto text-accent-dark uppercase font-light text-3xl text-center p-4">
                  Ubrania z jedwabiu zachowują swój kształt i estytykę
                </p>
                <div className="h-[480px] rounded-md md:rounded-tl-none overflow-hidden border border-slate-900">
                  <img
                    className="object-cover w-full h-full object-top"
                    src={images.BG_4}
                    alt="Pranie jedwabiu - softwash"
                  />
                </div>
              </div>
            </div>
            <Divider />
            {/** regular vs softwash */}
            <div className="grid lg:grid-cols-2 gap-8 auto-rows-max mb-8">
              <article className="">
                <h3 className="text-accent-dark uppercase font-light text-2xl mb-8 text-center max-w-2xl mx-auto">
                  {' '}
                  <span className="text-black-dark">Ekstremalne</span> w
                  innowacjach{' '}
                </h3>
                <p className="font-light text-md text-black-dark">
                  Używając <strong>SoftWash®</strong>, Twoja operacja idzie do
                  przodu zaoszczędzić pieniądze poprzez zmniejszenie zużycia
                  energii, eliminując kosztowne chemikalia i minimalizując
                  zużycie wody. SoftWash® Ci to umożliwi skorzystaj z nowych
                  możliwości sprzątania, traktować przedmioty takie jak skórzane
                  kurtki, dom tekstyliów, pokryć meblowych i ognioodpornych
                  odzież. Więc wygenerujesz nowe przychody, zwiększać zyski i
                  tworzyć nowe sposoby zwiększyć możliwości.
                </p>
              </article>
              <article className="">
                <h3 className="text-accent-dark uppercase font-light text-2xl mb-8 text-center max-w-2xl mx-auto">
                  {' '}
                  Tradycyjne czyszczenie na mokro a technologia{' '}
                  <span className="text-black-dark">SoftWash</span>{' '}
                </h3>
                <p className="font-light text-md text-black-dark">
                  Te dwie technologie to nie to samo. Z regularne czyszczenie na
                  mokro czas plamienia jest dłuższy do usuwania plam oleju,
                  istnieje zwiększone ryzyko skurcz i marszczenie i nie można
                  wysuszyć całkowicie włożyć ubranie do suszarki. Wykończenie
                  czas też jest dłuższy. Natomiast SoftWash® jest proces
                  suszenia na sucho, który zapewnia doskonałą plamę olejową
                  usuwanie, minimalne marszczenie i skuteczne wstępne wykrywanie
                  na tłuste plamy. Nie ma potrzeby wieszania odzieży
                  (oszczędność miejsca) i bez dodatkowego czasu w prowadzeniu
                  procesu w porównaniu z suchym czyszczenie. To ekstremalna
                  innowacja w działaniu.
                </p>
              </article>
            </div>
            <div className="grid md:grid-cols-3 gap-8 auto-rows-max mx-auto mb-8">
              <div className="self-start justify-self-center flex flex-col items-center">
                <img
                  className="w-[91px] h-[131px] mb-2"
                  src={images.REDUCE_ENERGY}
                  alt="Softwash - zminiejsz koszty energii w pralni przemysłowej"
                />
                <span className="text-center text-md font-light max-w-sm block mx-auto">
                  zmniejsz koszty energii
                </span>
              </div>

              <div className="self-start justify-self-center flex flex-col items-center">
                <img
                  className="w-[113px] h-[143px] mb-2"
                  src={images.NO_COSTS}
                  alt="Softwash - brak rozpuszczalników i konieczności utylizacji odpadów niebezpiecznych w pralni przemysłowej"
                />
                <span className="text-center text-md font-light max-w-sm block mx-auto">
                  {' '}
                  żadnych kosztownych chemikaliów ani utylizacji odpadów
                  niebezpiecznych{' '}
                </span>
              </div>

              <div className="self-start justify-self-center flex flex-col items-center">
                <img
                  className="w-[176px] h-[113px] mb-2"
                  src={images.LESS_WATER}
                  alt="Softwash - zminiejszenie zużycia wody i elminacja kosztów destylacji w pralni przemysłowej"
                />
                <span className="text-center text-md font-light max-w-sm block mx-auto">
                  {' '}
                  zmniejsz zużycie wody i wyeliminuj koszty destylacji{' '}
                </span>
              </div>
            </div>
            <Divider />
            {/** make your business to future-fit */}
            <article className="mb-8">
              <header className="flex flex-col justify-center items-center">
                <img
                  className="rounded-sm w-[175px] h-[107px] mb-2"
                  src={images.SOFTWASH_2_ICON}
                  alt="urządzenia pralnicze do prania na mokro garniturów, jedwabiu - softwash"
                />
                <h3 className="text-accent-dark uppercase font-light text-2xl mb-8 text-center max-w-2xl mx-auto">
                  Dopasuj swój biznes pralniczy do{' '}
                  <span className="text-black-dark">
                    standardów przyszłości
                  </span>
                </h3>
              </header>
              <p className="font-light text-md max-w-xl mx-auto text-center mb-8">
                Ekstremalne wymagania dotyczące wyników finansowych wymagają
                ekstremalnych innowacji. Zobaczysz od razu, jak SoftWash® zmieni
                Twoje koszty w stosunku do wydajności na lepsze. Czasy cykli
                czyszczenia na mokro są zwykle krótsze niż w przypadku innych
                systemów — użycie odzielnej pralki i suszarki umożliwia
                nakładanie się dwóch cykli, oszczędzając w ten sposób czas.
              </p>
              <p className="font-light text-md max-w-xl mx-auto text-center mb-8">
                Firmy sprzątające, które przestawiły się na dedykowane
                czyszczenie na mokro SoftWash® twierdzą, że znacznie skrócili
                czas procesu czyszczenia. Możesz spodziewać się znacznie
                krótszych czasów prania – do 24 minut – załadować pralkę, do 50%
                w przypadku wełny i do 65% w przypadku włókien mieszanych.
              </p>
              <div className="h-[380px] max-w-md mx-auto mb-8">
                <img
                  className="object-contain w-full h-full"
                  src={images.BG_5}
                  alt="czyszczenie na mokro dla lepszego jutra"
                />
              </div>
              <ul className="list-inside mx-auto max-w-xl mb-8 font-light">
                <li className="relative pl-8 mb-2">
                  <CircleListType size="8px" top="50%" left="0" />
                  innowacyjny system czyszczenia na mokro na sucho
                </li>
                <li className="relative pl-8 mb-2">
                  <CircleListType size="8px" top="50%" left="0" />
                  łatwe czyszczenie i niskie wymagania dotyczące wykończania
                  prania
                </li>
                <li className="relative pl-8 mb-2">
                  <CircleListType size="8px" top="50%" left="0" />
                  odzież przywrócona do naturalnego piękna, zarówno w dotyku jak
                  i wyglądzie
                </li>
              </ul>
              <p className="text-accent-dark uppercase font-light text-2xl text-center max-w-2xl mx-auto">
                <span className="mb-4 max-w-md mx-auto block">
                  To są realne oszczędności dla Twojego biznesu aż do:
                </span>
                <span className="text-accent-dark block font-extrabold text-7xl py-12 scale-y-150">
                  20% - 30%
                </span>
                <span className="text-accent-dark text-2xl mb-4 block">
                  redukcji kosztów
                </span>
              </p>
              <p className="font-light text-md max-w-2xl mx-auto text-center mb-8">
                za kilogram wypranych tekstyliów. Dzięki mniejszemu zużyciu
                wody, prądu i optymalnemu dozowaniu detergentu dla uzyskania
                najlepszych rezultatów (tj. krótszy czas wykończenia) – w
                porównaniu ze zwykłymi technologiami czyszczenia na mokro.
              </p>
              <div className="h-[380px] max-w-md mx-auto mb-8">
                <img
                  className="object-contain w-full h-full"
                  src={images.BG_6}
                  alt="sposob na zmniejszenie kosztów prania tekstyliów delikatnych i specjalistycznych"
                />
              </div>
              <p className="font-light text-md max-w-2xl mx-auto text-center mb-4">
                <strong>SoftWash®</strong> to szybki proces czyszczenia na mokro
                na sucho. Cały proces, na który składa się czyszczenie, suszenie
                i wykańczanie <b>zajmuje tylko jedną godzinę</b>.
              </p>
              <p className="font-light text-md max-w-2xl mx-auto text-center mb-4">
                To bardzo szybki proces, dzięki któremu i Ty zrealizujesz szybko
                usługę.
              </p>
            </article>
            {/** delicate garments */}
            <div className="mb-8">
              {/** --- */}
              <div className="grid lg:grid-cols-2 auto-rows-max lg:gap-y-8">
                <div className="h-[480px] overflow-hidden relative">
                  <img
                    className="absolute top-4 right-4 rounded-sm w-[175px] h-[107px]"
                    src={images.SOFTWASH_3_ICON}
                    alt="urządzenia pralnicze do prania na mokro garniturów, jedwabiu - softwash"
                  />
                  <img
                    className="object-cover w-full h-full object-top"
                    src={images.BG_7}
                    alt="Delikatne czyszczenie utrzymuje świeżość prania dłużej"
                  />
                </div>
                <p className="self-center max-w-lg mx-auto text-accent-dark uppercase font-light text-3xl text-center p-4">
                  Zadbaj o najdelikatniejsze tkaniny i cenne ubrania
                </p>
              </div>
              {/** --- */}
              <div
                id="softwash_silk"
                className="grid lg:grid-cols-2 auto-rows-max lg:gap-y-8"
              >
                <p className="self-center max-w-lg mx-auto text-accent-dark uppercase font-light text-3xl text-center p-4">
                  Przywróć ubraniom świeżość i wygląd nowej odzieży
                </p>
                <div className="h-[480px] overflow-hidden relative">
                  <img
                    className="absolute bottom-4 left-4 rounded-sm w-[175px] h-[107px]"
                    src={images.SOFTWASH_3_ICON}
                    alt="urządzenia pralnicze do prania na mokro garniturów, jedwabiu - softwash"
                  />
                  <img
                    className="object-cover w-full h-full object-top"
                    src={images.BG_8}
                    alt="Pranie jedwabiu - softwash"
                  />
                </div>
              </div>
            </div>
            <Divider />
            {/** features */}
            <article className="mb-8">
              <h3 className="text-accent-dark uppercase font-light text-2xl mb-8 text-center max-w-2xl mx-auto">
                Prosty i elastyczny system
              </h3>
              <ul className="list-inside mb-8 max-w-3xl mx-auto">
                <li className="relative pl-8 font-light mb-2 text-md">
                  <CircleListType size="8px" top="50%" left="0" />
                  czyszczenie na mokro i regularne pranie{' '}
                  <b>za pomocą tego samego wyposażenia pralniczego</b>
                </li>
                <li className="relative pl-8 font-light mb-2 text-md">
                  <CircleListType size="8px" top="50%" left="0" />
                  pranie szerokiej gamy odzieży z różnych tkanin
                </li>
                <li className="relative pl-8 font-light mb-2 text-md">
                  <CircleListType size="8px" top="50%" left="0" />
                  odpowiedni dla
                  <b>
                    {' '}
                    wełny, jedwabiu i innych delikatnych tkanin, również
                    wiskozy, octanu, angory, kaszmiru
                  </b>
                </li>
                <li className="relative pl-8 font-light mb-2 text-md">
                  <CircleListType size="8px" top="50%" left="0" />
                  czyść <b>Goretex</b> i <b>Sympatex</b> bez uszkodzania
                  membrany lub hydroizolacji
                </li>
                <li className="relative pl-8 font-light mb-2 text-md">
                  <CircleListType size="8px" top="50%" left="0" />
                  nadaje się do czyszczenia{' '}
                  <b>70% odzieży skórzanej i zamszowej</b>
                </li>
                <li className="relative pl-8 font-light mb-2 text-md">
                  <CircleListType size="8px" top="50%" left="0" />
                  do prania odzieży ognioodpornej z zachowaniem jej właściwości
                </li>
              </ul>
              <h3 className="text-accent-dark uppercase font-light text-2xl mb-8 text-center max-w-2xl mx-auto">
                Naturalne i bezpieczne czyszczenie
              </h3>
              <ul className="list-inside mb-8 max-w-3xl mx-auto">
                <li className="relative pl-8 font-light mb-2 text-md">
                  <CircleListType size="8px" top="50%" left="0" />
                  brak zanieczyszczania powietrza i wody – proces wykorzystuje
                  tylko wodę i biodegradowalne detergenty
                </li>
                <li className="relative pl-8 font-light mb-2 text-md">
                  <CircleListType size="8px" top="50%" left="0" />
                  bezpieczna dla ludzi - bez negatywnego wpływu na operatora i
                  klientów
                </li>
                <li className="relative pl-8 font-light mb-2 text-md">
                  <CircleListType size="8px" top="50%" left="0" />
                  bezpieczna dla wszystkich rodzajów odzieży - za pomocą
                  SoftWash® możesz wyczyścić każdą odzież, którą można
                  tradycyjnie czyści się chemicznie
                </li>
                <li className="relative pl-8 font-light mb-2 text-md">
                  <CircleListType size="8px" top="50%" left="0" />
                  zgodny ze wszystkimi normami
                </li>
                <li className="relative pl-8 font-light mb-2 text-md">
                  <CircleListType size="8px" top="50%" left="0" />
                  idealny do czyszczenia ubranek dziecięcych i niemowlęcych
                </li>
              </ul>
              <h3 className="text-accent-dark uppercase font-light text-2xl mb-8 text-center max-w-2xl mx-auto">
                Przyjazna środowisku
              </h3>
              <p className="font-medium text-base text-black-dark max-w-2xl mx-auto text-center mb-8">
                SoftWash® to profesjonalna i innowacyjna technologia, która nie
                tylko umożliwia rozwój Twojej firmy w sposób zrównoważony, ale
                także pomaga chronić środowisko, Twoich pracowników, Ciebie i
                Klientów. To dlatego, że używa tylko przyjaznych środkowisku
                detergentów i mało wody.
              </p>
              <div className="grid md:grid-cols-3 gap-8 auto-rows-max mx-auto">
                <div className="justify-self-center flex flex-col items-center self-start">
                  <img
                    className="w-[113px] h-[113px] mb-2"
                    src={images.RESTRICTED_ICON}
                    alt="Softwash - brak ograniczeń użytkowania w porównaniu z Perc"
                  />
                  <span className="text-center text-md font-light max-w-sm block mx-auto">
                    brak ograniczeń użytkowania w porównaniu z Perc
                  </span>
                </div>

                <div className="self-start justify-self-center flex flex-col items-center">
                  <img
                    className="w-[119px] h-[109px] mb-2"
                    src={images.NO_HEART}
                    alt="Softwash - brak ryzyka problemów zdrowotnych dla operatora i klientów"
                  />
                  <span className="text-center text-md font-light max-w-sm block mx-auto">
                    brak ryzyka problemów zdrowotnych dla operatora i klientów
                  </span>
                </div>

                <div className="self-start justify-self-center flex flex-col items-center">
                  <img
                    className="w-[130px] h-[121px] mb-2"
                    src={images.NON_DETERGENDS}
                    alt="Softwash - niepalne detergenty"
                  />
                  <span className="text-center text-md font-light max-w-sm block mx-auto">
                    niepalne detergenty
                  </span>
                </div>
              </div>
            </article>
            {/** compare regular vs softwash cleaning */}
            <article className="mb-8">
              <aside className="relative -mx-8 h-[360px] md:h-[480px] mb-8">
                <div className="absolute top-0 left-0 w-24 h-24 bg-white"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent-light bg-opacity-75"></div>
                <img
                  className="object-cover w-full h-full"
                  src={images.BG_11}
                  alt=""
                />
              </aside>
              <header className="mb-8">
                <h3 className="text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center max-w-2xl mx-auto">
                  <span className="font-semibold">SoftWash ®</span> -{' '}
                  <span className="text-black-dark">
                    Pranie lepsze dla Klientów, lepsze dla biznesu
                  </span>
                </h3>
              </header>
              <div>
                <h4>
                  Najkrótsza droga do właściwej odpowiedzi zaczyna się od
                  prawidłowego pytania
                </h4>
                <p className="font-light text-md text-black-dark max-w-2xl mx-auto mb-8 text-center">
                  Każda firma jest inna, ale technologia prania na mokro -
                  SoftWash ® jest wyjątkowa i niezastąpiona w osiąganiu wyższej
                  wydajności. Zatem jeśli chodzi Ci o zwiększenie przychodów,
                  obniżenie kosztów, kreowanie wizerunku firmy ekologicznej,
                  rosnące zadowolenie klienta lub po prostu znalezienie lepszego
                  sposobu na wykonywanie swojej pracy, czyszczenie na mokro
                  SoftWash ® to doskonałe rozwiązania dla Twojego biznesu.
                </p>
                <h5>SoftWash ® zapewnia doskonałe rezultaty czyszczenia</h5>
                <ul className="list-inside md:columns-2 max-w-xl mx-auto mb-8">
                  <li className="relative text-md font-normal pl-8">
                    <CircleListType size="8px" top="50%" left="0" />
                    pierwszorzędne dbanie o włókna tkanin
                  </li>
                  <li className="relative text-md font-normal pl-8">
                    <CircleListType size="8px" top="50%" left="0" />
                    mniejsze załadunki prania, szybsze pranie dla osiągnięcia
                    maksymalnej wydajności
                  </li>
                  <li className="relative text-md font-normal pl-8">
                    <CircleListType size="8px" top="50%" left="0" />
                    zoptymalizowana mechanika prania
                  </li>
                  <li className="relative text-md font-normal pl-8">
                    <CircleListType size="8px" top="50%" left="0" />
                    optymalny poziom odwirowania
                  </li>
                  <li className="relative text-md font-normal pl-8">
                    <CircleListType size="8px" top="50%" left="0" />
                    przywracanie koloru ubrań
                  </li>
                  <li className="relative text-md font-normal pl-8">
                    <CircleListType size="8px" top="50%" left="0" />
                    zachowanie tekstury materiałów
                  </li>
                  <li className="relative text-md font-normal pl-8">
                    <CircleListType size="8px" top="50%" left="0" />
                    nadaje się do wszystkich tkanin, które można prać chemicznie
                  </li>
                </ul>
              </div>
              <div className=" border-t border-r border-l border-slate-200 rounded-md overflow-hidden">
                {regular_vs_softwash.map((item, index) => {
                  return (
                    <div
                      className="grid grid-cols-3 auto-rows-max border-b border-slate-200"
                      key={item._id}
                    >
                      <div
                        className={
                          index === 0
                            ? 'bg-slate-200 border-r border-slate-100 text-md text-semibold self-stretch text-center px-1 py-2'
                            : 'text-sm font-medium self-stretch px-4 py-2 border-r border-slate-200'
                        }
                      >
                        {item.step}
                      </div>
                      <div
                        className={
                          index === 0
                            ? 'bg-slate-200 border-r border-slate-100 text-md text-semibold self-stretch text-center px-1 py-2'
                            : 'text-sm font-light self-stretch px-4 py-2 border-r border-slate-200 bg-accent-light'
                        }
                      >
                        {item.regular}
                      </div>
                      <div
                        className={
                          index === 0
                            ? 'bg-slate-200 text-md text-semibold self-stretch text-center px-1 py-2 border'
                            : 'text-sm font-light self-stretch px-4 py-2 bg-admin-light'
                        }
                      >
                        {item.softwash}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
            {/** laundry equipment */}
            <article>
              <header className="mb-8">
                <h3 className="text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center max-w-2xl mx-auto">
                  Przemysłowe urządzenia pralnicze -{' '}
                  <span className="text-black-dark">
                    {' '}
                    pralnicowirowki i suszarki z technologią <b>
                      SoftWash
                    </b>{' '}
                  </span>{' '}
                </h3>
              </header>
              {/** RX */}
              <div className="mb-8">
                <div className="flex flex-wrap justify-start items-start mb-4">
                  <div className="mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl">
                    <span className="text-lg">RX</span>
                  </div>
                  <div className="flex flex-wrap justify-start items-center">
                    <Link
                      to="/"
                      className="block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150"
                    >
                      {' '}
                      RX80{' '}
                    </Link>
                    <Link
                      to="/"
                      className="block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150"
                    >
                      {' '}
                      RX105{' '}
                    </Link>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 auto-rows-max gap-4">
                  <div>
                    <div className="bg-admin-dark box-content p-2 rounded-md shadow-lg w-[87px] h-[53px] ml-auto">
                      <img
                        className="object-cover w-full h-full"
                        src={images.SOFTWASH_3_ICON}
                        alt="pralnicowirówki z technologią SoftWash"
                      />
                    </div>
                    <div className="max-w-max mx-auto mb-4">
                      <img
                        className="w-[238px] h-[231px]"
                        src={hospitality.RX180}
                        alt="pralnicowirówka sztywnomocowana normalnoobrotowa lub pralnicowirówka szybkoobrotowa"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-left">Cechy serii RX</h3>
                    <ul className="list-inside mb-4">
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />{' '}
                        <b>XControl®</b> - łatwy w użyciu mikroprocesor z
                        typowymi programami prania i <b>programami SoftWash</b>{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />{' '}
                        nierdzewny panel górny i reszta oblachowania ocynkowana,
                        lakierowana proszkowo w kolorze stali nierdzewnej{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />{' '}
                        nierdzewny bęben wewnętrzny <b>Cascade™ drum</b> i bęben
                        zewnętrzny{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />{' '}
                        opatentowany pojemnik wlewu środków piorących{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" /> zawór
                        spustowy o dużej średnicy - Ø 76 mm{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" /> Easy
                        łatwy dostęp do wszystkich istotnych części urządzenia{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" /> duża
                        średnica otworu wsadowego dla łatwego załadunku i
                        rozładunku prania{' '}
                      </li>
                    </ul>
                    <div className="flex justify-start items-center">
                      <img
                        className="w-[22px] h-[22px] mr-1"
                        src={hospitality.ELECTRICAL_ICON}
                        alt="podgrzew elektryczny pralnicowirówki"
                      />
                      <img
                        className="w-[22px] h-[22px]"
                        src={hospitality.STEAM_ICON}
                        alt="podgrzew parowy pralnicowirówki"
                      />
                    </div>
                    <Link
                      to="/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/pralnicowirowki-szybkoobrotowe"
                      className="block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 cursor-pointer hover:bg-accent-light transition-all duration-150"
                    >
                      poznaj serię RX
                    </Link>
                  </div>
                </div>
              </div>
              {/** FX */}
              <div className="bg-slate-100 -mx-8 px-8 py-8 relative">
                <div className="flex flex-wrap justify-start items-start mb-4">
                  <div className="mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl">
                    <span className="text-lg">FX</span>
                  </div>
                  <div className="flex flex-wrap justify-start items-center">
                    <Link
                      to="/"
                      className="block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150"
                    >
                      FX65
                    </Link>
                    <Link
                      to="/"
                      className="block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150"
                    >
                      FX80
                    </Link>
                    <Link
                      to="/"
                      className="block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1  cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150"
                    >
                      FX105
                    </Link>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 auto-rows-max gap-4">
                  <div>
                    <div className="bg-admin-dark box-content p-2 rounded-md shadow-lg w-[87px] h-[53px] ml-auto">
                      <img
                        className="object-cover w-full h-full"
                        src={images.SOFTWASH_3_ICON}
                        alt="pralnicowirówki z technologią SoftWash"
                      />
                    </div>
                    <div className="max-w-max mx-auto mb-4">
                      <img
                        className="w-[238px] h-[254px]"
                        src={hospitality.FX180}
                        alt="pralnicowirówka wolnostojąca wysokoobrotowa"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-left">Cechy serii RX</h3>
                    <ul className="list-inside mb-4">
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        <b>XControl FLEX Plus</b> – w pełni programowalny
                        sterownik dotykowy z typowymi programami prania i{' '}
                        <b>programami SoftWash</b>
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        nierdzewny panel górny i oblachowanie ocynkowane
                        lakierowane proszkowo w kolorze stali nierdzewnej{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        nierdzewny bęben wewnętrzny <b>Cascade™ drum</b> i
                        nierdzewny bęben zewnętrzny{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        opatentowany pojemnik wlewu środków piorących{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        duża średnica zaworu spustowego - Ø 76mm{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        łatwy dostęp do wszystkich istotnych podzespołów{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        duża średnica otworu wsadowego dla łatwego załadunku i
                        rozładunku prania{' '}
                      </li>
                    </ul>
                    <div className="flex justify-start items-center mb-2">
                      <img
                        className="w-[22px] h-[22px] mr-1"
                        src={hospitality.ELECTRICAL_ICON}
                        alt="podgrzew elektryczny pralnicowirówki"
                      />
                      <img
                        className="w-[22px] h-[22px]"
                        src={hospitality.STEAM_ICON}
                        alt="podgrzew parowy pralnicowirówki"
                      />
                    </div>
                    <Link
                      to="/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/pralnicowirowki-wysokoobrotowe"
                      className="block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 cursor-pointer hover:bg-accent-light transition-all duration-150"
                    >
                      poznaj serię FX
                    </Link>
                  </div>
                </div>
              </div>
              {/** T */}
              <div className="mb-8 px-8 py-8 relative">
                <div className="flex flex-wrap justify-start items-start mb-4">
                  <div className="mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl">
                    <span className="text-lg">T</span>
                  </div>
                  <div className="flex flex-wrap justify-start items-center">
                    <Link
                      to="/"
                      className="block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150"
                    >
                      T-9
                    </Link>
                    <Link
                      to="/"
                      className="block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150"
                    >
                      T-11
                    </Link>
                    <Link
                      to="/"
                      className="block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1  cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150"
                    >
                      T-13
                    </Link>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 auto-rows-max gap-4">
                  <div>
                    <div className="bg-admin-dark box-content p-2 rounded-md shadow-lg w-[87px] h-[53px] ml-auto">
                      <img
                        className="object-cover w-full h-full"
                        src={images.SOFTWASH_3_ICON}
                        alt="pralnicowirówki z technologią SoftWash"
                      />
                    </div>
                    <div className="max-w-max mx-auto mb-4">
                      <img
                        className="w-[238px] h-[254px]"
                        src={hospitality.T9}
                        alt="suszarka bębnowa serii T"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-left">Cechy serii T9 - T16 SoftWash</h3>
                    <ul className="list-inside mb-4">
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" /> RADAX -
                        połączenie osiowego i radilanego przepływu powietrz{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" /> łatwy w
                        obsłudze sterownik FCT - Full Control mikroprocesor{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" /> duży
                        otwór wsadowy dla łatwego załadunku i rozładunku prania{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />{' '}
                        dostępna pompa ciepła{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" /> krótki
                        cykl suszenia{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />{' '}
                        ekonomiczny proces{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />{' '}
                        <b>rewersja bębna i pomiar wilgotności</b>{' '}
                      </li>
                    </ul>
                    <h3 className="text-left">Cechy T24 i T35 SoftWash</h3>
                    <ul className="list-inside mb-4">
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        radialny przepływ powietrza{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        łatwy w obsłudze sterownik <b>FCT</b> - w pełni
                        programowalny sterownik mikroprocesorowy - Full Control{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        duży otwór wsadowy dla łatwego załadunku i rozładunku
                        prania{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        krótki cykl suszenia{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        ekonomiczny proces{' '}
                      </li>
                      <li className="pl-8 relative font-light text-sm mb-1">
                        {' '}
                        <CircleListType size="8px" top="50%" left="0" />
                        <b>rewersja i pomiar wilgotności</b>
                      </li>
                    </ul>
                    <div className="flex justify-start items-center mb-2">
                      <img
                        className="w-[22px] h-[22px] mr-1"
                        src={hospitality.ELECTRICAL_ICON}
                        alt="suszarki bębnowe o podgrzewie elektrycznym"
                      />
                      <img
                        className="w-[22px] h-[22px] mr-1"
                        src={hospitality.STEAM_ICON}
                        alt="suszarki bębnowe o podgrzewie parowym"
                      />
                      <img
                        className="w-[22px] h-[22px] mr-1"
                        src={hospitality.GAS_ICON}
                        alt="suszarki bębnowe o podgrzewie gazowym"
                      />
                      <img
                        className="w-[22px] h-[22px] mr-1"
                        src={hospitality.HEATPOMP_ICON}
                        alt="suszarki bębnowe z pompą ciepła"
                      />
                    </div>
                    <Link
                      to="/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/suszarki-bebnowe"
                      className="block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 mb-1 cursor-pointer hover:bg-accent-light transition-all duration-150"
                    >
                      poznaj serię T
                    </Link>
                    <Link
                      to="/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/suszarki-z-pompa-ciepla"
                      className="block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 mb-1 cursor-pointer hover:bg-accent-light transition-all duration-150"
                    >
                      poznaj serię T z pompą ciepła
                    </Link>
                  </div>
                </div>
              </div>
            </article>
            {/** finishing equipment */}
            <article className="mb-8">
              <header className="mb-8">
                <h3 className="text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center max-w-2xl mx-auto">
                  {' '}
                  Polecane wyposażenie do{' '}
                  <span className="text-black-dark">
                    {' '}
                    wykańczania odzieży fasonowej i usuwania plam{' '}
                  </span>{' '}
                  .{' '}
                </h3>
              </header>
              <p className="font-light text-md max-w-2xl mb-8 mx-auto text-center">
                Sposób, w jaki kończysz każdą pracę, odzwierciedla Twoje ogólne
                podejście do zapewniania jakości usługi dla Twoich klientów.
                Wybór odpowiedniego sprzętu może również pomóc w redukcji
                kosztów wynagrodzeń, osiągając wyniki, których potrzebujesz.
                Nasi doświadczeni pracownicy chętnie polecą Ci odowiednie do
                Twoich potrzeb wypsoażenie do wykanczania odzieży fasonowej
                m.in. marynarek, spodni, sukienek, koszul oraz odzieży
                wierzchniej.
              </p>
              <div className="mb-8 border border-slate-100 rounded-md overflow-hidden">
                {finishingEquipment.map((item, index) => {
                  return (
                    <div
                      className={
                        index === finishingEquipment.length - 1
                          ? 'grid lg:grid-cols-6'
                          : 'grid lg:grid-cols-6 border-b border-slate-100'
                      }
                      key={item._id}
                    >
                      <div
                        className={
                          index === 0
                            ? 'bg-slate-200 text-md font-semibold self-stretch text-center px-1 py-2 border-r border-slate-100 flex flex-col justify-center'
                            : 'bg-admin-light bg-opacity-75 px-1 py-1 border-r border-slate-100 flex flex-col justify-center items-center font-bold'
                        }
                      >
                        <p className="text-semibold text-sm lowercase text-black-dark">
                          {item.amount.title}
                        </p>
                      </div>
                      <div
                        className={
                          index === 0
                            ? 'bg-slate-200 text-md font-semibold self-stretch text-center px-1 py-2 border-r border-slate-100 flex flex-col justify-center'
                            : 'bg-white px-1 py-1 border-r border-slate-100 flex flex-col justify-between items-center'
                        }
                      >
                        <div className={index !== 0 ? 'mb-4' : ''}>
                          <p className="text-semibold text-sm lowercase text-center text-black-dark">
                            {item.spotting.title}
                          </p>
                          {item.spotting.subtitle !== '' && (
                            <span className="text-center block text-[10px] font-light text-black-dark">
                              {item.spotting.subtitle}
                            </span>
                          )}
                        </div>
                        {index === 0 ? null : (
                          <>
                            <div className="">
                              {item.spotting.image !== '' && (
                                <img
                                  className=""
                                  src={item.spotting.image}
                                  alt="stół do odplamiania"
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className={
                          index === 0
                            ? 'bg-slate-200 text-md font-semibold self-stretch text-center px-1 py-2 border-r border-slate-100 flex flex-col justify-center'
                            : 'bg-white px-1 py-1 border-r border-slate-100 flex flex-col justify-between items-center'
                        }
                      >
                        <div className={index !== 0 ? 'mb-4' : ''}>
                          <p className="text-semibold text-sm lowercase text-center text-black-dark">
                            {item.ironing.title}
                          </p>
                          {item.ironing.subtitle !== '' && (
                            <span className="text-center block text-[10px] font-light text-black-dark">
                              {item.ironing.subtitle}
                            </span>
                          )}
                        </div>
                        {index === 0 ? null : (
                          <>
                            <div className="">
                              {item.ironing.image !== '' && (
                                <img
                                  className=""
                                  src={item.ironing.image}
                                  alt="stół do prasowania, zestaw do prasowania"
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className={
                          index === 0
                            ? 'bg-slate-200 text-md font-semibold self-stretch text-center px-1 py-2 border-r border-slate-100 flex flex-col justify-center'
                            : 'bg-white px-1 py-1 border-r border-slate-100 flex flex-col justify-between items-center'
                        }
                      >
                        <div className={index !== 0 ? 'mb-4' : ''}>
                          <p className="text-semibold text-sm lowercase text-center text-black-dark">
                            {item.formFinishing.title}
                          </p>
                          {item.formFinishing.subtitle !== '' && (
                            <span className="text-center block text-[10px] font-light text-black-dark">
                              {item.formFinishing.subtitle}
                            </span>
                          )}
                        </div>
                        {index === 0 ? null : (
                          <>
                            <div className="">
                              {item.formFinishing.image !== '' && (
                                <img
                                  className=""
                                  src={item.formFinishing.image}
                                  alt="manekin do prasowania"
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className={
                          index === 0
                            ? 'bg-slate-200 text-md font-semibold self-stretch text-center px-1 py-2 border-r border-slate-100 flex flex-col justify-center'
                            : 'bg-white px-1 py-1 border-r border-slate-100 flex flex-col justify-between items-center'
                        }
                      >
                        <div className={index !== 0 ? 'mb-4' : ''}>
                          <p className="text-semibold text-sm lowercase text-center text-black-dark">
                            {item.shirtFormFinishing.title}
                          </p>
                          {item.shirtFormFinishing.subtitle !== '' && (
                            <span className="text-center block text-[10px] font-light text-black-dark">
                              {item.shirtFormFinishing.subtitle}
                            </span>
                          )}
                        </div>
                        {index === 0 ? null : (
                          <>
                            <div className="">
                              {item.shirtFormFinishing.image !== '' && (
                                <img
                                  className=""
                                  src={item.shirtFormFinishing.image}
                                  alt="manekin do koszul"
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className={
                          index === 0
                            ? 'bg-slate-200 text-md font-semibold self-stretch text-center px-1 py-2 flex flex-col justify-center'
                            : 'bg-white px-1 py-1 flex flex-col justify-between items-center'
                        }
                      >
                        <div className={index !== 0 ? 'mb-4' : ''}>
                          <p className="text-semibold text-sm lowercase text-center text-black-dark">
                            {item.topperPress.title}
                          </p>
                          {item.topperPress.subtitle !== '' && (
                            <span className="text-center block text-[10px] font-light text-black-dark">
                              {item.topperPress.subtitle}
                            </span>
                          )}
                        </div>
                        {index === 0 ? null : (
                          <>
                            <div className="">
                              {item.topperPress.image !== '' && (
                                <img
                                  className=""
                                  src={item.topperPress.image}
                                  alt="manekin do spodni, prasy do pralni, prasa karuzelowa"
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
            {/** packs */}
            <article className="mb-12">
              <header className="mb-12">
                <h3 className="text-accent-dark uppercase my-4 font-light text-2xl mb-8 text-center max-w-xl mx-auto">
                  <span className="text-black-dark">Przejście na czyszczenie na mokro</span> - Softwash jest proste
                </h3>
                <p className="font-light text-md max-w-2xl mb-8 mx-auto text-center">
                  Podczas przechodzenia na technologię <strong>SoftWash®</strong> otrzymujesz
                  kompletne rozwiązanie. Każdy aspekt już jest przemyślany i
                  zaaranżowany tak, abyś mógł się po prostu skupić na
                  prowadzeniu dochodowego biznesu. Dostosujemy pakiet, który
                  obejmuje wszystkie produkty, których będziesz potrzebować oraz
                  wsparcie techniczne.
                </p>
                <p className="text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center max-w-2xl mx-auto">
                  Jaka jest{' '}
                  <span className="text-black-dark">idealna konfiguracja</span>{' '}
                  pralni do czyszczenia na mokro w{' '}
                  <span className="text-black-dark">technologii SoftWash</span>{' '}
                  dla Twojego biznesu
                </p>
              </header>
              <div className="border border-slate-100 rounded-md overflow-hidden">
                {setUp.map((item, index) => {
                  return index === 0 ? (
                    <div
                      className="grid lg:grid-cols-5 auto-rows-max border-b border-slate-100"
                      key={item._id}
                    >
                      <div className="self-stretch border-r border-slate-100 p-2 text-center font-bold text-sm bg-slate-200"> {' '} {item.size}{' '} </div>
                      <div className="self-stretch border-r border-slate-100 p-2 text-center font-bold text-sm bg-slate-200"> {' '} {item.perDay}{' '} </div>
                      <div className="self-stretch border-r border-slate-100 p-2 text-center font-bold text-sm bg-slate-200"> {' '} {item.pack}{' '} </div>
                      <div className="self-stretch border-r border-slate-100 p-2 text-center font-bold text-sm bg-slate-200"> {' '} {item.perCycle}{' '} </div>
                      <div className="self-stretch border-r border-slate-100 p-2 text-center font-bold text-sm bg-slate-200"> {' '} {item.advantages}{' '} </div>
                    </div>
                  ) : (
                    <div
                      className="grid lg:grid-cols-5 auto-rows-max border-b border-slate-100 text-sm"
                      key={item._id}
                    >
                      <div className="self-stretch text-left  p-2 border-r border-slate-100 bg-admin-light bg-opacity-75">
                        <span className="font-medium text-md">
                          {' '}
                          {item.size.title}{' '}
                        </span>
                        <div className="text-sm font-light">
                          {item.size.subtitle.map((item, index) => (
                            <div key={`size-${index}`}>{item}</div>
                          ))}
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col justify-center items-center font-semibold  text-center   p-2 border-r border-slate-100 bg-accent-light">{item.perDay}</div>
                      <div className="self-stretch flex flex-col justify-center items-center font-light text-lg  text-center   p-2 border-r border-slate-100 bg-admin-light bg-opacity-75">{item.pack}</div>
                      <div className="self-stretch flex flex-col justify-center items-center font-semibold  text-center   p-2 border-r border-slate-100 bg-accent-light">{item.perCycle}</div>
                      <div className="self-stretch text-left  p-2 bg-admin-light bg-opacity-75">
                        <ul className="list-inside">
                          {item.advantages.map((adv, index) => (
                            <li
                              className="text-sm font-light mb-1"
                              key={`${item._id}-${index}`}
                            >
                              {' '}
                              {adv}{' '}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
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
