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
import CircleListType from '../components/CircleListType';
import ContactForm from '../components/ContactForm';
import ContactsData from '../components/ContactsData/ContactsData';
import CompanyData from '../components/CompanyData';
import { v4 as uuidv4 } from 'uuid';
import { useScrollIntoView } from '../hooks';
import { getProductsBasedOnSpecyfiedTags } from '../api/products';
import { useLoaderData } from 'react-router-dom';
import { mop } from '../images/mop';
import { technologies } from '../images/technicallogos';
import Divider from '../components/Divider';

const bgImages = [
  { id: uuidv4(), src: mop.BG_3, position: 'object-center' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: mop.BG_6, position: 'object-center' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: '', position: '' },
  { id: uuidv4(), src: mop.BG_7, position: 'object-right' },
  { id: uuidv4(), src: mop.BG_1, position: 'object-center' },
];

const advantages = [
  {
    id: uuidv4(),
    title: 'SUPERIOR TECHNOLOGY',
    content:
      'The world needs faster, easier, better laundry. In recent years, we’ve invested over EUR 264 million in R&D to make it happen. Our global team of laundry scientists, engineers and designers are dedicated to purpose-driven laundry innovation.',
  },
  {
    id: uuidv4(),
    title: 'BUSINESS AND FINANCIAL SERVICES',
    content:
      'We aim to make laundry as cost-effective and rewarding as possible. In some regions, we support our customers with comprehensive financial services. In the past 20 years, we have helped laundry entrepreneurs grow with overEUR 1,7 billion in loans.',
  },
  {
    id: uuidv4(),
    title: 'AWARD-WINNING CUSTOMER SUPPORT',
    content:
      'Our outstanding customer service is dedicated to helping you develop the most efficient laundry operation possible and keeping it running at peak efficiency. Order Alliance Genuine Parts today and experience our exceptional service for yourself.',
  },
  {
    id: uuidv4(),
    title: 'STRONGER NETWORK',
    content:
      'You’re never too far from better laundry, thanks to expert Alliance teams in 14 strategic locations worldwide and over 1,200 specialist commercial laundry distributors. No matter where in the world you are, big help with big laundry is always within reach.',
  },
  {
    id: uuidv4(),
    title: 'COMPREHENSIVE TRAINING',
    content:
      'Alliance Laundry Systems University offers training for everyone involved in the laundry process. Our laundry learning programs include operator training, service schools, maintenance seminars, business training and much more.',
  },
  {
    id: uuidv4(),
    title: 'MEASURABLY BETTER',
    content:
      'To get the excellence you deserve, you can rate our services at every interaction. If you’re not happy, let us know and we’ll make it good. Were we helpful? Share your opinion. Our team thrives on a positive vibe. Understanding your satisfaction helps us improve our performance.',
  },
];

