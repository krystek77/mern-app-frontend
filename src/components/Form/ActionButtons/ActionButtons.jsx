import React from 'react';
import PropTypes from 'prop-types';
import { GiCancel } from 'react-icons/gi';
import { RxReset } from 'react-icons/rx';
import ActionButton from './ActionButton/ActionButton';

export default function ActionButtons({ children, handleReset, handleCancel }) {
  return (
    <div className="form-action-btns flex justify-center items-center flex-wrap">
      {children}
      <ActionButton
        type="button"
        title="anuluj"
        label="anuluj"
        onClick={handleCancel}
      >
        <GiCancel className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
      </ActionButton>
      <ActionButton
        type="reset"
        title="resetuj formę"
        label="resetuj"
        onClick={handleReset}
      >
        <RxReset className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
      </ActionButton>
    </div>
  );
}

ActionButtons.propTypes = {
  children: PropTypes.element,
  handleReset: PropTypes.func,
  handleCancel: PropTypes.func,
};
ActionButtons.defaultProps = {
  children: null,
  handleReset: () => {},
  handleCancel: () => {},
};
