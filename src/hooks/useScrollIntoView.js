import { useEffect, useRef } from 'react';

export const useScrollIntoView = (position = 'center') => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current && ref.current.scrollIntoView({ block: position });
  }, [position]);

  return ref;
};
