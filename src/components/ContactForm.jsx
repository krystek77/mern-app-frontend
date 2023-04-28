import React, { useState, Fragment } from 'react';
import { Form, useNavigate, useActionData } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import InputContainer from './Form/InputContainer';
import Input from './Form/Input';
import TextArea from './Form/TextArea';
import ActionButtons from './Form/ActionButtons/ActionButtons';
import ActionButton from './Form/ActionButtons/ActionButton/ActionButton';
import { RiMailSendFill } from 'react-icons/ri';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid';
import Required from './Required';
import Message from './Message';
import { contactFormData } from '../constants';

export default function ContactForm() {
  const actionData = useActionData();

  const [formDataPerson, setFormDataPerson] = useState(
    contactFormData.personData
  );
  const [formDataCompany, setFormDataCompany] = useState(
    contactFormData.companyData
  );
  const [selectedMarket, setSelectedMarket] = useState(
    contactFormData.markets[0]
  );
  const [selectedReason, setSelectedReason] = useState(
    contactFormData.reasons[0]
  );
  const [who, setWho] = useState('person');
  const navigate = useNavigate();

  const handleFormData = (e) => {
    if (who === 'person') {
      setFormDataPerson({ ...formDataPerson, [e.target.name]: e.target.value });
    } else if (who === 'company') {
      setFormDataCompany({
        ...formDataCompany,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleReset = () => {
    setFormDataPerson(contactFormData.personData);
    setFormDataCompany(contactFormData.companyData);
    setSelectedMarket(contactFormData.markets[0]);
    setSelectedReason(contactFormData.reasons[0]);
  };
  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <Form
      method="post"
      id="contact-form"
      className="max-w-4xl pb-20 relative px-4"
    >
      <>
        <Message
          text={actionData?.message}
          posY="bottom-8"
          posX="left-1/2 -translate-x-1/2"
        />
        <div
          className="group-inputs who-fields grid sm:grid-cols-2 gap-x-4"
          onChange={(e) => {
            setWho(e.target.value);
          }}
        >
          <InputContainer>
            <Input
              classesLabel="flex flex-row-reverse justify-end items-center py-2"
              classesText="ml-2"
              label="osoba prywatna"
              type="radio"
              name="who"
              checked={who === 'person'}
              value="person"
            />
          </InputContainer>
          <InputContainer>
            <Input
              classesLabel="flex flex-row-reverse justify-end items-center py-2"
              classesText="ml-2"
              label="firma/instytucja"
              type="radio"
              name="who"
              checked={who === 'company'}
              value="company"
            />
          </InputContainer>
        </div>
        {/** markets */}
        <div className="market mb-4">
          <Listbox
            value={selectedMarket}
            onChange={setSelectedMarket}
            name="market"
          >
            <Listbox.Label>
              <Required>
                <span className="input-label__text whitespace-nowrap font-bold text-sm text-center text-black-dark">
                  market
                </span>
              </Required>
            </Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md">
                <span className="flex justify-between items-center">
                  <span className="">{selectedMarket}</span>
                </span>
                <span className="absolute right-0 inset-y-0 flex items-center bg-accent border border-accent-dark rounded-tr-md rounded-br-md h-full">
                  <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="bg-slate-50 absolute z-[1] mt-2 max-h-60 w-full overflow-auto rounded-md py-2 text-base shadow-2xl focus: outline focus:outline-offset-0 focus: outline-1 focus: outline-accent-dark">
                  {contactFormData.markets.map((market) => (
                    <Listbox.Option
                      key={market}
                      className={({ active }) => {
                        return `relative cursor-default select-none  text-sm font-normal text-black-dark   ${
                          active ? 'bg-accent' : 'bg-slate-50'
                        }`;
                      }}
                      value={market}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate py-3 pl-10 pr-4 ${
                              selected
                                ? 'font-semibold bg-primary text-white'
                                : 'font-normal'
                            }`}
                          >
                            <span className="flex justify-between items-center">
                              <span className="truncate">{market}</span>
                            </span>
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        {/** reason */}
        <div className="market mb-4">
          <Listbox
            value={selectedReason}
            onChange={setSelectedReason}
            name="reason"
          >
            <Listbox.Label>
              <Required>
                <span className="input-label__text whitespace-nowrap font-bold text-sm text-center text-black-dark">
                  temat wiadomości
                </span>
              </Required>
            </Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative w-full min-h-[40px] cursor-default rounded-md bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md">
                <span className="flex justify-between items-center">
                  <span className="">{selectedReason.name}</span>
                </span>
                <span className="absolute right-0 inset-y-0 flex items-center bg-accent border border-accent-dark rounded-tr-md rounded-br-md h-full">
                  <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="bg-slate-50 absolute z-[1] mt-2 max-h-60 w-full overflow-auto rounded-md py-2 text-base shadow-2xl focus: outline focus:outline-offset-0 focus: outline-1 focus: outline-accent-dark">
                  {contactFormData.reasons.map((reason) => (
                    <Listbox.Option
                      key={reason.name}
                      className={({ active }) => {
                        return `relative cursor-default select-none  text-sm font-normal text-black-dark   ${
                          active ? 'bg-accent' : 'bg-slate-50'
                        }`;
                      }}
                      value={reason}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate py-3 pl-10 pr-4 ${
                              selected
                                ? 'font-semibold bg-primary text-white'
                                : 'font-normal'
                            }`}
                          >
                            <span className="flex justify-between items-center">
                              <span className="truncate">{reason.name}</span>
                            </span>
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        {who === 'person' ? (
          <div className="group-inputs person-field grid sm:grid-cols-2 gap-x-4">
            <InputContainer>
              <Required>
                <Input
                  error={actionData?.errors?.person?.firstName}
                  label="imię"
                  type="text"
                  name="firstName"
                  value={formDataPerson.firstName}
                  onChange={handleFormData}
                />
              </Required>
            </InputContainer>
            <InputContainer>
              <Input
                label="nazwisko"
                type="text"
                name="lastName"
                value={formDataPerson.lastName}
                onChange={handleFormData}
              />
            </InputContainer>
            <InputContainer>
              <Required>
                <Input
                  label="telefon"
                  type="tel"
                  name="phone"
                  value={formDataPerson.phone}
                  onChange={handleFormData}
                />
              </Required>
            </InputContainer>
            <InputContainer>
              <Required>
                <Input
                  label="email"
                  type="email"
                  name="email"
                  value={formDataPerson.email}
                  onChange={handleFormData}
                />
              </Required>
            </InputContainer>
          </div>
        ) : (
          <div className="group-inputs company-fields grid sm:grid-cols-2 gap-x-4">
            <InputContainer classes="col-span-2">
              <Required>
                <Input
                  label="nazwa firmy/instytucji"
                  type="text"
                  name="name"
                  value={formDataCompany.name}
                  onChange={handleFormData}
                />
              </Required>
            </InputContainer>
            <InputContainer>
              <Input
                label="ulica"
                type="text"
                name="street"
                value={formDataCompany.street}
                onChange={handleFormData}
              />
            </InputContainer>
            <InputContainer>
              <Input
                label="numer domu / lokalu"
                type="text"
                name="houseNumber"
                value={formDataCompany.houseNumber}
                onChange={handleFormData}
              />
            </InputContainer>
            <InputContainer>
              <Input
                label="kod pocztowy"
                type="text"
                name="zipCode"
                value={formDataCompany.zipCode}
                onChange={handleFormData}
              />
            </InputContainer>
            <InputContainer>
              <Input
                label="miasto"
                type="text"
                name="city"
                value={formDataCompany.city}
                onChange={handleFormData}
              />
            </InputContainer>
            <InputContainer>
              <Required>
                <Input
                  label="telefon"
                  type="tel"
                  name="phone"
                  value={formDataCompany.phone}
                  onChange={handleFormData}
                />
              </Required>
            </InputContainer>
            <InputContainer>
              <Required>
                <Input
                  label="email"
                  type="email"
                  name="email"
                  value={formDataCompany.email}
                  onChange={handleFormData}
                />
              </Required>
            </InputContainer>
          </div>
        )}
        <Required>
          <InputContainer classes="pt-5">
            <TextArea
              error={
                actionData?.errors?.person?.message ||
                actionData?.errors?.companyData?.message
              }
              placeholder="Twoja wiadomość"
              name="message"
              value={
                who === 'person'
                  ? formDataPerson.message
                  : formDataCompany.message
              }
              onChange={handleFormData}
            />
          </InputContainer>
        </Required>
      </>
      <ActionButtons handleReset={handleReset} handleCancel={handleCancel}>
        <ActionButton type="submit" title="wyślij email'a" label="wyślij">
          <RiMailSendFill className="w-6 h-6 self-center justify-self-center mr-1 group-hover:text-slate-200" />
        </ActionButton>
      </ActionButtons>
    </Form>
  );
}
