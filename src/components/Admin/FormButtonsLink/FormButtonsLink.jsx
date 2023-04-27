import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormButton from '../FormButton';
import { TrashIcon, FolderPlusIcon } from '@heroicons/react/20/solid';

export const FormButtonsLink = ({ urlAdd, urlEdit, urlDelete }) => {
  return (
    <div className="flex justify-center items-center my-2">
      <Link
        to={urlAdd}
        className="w-6 h-6 ml-1 bg-admin-light flex items-center justify-center border border-admin-dark text-admin-dark rounded text-xs hover:shadow-lg hover:bg-accent-light hover:border-accent-dark hover:text-accent-dark"
        title="dodaj"
        aria-label="add"
      >
        <FolderPlusIcon className="w-4 h-4 self-center justify-self-center" />
      </Link>
      <FormButton
        btnTitle="Edutuj"
        ariaLabel="Edit"
        method="GET"
        action={`${urlEdit}/edytuj`}
      />
      <FormButton
        Icon={TrashIcon}
        btnTitle="Usuń"
        ariaLabel="Delete the sparepart"
        method="POST"
        action={`${urlDelete}/skasuj`}
      />
    </div>
  );
};

FormButtonsLink.propTypes = {
  urlAdd: PropTypes.string,
  urlEdit: PropTypes.string,
  urlDelete: PropTypes.string,
};
FormButtonsLink.defaultProps = {
  urlAdd: 'undefined',
  urlEdit: 'undefined',
  urlDelete: 'undefined',
};

export default FormButtonsLink;
