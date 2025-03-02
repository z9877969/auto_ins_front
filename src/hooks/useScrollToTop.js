import { useEffect } from 'react';

export const useScrollToTop = () => {
  useEffect(() => {
    scrollTo({ top: 0 });
  });
};
