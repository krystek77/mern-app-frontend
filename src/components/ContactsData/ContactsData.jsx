import React from 'react';
import { contactsData } from '../../constants';
import contactData from '../../constants/contacts-data';
import ContactItem from './ContactItem/ContactItem';

export default function ContactsData() {
  return contactsData.length ? (
    <div className="grid gap-y-4 lg:gap-x-4 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-8 auto-rows-max px-4">
      {contactData.map((contact) => (
        <div
          className="border border-primary bg-slate-100 rounded-md min-w-[230px]"
          key={contact._id}
        >
          <header className="flex items-center justify-left bg-primary">
            <contact.department.Icon className="w-12 h-12 text-accent-dark p-2 mr-2" />
            <h3 className="text-lg text-white">{contact.department.name}</h3>
          </header>
          <ContactItem contactKind={contact.phones} />
          <ContactItem contactKind={contact.faxes} />
          <ContactItem contactKind={contact.mobiles} />
          <ContactItem contactKind={contact.emails} />
        </div>
      ))}
    </div>
  ) : null;
}
