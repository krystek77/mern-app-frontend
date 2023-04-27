import React from "react";
import AsideLinks from "../components/AsideLinks/AsideLinks";
import PageTitle from "../components/PageTitle/PageTitle";
import Header from "../components/Header/Header";
import Footer from "./Footer/Footer";
import { v4 as uuidv4 } from "uuid";
import { useScrollIntoView } from "../hooks";
import CircleListType from "../components/CircleListType";
import ContactForm from "../components/ContactForm";
import CompanyData from "../components/CompanyData";
import ContactsData from "../components/ContactsData/ContactsData";
import BG_LAYOUT_BARRIER from "../images/barrier/bg_layout.webp";
import ChoiceIcon from "../images/barrier/icons/choice.webp";
import QualityIcon from "../images/barrier/icons/quality.webp";
import EnvironmentIcon from "../images/barrier/icons/env.webp";
import ErgonomicsIcon from "../images/barrier/icons/ergonomics.webp";
import SimplicityIcon from "../images/barrier/icons/simplicity.webp";
import TraceabilityIcon from "../images/barrier/icons/traceability.webp";
import ContaminationIcon from "../images/barrier/icons/contamination.webp";
import CollectingIcon from "../images/barrier/icons/collecting.webp";
import TrolleyIcon from "../images/barrier/icons/trolley.webp";
import WashingIcon from "../images/barrier/icons/washing.webp";
import FinishingIcon from "../images/barrier/icons/finishing.webp";
import CleaningIcon from "../images/barrier/icons/cleaning.webp";
import OptiloadLogo from "../images/technicallogos/optiload.webp";
import TraceTechLogo from "../images/technicallogos/tracetech.webp";
import XControlFLEXPlusLogo from "../images/technicallogos/xcontrolflexplus.webp";
import XControlFLEXPlus from "../images/technicallogos/xcflexpluscontrol.webp";
import TraceTechWeb from "../images/barrier/tracetech.webp";
import FXB from "../images/barrier/fxb.webp";
import TRACE_TECH from "../images/technicallogos/tracetech_2.webp";

import BG_1 from "../images/barrier/bg_1.webp";
import BG_2 from "../images/barrier/bg_2.webp";
import BG_3 from "../images/barrier/bg_3.webp";
import BG_4 from "../images/barrier/bg_4.webp";
import BG_5 from "../images/barrier/bg_5.webp";
import BG_6 from "../images/barrier/bg_6.webp";
import BG_7 from "../images/barrier/bg_7.webp";
import BG_8 from "../images/barrier/bg_8.webp";
import BG_9 from "../images/barrier/bg_9.webp";
import PRIMCARE_1 from "../images/barrier/primcare_1.webp";
import PRIMCARE_2 from "../images/barrier/primcare_2.webp";
import PRIMCARE_3 from "../images/barrier/primcare_3.webp";
import FXB_LINK from "../images/barrier/FXB_link.webp";
import BARRIER_LINK_TEMP from "../images/barrier/FXB_link_temp.webp";
import Divider from "../components/Divider";
import { Link } from "react-router-dom";

