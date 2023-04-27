import { useRef, useEffect } from 'react';

export function useScrollIntoView(model) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
  }, [model]);
  return {
    ref,
  };
}

export default useScrollIntoView;
