import React from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { GoArrowSmallLeft, GoArrowSmallRight } from "react-icons/go";

export default function Pagination({ onpage, currentPage, setCurrentPage, count }) {
  const navigate = useNavigate();

  let pages = count >= onpage ? Math.ceil(count / onpage) : 1;

  return (
    <div className='pagination flex justify-center items-center my-8 border-b border-t border-slate-300 rounded p-2 max-w-max mx-auto'>
      <button
        title='kolejna strona'
        aria-label='next page'
        type='button'
        onClick={() => {
          if (currentPage < pages + 1) {
            setCurrentPage(currentPage + 1);
            navigate(`?page=${currentPage + 1}&onpage=${onpage}`);
          }
        }}
        className={
          currentPage === pages
            ? "flex justify-center items-center w-6 h-6 mx-1 border border-slate-300 bg-slate-100 text-black-dark rounded text-sm font-medium pointer-events-none"
            : "flex justify-center items-center w-6 h-6 mx-1 border border-accent-dark bg-accent text-black-dark rounded text-sm font-medium hover:bg-accent-light hover:border-accent hover:shadow-md"
        }>
        <GoArrowSmallLeft className='w-6 h-6 justify-self-center self-center' />
      </button>
      {Array.from({ length: pages }).map((_, index) => (
        <Link
          key={index}
          onClick={() => {
            setCurrentPage(index + 1);
          }}
          className={
            index === currentPage - 1
              ? "flex justify-center items-center w-6 h-6 mx-1 border border-primary-dark bg-primary text-white rounded text-sm font-medium shadow-md"
              : "flex justify-center items-center w-6 h-6 mx-1 border border-accent-dark bg-accent text-black-dark rounded text-sm font-medium hover:bg-accent-light hover:border-accent hover:shadow-md"
          }
          to={`/?page=${index + 1}&onpage=${onpage}`}>
          {index + 1}
        </Link>
      ))}
      <button
        title='poprzednia strona'
        aria-label='prev page'
        type='button'
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            navigate(`?page=${currentPage - 1}&onpage=${onpage}`);
          }
        }}
        className={
          currentPage === 1
            ? "flex justify-center items-center w-6 h-6 mx-1 border border-slate-300 bg-slate-100 text-black-dark rounded text-sm font-medium pointer-events-none"
            : "flex justify-center items-center w-6 h-6 mx-1 border border-accent-dark bg-accent text-black-dark rounded text-sm font-medium hover:bg-accent-light hover:border-accent hover:shadow-md"
        }>
        <GoArrowSmallRight className='w-6 h-6 place-items-center' />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  onpage: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  count: PropTypes.number,
};
Pagination.defaultProps = {
  onpage: 10,
  currentPage: 1,
  setCurrentPage: () => {},
  count: 0,
};
