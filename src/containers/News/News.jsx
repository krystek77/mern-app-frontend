import React from "react";
import { useLoaderData, NavLink, redirect } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import AsideLinks from "../../components/AsideLinks/AsideLinks";
import NoItems from "../../components/NoItems/NoItems";
import Button from "../../components/Overlay/Button/Button";
import FormButton from "../../components/Admin/FormButton";
import { TrashIcon } from "@heroicons/react/20/solid";
import { trimmedStringToWord } from "../../utils";
import * as api from "../../api/posts";
import moment from "moment";
import "moment/locale/pl";
import Footer from "../Footer/Footer";
import Header from "../../components/Header/Header";
import { v4 as uuidv4 } from "uuid";
import { useScrollIntoView } from "../../hooks";
import ContactForm from "../../components/ContactForm";
import ContactsData from "../../components/ContactsData/ContactsData";
import CompanyData from "../../components/CompanyData";

moment.locale("pl");

export async function loader() {
  const mdPosts = await api.getMarkdownPosts();
  return { mdPosts };
}

export async function action({ params }) {
  const { slug } = params;
  try {
    if (slug) {
      await api.deletePost(slug);
      return redirect("/wiadomosci");
    }
  } catch (error) {
    console.log(error.message);
  }
}

const admin = true;

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

export default function News() {
  const { mdPosts } = useLoaderData();
  const { ref } = useScrollIntoView();

  return (
    <div className="pt-16" ref={ref}>
      <Header
        bgGradient="bg-gradient-radial-circle-from-cc-dedicated"
        images={bgImages}
        title="Bądź na bieżąco z naszą ofertą i wiadomościami z branży przemysłowych urządzeń pralniczych"
      />
      <main className="px-8 pb-8 w-full">
        <PageTitle text="Z ostatniej chwili" />
        <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
          {mdPosts.length ? (
            <div className="posts-card grid grid-cols-1 auto-rows-max gap-x-2 gap-y-6 md:gap-x-4 md:gap-y-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-8 ">
              {mdPosts.map((post) => {
                return (
                  <div
                    className="relative post-card block border bg-slate-100 border-slate-300 rounded overflow-hidden shadow-lg pb-8 max-w-[360px] justify-self-center"
                    key={post._id}
                  >
                    <NavLink to={`${post._id}`} className="">
                      <div className="h-[290px]">
                        <img
                          className="block object-cover w-full h-full"
                          src={post.image}
                          alt={post.title}
                        />
                      </div>
                      <div className="px-4">
                        <header>
                          <h3 className="text-base">{post.title}</h3>
                        </header>
                        <span className="block mb-2 italic text-slate-500 text-sm">
                          {moment(post.date, 'YYYY-MM-DD').fromNow()}
                        </span>
                        <div className="text-black-dark text-sm mb-2">
                          {trimmedStringToWord(post.info, 256)}
                        </div>
                        <div className="tags">
                          <span className="text-black-dark text-sm font-medium">
                            Tagi:
                          </span>
                          <div className="text-slate-500 text-sm mb-8">
                            {post.tags.split(',').map((tag) => (
                              <span key={tag}>{`#${tag.trim()} `}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-2 absolute bottom-0 -translate-y-1/4 left-1/2 -translate-x-1/2">
                        <Button label="czytaj" />
                      </div>
                    </NavLink>
                    {admin ? (
                      <div className="absolute top-0 right-0 p-2 bg-admin-light rounded-tr rounded-bl shadow-lg">
                        <FormButton
                          btnClasses="ml-0"
                          btnTitle="skasuj artykuł"
                          ariaLabel="Delete post"
                          id="delete-post"
                          method="post"
                          action={`${post._id}/skasuj`}
                          Icon={TrashIcon}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : (
            <NoItems text="Brak artykułów" />
          )}
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
