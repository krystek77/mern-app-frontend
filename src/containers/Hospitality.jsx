import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import PageTitle from "../components/PageTitle/PageTitle";
import ContactForm from "../components/ContactForm";
import ContactsData from "../components/ContactsData/ContactsData";
import CompanyData from "../components/CompanyData";
import Footer from "./Footer/Footer";
import AsideLinks from "../components/AsideLinks/AsideLinks";
import { hospitality } from "../images/hospitality";
import { v4 as uuidv4 } from "uuid";
import Divider from "../components/Divider";
import CircleListType from "../components/CircleListType";
import { useScrollIntoView } from "../hooks";

const bgImages = [
  { id: uuidv4(), src: hospitality.BG_8, position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: hospitality.ART_1, position: "object-center" },
  { id: uuidv4(), src: hospitality.ART_2, position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: hospitality.ART_3, position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-bottom" },
];

export default function Hospitality() {
  const { ref } = useScrollIntoView();
  return (
    <div className='pt-16' ref={ref}>
      <Header
        bgGradient='bg-gradient-radial-circle-from-cc-dedicated'
        images={bgImages}
        title='Podążaj za rozwiązaniami pralniczymi jutra, aby świadczyć usługi gościnności na najwyższym poziomie'
      />
      <main className='px-8'>
        <div className='grid xl:grid-cols-1-300 xl:gap-x-6'>
          <div>
            <PageTitle text='Wyposażenie pralni przemysłowej dla hoteli, moteli i pensjonatów ' />
            {/** laundry solution for excellent services.. */}
            <article className='pb-24 mb-8 relative'>
              <header className='mb-4'>
                <div className='relative w-full h-[320px] lg:h-[480px] max-w-5xl mx-auto mb-8'>
                  <div className='absolute top-0 right-0 w-12 h-12 md:w-24 md:h-24 xl:w-48 xl:h-48 bg-white'></div>
                  <div className='absolute top-0 left-0 w-6 h-6 md:w-12 md:h-12 xl:w-24 xl:h-24 bg-accent'></div>
                  <div className='absolute top-6 md:top-12 xl:top-24 left-0 w-6 h-6 md:w-12 md:h-12 xl:w-24 xl:h-24 bg-primary'></div>
                  <div className='absolute top-12 md:top-24 xl:top-48 left-0 w-6 h-6 md:w-12 md:h-12 xl:w-24 xl:h-24 bg-primary-light'></div>
                  <div className='absolute bottom-0 right-6 md:right-12 xl:right-24 w-6 h-6 md:w-12 md:h-12 xl:w-24 xl:h-24 bg-accent-dark'></div>
                  <div className='absolute bottom-6 md:bottom-12 xl:bottom-24 right-0 w-6 h-6 md:w-12 md:h-12 xl:w-24 xl:h-24 bg-accent-light'></div>
                  <div className='absolute bottom-0 right-0 w-6 h-6 md:w-12 md:h-12 xl:w-24 xl:h-24 bg-accent'></div>
                  <img
                    className='object-cover w-full h-full'
                    src={hospitality.BG_1}
                    alt='Wyposażenie pralni przemysłowej dla hoteli, pralnicowirówki, suszarki, prasownice'
                  />
                </div>
                <h3 className='text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center max-w-2xl mx-auto'>
                  ROZWIĄZANIA PRALNICZE JUTRA
                  <span className='text-black-dark'> DLA DOSKONAŁEJ OBSŁUGI GOŚCI</span>
                </h3>
              </header>
              <div className='max-w-3xl mx-auto relative pb-24'>
                <p className='text-black-dark text-base lg:text-lg font-light mb-2 relative z-[1]'>
                  W bardzo konkurencyjnej i trudnej branży hotelarskiej istnieje szeroka gama oferowanych usług: obsługa
                  restauracyjna, pokoje i zakwaterowanie w hotelu, recepcja... a wszystkie składają się z rozbudowanej
                  listy aspektów, które decydują o zadowoleniu gościa.
                </p>
                <p className='text-black-dark text-base lg:text-lg font-light mb-2 relative z-[1]'>
                  <b>Hotelowe usługi pralnicze leżą u podstaw tej satysfakcji</b>. Miękka pościel, nienaganne obrusy i
                  sztywne, wyprasowane serwetki, podkreślą doskonałe wrażenia, jakich oczekują Twoi goście podczas
                  pobytu w Twoim hotelu. Rodzaje materiałów z jakich jest wykonane pranie hotelowe jest bardzo różne, w
                  zależności od jego przeznaczenia: bardzo szerokie prześcieradła, z bardzo cienkiej bawełny z dodatkiem
                  satyny, ręczniki i szlafroki z grubego egipskiego, brazylijskiego czy amerykańskiej bawełny, z długimi
                  włóknami, obrusy tkane z bawełny z dodatkiem akrylu... a wszystkie one wymagają innego traktowania,
                  aby zapewnić dłuższą ich żywotność, trwałość i optymalną jakość.
                </p>
              </div>

              <div className='absolute bottom-0 right-0'>
                <div className='absolute top-0 left-0 w-24 h-24 bg-white'></div>
                <img
                  className='w-64 h-64 xl:w-96 xl:h-96'
                  src={hospitality.BG_2}
                  alt='urządzenia pralnicze dla pralni hotelowej'
                />
              </div>
              <div className='absolute bottom-0 left-0 w-12 h-12 bg-primary-light'></div>
              <div className='absolute bottom-12 left-0 w-12 h-12 bg-accent'></div>
              <div className='absolute bottom-0 left-12 w-12 h-12 bg-accent-dark'></div>
            </article>
            <Divider />
            {/** leading innovator in industrial laundry solution */}
            <article className='pb-24 my-8 relative'>
              <header className='mb-4'>
                <div className='relative w-full h-[320px] lg:h-[480px]  max-w-5xl mx-auto mb-8'>
                  <div className='absolute top-0 left-0 w-12 h-12 md:w-24 md:h-24 bg-accent'></div>
                  <div className='absolute bottom-0 left-0 w-12 h-12 md:w-24 md:h-24 bg-white'></div>
                  <div className='absolute bottom-0 left-12 md:left-24 w-12 h-12 md:w-24 md:h-24 bg-white'></div>
                  <img
                    className='object-cover w-full h-full'
                    src={hospitality.BG_4}
                    alt='Wyposażenie pralni przemysłowej dla hoteli, pralnicowirówki, suszarki, prasownice'
                  />
                </div>
                <h3 className='text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center max-w-2xl mx-auto'>
                  <span className='text-black-dark'>WYPOSAŻENIE DLA HOTELI WIODĄCEGO&nbsp;</span>
                  PRODUCENTA PRZEMYSŁOWYCH URZĄDZEŃ PRALNICZYCH
                </h3>
              </header>
              <div className='max-w-3xl mx-auto relative pb-24'>
                <p className='text-black-dark text-base lg:text-lg font-light mb-2 relative z-[1]'>
                  <b> Wybór wyposażenie pralni przemysłowej do prania hotelowego </b>, aby zapewnić najlepszą
                  pielęgnację i jakość Twojego prania,
                  <b> jest wyborem jakości usług</b>, które chcesz świadczyć Twoim gościom. Jeśli chodzi o doskonałą
                  obsługę hotelarską, oferujemy najbardziej zaawansowane rozwiązania rownież do przechowywania pościeli
                  na tym samym, doskonałym poziomie. Własna pralnia przemysłowa w hotelu zapewnia ogromną przewagę w
                  porównaniu z outsourcingiem. Szeroka gama urządzeń pralniczych pozwoli Ci znaleźć rozwiązanie
                  odpowiednie do Twoich potrzeb prania i poziomu świadczenia usług hotelarskich.
                </p>
                <p className='text-black-dark text-base lg:text-lg font-light mb-2 relative z-[1]'>
                  <b>Jesteśmy ekspertami w dziedzinie innowacyjnych rozwiązań pralniczych</b>. Różnorodne funkcje, w
                  które zostały wyposażone urządzenia pralnicze, zostały zastrzeżone oraz opatentowane i stały się
                  później standardem w branży przemysłowych urządzeń pralniczych. Dziś nadal wyznaczamy ten standard z
                  kluczowymi korzyściami i odrębnymi funkcjami, które zapewniają sprzęt z najnowocześniejszymi
                  technologiami, ekologicznymi usługami sprzątania i elastycznymi rozwiązaniami, które spełnią Twoje
                  wszystkie potrzeby związane z praniem w hotelu, pensjonacie czy motelu.
                </p>
                <p className='text-black-dark text-base lg:text-lg font-light mb-2 relative z-[1]'>
                  Jeśli z powodzeniem prowadzisz swój biznes hotelowy i jesteś obecnie na szczycie branży i tam chesz
                  pozostać, nie wahaj się, jesli chodzi o wybór partnera w zakresie rozwiązań pralniczych.
                  <b>Oferujemy najlepsze rozwiązania zapewniające najwyższą wydajność</b>.
                </p>
              </div>
              <div className='absolute bottom-0 left-0'>
                <div className='absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white'></div>
                <img
                  className='w-64 h-64 xl:w-96 xl:h-96'
                  src={hospitality.BG_5}
                  alt='pralnicowirówki i suszarki przemysłowe do prania w hotelu'
                />
              </div>
              <div className='absolute bottom-0 right-0 w-12 h-12 xl:w-24 xl:h-24 bg-accent'></div>
              <div className='absolute bottom-0 right-12 xl:right-24 w-12 h-12 xl:w-24 xl:h-24 bg-accent-light'></div>
              <div className='absolute bottom-0 right-24 xl:right-48 w-12 h-12 xl:w-24 xl:h-24 bg-primary-light'></div>
            </article>
            <Divider />
            {/** primus technology for excellent hospitality service */}
            <article className='pb-24 my-8 relative'>
              <header className='mb-4'>
                <div className='relative w-full h-[160px] max-w-5xl mx-auto mb-8'>
                  <div className='absolute top-0 left-0 w-12 h-12 md:w-24 md:h-24 bg-accent-dark'></div>
                  <div className='absolute bottom-0 left-0 w-12 h-12 md:w-24 md:h-24 bg-white'></div>
                  <div className='absolute bottom-0 left-12 md:left-24 w-12 h-12 md:w-24 md:h-24 bg-white'></div>
                  <img
                    className='object-cover w-full h-full'
                    src={hospitality.BG_7}
                    alt='Wyposażenie pralni przemysłowej dla hoteli, pralnicowirówki, suszarki, prasownice'
                  />
                </div>
                <h3 className='text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center max-w-2xl mx-auto'>
                  <span className='text-black-dark'> TECHNOLOGIE PRALNICZE&nbsp; </span> GWARANTUJĄCE WYSOKĄ JAKOŚĆ
                  PRANIA DLA GOŚCI
                </h3>
              </header>
              <div className='grid lg:grid-cols-2 lg:gap-8 max-w-3xl mx-auto'>
                <div className='self-center'>
                  <h4 className='text-lg uppercase text-black-dark'> Oszczędzanie wody i energii </h4>
                  <h5 className='text-md text-accent-dark'>PRANIE</h5>
                  <ul className='text-sm font-light'>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-accent-dark'
                        src={hospitality.ECO}
                        alt='ekonomiczne przemysłowe urządzenia pralnicze'
                      />
                      <div className='pl-4'>
                        <div className='mb-2'>
                          <b>20%</b> mniejsze zużycie energii
                        </div>
                        <div className='mb-2'>
                          <b>25%</b> mniejsza wilgotność resztkowa
                        </div>
                      </div>
                    </li>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-black-dark'
                        src={hospitality.POWERWASH}
                        alt='ekonomiczne przemysłowe urządzenia pralnicze'
                      />
                      <div className='pl-4'>
                        lepszy rezultat prania przy zużyciu wody mniejszym o <b>30%</b>
                      </div>
                    </li>
                  </ul>
                  <h5 className='text-md text-accent-dark'>SUSZENIE</h5>
                  <ul className='text-sm font-light'>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-accent-dark'
                        src={hospitality.RADAX}
                        alt='radialno-osiowy przepływ powietrza'
                      />
                      <div className='pl-4'>
                        większe wykorzystanie ciepłego powietrza dzięki połączeniu osiowego i radialnego przepływu
                        powietrza
                      </div>
                    </li>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-black-dark'
                        src={hospitality.EVO}
                        alt='radialno-osiowy przepływ powietrza'
                      />
                      <div className='pl-4'>
                        <div className='mb-2'>
                          zwiększona wydajność suszenia dzięki innowacyjnej technologi pompy ciepła
                        </div>
                        <div className='mb-2'>
                          zredukowane zużycie energii elektrycznej o więcej niż <b>65%</b> w procesie suszenia
                        </div>
                        <div className='mb-2'>mniej niż 5kW poboru mocy</div>
                        <div className='mb-2'>
                          zamknięty system obiegu powietrza bez konieczności podłączenia do systemu wentylacji
                        </div>
                      </div>
                    </li>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-accent-dark'
                        src={hospitality.POWERDRY}
                        alt='perforowane przewały suszarki bębnowej'
                      />
                      <div className='pl-4'>
                        skrócony czas suszenia dzięki wymuszonemu przepływowi powietrza przez przewały bębna
                        wewnętrznego. Lepsze wykorzystanie ciepłego powietrza w procesie suszenia
                      </div>
                    </li>
                  </ul>
                  <h4 className='text-lg uppercase text-black-dark'>
                    {" "}
                    Optymalizacja procesu prania dla lepszych rezultatów{" "}
                  </h4>
                  <h5 className='text-md text-accent-dark'>PRANIE</h5>
                  <ul className='text-sm font-light'>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-accent-dark'
                        src={hospitality.CASCADEDRUM_2}
                        alt='pralnicowirówki z technologią cascade drum'
                      />
                      <div className='pl-4'>
                        <div className='mb-2'>lepsze, wyższe odwirowanie wody</div>
                        <div className='mb-2'>ekstrmalnie niski poziom wilgotności po procesie prania</div>
                        <div className='mb-2'>brak kontaktu prania z bębnem</div>
                      </div>
                    </li>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-dark-black'
                        src={hospitality.TRACETECH_2}
                        alt='pralnicowirówki z systemem rejestrowania procesu prania'
                      />
                      <div className='pl-4'>
                        <div className='mb-2'>pełne śledzenie całego procesu prania</div>
                        <div className='mb-2'>rejestrowanie parametrów procesu prania w pamięci</div>
                        <div className='mb-2'>zapewniona zgodność z normami higienicznymi</div>
                      </div>
                    </li>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-accent-dark'
                        src={hospitality.EASESOAP_2}
                        alt='przemysłowe urządzenia pralnicze z pompami plynnych środków piorących'
                      />
                      <div className='pl-4'>gotowa do użycia pomp płynnych środków piorących</div>
                    </li>
                  </ul>
                </div>
                <div className='self-center'>
                  <h5 className='text-md text-accent-dark'>PRASOWANIE</h5>
                  <ul className='text-sm font-light'>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-black-dark'
                        src={hospitality.SENSOSPEED}
                        alt='prasownica z dopasowaniem prędkości do wilgotności prasowania'
                      />
                      <div className='pl-4'>
                        <div className='mb-2'>dopasowanie prędkości prasowania do wilgotności pościeli</div>
                        <div className='mb-2'>no wet linen after ironing</div>
                      </div>
                    </li>
                  </ul>
                  <h4 className='text-lg uppercase text-black-dark'> Optymalizacja wydajności pracy </h4>
                  <h5 className='text-md text-accent-dark'>PRANIE</h5>
                  <ul className='text-sm font-light'>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-accent-dark'
                        src={hospitality.OPTILOAD}
                        alt='pralnicowirówka z systemem ważenia wsadu'
                      />
                      <div className='pl-4'>
                        inteligentny proces poboru wody i środków piorących w zależności od wagi załadunku
                      </div>
                    </li>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-black-dark'
                        src={hospitality.XCONTROL_PLUS}
                        alt='sterownik mikroprocesorowy pralnicowirowki'
                      />
                      <div className='pl-4'>
                        <div className='mb-2'>nieograniczone możliwości programowania</div>
                        <div className='mb-2'>przyjazny użytkownikowi i prosty w ubsłudze</div>
                        <div className='mb-2'>port USB do szybkiego ładowania nowych programów</div>
                      </div>
                    </li>
                    <li className='flex items-center py-2 mb-4'>
                      <img
                        className='w-[140px] h-[52px] rounded-md border border-accent-dark'
                        src={hospitality.XCONTROL_FLEX_PLUS}
                        alt='pralnicowirówka lub suszarka ze sterownikiem dotykowym'
                      />
                      <div className='pl-4'>
                        <div className='mb-2'>99 programów prania</div>
                        <div className='mb-2'>połączenie z chmurą</div>
                        <div className='mb-2'>oprogramowanie i-Trace</div>
                        <div className='mb-2'>7 calowy panel dotykowy</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='absolute bottom-0 left-0 w-12 h-12 bg-accent-dark'></div>
              <div className='absolute bottom-0 right-0 w-12 h-12 md:w-24 md:h-24 bg-accent'></div>
              <div className='absolute bottom-0 right-12 md:right-24 w-12 h-12 md:w-24 md:h-24 bg-primary'></div>
            </article>
            {/** i-Trace */}
            <article className='my-8 relative'>
              <header className='mb-8'>
                <h3 className='text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center max-w-2xl mx-auto'>
                  <span className='text-black-dark'>I-TRACE® - </span>
                  TWÓJ NAJLEPSZY PARTNER DO MONITOROWANIA PROGRAMÓW PRANIA
                </h3>
                <span className='text-center text-sm text-black-dark'>
                  Dostępny wyłącznie ze sterownikiem <b>XControl FLEX Plus</b>
                </span>
              </header>
              <div className='grid lg:grid-cols-2 gap-x-4'>
                <div className='max-w-max mx-auto relative mb-4'>
                  <img src={hospitality.BG_6} alt='system do monitorowania procesu prania przemysłowego' />
                  <img
                    className='absolute -top-2 -left-2 rounded-sm shadow-md'
                    src={hospitality.I_TRACE}
                    alt='i-Trace'
                  />
                </div>
                <div>
                  <p className='mb-4 font-light max-w-lg'>
                    Aplikacja oparta na chmurze zapewnia pełną kontrolę nad Twoją firmą w najprostszy możliwy sposób.
                  </p>
                  <h4 className='mb-6 text-black-dark text-md'>POSIADAJ KONTROLĘ NAD PROCESEM PRANIA</h4>
                  <ul className='list-inside mb-6'>
                    <li className='relative pl-8 mb-2 font-light'>
                      <CircleListType size='8px' top='50%' left='0' />
                      Zapisy i statystyki dla każdego cyklu prania
                    </li>
                    <li className='relative pl-8 mb-2 font-light'>
                      <CircleListType size='8px' top='50%' left='0' />
                      Zaprogramuj urządzenia pralnicze, aby dostosować w nich proces prania do Twoich potrzeb
                    </li>
                  </ul>
                  <h4 className='mb-6 text-black-dark text-md'>KONTROLUJ KAŻDY ELEMENT SWOJEGO BIZNESU</h4>
                  <ul className='list-inside'>
                    <li className='relative pl-8 mb-2 font-light'>
                      <CircleListType size='8px' top='50%' left='0' />
                      Monitoruj wydajność pracy, koszty na kilogram prania i koszty na zmianę
                    </li>
                    <li className='relative pl-8 mb-2 font-light'>
                      <CircleListType size='8px' top='50%' left='0' />
                      Uzyskaj raporty konserwacji, obsługi i wiele więcej.
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            <Divider />
            {/** peace of mind */}
            <article className='pb-24 my-8 relative'>
              <div className='absolute bottom-0 left-0 w-12 h-12 lg:w-24 lg:h-24 bg-accent-dark'></div>
              <div className='absolute bottom-0 right-0 w-12 h-12 bg-accent-dark'></div>
              <div className='absolute bottom-0 right-12 w-12 h-12 bg-accent'></div>
              <header className='mb-8'>
                <h3 className='text-accent-dark uppercase my-4 font-light text-2xl mb-1 text-center max-w-2xl mx-auto'>
                  ZAPEWNIJ SOBIE SPOKÓJ
                  <span className='text-black-dark'>STOSUJĄC NASZE ROZWIĄZANIA PRALNICZE</span>
                </h3>
              </header>
              <div className='lg:columns-2'>
                <p className='mb-4 font-medium text-md'>
                  Wybierając naszą ofertę przemyslowych urządzeń pralniczych i rozwiązań dla nowoczesnej pralni,
                  zyskujesz dostęp do zasobów Alliance Laundry Systems dla wszystkich Twoich rozwiązań pralniczych oraz
                  potrzeb w nadchodzących dniach, miesiącach i latach.
                </p>
                <p className='mb-4 font-light text-md'>
                  Alliance Laundry Systems czyni świat czystszym będąc od lat wiodącym dostawcą rozwiązań pralniczych.
                  Dostarczamy wydajność w praniu komercyjnym za pośrednictwem wielu marek pralniczych, w tym Primus'a,
                  którego <b>Pralma</b> jest autoryzowanym dystrybutorem oraz serwisem na terenie Polski. Tworzenie
                  rozwiązań pralniczych dla Ciebie i Twojego biznesu to nasze jedyne zajęcie.
                </p>
                <p className='mb-4 font-light text-md'>
                  Alliance jest światowym liderem w komercyjnej sprzedaży przemysłowych urządzeń pralniczych,
                  asortymentu produktów, o globalnym zasięg, oraz inwestycji w badania i rozwój. ALS obecnie jest w
                  ponad 140 krajach z zespołem ponad 2900 ludzi. Sprawdź, jakie korzyści czerpiesz dzięki współpracy z
                  nami:
                </p>
                <ul className='list-inside mb-6'>
                  <li className='relative pl-8 mb-2 font-light'>
                    <CircleListType size='8px' top='50%' left='0' />
                    <h4>NOWOCZESNA TECHNOLOGIA</h4>
                    <p>
                      Świat potrzebuje szybszego, łatwiejszego, lepszego prania. W ostatnich latach zainwestowaliśmy
                      mocno w R & D, aby to się stało, kupując najlepszą możliwą technologię. Nasz globalny zespół
                      naukowców, zajmujących się praniem, inżynierów i projektantów, jest oddany w dążeniu do celu
                      tworzenia innowacyjnych rozwiązań pralniczych.
                    </p>
                  </li>
                  <li className='relative pl-8 mb-2 font-light'>
                    <CircleListType size='8px' top='50%' left='0' />
                    <h4>SILNIEJSZA SIEĆ</h4>
                    <p>
                      Nigdy nie jesteś zbyt daleko od lepszego prania, dzięki zespołom ekspertów w 14 strategicznych
                      lokalizacjach na całym świecie i ponad 1200 specjalistycznych pralni komercyjnych i dystrybutorów.
                      Nieważne gdzie na świecie jesteś, duża pomoc przy dużym praniu jest zawsze w zasięgu ręki.
                    </p>
                  </li>
                </ul>
              </div>
            </article>
            <Divider />
            {/** laundry equipment */}
            <div className='max-w-5xl mx-auto'>
              {/** RX */}
              <div className='mb-8'>
                <div className='flex flex-wrap justify-start items-start mb-4'>
                  <div className='mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl'>
                    <span className='text-lg'>RX</span>
                  </div>
                  <div className='flex flex-wrap justify-start items-center'>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      RX80
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      RX105
                    </Link>
                  </div>
                </div>
                <div className='grid lg:grid-cols-2 auto-rows-max gap-4'>
                  <div className='max-w-max mx-auto mb-4'>
                    <img
                      className='w-[238px] h-[231px]'
                      src={hospitality.RX180}
                      alt='pralnicowirówka sztywnomocowana normalnoobrotowa lub pralnicowirówka szybkoobrotowa'
                    />
                  </div>
                  <div>
                    <h3 className='text-left'>Cechy serii RX</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' /> <b>XControl®</b> - easy to use microprocessor{" "}
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' /> Stainless steel top panel & Anthracite grey
                        front and side panels{" "}
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' /> Stainless steel <b>Cascade™</b> drum and tub{" "}
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' /> Patented Soap Hopper{" "}
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' /> Large drain valve (Ø 76 mm){" "}
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' /> Easy access to all vital parts from the front{" "}
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' /> Large door opening for easy loading & unloading{" "}
                      </li>
                    </ul>
                    <div className='flex justify-start items-center'>
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.ELECTRICAL_ICON}
                        alt='podgrzew elektryczny pralnicowirówki'
                      />
                      <img
                        className='w-[22px] h-[22px]'
                        src={hospitality.STEAM_ICON}
                        alt='podgrzew parowy pralnicowirówki'
                      />
                    </div>
                    <Link
                      to='/'
                      className='block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 cursor-pointer hover:bg-accent-light transition-all duration-150'>
                      poznaj serię RX
                    </Link>
                  </div>
                </div>
              </div>
              {/** FX */}
              <div className='mb-8 bg-slate-100 -mx-8 px-8 py-8'>
                <div className='flex flex-wrap justify-start items-start mb-4'>
                  <div className='mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl'>
                    <span className='text-lg'>FX</span>
                  </div>
                  <div className='flex flex-wrap justify-start items-center'>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      FX65
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      FX80
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1  cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      FX105
                    </Link>
                  </div>
                </div>
                <div className='grid lg:grid-cols-2 auto-rows-max gap-4'>
                  <div className='max-w-max mx-auto mb-4'>
                    <img
                      className='w-[238px] h-[254px]'
                      src={hospitality.FX180}
                      alt='pralnicowirówka wolnostojąca wysokoobrotowa'
                    />
                  </div>
                  <div>
                    <h3 className='text-left'>Cechy serii RX</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        <b>XControl FLEX Plus</b> – multilanguage fully programmable touch screen*
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        Stainless steel top panel & Anthracite grey front and side panels
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        Stainless steel <b>Cascade™</b> drum and tub
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        Patented Soap Hopper
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        Large drain valve (Ø 76mm)
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        Easy access to all vital parts from the front
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        Large door opening for easy loading & unloading
                      </li>
                    </ul>
                    <div className='flex justify-start items-center mb-2'>
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.ELECTRICAL_ICON}
                        alt='podgrzew elektryczny pralnicowirówki'
                      />
                      <img
                        className='w-[22px] h-[22px]'
                        src={hospitality.STEAM_ICON}
                        alt='podgrzew parowy pralnicowirówki'
                      />
                    </div>
                    <Link
                      to='/'
                      className='block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 cursor-pointer hover:bg-accent-light transition-all duration-150'>
                      poznaj serię FX
                    </Link>
                  </div>
                </div>
              </div>
              {/** FX450 */}
              <div className='mb-8'>
                <div className='flex flex-wrap justify-start items-start mb-4'>
                  <div className='flex justify-start items-center'>
                    <div className='mr-2 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl'>
                      <span className='text-lg'>FX</span>
                    </div>
                    <div className='mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl'>
                      <span className='text-lg'>FS</span>
                    </div>
                  </div>
                  <div className='flex flex-wrap justify-start items-center'>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      FX350
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      FS800
                    </Link>
                  </div>
                </div>
                <div className='grid lg:grid-cols-2 auto-rows-max gap-4'>
                  <div className='max-w-max mx-auto mb-4'>
                    <img
                      className='w-[238px] h-[294px]'
                      src={hospitality.FX450}
                      alt='pralnicowirówka wolnostojąca wysokoobrotowa'
                    />
                  </div>
                  <div>
                    <h3 className='text-left'>Cechy serii FX</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        wolnostojące wysokoobrotowe pralnicowirówki
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        nierdzewny bęben wewnętrzny i zewnętrzny
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        <b>XControl FLEX Plus</b> - wielojęzyczny, w pełni programowalny sterownik z ekranem dotykowym
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        wysokowydajne zawory zasilające
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />2 zawory spustowe o dużej średnicy - 76 mm
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        bęben wewnętrzny z technologią <b>Cascade™</b> drum
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        listwa ochronna
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        duża średnica otworu wsadowego dla łatwego załadunku i wyładunku
                      </li>
                    </ul>
                    <h3 className='text-left'>Cechy serii FS</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        wolnostojące wysokoobrotowe pralnicowirówki
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        nierdzewny bęben wewnętrzny i zewnętrzny
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        <b>XControl FLEX Plus</b> - wielojęzyczny, w pełni programowalny sterownik z ekranem dotykowym
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        wysokowydajne zawory zasilające
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />2 zawory spustowe o dużej średnicy - 103 mm
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        PowerWash - perforowan przewały
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        moduł podłączenia do płynnych środków piorących
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        łatwy dostęp do wszytskich podzespołów
                      </li>
                    </ul>
                    <div className='flex justify-start items-center'>
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.ELECTRICAL_ICON}
                        alt='podgrzew elektryczny pralnicowirówki'
                      />
                      <img
                        className='w-[22px] h-[22px]'
                        src={hospitality.STEAM_ICON}
                        alt='podgrzew parowy pralnicowirówki'
                      />
                    </div>
                    <Link
                      to='/'
                      className='block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 cursor-pointer hover:bg-accent-light transition-all duration-150'>
                      poznaj serię FX / FS
                    </Link>
                  </div>
                </div>
              </div>
              {/** T */}
              <div className='mb-8 bg-slate-100 -mx-8 px-8 py-8'>
                <div className='flex flex-wrap justify-start items-start mb-4'>
                  <div className='mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl'>
                    <span className='text-lg'>T</span>
                  </div>
                  <div className='flex flex-wrap justify-start items-center'>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      T-9
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      T-11
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1  cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      T-13
                    </Link>
                  </div>
                </div>
                <div className='grid lg:grid-cols-2 auto-rows-max gap-4'>
                  <div className='max-w-max mx-auto mb-4'>
                    <img className='w-[238px] h-[254px]' src={hospitality.T9} alt='suszarka bębnowa serii T' />
                  </div>
                  <div>
                    <h3 className='text-left'>Cechy serii T9 - T16</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        RADAX - połączenie osiowego i radilanego przepływu powietrz
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        łatwy w obsłudze sterownik temperaturowo - czssowy TC
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        duży otwór wsadowy dla łatwego załadunku i rozładunku prania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        dostępna pompa ciepła
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        krótki cykl suszenia
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        ekonomiczny proces
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        dostępna rewersja i pomiar wilgotności
                      </li>
                    </ul>
                    <h3 className='text-left'>Cechy T24 i T35</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        radialny przepływ powietrza
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        łatwy w obsłudze sterownik temperaturowo - czssowy TC
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        duży otwór wsadowy dla łatwego załadunku i rozładunku prania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        krótki cykl suszenia
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        ekonomiczny proces
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        dostępna rewersja i pomiar wilgotności
                      </li>
                    </ul>
                    <div className='flex justify-start items-center mb-2'>
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.ELECTRICAL_ICON}
                        alt='suszarki bębnowe o podgrzewie elektrycznym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.STEAM_ICON}
                        alt='suszarki bębnowe o podgrzewie parowym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.GAS_ICON}
                        alt='suszarki bębnowe o podgrzewie gazowym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.HEATPOMP_ICON}
                        alt='suszarki bębnowe z pompą ciepła'
                      />
                    </div>
                    <Link
                      to='/'
                      className='block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 cursor-pointer hover:bg-accent-light transition-all duration-150'>
                      poznaj serię T
                    </Link>
                  </div>
                </div>
              </div>
              {/** DX 55 77 90 */}
              <div className='mb-8'>
                <div className='flex flex-wrap justify-start items-start mb-4'>
                  <div className='mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl'>
                    <span className='text-lg'>DX</span>
                  </div>
                  <div className='flex flex-wrap justify-start items-center'>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      DX-55
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      DX-70
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      DX-90
                    </Link>
                  </div>
                </div>
                <div className='grid lg:grid-cols-2 auto-rows-max gap-4'>
                  <div className='max-w-max mx-auto mb-4'>
                    <img className='w-[238px] h-[321px]' src={hospitality.DX55} alt='suszarki bębnowe serii DX' />
                  </div>
                  <div>
                    <h3 className='text-left'>Cechy DX-55</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        radialny przepływ powietrza
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        sterownik mikroprocesorowy Full OPL
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        rewersyjne obroty bębna w standardzie
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        samoczyszczący się filtr pruszu
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        wstępne podgrzewanie powietrza wlotowego
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        szeroko otwierane drzwi załadunkowe o dużej średnicy dla łatwego załadunku i rozładunku
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        podgrzew <b>elektryczny, parowy bądź gazowy</b>
                      </li>
                    </ul>
                    <div className='flex justify-start items-center'>
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.ELECTRICAL_ICON}
                        alt='suszarka bębnowa o podgrzewie elektrycznym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.STEAM_ICON}
                        alt='suszarka bębnowa o podgrzewie parowym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.GAS_ICON}
                        alt='suszarka bębnowa o podgrzewie gazowym'
                      />
                    </div>
                    <h3 className='text-left'>Cechy DX-70 i DX-90</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        radialny przepływ powietrza
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        sterownik mikroprocesorowy Full OPL
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        rewersyjne obroty bębna w standardzie
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        samoczyszczący się filtr pruszu
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        wstępne podgrzewanie powietrza wlotowego
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        szeroko otwierane drzwi załadunkowe o dużej średnicy dla łatwego załadunku i rozładunku
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        podgrzew <b>parowy bądź gazowy</b>
                      </li>
                    </ul>
                    <div className='flex justify-start items-center'>
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.STEAM_ICON}
                        alt='suszarka bębnowa o podgrzewie parowym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.GAS_ICON}
                        alt='suszarka bębnowa o podgrzewie gazowym'
                      />
                    </div>
                    <Link
                      to='/'
                      className='block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 cursor-pointer hover:bg-accent-light transition-all duration-150'>
                      poznaj serię DX
                    </Link>
                  </div>
                </div>
              </div>
              {/** I33 */}
              <div className='mb-8 bg-slate-100 -mx-8 px-8 py-8'>
                <div className='flex flex-wrap justify-start items-start mb-4'>
                  <div className='mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl'>
                    <span className='text-lg'>I33</span>
                  </div>
                  <div className='flex flex-wrap justify-start items-center'>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      I33-160
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      I33-200
                    </Link>
                  </div>
                </div>
                <div className='grid lg:grid-cols-2 auto-rows-max gap-4'>
                  <div className='max-w-max mx-auto mb-4'>
                    <img
                      className='w-[317px] h-[173px]'
                      src={hospitality.I33}
                      alt='prasownica, prasowalnica, magiel walcowy'
                    />
                  </div>
                  <div>
                    <h3 className='text-left'>Cechy serii I33</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        indykacja temperatury i prędkości prasowania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        napęd z przemiennikiem częstotliwości
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        przednie wywiezienie prasowania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        oszczędność miejsca, możliwość ustawienia przy ścianie
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        automatyczny system chłodzenia pasów - dłuższa żywotność pasów prasujących
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        łatwy w obsłudze sterownik mikroprocesorowy
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        opatentowany system napędu bezpośredniego - bezobsługowy
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        opatentowany system odprowadzania wilgoci z procesu prasowania
                      </li>
                    </ul>
                    <div className='flex justify-start items-center mb-2'>
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.ELECTRICAL_ICON}
                        alt='prasownice, prasowalnice, magle o podgrzewie elektrycznym'
                      />
                      <img
                        className='w-[22px] h-[22px]'
                        src={hospitality.GAS_ICON}
                        alt='prasownice, prasowalnice, magle o podgrzewie gazowym'
                      />
                    </div>
                    <Link
                      to='/'
                      className='block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 cursor-pointer hover:bg-accent-light transition-all duration-150'>
                      poznaj serię I33
                    </Link>
                  </div>
                </div>
              </div>
              {/** I50 */}
              <div className='mb-8'>
                <div className='flex flex-wrap justify-start items-start mb-4'>
                  <div className='mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl'>
                    <span className='text-lg'>I50</span>
                  </div>
                  <div className='flex flex-wrap justify-start items-center'>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      I50-200
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      I50-250
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      I50-320
                    </Link>
                  </div>
                </div>
                <div className='grid lg:grid-cols-2 auto-rows-max gap-4'>
                  <div className='max-w-max mx-auto mb-4'>
                    <img
                      className='w-[328px] h-[183px]'
                      src={hospitality.I50}
                      alt='prasownice, prasowalnice, magle walcowe'
                    />
                  </div>
                  <div>
                    <h3 className='text-left'>Cechy I50</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        szeroki kąt opasania prania - ponad 300 stopni
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        zabezpieczenie palców i wyłącznik awaryjny
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        20 fabrycznych programów prasowania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        sterownik mikroprocesorowy XControl FLEX Plus - w pełni programowalny
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        indykacja temperatury prasowania i prędkości prasowania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        łatwy w czyszczeniu filtr pruszu i prostym dostępem
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        dostępne tylne wywiezienie prasowania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        napęd z przemiennikiem częstotliwości
                      </li>
                    </ul>
                    <div className='flex justify-start items-center'>
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.ELECTRICAL_ICON}
                        alt='prasownice, prasowalnice, magle o podgrzewie elektrycznym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.STEAM_ICON}
                        alt='prasownice, prasowalnice, magle o podgrzewie parowym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.GAS_ICON}
                        alt='prasownice, prasowalnice, magle o podgrzewie gazowym'
                      />
                    </div>
                    <Link
                      to='/'
                      className='block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 cursor-pointer hover:bg-accent-light transition-all duration-150'>
                      poznaj serię I50
                    </Link>
                  </div>
                </div>
              </div>
              {/** IR_IF */}
              <div className='mb-8 bg-slate-100 -mx-8 px-8 py-8'>
                <div className='flex flex-wrap justify-start items-start mb-4'>
                  <div className='mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl'>
                    <span className='text-lg'>IR/IF</span>
                  </div>
                  <div className='flex flex-wrap justify-start items-center'>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      IR/IF50-200
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      IR/IF50-250
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      IR/IF50-320
                    </Link>
                  </div>
                </div>
                <div className='grid lg:grid-cols-2 auto-rows-max gap-4'>
                  <div className='max-w-max mx-auto mb-4'>
                    <img
                      className='w-[328px] h-[183px]'
                      src={hospitality.IR_IF}
                      alt='prasownice, prasowalnice, magle walcowe'
                    />
                  </div>
                  <div>
                    <h3 className='text-left'>Cechy IF/IR</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        intuicyjny w obsłudze sterownik mikroprocesorowy z 20 programami fabrycznymi
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        indykacja temperatury prasowania i prędkości prasowania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        możliwe tylne wywiezienie prania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        napęd z przemiennikiem częstotliwości
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        łatwy dostęp do filtra pruszu
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        konfiguracja fałd składania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        wbudowana składarka wzdłużna dla serii IF
                      </li>
                    </ul>
                    <div className='flex justify-start items-center'>
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.ELECTRICAL_ICON}
                        alt='prasownice, prasowalnice, magle o podgrzewie elektrycznym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.STEAM_ICON}
                        alt='prasownice, prasowalnice, magle o podgrzewie parowym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.GAS_ICON}
                        alt='prasownice, prasowalnice, magle o podgrzewie gazowym'
                      />
                    </div>
                    <Link
                      to='/'
                      className='block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 cursor-pointer hover:bg-accent-light transition-all duration-150'>
                      poznaj serię I50
                    </Link>
                  </div>
                </div>
              </div>
              {/** IFF */}
              <div className='mb-8'>
                <div className='flex flex-wrap justify-start items-start mb-4'>
                  <div className='mr-4 flex justify-center items-center bg-primary border border-primary-dark rounded-md text-white font-semibold w-16 h-16 shadow-xl'>
                    <span className='text-lg'>IFF</span>
                  </div>
                  <div className='flex flex-wrap justify-start items-center'>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      IFF50-200
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      IFF50-250
                    </Link>
                    <Link
                      to='/'
                      className='block bg-slate-900 text-white text-sm font-medium px-2 py-1 rounded mr-1 cursor-pointer hover:bg-slate-500 hover:text-slate-900 transition-all duration-150'>
                      IFF50-320
                    </Link>
                  </div>
                </div>
                <div className='grid lg:grid-cols-2 auto-rows-max gap-4'>
                  <div className='max-w-max mx-auto mb-4'>
                    <img
                      className='w-[328px] h-[183px]'
                      src={hospitality.IFF}
                      alt='prasownice, prasowalnice, magle walcowe z wbudowaną składarką wzdłużną i wprowadzarką'
                    />
                  </div>
                  <div>
                    <h3 className='text-left'>Cechy IFF</h3>
                    <ul className='list-inside mb-4'>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        zintegrowana wprowadzarka i składarka wzdłużna
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        intuicyjny w obsłudze sterownik mikroprocesorowy z 20 fabrycznymi programami prasowania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        możliwe tylne wywiezienie prania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        napęd z przemiennikiem częstotliwości
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        łatwy dostęp do filtra pruszu
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        konfiguracja fałd składania
                      </li>
                      <li className='pl-8 relative font-light text-sm mb-1'>
                        {" "}
                        <CircleListType size='8px' top='50%' left='0' />
                        dostępna składark poprzeczna i sztaplarka
                      </li>
                    </ul>
                    <div className='flex justify-start items-center'>
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.ELECTRICAL_ICON}
                        alt='prasownice, prasowalnice, magle o podgrzewie elektrycznym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.STEAM_ICON}
                        alt='prasownice, prasowalnice, magle o podgrzewie parowym'
                      />
                      <img
                        className='w-[22px] h-[22px] mr-1'
                        src={hospitality.GAS_ICON}
                        alt='prasownice, prasowalnice, magle o podgrzewie gazowym'
                      />
                    </div>
                    <Link
                      to='/'
                      className='block max-w-max ml-auto bg-accent text-black-dark text-sm font-medium border border-accent-dark px-2 py-1 rounded mr-1 cursor-pointer hover:bg-accent-light transition-all duration-150'>
                      poznaj serię IFF
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <article className='my-8 relative pb-24'>
              <aside className='flex flex-nowrap overflow-hidden -mx-8 md:mx-auto mb-8'>
                <div className='relative flex-shrink-0'>
                  <img
                    className='relative -left-1/3 md:left-0 '
                    src={hospitality.BG_9a}
                    alt='właściciel hotelu, który wyposażył pralnię hotelową w nasze urządzenia'
                  />
                </div>
                <div className='relative flex-shrink-0'>
                  <div className='hidden md:block md:absolute w-24 h-24 bottom-0 left-0 bg-accent-dark opacity-60 z-[1]'></div>
                  <div className='hidden md:block md:absolute w-24 h-24 bottom-24 -left-24 bg-accent opacity-60 z-[1]'></div>
                  <img
                    className='relative -left-1/3 md:left-0'
                    src={hospitality.BG_9b}
                    alt='właściciel hotelu, który wyposażył pralnię hotelową w nasze urządzenia'
                  />
                </div>
                <img
                  className='relative -left-1/3 md:left-0'
                  src={hospitality.BG_9c}
                  alt='właściciel hotelu, który wyposażył pralnię hotelową w nasze urządzenia'
                />
              </aside>
              <div className='grid gap-x-4 lg:grid-cols-2'>
                <div>
                  <h3 className='text-black-dark uppercase my-4 font-medium italic text-base mb-1 text-center max-w-xl mx-auto'>
                    &quot;Nasze maszyny są <b>łatwe w obsłudze</b> i <b>cicho pracują</b>.&quot;
                  </h3>
                  <p className='font-light text-md my-8 max-w-lg mx-auto text-center'>
                    „Jestem bardzo zadowolony z nowej pralki Primus- wyciągi i suszarki bębnowe, które kupiliśmy
                    Styczeń. Maszyny są łatwe w obsłudze, ciche działanie i łatwe w utrzymaniu. Dają wyjątkową wydajność
                    prania i spełniają swoje zadanie w szybki i skuteczny sposób. Od kupna własnego Sprzęt do prania
                    Primus wydajemy znacznie mniej na robienie prania. Jesteśmy przekonani, że nasz maszyny oferują
                    doskonały stosunek jakości do ceny, ponieważ ich niezawodność i oczekiwaną trwałość.”
                  </p>
                  <h3 className='text-black-dark uppercase my-8 font-medium italic text-base mb-1 text-center max-w-xl mx-auto'>
                    &quot;Gdybym miała kupić nowe maszyny, zdecydowanie wybrałabym urządzenia pralnicze marki
                    Primus.&quot;
                  </h3>
                  <p className='font-light text-md my-8 max-w-lg mx-auto text-center'>
                    Nie bez powodu jesteśmy lojalnymi klientami Primusa już od ponad 17 lat. My są bardzo zadowoleni z
                    usług oferowanych przez Primus i wyjątkowej jakości maszyny. Nasza najstarsza maszyna została
                    zakupiona w 1999 roku i nadal działa bez zarzutu. W zeszłym roku kupiliśmy nowy i przekracza nasze
                    oczekiwania. Jestem również bardzo zadowolony z Customer One program. Technicy znają maszyny od
                    podszewki, zawsze są dobrze przygotowani i interweniują w ciągu dwóch dni roboczych. Gdybym miał
                    kupić nową maszynę, zrobiłbym to zdecydowanie wybierz Primus ponownie.
                  </p>
                </div>
                <div>
                  <h3 className='text-black-dark uppercase my-4 font-medium italic text-base mb-1 text-center max-w-xl mx-auto'>
                    &quot;Wiemy, że na urządzeniach pralniczych <b>marki Primus</b> i firmie Primus możemy
                    polegać.&quot;
                  </h3>
                  <p className='font-light text-md my-8 max-w-lg mx-auto text-center'>
                    „Kiedy musieliśmy kupić nowe pranie maszynie kilka lat temu wyszedł Primus najlepszy stosunek
                    jakości do ceny. Ponieważ przetwarzamy duże ilości prania na a na co dzień potrzebowaliśmy
                    niezawodnego i solidnego pralkowirówka. Nasza pralka działa dzień i noc, a my nie napotkał żadnych
                    poważnych problemów. Nadal jesteśmy zadowoleni z naszego wyboru dla Primus, który wtedy zrobiliśmy.
                    Nasza maszyna robi to, co zostało obiecane i wiemy że zawsze możemy polegać na Primusie.”
                  </p>
                </div>
              </div>
              <div className='absolute w-24 h-24 bottom-0 right-0 bg-accent-dark'></div>
              <div className='absolute w-12 h-12 bottom-0 right-24 bg-accent'></div>
            </article>
          </div>
          <AsideLinks />
        </div>
      </main>
      <section id='contactForm' className='py-12 bg-slate-200'>
        <div className='pl-4'>
          <PageTitle text='Formularz kontaktowy' />
        </div>
        <ContactForm />
        <ContactsData />
        <CompanyData />
      </section>
      <Footer />
    </div>
  );
}
