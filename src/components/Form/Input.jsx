import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ErrorField from './ErrorField';

const Input = forwardRef(
  (
    {
      label,
      classesLabel,
      accept,
      classesText,
      ariaLabel,
      error,
      multiple,
      disabled,
      readOnly,
      inputStyles,
      name,
      ...props
    },
    ref
  ) => {
    let classes = '';
    switch (props.type) {
      case 'radio':
        classes =
          'form-radio relative appearance-none w-6 h-6 border border-accent-dark bg-accent hover:bg-accent-light  checked:text-primary checked:border checked:border-primary-dark focus:outline-none focus:ring-0 focus:shadow-lg focus:border focus:border-primary-dark';
        break;
      case 'checkbox':
        classes =
          'form-checkbox relative apperance-none w-6 h-6 border border-accent-dark bg-accent hover:bg-accent-light checked:text-primary checked:border checked:border-primary-dark focus:outline-none focus:ring-0 focus:shadow-lg focus:border focus:border-primary-dark';
        break;
      default:
        classes = `input form-input relative appearance-none w-full text-sm font-normal text-black-dark border border-black-dark rounded focus:outline-none focus:ring-0 focus:border-2 focus:border-accent-dark focus:shadow-lg ${
          readOnly === true &&
          'bg-slate-100 border-slate-50 pointer-event-none focus:outline-none focus:ring-0 focus:border focus:border-slate-50 focus:shadow-none'
        }`;
    }
    return (
      <div className="relative">
        <ErrorField error={error} />
        <label className={`input-label ${classesLabel}`}>
          <span
            className={`input-label__text whitespace-nowrap font-bold text-sm text-center text-black-dark ${classesText}`}
          >
            {label}
          </span>
          <input
            name={name}
            ref={ref}
            accept={accept}
            {...props}
            aria-label={ariaLabel}
            className={`${classes} ${inputStyles}`}
            multiple={multiple}
          />
        </label>
      </div>
    );
  }
);
Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  classesLabel: PropTypes.string,
  classesText: PropTypes.string,
  error: PropTypes.string,
  readOnly: PropTypes.bool,
  ariaLabel: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputStyles: PropTypes.string,
  accept: PropTypes.string,
};
Input.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  onChange: () => {},
  onFocus: () => {},
  classesLabel: 'flex flex-col items-start justify-center',
  classesText: '',
  error: '',
  readOnly: false,
  ariaLabel: '',
  multiple: false,
  disabled: false,
  accept: '',
  inputStyles: '',
};

export default Input;
