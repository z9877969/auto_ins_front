import { useState } from 'react';
import { postFeedbackApi } from 'services/api';

export const useSubmitFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submit = async ({ name, text, rating }) => {
    setIsLoading(true);
    try {
      await postFeedbackApi({ name, text, rating });
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading };
};
