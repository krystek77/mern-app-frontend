import { useState } from 'react';

export function useResetInputFile() {
  const [key, setKey] = useState(Math.random().toString(36));
  return {
    key,
    setKey,
  };
}

export default useResetInputFile;
