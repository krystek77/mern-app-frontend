import React from 'react';
import AsideLinks from '../components/AsideLinks/AsideLinks';
import PageTitle from '../components/PageTitle/PageTitle';
import Header from '../components/Header/Header';
import Footer from './Footer/Footer';
import { v4 as uuidv4 } from 'uuid';
import { useScrollIntoView } from '../hooks';
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

export default function SaveWaterEnergy() {
  const { ref } = useScrollIntoView();
  return (
    <div className="pt-16" ref={ref}>
      <Header
        bgGradient="bg-gradient-radial-circle-from-cc-dedicated"
        images={bgImages}
        title="Chroń środowisko chroniąc przy okazji swój potfel. Stosuj rozwiązania pralnicze, które oszczędzają wodę i energię w procesie prania przemysłowego"
      />
      <main className="px-8 pb-8 w-full">
        <PageTitle text="Nowoczesne rozwiązania recyklingu wody i energii w procesie przemysłowego rpania" />
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <div>Zawartość strony dla systemów recyklingu wody i energii</div>
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
