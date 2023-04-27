import React from 'react';
import PropTypes from 'prop-types';
import ErrorField from './ErrorField';

export default function TextArea({
  placeholder,
  name,
  value,
  onChange,
  error,
  ariaLabel,
  children,
  classes,
}) {
  return (
    <div className="relative">
      <ErrorField error={error} />
      {children}
      <textarea
        className={`form-textarea appearance-none relative resize-none w-full rounded border border-black-dark focus:outline-none focus:ring-0 focus:border-2 focus:border-accent-dark focus:shadow-lg ${classes}`}
        type="textarea"
        rows={10}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
      />
    </div>
  );
}

TextArea.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  ariaLabel: PropTypes.string,
  children: PropTypes.element,
  classes: PropTypes.string,
};
TextArea.defaultProps = {
  placeholder: 'wiadomość',
  name: 'message',
  error: '',
  onChange: () => {},
  ariaLabel: '',
  children: null,
  classes: '',
};
