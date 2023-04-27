import React from 'react';
import { useNavigation } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner';

export default function SpinnerOverlay() {
  const navigation = useNavigation();

  return (
    <div className="navigation-state">
      {navigation.state === 'submitting' ? (
        <div className="overlay-submitting fixed z-[1000] inset-x-0 inset-y-0 bg-black-dark bg-opacity-90 flex justify-center items-center">
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
          <span className="ml-2 text-md text-white">Wysyłanie...</span>
        </div>
      ) : null}
      {navigation.state === 'loading' ? (
        <div className="overlay-loading fixed z-[1000] inset-x-0 inset-y-0 bg-black-dark bg-opacity-90 flex justify-center items-center">
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
          <span className="ml-2 text-md text-white">Ładowanie danych ...</span>
        </div>
      ) : null}
    </div>
  );
}