const bgImages = [
  { id: uuidv4(), src: BG_1, position: "object-center" },
  { id: uuidv4(), src: BG_2, position: "object-center" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: BG_6, position: "object-center" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: BG_4, position: "object-center" },
  { id: uuidv4(), src: "", position: "object-bottom" },
];
const innovations = [
  { id: uuidv4(), icon: QualityIcon, title: "Jakość", content: "Wysokiej jakości komponenty oraz materialy stosowane w procesie produkcji zapewniają długą żywotność i bezpieczną inwestycję", },
  { id: uuidv4(), icon: EnvironmentIcon, title: "środowisko", content: "Nasi konstruktorzy pracują nad tym, aby stale zmniejszać zużycie wody i energii przy zachowaniu wysokiej jakości prania i wydajności. W barierach higieny recykling wody jest opcją. Zaawansowana gospodarka oddpadami jest stosowana w procesie produkcyjnym", },
  { id: uuidv4(), icon: ChoiceIcon, title: "Duży wybór", content: "Różnorodność barier higieny od pralnicowirówek wysokoobrotowych, sztywnomocowanych oraz pralnic z barierą higieny oraz duży zakres załadunków pozwalają dostosować pralnię do Twojego budżetu oraz potrzeb", },
  { id: uuidv4(), icon: ErgonomicsIcon, title: "Ergonomia", content: "Nasze bariery higieny zostały zaprojektowane z myślą u użytkowniku. Charakteryzują się doskonałą ergonomią i duzymia drzwiami załadunkowymi i wyładunkowymi dla wygody rozładunku i załadunku", },
  { id: uuidv4(), icon: SimplicityIcon, title: "Prosta obsługa", content: "Proste w obsłudze sterowanie mikroprocesorowe pozwala operatorowi urządzenia na dopasowanie programów do swoich potrzeb i ułatwia codzienną eksploatację oraz serwis urządzenia", },
  { id: uuidv4(), icon: TraceabilityIcon, title: "Śledzenie procesu prania", content: "Podłączając bariery higieny do systemu śledzenia procesu prania, masz dostępność do statystyk oraz pełną kontrolę nad jakością prania. Wszystkie dane są przechowywane i można je pobrać w celu tworzenia raporów i analiz", },
];
const solutions = [
  { id: uuidv4(), icon: CollectingIcon, title: "Zbieranie i sortowanie", content: "Wstępne sortowania prania wykonywane jest z podziałem na rodzaje prania przez odpowiednio ubrany personel. Osoba sortująca powinna być w masce, odzieży ochronnej i rękawicach ochronnych.", },
  { id: uuidv4(), icon: FinishingIcon, title: "Wykańczanie", content: "Kontakt z czystym praniem powinien mieć tylko personel, który nie ma kontaktu z praniem brudnym, aby uniknąć jego zanieczyszczenia.", },
  { id: uuidv4(), icon: WashingIcon, title: "Pranie", content: "Brudne pranie tego samego rodzaju powinno być prane zawsze razem. Proces prania musi być rejestrowany za pomocą systemu do raportowania i anazalizowania przegiego prania. System zarządzania i kontroli Trace-Tech kontroluje: temperaturę, mechanikę prania, czas prania, poziom wody i ilość uzytej chemii, aby zapewnić optymalną jakość i czystość prania.", },
  { id: uuidv4(), icon: CleaningIcon, title: "Magazyn czystej odzieży", content: "Czyste pranie powinno być przechowywane w zamkniętych szafkach, opakwoane w folię. Należy zwracać uwagę, aby czyste pranie nie miało żadnego kontaktu z brudnym.", },
  { id: uuidv4(), icon: TrolleyIcon, title: "Magazyn brudnej odzieży", content: "Czas przechowywania brudnego prania powinnien być jak najkrótszy, nie dłuższy niż 48 godzin. Wózki służące do transportu lub przechowywania prania muszą być czyste przed każdym ich użyciem. Pomieszczenie z brudnym praniem powinno mieć podciśnienie, a wózki myte za pomocą dedykowanych myjek.", },
];

