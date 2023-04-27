import React from 'react';
import PropTypes from 'prop-types';
import { GiPadlock } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';
import AuthButton from '../AuthButton/AuthButton';
import * as userAPI from '../../../utils/user';

export default function AdminData({ user, toolbar }) {
  return user ? (
    <div
      className={
        toolbar
          ? 'px-6 h-[48px] flex flex-row-reverse justify-center items-center'
          : 'mt-12 px-6 h-[calc(100%_-_48px)] flex flex-col justify-center'
      }
    >
      <div
        className={
          toolbar
            ? 'flex flex-wrap justify-start items-center'
            : 'flex flex-wrap justify-start items-center mb-2'
        }
      >
        <div
          className={
            toolbar
              ? 'w-10 h-10 rounded-full overflow-hidden bg-slate-100 mr-2 flex justify-center items-center'
              : 'w-14 h-14 rounded-full overflow-hidden bg-slate-100 mr-2 flex justify-center items-center'
          }
        >
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <IoPerson
              className={
                toolbar ? 'w-8 h-8 text-slate-300' : 'w-10 h-10 text-slate-300'
              }
            />
          )}
        </div>
        <div className="">
          <div
            className={
              toolbar
                ? 'flex justify-start items-center text-xs'
                : 'flex justify-start items-center'
            }
          >
            <GiPadlock className="w-4 h-4 mr-1" />
            <span>
              Dzień dobry,
              <strong>{` ${user.name} ${user.lastName}`}</strong>
            </span>
          </div>
          <div
            className={
              toolbar
                ? 'flex justify-start items-center text-xs'
                : 'flex justify-start items-center'
            }
          >
            <MdEmail className="w-4 h-4 mr-1" />
            <a className="hover:underline" href={`mailto:${user.email}`}>
              {user.email}
            </a>
          </div>
        </div>
      </div>
      <AuthButton type="button" toolbar={toolbar} action={userAPI.logoutUser} />
    </div>
  ) : null;
}

AdminData.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    lastName: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    role: PropTypes.string,
  }),
  toolbar: PropTypes.bool,
};
AdminData.defaultProps = {
  user: null,
  toolbar: false,
};
