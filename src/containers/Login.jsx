import React, { useState } from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';
import Footer from './Footer/Footer';
import AuthButton from '../components/Admin/AuthButton/AuthButton';
import InputContainer from '../components/Form/InputContainer';
import Input from '../components/Form/Input';
import RequiredIndicator from '../components/Required';
import { GiPadlock } from 'react-icons/gi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import userAPI from '../utils/user';
import * as api from '../api/user';
import Message from '../components/Message';
import { isValidLoginData } from '../utils';
import { useScrollIntoView } from '../hooks';

export async function loader() {
  const user = userAPI.getUser();
  return user ? redirect('/') : null;
}
export async function action({ request }) {
  let data = { message: '', user: null, errors: null };
  try {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);
    const errors = isValidLoginData(userData);

    if (Object.keys(errors).length) {
      data.errors = errors;
      return data;
    }

    const userResponse = await api.signinUser(userData);

    if (userResponse.message) {
      data.message = userResponse.message;
      return data;
    } else {
      data.user = userResponse;
    }
    if (data.user) {
      userAPI.loginUser(data.user);
      return redirect('/');
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default function Login() {
  const data = useActionData();
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [viewPassword, setViewPassword] = useState(false);
  const { ref } = useScrollIntoView();

  return (
    <>
      <main
        ref={ref}
        className="h-screen flex justify-center items-center"
      >
        <Form
          id="login-form"
          className="relative border border-accent-dark bg-accent-light py-12 px-6 rounded-xl min-w-[360px] md:w-[512px]"
          method="post"
        >
          {data && data.message ? (
            <Message
              text={data.message}
              posX="left-1/2 -translate-x-1/2"
              posY="-bottom-12"
            />
          ) : null}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] rounded-full bg-accent-light border border-accent-dark w-16 h-16 flex justify-center items-center shadow-lg">
            <GiPadlock className="w-12 h-12 text-black-dark" />
          </div>
          <InputContainer classes="mb-8">
            <RequiredIndicator posX="right-4" posY="-top-2">
              <Input
                id="user-email"
                error={data?.errors?.email}
                type="email"
                label="email"
                name="email"
                value={userData.email}
                placeholder="email"
                ariaLabel="enter email"
                inputStyles="py-4 text-lg border-accent-dark"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </RequiredIndicator>
          </InputContainer>
          <InputContainer classes="mb-8 relative">
            <button
              onClick={() =>
                setViewPassword((prevViewPassword) => !prevViewPassword)
              }
              type="button"
              aria-label="show/hide password"
              title="pokaż / ukryj hasło"
              className="absolute z-[1] right-0 top-5 h-[62px] w-[62px] flex justify-center items-center group"
            >
              {viewPassword ? (
                <AiFillEyeInvisible className="w-6 h-6 text-black-dark group-hover:text-accent-dark transition-all duration-150" />
              ) : (
                <AiFillEye className="w-6 h-6 text-black-dark group-hover:text-accent-dark transition-all duration-150" />
              )}
            </button>
            <RequiredIndicator posX="right-4" posY="-top-2">
              <Input
                id="user-password"
                error={data?.errors?.password}
                type={viewPassword ? 'text' : 'password'}
                label="hasło"
                name="password"
                value={userData.password}
                placeholder="hasło"
                ariaLabel="enter password"
                inputStyles="py-4 text-lg"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </RequiredIndicator>
          </InputContainer>
          <AuthButton
            Icon={GiPadlock}
            type="submit"
            label="zaloguj się"
            btnTitle="zaloguj się"
            ariaLabel="log in"
          />
        </Form>
      </main>
      <Footer />
    </>
  );
}
