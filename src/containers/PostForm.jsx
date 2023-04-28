import React, { useRef } from "react";
import { Form, redirect, useLoaderData, useActionData } from "react-router-dom";
import { TrashIcon, EyeIcon } from "@heroicons/react/20/solid";
import { GiSave } from "react-icons/gi";
import FormLinks from "../components/Form/FormLinks";
import PageTitle from "../components/PageTitle/PageTitle";
import Message from "../components/Message";
import InputContainer from "../components/Form/InputContainer";
import Input from "../components/Form/Input";
import ActionButtons from "../components/Form/ActionButtons/ActionButtons";
import ActionButton from "../components/Form/ActionButtons/ActionButton/ActionButton";
import NoItems from "../components/NoItems/NoItems";
import { fileTypeIcon, getExtensionFile } from "../utils";
import * as api from "../api/posts";
import PageHeader from "../components/PageHeader/PageHeader";
import Footer from "./Footer/Footer";
import { server } from "../config/config";

export async function loader() {
  try {
    const posts = await api.getPosts();
    return { posts };
  } catch (error) {
    console.log(error.messsage);
  }
}

export async function action({ params, request }) {
  const { slug } = params;
  const url = new URL(request.url);

  const formData = await request.formData();

  try {
    //delete post
    if (slug && url.pathname === `/pralma/formularz-wiadomosci/${slug}/skasuj`) {
      await api.deletePost(slug);
      return redirect("/pralma/formularz-wiadomosci");
    }
    //create post
    if (!slug && url.pathname === `/pralma/formularz-wiadomosci`) {
      await api.createPost(formData);
      return redirect("/wiadomosci");
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default function PostForm() {
  const { posts } = useLoaderData();
  const actionData = useActionData();
  const ref = useRef(null);

  const handleReset = () => {};
  const handleCancel = () => {};

  return (
    <>
      <PageHeader ref={ref} bg='bg_admin' />
      <main className='pt-8  px-8 pb-12 bg-admin-light bg-opacity-20'>
        <FormLinks />
        <PageTitle text='Formularz wiadomości' />
        <Form id='post-form' method='post' encType='multipart/form-data' className='relative max-w-4xl'>
          <Message text={actionData?.message} posY='-bottom-8' posX='left-1/2 -translate-x-1/2' />
          <InputContainer>
            <Input
              classesText='mb-1'
              id='post'
              error=''
              label='Wiadomość'
              type='file'
              name='post'
              accept='text/markdown'
            />
          </InputContainer>
          <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
            <ActionButton type='submit' title={`Zapisz wiadomość`} label={`Zapisz wiadomość`}>
              <GiSave className='w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200' />
            </ActionButton>
          </ActionButtons>
        </Form>
        <PageTitle text='Dodane dokumenty' />
        {posts.length ? (
          <ul className='mt-4 max-w-4xl'>
            {posts.map((post) => (
              <li
                className='flex flex-wrap items-center justify-between border-b py-2 border-b-slate-300'
                key={post._id}>
                <div className='flex items-center justify-start'>
                  {fileTypeIcon(getExtensionFile(post.originalname))}
                  <span className='text-sm text-slate-500'>
                    <a href={`${server}/${post.path.split("public")[1]}`} download>
                      {post.originalname}
                    </a>
                  </span>
                </div>
                <div className='flex items-center justify-end flex-wrap'>
                  <span className='text-sm text-slate-500 w-20'>{`${Math.ceil(post.size / 1000)} kB`}</span>
                  <div className='flex items-center justify-end ml-4'>
                    <a
                      href={`${server}/${post.path.split("public")[1]}`}
                      download
                      className='w-6 h-6 ml-1 flex items-center justify-center border border-slate-800 rounded text-xs hover:shadow-lg hover:bg-accent hover:border-accent-dark'
                      title='Ściągnij artykuł'
                      aria-label='View or save post'>
                      <EyeIcon className='w-4 h-4 self-center justify-self-center' />
                    </a>
                    <Form
                      id='delete-post'
                      method='post'
                      action={`/pralma/formularz-wiadomosci/${post.filename.replace(
                        /(\.md)|(\.markdown)/,
                        ""
                      )}/skasuj`}>
                      <button
                        className='w-6 h-6 ml-1 flex items-center justify-center border border-slate-800 rounded text-xs hover:shadow-lg hover:bg-accent hover:border-accent-dark'
                        type='submit'
                        title='Skasuj artykuł'
                        aria-label='Delete post'>
                        <TrashIcon className='w-4 h-4 self-center justify-self-center' />
                      </button>
                    </Form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <NoItems msg='Brak dokumentów' />
        )}
      </main>
      <Footer />
    </>
  );
}
