import React from 'react';
import { useLoaderData, redirect } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle/PageTitle';
import AsideLinks from '../../../components/AsideLinks/AsideLinks';
import FormButton from '../../../components/Admin/FormButton';
import { TrashIcon } from '@heroicons/react/20/solid';
import SimilarNews from '../SimilarNews/SimilarNews';
import Tags from '../Tags/Tags';
import { useScrollIntoView } from '../../../hooks/scrollIntoView';
import * as api from '../../../api/posts';
import parse from 'html-react-parser';
import moment from 'moment';
import 'moment/locale/pl';
moment.locale('pl');

export async function loader({ params }) {
  const { slug } = params;
  try {
    const post = await api.getMarkdownPost(slug);
    const posts = await api.getMarkdownPosts();
    return { post, posts };
  } catch (error) {
    console.log(error.message);
  }

  return null;
}

export async function action({ params }) {
  const { slug } = params;
  try {
    if (slug) {
      await api.deletePost(slug);
      return redirect('/wiadomosci');
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default function NewsDetails() {
  const { ref } = useScrollIntoView();
  const { post, posts } = useLoaderData();
  // console.log(post);
  // console.log(posts);

  const featuredPosts = posts.filter((p) => {
    if (p._id === post._id) {
      return false;
    } else {
      if (
        p.tags.split(',').some((t) => {
          return post.tags.split(',').some((tp) => tp === t);
        })
      ) {
        return true;
      } else {
        return false;
      }
    }
  });

  const sameTags = featuredPosts
    .map((post) => post.tags)
    .join(',')
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => {
      if (
        post.tags
          .split(',')
          .map((t) => t.trim())
          .some((t) => t === tag)
      )
        return true;
      else return false;
    })
    .reduce((a, el) => {
      if (a.some((item) => item === el)) return a;
      else {
        a.push(el);
        return a;
      }
    }, []);

  const scrollIntoView = () => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
  };

  const admin = true;

  return (
    <main ref={ref} className="px-8 pb-8 pt-16 mx-auto">
      <PageTitle text={post.title} />
      <div className="grid xl:grid-cols-1-300 xl:gap-x-6">
        <section>
          <article className="relative epost pb-8">
            <div className="tags border-b border-t border-slate-200 py-2 mb-8">
              <span className="text-black-dark text-xs font-medium mr-2">
                Data publikacji:
              </span>
              <span className="inline-block mb-2 italic text-slate-500 text-sm">
                {moment(post.date, 'YYYY-MM-DD').fromNow()}
              </span>
              <Tags arrayOfTags={post.tags.split(',')} title="Tagi" />
            </div>
            {admin ? (
              <div className="absolute top-0 right-0 p-2 bg-admin-light rounded-tr rounded-bl shadow-lg">
                <FormButton
                  btnClasses="ml-0"
                  btnTitle="skasuj artykuł"
                  ariaLabel="Delete post"
                  id="delete-post"
                  method="post"
                  action="skasuj"
                  Icon={TrashIcon}
                />
              </div>
            ) : null}
            <div className="max-w-4xl mx-auto prose prose-lg">
              {parse(`${post.content}`)}
            </div>
          </article>
          <SimilarNews
            title="Mogą Cię zainteresować również"
            items={featuredPosts}
            handleClick={scrollIntoView}
            sameTags={sameTags}
          />
        </section>
        <AsideLinks />
      </div>
    </main>
  );
}
