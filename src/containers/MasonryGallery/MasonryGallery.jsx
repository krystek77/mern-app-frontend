import React, { useEffect, useRef, useState } from 'react';
import FormButton from '../../components/Admin/FormButton';
import Pagination from '../../components/Pagination/Pagination';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useScrollIntoView, useScrollAnimation } from '../../hooks';
import {server} from '../../config/config'


export default function MasonryGallery({ items, count, onpage, page,user }) {
  const [activePhoto, setActivePhoto] = useState([
    items[(Math.random() * items.length) | 0]._id,
    items[(Math.random() * items.length) | 0]._id,
    items[(Math.random() * items.length) | 0]._id,
    items[(Math.random() * items.length) | 0]._id,
    items[(Math.random() * items.length) | 0]._id,
    items[(Math.random() * items.length) | 0]._id,
    items[(Math.random() * items.length) | 0]._id,
  ]);
  const ref = useRef(null);
  const { ref: gallery } = useScrollIntoView();
  const { itemIds } = useScrollAnimation(items);
  const [currentPage, setCurrentPage] = useState(page * 1);

  useEffect(() => {
    ref.current = setInterval(function () {
      const photos = [];
      for (let i = 0; (i < items.length / 2) | 0; i++) {
        photos.push(items[(Math.random() * items.length) | 0]._id);
      }
      setActivePhoto(photos);
    }, 4000);
    return () => {
      clearInterval(ref.current);
    };
  }, [items]);

  return (
    <div ref={gallery}>
      <h2 className="text-accent-dark uppercase font-light text-2xl py-8 text-center max-w-xl mx-auto">
        <span className="text-black-dark font-normal">
          Różne pralnie przemysłowe, różne wielkości
        </span>
        &nbsp; - jeden dostawca
      </h2>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        count={count}
        onpage={onpage * 1}
      />
      <div className=" gap-2 sm:columns-2 md:columns-3 xl:columns-5">
        {items.length
          ? items.map((item, index) => (
              <div
                id={item._id}
                key={item._id}
                className={
                  itemIds.some((id) => id === item._id)
                    ? `border border-slate-400 shadow-lg rounded overflow-hidden mb-2 relative cursor-pointer ${
                        index % 2 === 0
                          ? 'animate-laundry-from-right'
                          : 'animate-laundry-from-left'
                      }`
                    : `border border-slate-400 shadow-lg rounded overflow-hidden mb-2 relative cursor-pointer ${
                        index % 2 === 0 ? 'translate-x-400' : '-translate-x-400'
                      }`
                }
                onPointerEnter={(e) => {
                  setActivePhoto([item._id]);
                  clearInterval(ref.current);
                }}
                onPointerLeave={(e) => {
                  ref.current = setInterval(function () {
                    const photos = [];
                    for (let i = 0; (i < items.length / 2) | 0; i++) {
                      photos.push(
                        items[(Math.random() * items.length) | 0]._id
                      );
                    }
                    setActivePhoto(photos);
                  }, 4000);
                }}
              >
                <img
                  loading="lazy"
                  className="w-full h-auto bg-slate-300"
                  src={`${server}/${item.path.replace('public/', '')}`}
                  alt={item.alt}
                />
                <div
                  className={
                    activePhoto.some((i) => i === item._id)
                      ? 'overlay-image absolute inset-x-0 inset-y-0 bg-white bg-opacity-0'
                      : 'overlay-image absolute inset-x-0 inset-y-0 bg-white bg-opacity-20'
                  }
                ></div>
                <div
                  className={
                    activePhoto.some((i) => i === item._id)
                      ? 'absolute bg-accent bottom-0 left-0 w-full text-black-dark text-center font-semibold text-xs py-1 transition-all duration-500'
                      : 'absolute bg-accent bottom-0 translate-y-full left-0 w-full text-black-dark text-center font-semibold text-xs py-1'
                  }
                >
                  {' '}
                  {item.title}{' '}
                </div>
                {user ? (
                  <div className="absolute right-4 top-4 w-full flex justify-end items-center">
                    <FormButton
                      id="edit-laundry-photo"
                      method="GET"
                      action={`/pralma/formularz-pralni/${item._id}/edytuj`}
                      btnTitle="edytuj zdjęcie"
                      ariaLabel="edit photo"
                    />
                    <FormButton
                      id="delete-laundry-photo"
                      method="POST"
                      action={`${item._id}/skasuj`}
                      btnTitle="skasuj zdjęcie"
                      ariaLabel="delete photo"
                      Icon={TrashIcon}
                    ></FormButton>
                  </div>
                ) : null}
              </div>
            ))
          : null}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        count={count}
        onpage={onpage * 1}
      />
    </div>
  );
}
