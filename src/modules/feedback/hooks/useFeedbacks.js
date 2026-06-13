import { useCallback, useEffect, useRef, useState } from 'react';
import { getFeedbacksApi } from 'services/api';

const LIMIT = 20;
const PREFETCH_AT_INDEX = 14;

export const useFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [total, setTotal] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef(1);
  const isFetchingRef = useRef(false);

  const fetchPage = useCallback(async (page) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);
    try {
      const data = await getFeedbacksApi({ page, limit: LIMIT });
      setFeedbacks((prev) => [...prev, ...data.feedbacks]);
      setTotal(data.total);
      setAverageRating(data.averageRating);
      pageRef.current = page;
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const onIndexChange = useCallback(
    (index) => {
      if (index >= PREFETCH_AT_INDEX && feedbacks.length < total && !isFetchingRef.current) {
        fetchPage(pageRef.current + 1);
      }
    },
    [feedbacks.length, total, fetchPage]
  );

  return { feedbacks, total, averageRating, isLoading, onIndexChange };
};
