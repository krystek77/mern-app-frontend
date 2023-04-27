import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Dialog({ message, navigateTo }) {
  const navigate = useNavigate();
  return message !== '' ? (
    <div className="fixed z-[99] inset-x-0 inset-y-0 bg-white bg-opacity-95">
      <dialog
        id="modal"
        className="max-w-xs fixed z-[100] top-1/4 bg-primary border border-primary-dark text-white text-xs rounded shadow-2xl p-4"
        open={true}
        onClick={(e) => {
          e.currentTarget.open = false;
          navigate(navigateTo);
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <span className="block mb-2">{message}</span>
          <button className="bg-slate-700 border border-slate-800 text-slate-300 rounded px-2 py-1 hover:bg-slate-300 hover:text-slate-700 transition-all duration-150 ">
            zamknij
          </button>
        </div>
      </dialog>
    </div>
  ) : null;
}

Dialog.propTypes = {
  navigateTo: PropTypes.string,
  message: PropTypes.string,
};
Dialog.defaultProps = {
  navigateTo: '',
  message: '',
};
