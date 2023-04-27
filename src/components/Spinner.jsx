import React from 'react';
import { useNavigation } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner';

export default function Spinner() {
  const navigation = useNavigation();
  return navigation.state === 'loading' ? (
    <div className=" w-full flex justify-left items-center py-2 pl-8">
      <Vortex
        visible={true}
        height="32"
        width="32"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={[
          '#991b1b',
          '#dc2626',
          '#ef4444',
          '#22d3ee',
          '#67e8f9',
          '#a5f3fc',
        ]}
      />
      <span className="font-normal ml-2 text-md text-black-dark">
        Ładowanie danych ...
      </span>
    </div>
  ) : navigation.state === 'submitting' ? (
    <div className=" w-full flex justify-left items-center py-2 pl-8">
      <Vortex
        visible={true}
        height="32"
        width="32"
        ariaLabel="vortex-submitting"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={[
          '#991b1b',
          '#dc2626',
          '#ef4444',
          '#22d3ee',
          '#67e8f9',
          '#a5f3fc',
        ]}
      />
      <span className="font-normal ml-2 text-md text-black-dark">
        Wysyłanie danych ...
      </span>
    </div>
  ) : null;
}
