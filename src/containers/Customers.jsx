import React from "react";
import { useLoaderData } from "react-router-dom";
import { getCustomers } from "../api/customer";
import PageTitle from "../components/PageTitle/PageTitle";
import Header from "../components/Header/Header";
import SpinnerOverlay from "../components/SpinnerOverlay";
import SearchForm from "../components/SearchFrom";
import Footer from "./Footer/Footer";
import { v4 as uuidv4 } from "uuid";
import ContactForm from "../components/ContactForm";
import ContactsData from "../components/ContactsData/ContactsData";
import CompanyData from "../components/CompanyData";
import BG_S12 from "../images/bg_header/bg_urzadzenia_pralnicze_search_12.webp";
import BG_S5 from "../images/bg_header/bg_urzadzenia_pralnicze_search_5.webp";
import BG_S2 from "../images/bg_header/bg_urzadzenia_pralnicze_search_2.webp";
import BG_1 from "../images/bg_header/bg_urzadzenia_pralnicze_1.webp";
import { useScrollIntoView } from "../hooks";

export async function loader({ request }) {
  const url = new URL(request.url);
  const queryTitle = url.searchParams.get("title");
  const data = { customers: [], message: "", queryTitle: queryTitle };
  try {
    const customers = await getCustomers();
    data.customers = customers;
    return data;
  } catch (error) {}
}

const bgImages = [
  { id: uuidv4(), src: BG_S12, position: "object-top" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: BG_S2, position: "object-center" },
  { id: uuidv4(), src: BG_S5, position: "object-top" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: "", position: "" },
  { id: uuidv4(), src: BG_1, position: "object-center" },
];

export default function Customers() {
  const data = useLoaderData();
  const { ref } = useScrollIntoView();

  return (
    <div className="pt-16" ref={ref}>
      <SpinnerOverlay />
      <Header
        images={bgImages}
        bgGradient="bg-gradient-radial-circle-from-cc-primary"
        title="Szeroka gama różnych pralni przemysłowych i różnych potrzeb prania. Posiadamy urządzenia pralnicze, również dla Ciebie "
      >
        <SearchForm queryTitle={data.queryTitle} />
      </Header>
      <main className="px-8 pb-8 w-full">
        <PageTitle text="Nasi Klienci" />

        <div className="grid gap-x-2 gap-y-4 md:grid-cols-2 md:gap-x-4 md:gap-y-6 lg:grid-cols-3  2xl:grid-cols-5">
          {data.customers.length ? (
            data.customers.map((customer) => (
              <article key={customer._id}>
                <aside className="rounded-md overflow-hidden    2xl:w-[280px] 2xl:h-[190px]">
                  <img
                    className="object-cover w-full h-full"
                    src={customer.image}
                    alt={customer.title}
                  />
                </aside>
                <header className="mb-2">
                  <h3 className="text-left text-base">{customer.title}</h3>
                  <span className="block -mt-3 text-md text-accent-dark font-smedium">
                    {customer.subtitle}
                  </span>
                </header>
                <p className="font-light text-base">{customer.description}</p>
              </article>
            ))
          ) : (
            <div className="col-span-5 text-lg font-light text-slate-500">
              Brak danych do wyświetlenia
            </div>
          )}
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