export async function loader() {
  const data = { message: '', products: [] };
  try {
    const responseProducts = await getProductsBasedOnSpecyfiedTags('mop');
    if (responseProducts.message) data.message = responseProducts.message;
    else data.products = responseProducts;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default function MOP() {
  const data = useLoaderData();
  const { ref } = useScrollIntoView();
  return (
    <div className="pt-16" ref={ref}>
      <Header
        bgGradient="bg-gradient-radial-circle-from-cc-dedicated"
        images={bgImages}
        title="Wygodne i skuteczne pranie mopów, każdego rodzaju, dzięki dedykowanym urządzeniom pralniczym i rozwiązaniom technicznym"
      />
      <main className="pl-8 pr-8">
        <PageTitle text="Technologia prania mopów" />
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <section className="">
            {/** choosing */}
            <div className="mb-12">
              {/** top */}
              <div className="grid md:grid-cols-2 auto-rows-max">
                <div className="w-full min-h-[480px]">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={mop.BG_2}
                    alt="przemysłowe urządzenia pralnicze do prania mopów"
                  />
                </div>
                <div className="p-4 max-w-lg justify-self-center self-center">
                  <h3 className="text-accent-dark uppercase my-4 text-center font-light text-2xl">
                    CHOOSING PRIMUS IS THE BEST LAUNDRY DECISION
                  </h3>
                  <p className="font-light mb-4 text-center">
                    You don’t buy commercial laundry equipment every day. That’s
                    why you need absolute certainty to make the right choice.
                  </p>
                  <p className="font-light mb-4 text-center">
                    It often makes solid business sense to go with the global
                    leader when choosing a partner. In commercial laundry, the
                    world leader is Alliance Laundry Systems.
                  </p>
                </div>
              </div>
              {/** bottom */}
              <div className="grid md:grid-cols-2 auto-rows-max">
                <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-max p-4">
                  <div className="flex flex-col justify-center items-center p-4 max-w-[320px] justify-self-center self-center">
                    <div className="mb-2">
                      <img src={mop.RIGHT_ICON} alt="" />
                    </div>
                    <h4 className="uppercase font-medium text-black-dark mb-0 mt-0">
                      Rozwiązania
                    </h4>
                    <span className="text-accent-dark font-light uppercase text-xs text-center block mb-2">
                      Optymalne, szyte na miarę
                    </span>
                    <p className="font-light text-sm text-center">
                      PRIMUS offers a wider range of machines. Tell us your
                      needs. We’ll help you select the right laundry solution
                      that will meet them.
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center p-4 max-w-[320px] justify-self-center self-center">
                    <div className="mb-2">
                      <img src={mop.COMPLETE_ICON} alt="" />
                    </div>
                    <h4 className="uppercase font-medium text-black-dark mb-0 mt-0">
                      Kompleksowe
                    </h4>
                    <span className="text-accent-dark font-light uppercase text-xs text-center block mb-2">
                      Pełne wyposażenie
                    </span>
                    <p className="font-light text-sm text-center">
                      PRIMUS has developed a full range of extensively tested
                      machines to provide you long lasting washing performance.
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center p-4 max-w-[320px] justify-self-center self-center">
                    <div className="mb-2">
                      <img src={mop.TAILORED_ICON} alt="" />
                    </div>
                    <h4 className="uppercase font-medium text-black-dark mb-0 mt-0">
                      Expert
                    </h4>
                    <span className="text-accent-dark font-light uppercase text-xs text-center block mb-2">
                      Realny serwis i wsparcie techniczne
                    </span>
                    <p className="font-light text-sm text-center">
                      PRIMUS is exclusively available from our experienced and
                      knowledgeable distributors. They are at your service to
                      help you with whatever is necessary to ensure optimum
                      laundry uptime.
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center p-4 max-w-[320px] justify-self-center self-center">
                    <div className="mb-2">
                      <img src={mop.EXPERT_ICON} alt="" />
                    </div>
                    <h4 className="uppercase font-medium text-black-dark mb-0 mt-0">
                      Finansowanie
                    </h4>
                    <span className="text-accent-dark font-light uppercase text-xs text-center block mb-2">
                      Dogodne finansowanie
                    </span>
                    <p className="font-light text-sm text-center">
                      Backed by Alliance Laundry Systems, the world leader in
                      commercial laundry, Alliance Laundry Systems Financial
                      Services, provides specific solutions for the commercial
                      laundry industry.
                    </p>
                  </div>
                </div>
                <div className="md:min-w-full h-auto">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={mop.BG_3}
                    alt="przemysłowe urządzenia pralnicze do prania mopów"
                  />
                </div>
              </div>
            </div>
            {/** laundry peace of mind */}
            <article className="mb-12">
              <header>
                <h3 className="text-accent-dark uppercase my-4 text-center font-light text-2xl">
                  LAUNDRY PEACE-OF-MIND FROM THE WORLD EXPERT
                </h3>
              </header>
              <div className="max-w-3xl mx-auto mb-4">
                <p className="font-light mb-4">
                  As part of Alliance Laundry Systems, PRIMUS gives you access
                  to the resources of a world leading company for all your
                  laundry solutions needs in the days, months and years ahead.
                </p>
                <p className="font-light mb-4">
                  Alliance Laundry Systems delivers leading performance in
                  commercial laundry through our family of brands, including
                  Primus, specialized for tailor made in-house laundry
                  solutions.
                </p>
                <p className="font-light mb-4">
                  Laundry is our sole business: we design, produce and
                  distribute globally, staying close to our customers with an
                  extended network of Alliance sales offices, warehouses and
                  more than 1200 expert distributors.
                </p>
                <p className="font-light mb-4">
                  Alliance leads the world in commercial laundry sales, product
                  range, global reach and R&D investment. We serve more than 140
                  countries with a team of more than 3,000+.
                </p>
              </div>
              <aside className="max-w-[640px] h-auto overflow-hidden rounded-sm mx-auto">
                <img
                  className="object-cover w-full h-full object-center"
                  src={mop.BG_5}
                  alt="spokój ducha w branży pralniczej dzięki światowym expertom"
                />
              </aside>
              <div>
                <h4 className="text-black-dark my-4 text-center font-light text-lg">
                  Sprawdź jakie korzyści możesz od nas uzyskać:
                </h4>
                {advantages.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max">
                    {advantages.map((advantage) => (
                      <div
                        key={advantage.id}
                        className="max-w-[360px] justify-self-center relative"
                      >
                        <h5 className="text-accent-dark font-light sm:text-left ">
                          {advantage.title}
                        </h5>
                        <p className="font-light text-sm">
                          {advantage.content}
                        </p>
                        <CircleListType
                          size="12px"
                          top="50%"
                          left="-24px"
                          classes="hidden md:block rounded-sm"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
            {/** top of the best */}
            <div className="grid sm:grid-cols-2 auto-rows-max mb-8">
              <div className="w-full h-auto">
                <img
                  className="object-cover w-full h-full object-center"
                  src={mop.BG_4}
                  alt="Wyposażenie pralni dla firmy sprzątającej, pralnicowirówki do prania mopów, pralnice do prania mopów"
                />
              </div>
              <div className="p-4 max-w-lg self-center justify-self-center">
                <h3 className="text-accent-dark uppercase my-4 text-center font-light text-2xl">
                  PRIMUS DELIVERS SUPERIOR VALUE
                  <span className="text-black-dark"> OVER THE LONG TERM</span>
                </h3>
                <p className="font-light text-center">
                  Whether you work for the hygienic, professional or heavy-duty
                  cleaning industry, our technology will make your facility
                  management less of a hassle. Our expert team will help you
                  design the perfect installation to ensure a extremely
                  performing laundry process.
                </p>
              </div>
            </div>
            {/** tailor solution mops */}
            <div className="mb-12 max-w-3xl mx-auto">
              <h3 className="text-accent-dark uppercase my-4 text-center font-light text-2xl">
                WE TAILOR THE SOLUTION TO YOUR NEEDS FOR
                <span className="text-black-dark"> DRY OR WET MOPS</span>
              </h3>
              <div>
                <p className="font-light mb-4 text-justify">
                  Our solution for dry or wet mops ensures a hygienic, flexible
                  and efficient laundry process that preserves your mops for a
                  longer lifespan.
                </p>
                <p className="font-light mb-4 text-justify">
                  Facility management requires expertise in any circumstance. We
                  understand specific needs, that’s why we focus on innovation
                  to make your laundry process more efficient, more economical
                  and more sustainable.
                </p>
                <p className="font-light mb-4 text-justify">
                  We offer complete, tailor-made mop cleaning solutions for your
                  facility, fitting the needs of any segment (Hygienic cleaning,
                  Professional cleaning or Heavy duty cleaning). Our machines
                  are known for their robustness, user-friendliness and long
                  life.
                </p>
                <p className="font-light mb-4 text-justify">
                  Project design, equipment, service and parts are all supported
                  by an in-house financing.* Our financing solutions vary by
                  country. Please contact your PRIMUS distributor for further
                  details.
                </p>
              </div>
            </div>
            {/** priorytets */}
            <div className="mb-12">
              <h3 className="text-accent-dark uppercase mt-4 mb-8 text-center font-light text-2xl">
                <span className="text-black-dark">Rozumiemy</span> priorytety
                branży pralniczej
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 auto-rows-max ">
                <div className="flex flex-col justify-center items-center border border-accent max-w-max justify-self-center pt-4 rounded-md shadow-md">
                  <h4 className="text-accent-dark uppercase my-4 text-center font-normal text-lg mb-2 mt-0">
                    PROFESSIONAL CLEANING
                  </h4>
                  <div className="mb-2">
                    <img
                      src={mop.PROFESSIONAL_CLEANING_ICON}
                      alt="profesionalne czyszczenie mopów"
                    />
                  </div>
                  <span className="block mb-4 text-sm lowercase text-black-dark">
                    FABRICS LAST LONGER
                  </span>
                  <p className="font-light p-4 bg-accent-light max-w-[320px] text-center flex-grow">
                    Robust PRIMUS machines combine power with intelligence to
                    significantly extend the life of microfibers in dry or wet
                    mops and cleaning textiles. Taking better care of these
                    pieces helps extend their useful life and reduces costs.
                  </p>
                </div>

                <div className="flex flex-col justify-center items-center border border-primary max-w-max justify-self-center pt-4 rounded-md shadow-md">
                  <h4 className="text-primary-light uppercase my-4 text-center font-normal text-lg mb-2 mt-0">
                    ZACHOWANIE HIGIENY
                  </h4>
                  <div className="mb-2">
                    <img
                      src={mop.HYGIENIC_BARRIER_RED_ICON}
                      alt="maksymalna czystość i dbałość o higiene w pralni przemysłowej"
                    />
                  </div>
                  <span className="block mb-4 text-sm lowercase text-black-dark">
                    EASIER AND MORE HYGIENIC
                  </span>
                  <p className="font-light p-4 bg-primary-light text-white max-w-[320px] text-center flex-grow">
                    PRIMUS barrier machines, separate soiled and clean items,
                    giving your facility the flexibility of a tailor-made
                    process to adapt to any changes in regulations.
                  </p>
                </div>

                <div className="flex flex-col justify-center items-center border border-accent-dark max-w-max justify-self-center pt-4 rounded-md shadow-md">
                  <h4 className="text-accent-dark uppercase my-4 text-center font-normal text-lg mb-2 mt-0">
                    HEAVY DUTY CLEANING
                  </h4>
                  <div className="mb-2">
                    <img
                      src={mop.HEAVY_DUTY_ICON}
                      alt="rozwiązania pralnicze optymalizujące zużycie wody i energi, niskie zużycie wody i energii w pralni przemysłowej"
                    />
                  </div>
                  <span className="block mb-4 text-sm lowercase text-black-dark">
                    MORE EFFICIENT USE OF RESOURCES
                  </span>
                  <p className="font-light p-4 bg-accent max-w-[320px] text-center flex-grow">
                    PRIMUS delivers optimum cleaning, lowest cost of ownership
                    and most efficient water and energy consumption, through
                    engineering expertise in designing sustainable machines.
                  </p>
                </div>
              </div>
            </div>
            {/** ensure hygienic */}
            <article className="mb-12">
              <header>
                <h3 className="text-accent-dark uppercase mt-4 mb-8 mx-auto font-light text-2xl max-w-2xl text-center">
                  <span className="text-black-dark">
                    Zapewnij higienę, elastyczność i wydajność
                  </span>{' '}
                  procesu pralniczego, który ochroni Twoje mopy
                </h3>
              </header>
              <div className="mb-2">
                {/** 1 */}
                <div className="">
                  <h4 className="text-dark-black my-4 font-medium text-center text-md">
                    Optymalizacja procesu prania dla lepszych resultatów
                  </h4>
                  <div>
                    {/** cascade drum */}
                    <div className="grid md:grid-cols-2 gap-8 mb-4">
                      <div className="flex items-center ">
                        <div className="w-[160px] h-[80px] rounded-sm overflow-hidden">
                          <img
                            className="object-cover w-full h-full object-center"
                            src={technologies.CASCADE}
                            alt="technologia cascade-drum"
                          />
                        </div>
                        <div className="relative flex-grow h-px bg-slate-300 ml-8">
                          <span className="block absolute w-2 h-2 rounded-sm bg-slate-300 top-full -translate-y-1/2 left-0"></span>
                        </div>
                      </div>
                      <div className="">
                        <h5 className="text-accent-dark uppercase mt-4 mb-8 font-medium text-left text-md">
                          OPTIMIZE PROCESS TIME AND CLEANING EFFICIENCY
                        </h5>
                        <p className="font-light text-sm">
                          Revolutionary Cascade drum design accelerates dirt
                          removal and protects mop fibers for a longer lifespan.
                          Washer drum design includes small bulges between the
                          perforations for more mechanical action and better
                          dirt removal. Despite strong extraction, the linen
                          does not stick to the drum .and reduces unloading time
                          for operator.
                        </p>
                      </div>
                    </div>
                    {/** optiload */}
                    <div className="grid md:grid-cols-2 gap-8 mb-4">
                      <div className="flex items-center">
                        <div className="w-[160px] h-[80px] rounded-sm overflow-hidden">
                          <img
                            className="object-cover w-full h-full object-center"
                            src={technologies.OPTILOAD_BLACK}
                            alt="optiload"
                          />
                        </div>
                        <div className="relative flex-grow h-px bg-slate-300 ml-8">
                          <span className="block absolute w-2 h-2 rounded-sm bg-slate-300 top-full -translate-y-1/2 left-0"></span>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-accent-dark uppercase mt-4 mb-8 font-medium text-left text-md">
                          OPTIMIZE THE WASHING PROCESS RESULTING IN BETTER MOP
                          CLEANING
                        </h5>
                        <p className="font-light text-sm">
                          Optiload calculates the accurate weight of the
                          washload and automatically adapts the amount of water,
                          energy and detergent for the cycle.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider />
                {/** 2  */}
                <div className="">
                  <h4 className="text-dark-black my-4 font-medium text-center text-md">
                    Zoptymalizowana praca dla osiągnięcia wyższej wydajności
                  </h4>
                  <div>
                    {/** XControl Plus */}
                    <div className="grid md:grid-cols-2 gap-8 mb-4">
                      <div className="flex items-center">
                        <div className="w-[160px] h-[80px] rounded-sm overflow-hidden">
                          <img
                            className="object-cover w-full h-full object-center"
                            src={technologies.XCONTROL_PLUS}
                            alt="technologia cascade-drum"
                          />
                        </div>
                        <div className="relative flex-grow h-px bg-slate-300 ml-8">
                          <span className="block absolute w-2 h-2 rounded-sm bg-slate-300 top-full -translate-y-1/2 left-0"></span>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-accent-dark uppercase mt-4 mb-8 font-medium text-left text-md">
                          TAILOR-MADE PROGRAM LIBRARY HELPS WITH QUICK AND EASY
                          SELECTION
                        </h5>
                        <p className="font-light text-sm">
                          Innovative XControl programmer brings unlimited
                          programming possibilities. New customer needs can be
                          taken care of with tailored cycles easy and quickly to
                          upload through a USB port.
                        </p>
                      </div>
                    </div>
                    {/** EasySOAP */}
                    <div className="grid md:grid-cols-2 gap-8 mb-4">
                      <div className="flex items-center">
                        <div className="w-[160px] h-[80px] rounded-sm overflow-hidden">
                          <img
                            className="object-cover w-full h-full object-center"
                            src={technologies.EASYSOAP}
                            alt="system podłączenia płynnych środków pioracych"
                          />
                        </div>
                        <div className="relative flex-grow h-px bg-slate-300 ml-8">
                          <span className="block absolute w-2 h-2 rounded-sm bg-slate-300 top-full -translate-y-1/2 left-0"></span>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-accent-dark uppercase mt-4 mb-8 font-medium text-left text-md">
                          READY-TO-USE LIQUID CHEMICALS
                        </h5>
                        <p className="font-light text-sm">
                          With easySOAP, staff no longer has to manually add
                          laundry chemicals. Plug-and-play access for up to
                          eight dosing pumps ensures precise and accurate dosing
                          of chemicals every cycle and eliminates waste.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider />
                {/** 3 */}
                <div className="">
                  <h4 className="text-dark-black my-4 font-medium text-center text-md">
                    Śledzenie procesu prania, ekologia i konkretne oszczędności
                  </h4>
                  <div>
                    {/** tracetech */}
                    <div className="grid md:grid-cols-2 gap-8 mb-4">
                      <div className="flex items-center">
                        <div className="w-[160px] h-[80px] rounded-sm overflow-hidden">
                          <img
                            className="object-cover w-full h-full object-center"
                            src={technologies.TRACETECH}
                            alt="system śledzenia procesu prania przemysłowego"
                          />
                        </div>
                        <div className="relative flex-grow h-px bg-slate-300 ml-8">
                          <span className="block absolute w-2 h-2 rounded-sm bg-slate-300 top-full -translate-y-1/2 left-0"></span>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-accent-dark uppercase mt-4 mb-8 font-medium text-left text-md">
                          MONITOR AND ANALYZE YOUR PROCESSES FOR BEST ROI
                        </h5>
                        <p className="font-light text-sm">
                          Trace-Tech records statistics for each cycle, enabling
                          tracking of data and helps to tailor programs to meet
                          the needs of all dry or wet mops.
                        </p>
                      </div>
                    </div>
                    {/** eco */}
                    <div className="grid md:grid-cols-2 gap-8 mb-4">
                      <div className="flex items-center">
                        <div className="w-[160px] h-[80px] rounded-sm overflow-hidden">
                          <img
                            className="object-cover w-full h-full object-center"
                            src={technologies.ECO}
                            alt="optiload"
                          />
                        </div>
                        <div className="relative flex-grow h-px bg-slate-300 ml-8">
                          <span className="block absolute w-2 h-2 rounded-sm bg-slate-300 top-full -translate-y-1/2 left-0"></span>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-accent-dark uppercase mt-4 mb-8 font-medium text-left text-md">
                          WASH SUSTAINABLE TECHNOLOGY
                        </h5>
                        <p className="font-light text-sm">
                          We care about the environment, and we know that
                          consumption costs are a key to your business. ECO3® is
                          a sustainable technology, that helps you reduce 15%
                          water, 25% moisture and 20% of energy.*
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs font-light">
                * ECO3® - technologia dostępna dla lini pralnicowirówek FX
              </p>
            </article>
            {/** quality */}
            <article className="mb-12 grid md:grid-cols-2 gap-8">
              <aside className="w-full h-auto">
                <img
                  className="object-cover w-full h-full object-center"
                  src={mop.BG_7}
                  alt="poznaj jakość rozwiązań pralniczych dedykowanych do czysczenia na sucho i mokro mopów"
                />
              </aside>
              <div className="justify-self-center self-center max-w-lg p-4">
                <header>
                  <h3 className="text-accent-dark uppercase mt-4 mb-8 mx-auto font-light text-2xl max-w-2xl text-center">
                    <span className="text-black-dark">
                      GET PRIMUS QUALITY ON DEDICATED
                    </span>{' '}
                    DRY AND WET MOP-WASHING SOLUTION
                  </h3>
                </header>
                <div>
                  <p className="font-normal mb-4 text-justify">
                    PRIMUS has developed a new optional dirt collector,
                    optimizing the draining process and reducing the maintenance
                    for waste water drainage. Our expert laundry engineers
                    worked with facilities managers to perfect algorithms that
                    ensure optimal hygiene and cleanliness for microfiber cloths
                    and cotton mops. Our new dry and wet mop-washing solutions
                    have:
                  </p>
                  <ul className="list-inside">
                    <li className="font-light relative pl-4 text-sm mb-2">
                      <CircleListType size="8px" top="50%" left="0px" />
                      Special programs to perfectly wash mops, wipers and more
                      for soft mount machines with capacity up to 135 L
                    </li>
                    <li className="font-light relative pl-4 text-sm mb-2">
                      <CircleListType size="8px" top="50%" left="0px" />
                      Cycles developed for various mop head soil levels by
                      experts in facility management
                    </li>
                    <li className="font-light relative pl-4 text-sm mb-2">
                      <CircleListType size="8px" top="50%" left="0px" />
                      Stainless steel dirt collector optional system for soft
                      mount machines with capacity up to 280 L
                    </li>
                    <li className="font-light relative pl-4 text-sm mb-2">
                      <CircleListType size="8px" top="50%" left="0px" />
                      And, as always PRIMUS exceptional long lasting and wash
                      quality
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            {/** special programs */}
            <article className="mb-12">
              <header>
                <h3 className="text-accent-dark uppercase mt-4 mb-8 mx-auto font-light text-2xl max-w-2xl text-center">
                  <span className="text-black-dark">
                    Programy dedykowane do prania mopów
                  </span>{' '}
                  i programy standardowe
                </h3>
              </header>
              <p className="font-light mb-4 max-w-lg mx-auto text-center">
                Cycles are suitable for dry or wet Mops, cotton or micro fiber.
                Wet mop process ensures perfect impregnation of the mop for
                immediate use for floor cleaning and disinfection. Tailored
                programs add the disinfectant and remanent chemicals to the mops
                during last rinse.
              </p>
              <div className="grid md:grid-cols-2 auto-rows-max gap-8 justify-center items-center">
                <div className="">
                  <div className="w-[190px] h-[80px] rounded-sm overflow-hidden mb-4 mx-auto">
                    <img
                      className="object-cover w-full h-full object-center"
                      src={mop.SDC_ICON}
                      alt="pojemnik na zanieczyszczenia z mopów"
                    />
                  </div>
                  <p className="font-light mx-auto text-center max-w-xs md:text-left">
                    Our adaptable dirt collector collects all water drained
                    during wash proces consumed by 135L washing machine to avoid
                    draining issues.
                  </p>
                </div>
                <div>
                  <img
                    src={mop.BG_9}
                    alt="pojemnik na zanieczyszczenia z mopów"
                  />
                </div>
                <p className="md:col-span-2 text-xs font-light">
                  * Available for FX line washers in the following capacities:
                  65 – 80 – 105 – 135 L
                </p>
              </div>
            </article>
            {/** mop machines */}
            <div>
              <PageTitle text="Powszechnie stosowane i dedykowane, przemysłowe urządzenia pralnicze dla firm świadczących usługi sprzątania" />
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
                        product.model.split('-')[0] === 'FX' ||
                        product.model.split('-')[0] === 'PRALMA'
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