export default function HygieneBarrier() {
  const { ref } = useScrollIntoView();
  return (
    <div className="pt-12" ref={ref}>
      <Header
        bgGradient="bg-gradient-radial-circle-from-cc-dedicated"
        images={bgImages}
        title="Expert w utrzymaniu higieny - skuteczna ochrona przed zakżeniem i bakteriami"
      />
      <main className="pl-8 pr-8 mb-8">
        <PageTitle text="Pralma i Primus oferują Ci najlepszą ochronę przed przensoszeniem infekcji oraz krzyżowymi zanieczyszczeniami w Twojej pralni" />

        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <div className="">
            <div className="relative bg-white p-6">
              <div className="absolute -right-1 -top-16 hidden xl:block">
                <img
                  src={ContaminationIcon}
                  alt="Pralnia z barierą higieny"
                  className=""
                />
              </div>
              <article className="mb-8 max-w-5xl mx-auto">
                <header>
                  <h3 className="text-accent-dark uppercase my-2 text-center font-light text-2xl">
                    Badania pokazują, że pranie jest głównym źródłem
                    przenoszenia zakażeń i superbakterii
                  </h3>
                </header>
                <ul className="list-inside font-light">
                  <li className="relative pl-6 mb-2">
                    <CircleListType size="8px" top="50%" left="0px" />
                    od 10% do 15% zakażeń szpitalnych wynika z niezadowalającej
                    czystości bielizny. Dodatkowo wydłużają one pobyt pacjenta w
                    szpitalu średnio o od 4-ech do 5 dni dłużej, a w skrajnych
                    przypadkach prowadząc do smierci pacjenta.
                  </li>
                  <li className="relative pl-6 mb-2">
                    <CircleListType size="8px" top="50%" left="0px" />
                    osoby starsze i dzieci są bardziej narażone na infekcje z
                    powodu ich słabszego układu odpornościowego.
                  </li>
                  <li className="relative pl-6 mb-2">
                    <CircleListType size="8px" top="50%" left="0px" />
                    szpitale i zakłady opieki leczniczej muszą mieć więc 100%
                    pewności, że pranie jest wolne od niektórych bakterii. m.in.
                    Salmonelli, Listerii, itp. i pełną kontrole nad procesem
                    prania
                  </li>
                </ul>
              </article>

              <article className="mb-8 max-w-5xl mx-auto">
                <header>
                  <h3 className="text-accent-dark uppercase my-2 text-center font-light text-2xl">
                    Zatrzymaj krzyżowe zanieczyszczenia już teraz
                  </h3>
                </header>
                <div className="">
                  <p className="font-light ">
                    Ochrona przed infekcjami, transferem zakażeń oraz bakteriami
                    to tak ważny temat, że Primus nawiązał współpracę z dwoma
                    instytutami mikrobiologicznymi do testowania w rzeczywistych
                    warunkach rekontaminacji zagrożenia w pralni. Testy
                    przeprowadzono w pralni z użyciem pralek barierowych marki
                    Primus fizycznie odzielających pranie brudne od czystego.
                    Zakłady te są certyfikowane przez zewnętrzną organizację,
                    aby były zgodne z wytycznymi <b>RABC</b>.
                  </p>
                </div>
              </article>
            </div>
            <article className="my-8 max-w-5xl mx-auto">
              <header className="">
                <h3 className="text-accent-dark uppercase my-2 font-light text-2xl text-center">
                  Solidne podstawy dla Twojej pralni z "barierą higieny"
                </h3>
              </header>
              <div className="">
                <div className="font-light">
                  <p className="text-black-dark font-light my-4 italic">
                    Aby spełnić potrzeby maksymalnej ochrony przed bakteriami, w
                    oparciu o uzyskane wynikia badań z instytutów
                    mikrobilogicznych, zaprojektowaliśmy pełną gamę urządzeń
                    pralniczych z "barierą higieny", które upraszczają i
                    ułatwiają organziację pralni z "barierą higieny", oferując
                    najlepszą ochronę pracownikom, pacjentom i najlepsze
                    zapobieganie rozprzestrzenianiu się mikroorganizmów i
                    superbakterii.
                  </p>
                  <p className="text-black-dark uppercase font-semibold mt-2 mb-4">
                    Stosując urządzenia pralncze z "barierą higieny", operacje w
                    Twojej pralni są zgodne z najlepszymi praktykami zachowania
                    higieny i czystości prania, do minimum ograniczając ryzyko
                    zakaźeń.
                  </p>
                  <p className="mb-4">
                    Mając na uwadze zasady RABC, nasze urządzenia z "barierą
                    higieny" zapewniają:
                  </p>
                  <ul className="list-inside font-light">
                    <li className="relative pl-6 mb-2">
                      <CircleListType size="8px" top="50%" left="0px" />
                      fizyczne odzielenie prania brudnego od czystego
                    </li>
                    <li className="relative pl-6 mb-2">
                      <CircleListType size="8px" top="50%" left="0px" />
                      brak ryzyka kontaktu lub wymieszania prania brudnego z
                      czystym
                    </li>
                    <li className="relative pl-6 mb-2">
                      <CircleListType size="8px" top="50%" left="0px" />
                      opcjonalnie pomieszczenia mogą mieć rożne ciśnienia, tak
                      aby w pomieszczeniu z czystym praniem panowało
                      nadciśnienie, a w pomieszczeniu z brudnym podcisnienie.
                      Dzięki temu zaobiegniesz przedostawaniu się powietrza, ze
                      strony brudnej na stronę prania czystego.
                    </li>
                    <li className="relative pl-6 mb-2">
                      <CircleListType size="8px" top="50%" left="0px" />
                      urządzenia pralnicze z "barierą higieny" posiadają
                      specjalne programy prania do jego odkażania i dezynfekcji
                    </li>
                    <li className="relative pl-6 mb-2">
                      <CircleListType size="8px" top="50%" left="0px" />
                      zapewniają najlepszą ochronę przed rozprzestrzenianiem się
                      infekcji
                    </li>
                    <li className="relative pl-6 mb-2">
                      <CircleListType size="8px" top="50%" left="0px" />
                      gwarantują spełnienie przyszłych przepisów z zakresu
                      zachowania higieny i maksymalnej czystości prania
                    </li>
                    <li className="relative pl-6 mb-2">
                      <CircleListType size="8px" top="50%" left="0px" />
                      dostarczają systemu do zarządzania, śledzenia i analizy
                      całego procesu prania - <b>Trace-Tech</b>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            <div className="bg-white p-6">
              <article className="grid sm:grid-cols-2 auto-rows-max gap-4 max-w-5xl mx-auto">
                <aside className="sm:col-span-2 relative h-[320px] md:h-[480px] w-full bg-white">
                  <div className="bg absolute inset-x-0 inset-y-0 py-8">
                    <img
                      src={BG_LAYOUT_BARRIER}
                      alt="przemysłowa pralnia z barierą higieny"
                      className="object-cover w-full h-full object-center"
                    />
                  </div>
                </aside>
                <h3 className="sm:col-span-2 text-accent-dark uppercase my-2 font-light text-2xl text-center">
                  Jesteśmy również innowacyjni, szczególnie w:
                </h3>
                {innovations.map((innovation) => (
                  <div
                    key={innovation.id}
                    className="flex justify-center items-start"
                  >
                    <div className="flex-grow p-4 flex-shrink-0">
                      <img
                        src={innovation.icon}
                        alt={innovation.title}
                        className=""
                      />
                    </div>
                    <div>
                      <h4 className="uppercase text-left text-black-dark font-semibold text-md">
                        {innovation.title}
                      </h4>
                      <p className="font-light">{innovation.content}</p>
                    </div>
                  </div>
                ))}
              </article>
            </div>
            <article className="my-8 max-w-5xl mx-auto">
              <header className="">
                <h3 className="text-accent-dark uppercase my-2 font-light text-2xl text-center">
                  Przepisy prawa i zalecenia
                </h3>
              </header>
              <p className="font-light">
                W normie europejskiej, opisano sposób analizy ryzyka i kontroli
                zakażeń biologicznych - <strong>RABC</strong>, który należy
                zastosować, aby zapewnić odpowiednią jakość mikrobiologiczną
                pranych tkanin. (Dopuszczalna wartość dla czystej pościeli to:
                12CFU / 25cm2). Niniejsza norma może być łatwo zintegrowana z
                globalnym systemnem zarządzania jakością. Norma gwarantuje, że
                pralnia zapewnia pełną ochronę nad skażeniem biologicznym.
              </p>
            </article>
            <article className="my-8 max-w-5xl mx-auto">
              <header className="">
                <h3 className="text-accent-dark uppercase my-8 font-light text-2xl text-center">
                  Czym są europejskie przepisy i normy
                </h3>
              </header>
              <div className="">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 justify-items-center items-center mb-4 py-4">
                  <div className="">
                    <h4 className="text-accent-dark text-base text-left mb-0 uppercase">
                      Opieka zdrowotna
                    </h4>
                    <Divider classes="h-px my-1" />
                    <span className="text-accent">
                      BP G 07-223:2004 REFERENTIAL: LAUNDRY PROCESSED TEXTILES
                    </span>
                    <div>
                      <span className="font-medium text-sm my-2 block">
                        Najlepsza praktyka prania:
                      </span>
                      <ul className="list-inside">
                        <li className="relative pl-8 font-light mb-2">
                          <CircleListType size="8px" top="50%" left="0" />
                          Fizyczne oddzielenie pomieszczeń z brudnym praniem od
                          pomieszczeć z praniem czystym za pomocą urządzeń
                          pralniczych z "barierą higieny" jest zalecaną
                          rekomendacją.
                        </li>
                        <li className="relative pl-8 font-light mb-2">
                          <CircleListType size="8px" top="50%" left="0" />
                          Obowiązuje koncepcja "iść do przodu".
                        </li>
                        <li className="relative pl-8 font-light mb-2">
                          <CircleListType size="8px" top="50%" left="0" />
                          Mycie rąk jest obowiązkowe.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="relative max-w-max">
                    <div className="absolute bg-primary-light w-28 h-28 right-0 bottom-0"></div>
                    <div className="max-w-[360px] h-[230px] rounded-sm overflow-hidden">
                      <img
                        className="object-cover w-full h-full"
                        src={BG_3}
                        alt="Wyposażenie pralni przemysłowej dla szpitali, klinik"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 justify-items-center items-center mb-4 py-4">
                  <div className="">
                    <h4 className="text-accent-dark text-base text-left mb-0 uppercase">
                      Domy opieki
                    </h4>
                    <Divider classes="h-px my-1" />
                    <span className="text-accent">
                      NF X50-058 NORM - SERVICE LEVEL
                    </span>
                    <div>
                      <span className="font-medium text-sm my-2 block">
                        Najlepszy poziom obsługi:
                      </span>
                      <p>
                        Wszystkie usługi świadczone pacjentom powinny być
                        najwyższych standardów w swojej klasie i
                        najbezpieczniejsze dla Nich i domów pomocy społecznej i
                        opieki. Pranie powinno być wykonywane zgodnie z normami
                        unijnymi, tzn., że jeżeli świadczymy usługi opieki to
                        pralnia powinna być wyposażona w bariery higieny.
                      </p>
                    </div>
                  </div>
                  <div className="relative max-w-max">
                    <div className="absolute bg-accent-light w-28 h-28 left-0 bottom-0"></div>
                    <div className="max-w-[360px] h-[230px] rounded-sm overflow-hidden">
                      <img
                        className="object-cover w-full h-full"
                        src={BG_5}
                        alt="Przemysłowe urządzenia pralnicze dla domów pomocy społecznej i domów opieki"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 justify-items-center items-center mb-4 py-4">
                  <div className="">
                    <h4 className="text-accent-dark text-base text-left mb-0 uppercase">
                      Przemysł spożywczy i farmaceutyczny
                    </h4>
                    <Divider classes="h-px my-1" />
                    <span className="text-accent">
                      MANUAL OF ACCREDITATION: GFL - REFERENCE 004
                    </span>
                    <div>
                      <span className="font-medium text-sm my-2 block">
                        Najlepsze standardy branżowe:
                      </span>
                      <p className="mb-4">
                        Przemysł farmaceutyczny oraz spożywczy to wiodące branże
                        z procesami nastawionymi na bezpieczeństwo i jakość.
                        Funkcje prania powinny być zatem zorganizowane w celu
                        obróbki tkanin za pomocą bardzo wymagających procedur,
                        których spełnienie zapewniają pralnicowirówki i pralnice
                        z barierą higieny.
                      </p>
                      <ul className="list-inside">
                        <li className="relative pl-8 font-light mb-2">
                          <CircleListType size="8px" top="50%" left="0" />
                          Odzielenie brudnej i czystej bielizny w czasie
                          transportu.
                        </li>
                        <li className="relative pl-8 font-light mb-2">
                          <CircleListType size="8px" top="50%" left="0" />
                          Pranie jest przedmiotem oceny i analiz.
                        </li>
                        <li className="relative pl-8 font-light mb-2">
                          <CircleListType size="8px" top="50%" left="0" />
                          Pracownicy zostali przeszkoleni z zasad zachowania
                          higieny dotyczących prania.
                        </li>
                        <li className="relative pl-8 font-light mb-2">
                          <CircleListType size="8px" top="50%" left="0" />
                          Regularnie kontrolowany jest proces prania i jego
                          parametry.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="relative max-w-max">
                    <div className="absolute bg-primary-light w-28 h-28 right-0 bottom-0"></div>
                    <div className="max-w-[360px] h-[230px] rounded-sm overflow-hidden">
                      <img
                        className="object-cover w-full h-full object-center"
                        src={BG_7}
                        alt="Urządzenia pralnicze dla przemysłu farmaceutycznego, laboratriów oraz przemysłu spożywczego"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article className="my-8 max-w-5xl mx-auto">
              <header className="">
                <h3 className=" text-accent-dark uppercase mt-8 font-light text-2xl text-center">
                  Pralma oferuje konsultacje wyposażenia pralni z barierą
                  higieny na każdym etapie realizacji inwestycji i
                  funkcjonowania samego procesu prania.
                </h3>
                <span className="text-black-dark uppercase font-medium text-lg text-center block mb-8">
                  Oferujemy kompleksowe rozwiązania dla pralni z barierą higieny
                </span>
              </header>
              <div className="grid sm:grid-cols-2 auto-rows-max gap-4">
                {solutions.map((solution) => (
                  <div
                    key={solution.id}
                    className="flex justify-center items-start"
                  >
                    <div className="flex-grow mr-4 flex-shrink-0 w-14 h-14">
                      <img
                        src={solution.icon}
                        alt={solution.title}
                        className="object-cover w-full h-full object-center"
                      />
                    </div>
                    <div>
                      <h4 className="uppercase text-left text-black-dark font-semibold text-md">
                        {solution.title}
                      </h4>
                      <p className="font-light">{solution.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 auto-rows-max gap-4">
                <div className="sm:col-span-2 flex items-center">
                  <h3 className=" text-accent-dark uppercase my-8 font-light text-2xl text-left">
                    Towarzyszymy Ci w czasie całego projektu
                  </h3>
                  <div className="relative flex-grow h-px bg-slate-500 my-8 hidden sm:ml-8 sm:block">
                    <span className="absolute w-2 h-2 bg-slate-500 left-0 top-1/2 -translate-y-1/2"></span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-light mb-4">
                    Nasz zespół wyspecjalizowanych doradców, doświadczonych
                    konstruktorów i projektantów wyposażenia pralni, pomoże Ci w
                    realziacji Twojego projketu pralni z "barierą higieny",
                    spełniając Twoje specyficzne wymagania i zapewniając:
                  </p>
                  <div className="max-w-[360px] h-[230px] rounded-sm overflow-hidden">
                    <img
                      className="object-cover w-full h-full object-center"
                      src={BG_8}
                      alt="Projekt wyposażenia pralni przemysłowej z barierą higieny"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <ul className="list-inside mb-4">
                    <li className="relative pl-8 my-1">
                      <CircleListType size="8px" top="50%" left="0" />
                      przeprowadzenie audytu Twojej pralni
                    </li>
                    <li className="relative pl-8 my-1">
                      <CircleListType size="8px" top="50%" left="0" />
                      zdefiniowanie potrzeb
                    </li>
                    <li className="relative pl-8 my-1">
                      <CircleListType size="8px" top="50%" left="0" />
                      rysunek rozmieszczenia urządzeń oddający technologiczny
                      proces prania i obiegu bielizny oraz określenie
                      zapotrzebowania na media
                    </li>
                    <li className="relative pl-8 my-1">
                      <CircleListType size="8px" top="50%" left="0" />
                      instalację oraz montaż urządzeń
                    </li>
                    <li className="relative pl-8 my-1">
                      <CircleListType size="8px" top="50%" left="0" />
                      szkolenie obsługi technicznej i urządzeń z prawidłowej ich
                      eksploatacji, serwisowania oraz obsługi
                    </li>
                  </ul>
                  <div>
                    <img
                      src={BG_9}
                      alt="Projektowanie wyposażenia pralni przemysłowej z barierą higieny w oparciu o pralnicowirówki z barierą higieny przelotowe, kątowe pralnicowirówki"
                    />
                  </div>
                </div>
              </div>
            </article>
            <article className="grid grid-cols-1 sm:grid-cols-3 gap-8 place-items-center">
              <header className="sm:col-span-3">
                <h3 className=" text-accent-dark uppercase mt-8 font-light text-2xl text-center">
                  Narzędzia, które dają Ci większą kontrolę nad procesem prania
                </h3>
                <span className="text-black-dark uppercase font-medium text-lg text-center block mb-8">
                  Oferowany system prania zapewnia kompleksowe wyposażenie.
                </span>
              </header>
              <div className="">
                <div className="w-[190px] h-[150px] mb-4 ">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={TraceTechWeb}
                    alt="system śledzenia programu prania - trace-tech"
                  />
                </div>
                <p className="font-light mb-4">
                  Oprogramowanie do zarządzania Trace-tech® zapisuje każdy cykl
                  prania, co pozwala zapewnić zgodność ze standardami
                  higienicznymi. Proces można zapisać i przywołać w razie
                  potrzeby. Parametry są stale kontrolowane i zapisywane w celu
                  uzyskania szczegółowego raportu z procesu prania. Zostaniesz
                  również poinformowany, jeśli maszyna nie może ukończyć
                  wymaganego procesu.
                </p>
                <div className="w-[120px] h-[60px] rounded-sm overflow-hidden mb-4">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={TraceTechLogo}
                    alt="system śledzenia programu prania - trace-tech - logo"
                  />
                </div>
                <p className="font-light">
                  Korzystając zarówno z systemu ważenia wsadu - Optiload® jak i
                  systemu zarządzania i śledzenia procesu prania - Trace-tech®,
                  wykorzystując próbnik wody masz pełną kontrolę nad procesem
                  prania i dezynfekcji.
                </p>
              </div>
              <div className="">
                <div className="mb-4 max-w-[380px] max-h-[380px]">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={FXB}
                    alt="pralnicowirówka wysokoobrotowa z barierą higieny"
                  />
                </div>
                <div className="w-[120px] h-[60px] rounded-sm overflow-hidden mb-4">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={OptiloadLogo}
                    alt="system ważenia wsadu - optiload - logo"
                  />
                </div>
                <p className="font-light mb-4">
                  Podczas ładowania maszyna wyświetla na bieżąco wagę załadunku.
                  Na podstawie wagi pralnicowirówka dostosuje ilość wody oraz
                  zużycie energii zgodnie z nomrami RABC. Dzięki temu masz
                  gwarantowaną wysoką jakość prania, zmniejszone zużycie mediów.
                  Optymalizujesz w ten sposób wydajność i kontrolujesz koszty
                  prania.
                </p>
              </div>
              <div className="">
                <div className="mb-4 w-[160px] h-[95px]">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={XControlFLEXPlus}
                    alt="Sterownik mikroprocesorowy XControl FLEX Plus"
                  />
                </div>
                <p className="font-light mb-4">
                  Sterownik XControl FLEX+® zapewnia pełną swobodę
                  programowania. Dzięki temu masz możliwość optymalziacji
                  procesu prania i adaptacji go do własnych potrzebn w dowolnym
                  czasie. Zapewnia Ci łatwą integrację z nowymi sposobami prania
                  oraz środkami piorącymi.
                </p>
                <div className="w-[120px] h-[60px] rounded-sm overflow-hidden mb-4">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={XControlFLEXPlusLogo}
                    alt="Sterownik mikroprocesorowy XControl FLEX Plus - logo"
                  />
                </div>
                <p className="font-light mb-4">
                  Interfejs użytkownika w sterowniku XControl FLEX+® oferuje
                  nieograniczone możliwości programowania parametrów pracy
                  maszyny i programów prania. Dodatkowo sterownik wyposazony
                  jest w port USB i szybkie ładowanie nowych programów jest
                  możliwe.
                </p>
              </div>
            </article>
            <div className="relative primcare">
              <div className="absolute bottom-4 right-0 max-w-[200px] max-h-[30px]">
                <img
                  className="object-cover w-full h-full object-center"
                  src={TRACE_TECH}
                  alt="system śledzenia procesu prania - tracetech"
                />
              </div>
              <article>
                <header>
                  <h3 className=" text-accent-dark uppercase mt-8 mb-0 font-light text-2xl text-left">
                    Pakiet wstępny - <b>PRIMCARE</b>
                  </h3>
                  <span className="text-black-dark uppercase font-medium text-lg text-left block mb-8">
                    Dla dobrych podstaw praktyk pralniczych
                  </span>
                </header>
                <div className="columns-2 mb-4">
                  <p className="font-light">
                    Popraw jakość prania,i zaoszczędź czas i koszty, dzięki
                    Primcare Entry Pack. Takie rozwiązanie pozwala usprawnić
                    proces prania. Twoi pracownicy będą mogli zaoszczędzić czas,
                    ponieważ proces logistyczny jest bardzo krótki.
                  </p>
                  <p className="font-light">
                    Nigdy więcej zmartwień, że brudne pranie gromadzi się: Twoi
                    pracownicy zawsze mają odpowiednie zapasy casu do
                    dyspozycji. Co więcej, masz możliwość wpływania na cały
                    proces i czerpania korzyści z najniższych kosztów prania.
                  </p>
                </div>
                <div className="max-w-[220px] max-h-[90px]">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={PRIMCARE_1}
                    alt="Wyposażenie pralni przemysłowej na dobry początek"
                  />
                </div>
              </article>
              <article>
                <header>
                  <h3 className=" text-accent-dark uppercase mt-8 mb-0 font-light text-2xl text-left">
                    Pakiet kontroli higieny - <b>PRIMCARE</b>
                  </h3>
                  <span className="text-black-dark uppercase font-medium text-lg text-left block mb-8">
                    Dla całkowitego bezpieczeństwa
                  </span>
                </header>
                <div className="columns-2 mb-4">
                  <p className="font-light">
                    Primcare Hygiene Control zapewnią kontrolę nad procesem
                    prania. To rozwiązanie koncentruje się na zapewnieniu
                    najwyższego bezpieczeństwa pacjentom i personelowi
                    zajmującemu się praniem. Dzięki innowacyjnej barierze
                    higieny
                  </p>
                  <p className="font-light">
                    nie możliwy jest kontakt prania brudnego z czystym,
                    zapewniając w ten sposób wyjątkowo wysoki poziom higieny
                    Twojego prania. Przeszkol swoich pracowników jak osiągnąć
                    jak najwyższą produktywność, wydajność, optymalnie
                    wykorzystując innowacyjne funkcjie urządzeń pralniczych, a
                    wszystko to przy jednoczesnym zachowaniu jakości Twojego
                    prania.
                  </p>
                </div>
                <div className="max-w-[220px] max-h-[90px]">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={PRIMCARE_2}
                    alt="Wyposażenie pralni przemysłowej z barierą higieny na dobry początek"
                  />
                </div>
              </article>
              <article>
                <header>
                  <h3 className=" text-accent-dark uppercase mt-8 mb-0 font-light text-2xl text-left">
                    Pakiet nieograniczonego bezpieczeństwa - <b>PRIMCARE</b>
                  </h3>
                  <span className="text-black-dark uppercase font-medium text-lg text-left block mb-8">
                    Dla nieograniczonej kontroli
                  </span>
                </header>
                <div className="columns-2 mb-4">
                  <p className="font-light">
                    Śledź każdy szczegół procesu prania dzięki Primcare Ulimate
                    Control Pack. Funkcje monitorowania i raportowania śledzą
                    wszystkie kroki
                  </p>
                  <p className="font-light">
                    w procesie prania, od samego prania, przez suszenie, po
                    wykańczanie prania na prasownicy. Uzyskane dane są przydatne
                    do optymalizacji Twojego procesu prania, aby osiągnąć
                    maksymalną wydajność i rentowność pralni.
                  </p>
                </div>
                <div className="max-w-[220px] max-h-[90px]">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={PRIMCARE_3}
                    alt="Wyposażenie pralni przemysłowej z niograniczoną kontrolą bezpieczeństwa i higieny prania"
                  />
                </div>
              </article>
            </div>
          </div>
          <AsideLinks />
        </div>
      </main>
      <section className="mb-12 px-8">
        <PageTitle text="Rodzaje urządzeń z barierą higieny" />
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          <Link
            title="Pralnicowirówki wolnostojące wysokoobrotowe z barierą higieny"
            className="border border-slate-700 bg-radial-gradient-dark-to-dark group block mx-auto max-w-[320px] max-h-[320px] mb-8 relative rounded-md shadow-md overflow-hidden hover:shadow-lg"
            to="/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/bariery-higieny-wysokoobrotowe"
          >
            <img
              className="object-cover w-full h-full object-center"
              src={FXB_LINK}
              alt="Pralnicowirówki wolnostojące wysokoobrotowe z barierą higieny"
            />
            <div className="bg-accent-light absolute inset-x-0 inset-y-0 top-0 left-0 translate-y-full flex flex-col justify-center items-center p-4 group-hover:translate-y-0 transition-all duration-300">
              <h3 className="mb-0 mt-0 text-md font-bold uppercase">
                Pralnicowirówki wolnosotjące wysokoobrotowe
              </h3>

              <div className="hidden lg:flex flex-col justify-center items-center my-4">
                <span className="text-black-dark font-extrabold text-xl">
                  FXB
                </span>
                <span className="text-black-dark font-extrabold text-xl">
                  MXB
                </span>
                <span className="text-black-dark font-extrabold text-xl">
                  MB
                </span>
              </div>
              <span className="hidden lg:block lowercase underline-offset-2 underline">
                Bariery higieny przelotowe
              </span>
              <div>
                <span className="pr-2 text-sm">załadunek:</span>
                <span className="text-sm font-semibold">
                  od 18 kg do 180 kg
                </span>
              </div>
            </div>
          </Link>
          <Link
            title="Pralnicowirówki sztywnomocowane normalnoobrotowe z barierą higieny"
            className="border border-slate-700 bg-radial-gradient-dark-to-dark group block mx-auto max-w-[320px] max-h-[320px] mb-8 relative rounded-md shadow-md overflow-hidden hover:shadow-lg"
            to="/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/bariery-higieny-sztywnomocowane"
          >
            <img
              className="object-cover w-full h-full object-center"
              src={BARRIER_LINK_TEMP}
              alt="Pralnicowirówki sztywnomocowane szybkoobrotowe z barierą higieny"
            />
            <div className="bg-primary-light absolute inset-x-0 inset-y-0 top-0 left-0 translate-y-full flex flex-col justify-center items-center p-4 group-hover:translate-y-0 transition-all duration-300">
              <h3 className="mb-0 mt-0 text-md font-bold uppercase">
                Pralnicowirówki sztywnomocowane normalnoobrotowe
              </h3>
              <div className="hidden lg:flex flex-col justify-center items-center my-4">
                <span className="text-black-dark font-extrabold text-xl">
                  BH
                </span>
              </div>
              <span className="hidden lg:block lowercase underline-offset-2 underline">
                Bariery higieny przelotowe
              </span>
              <div>
                <span className="pr-2 text-sm">załadunek:</span>
                <span className="text-sm font-semibold">od 18 kg do 44 kg</span>
              </div>
            </div>
          </Link>
          <Link
            title="Pralnice bębnowe z barierą higieny"
            className="border border-slate-700 bg-radial-gradient-dark-to-dark group block mx-auto max-w-[320px] max-h-[320px] mb-8 relative rounded-md shadow-md overflow-hidden hover:shadow-lg"
            to="/wyposazenie-pralni-przemyslowej/urzadzenia-pralnicze/pralnice-z-bariera-higieny"
          >
            <img
              className="object-cover w-full h-full object-center"
              src={BARRIER_LINK_TEMP}
              alt="Pralnice bębnowe bez wirowania z barierą higieny"
            />
            <div className="bg-accent absolute inset-x-0 inset-y-0 top-0 left-0 translate-y-full flex flex-col justify-center items-center p-4 group-hover:translate-y-0 transition-all duration-300">
              <h3 className="mb-0 mt-0 text-md font-bold uppercase">
                Pralnice bębnowe - bez wirowania
              </h3>
              <div className="hidden lg:flex flex-col justify-center items-center my-4">
                <span className="text-black-dark font-extrabold text-xl">
                  PCE/PCP
                </span>
              </div>
              <span className="hidden lg:block lowercase underline-offset-2 underline">
                Bariery higieny kątowe
              </span>
              <div>
                <span className="pr-2 text-sm">załadunek:</span>
                <span className="text-sm font-semibold">od 30 kg do 50 kg</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
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
