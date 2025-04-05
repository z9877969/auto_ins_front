import { useEffect } from 'react';

export const useScrollToTop = (scrollResolver) => {
  useEffect(() => {
    scrollResolver === undefined && scrollTo({ top: 0 });
  });
};
