import React from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import AsideLinks from '../components/AsideLinks/AsideLinks';
import Footer from './Footer/Footer';
import { useScrollIntoView } from '../hooks/scrollIntoView';
import ContactForm from '../components/ContactForm';
import ContactsData from '../components/ContactsData/ContactsData';
import CompanyData from '../components/CompanyData';

export default function WarrantyConditions() {
  const { ref } = useScrollIntoView();
  return (
    <>
      <main ref={ref} className="px-8 pt-20 pb-8 w-full">
        <PageTitle text="Warunki gwarancji" />
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          <div>Warunki gwarancji</div>
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
    </>
  );
}
