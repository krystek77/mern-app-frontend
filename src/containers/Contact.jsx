import React from "react";
import PageTitle from "../components/PageTitle/PageTitle";
import ContactForm from "../components/ContactForm";
import ContactsData from "../components/ContactsData/ContactsData";
import CompanyData from "../components/CompanyData";
import { formatFormData, isValidContactForm } from "../utils";
import { useScrollIntoView } from "../hooks";
import Footer from "./Footer/Footer";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header/Header";

export async function action({ request }) {
  const formData = await request.formData();
  const data = {};
  for (const [key, value] of formData) {
    formatFormData(data, key, value);
  }

  console.log("CF-data", data);
  const errors = isValidContactForm();
  if (Object.keys(errors.person).length || Object.keys(errors.company).length) {
    return { errors };
  }
  // send data to sendgrid
  return { message: "Wiadomość wysłana" };
}

const bgImages = [
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-center" },
  { id: uuidv4(), src: "", position: "object-bottom" },
];

export default function Contact() {
  const { ref } = useScrollIntoView();
  return (
    <div className="pt-16 bg-slate-50" ref={ref}>
      <Header
        bgGradient="bg-gradient-radial-circle-from-cc-dedicated"
        images={bgImages}
        title="Potrzebujesz oferty, pomocy technicznej chcesz zlecić serwis przemysłowych urządzeń pralniczych - napisz lub zadzwoń"
      />
      <main className="w-full ">
        <section ref={ref} className="py-8">
          <div className="pl-4">
            <PageTitle text="Dane kontaktowe" />
          </div>
          <ContactsData />
          <CompanyData />
        </section>
        <hr />
        {/** contact form */}
        <section id="contactForm" className="py-12 bg-slate-200">
          <div className="pl-4">
            <PageTitle text="Formularz kontaktowy" />
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
