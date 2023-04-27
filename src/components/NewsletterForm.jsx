import React, { useState } from 'react';

import InputContainer from './Form/InputContainer';
import Input from './Form/Input';
import ActionButton from './Form/ActionButtons/ActionButton/ActionButton';
import { RiMailSendFill } from 'react-icons/ri';
import { RxReset } from 'react-icons/rx';
import Required from './Required';

import { isValidNewsletter } from '../utils';

export default function NewsletterForm(props) {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(null);
  const handleReset = () => setEmail('');

  const saveToNesletter = (e) => {
    e.preventDefault();
    const errors = isValidNewsletter();
    if (Object.keys(errors).length) {
      setErrors(errors);
    }
    console.log(errors);
    console.log(email);
    //send to sendgrid
  };

  return (
    <>
      <form
        onSubmit={saveToNesletter}
        method="post"
        className={`bg-accent px-4 py-4 border border-accent-dark rounded max-w-[270px] ${
          props.home && 'max-w-lg bg-accent border-none'
        }`}
      >
        <span
          className={`block font-semibold text-black-dark text-base px-6 text-center mb-4`}
        >
          Bądź na bieżąco z nowościami od Pralma
        </span>
        <InputContainer>
          <Required>
            <Input
              error={errors?.email}
              type="email"
              name="email"
              value={email}
              label="email"
              placeholder="twój adres email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Required>
        </InputContainer>
        <p className="text-center text-black-dark text-sm mb-4">
          Zapisz się i nie przegap <strong>żadnej promocji</strong> oraz{' '}
          <strong>wartościowych </strong> informacji i materiałów z branży
          wyposażenie pralni przemysłowych.
        </p>
        <div className="form-action-btns flex justify-center items-center flex-wrap">
          <ActionButton
            type="submit"
            title="zapisz się na newsletter"
            label="zapisz się"
          >
            <RiMailSendFill className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
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
      </form>
    </>
  );
}
