import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle/PageTitle';
import NoItems from '../../../components/NoItems/NoItems';
import Tags from '../Tags/Tags';

export default function SimilarNews({ items, title, handleClick, sameTags }) {
  return (
    <>
      <PageTitle text={title} />
      <Tags arrayOfTags={sameTags} title="Wspólne tagi" />
      {items.length ? (
        <div className="grid sm:grid-cols-2 auto-rows-max gap-4 mb-8 bg-slate-300 rounded p-4 lg:grid-cols-3 2xl:grid-cols-4">
          {items.map((item) => (
            <NavLink
              onClick={handleClick}
              to={`/wiadomosci/${item._id}`}
              className="group justify-self-center relative border border-black-dark rounded overflow-hidden min-w-[180px] max-w-[320px]"
              key={item._id}
            >
              <div className="">
                <img
                  className="block object-cover w-full h-full hover:scale-125 hover:shadow-lg transition-all duration-300 "
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <h4 className="absolute bottom-0 left-0 w-full bg-black-dark bg-opacity-90 text-white font-normal text-xs my-0 px-2 py-4 ">
                {item.title}
              </h4>
            </NavLink>
          ))}
        </div>
      ) : (
        <NoItems msg="Brak podobnych postów" />
      )}
    </>
  );
}

SimilarNews.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  handleClick: PropTypes.func,
  sameTags: PropTypes.arrayOf(PropTypes.string),
};
SimilarNews.defaultProps = {
  items: [],
  title: '',
  handleClick: () => {},
  sameTags: [],
};
