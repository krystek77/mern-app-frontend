import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/20/solid';

export default function FormButton({
  children,
  id,
  method,
  action,
  Icon,
  btnTitle,
  btnClasses,
  ariaLabel,
  formClasses,
  disabled,
}) {
  return (
    <Form id={id} method={method} action={action} className={formClasses}>
      <button
        className={`w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark ${btnClasses}`}
        type="submit"
        title={btnTitle}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        <Icon className="w-4 h-4 self-center justify-self-center" />
        {children}
      </button>
    </Form>
  );
}

FormButton.propTypes = {
  id: PropTypes.string,
  action: PropTypes.string,
  Icon: PropTypes.elementType,
  btnTitle: PropTypes.string,
  formClasses: PropTypes.string,
  btnClasses: PropTypes.string,
  method: PropTypes.string,
  children: PropTypes.element,
  disabled: PropTypes.bool,
};
FormButton.defaultProps = {
  id: '',
  Icon: PencilSquareIcon,
  btnTitle: 'Tytuł przycisku',
  ariaLabel: 'button form',
  formClasses: '',
  btnClasses: '',
  method: 'GET',
  children: null,
  disabled: false,
};
