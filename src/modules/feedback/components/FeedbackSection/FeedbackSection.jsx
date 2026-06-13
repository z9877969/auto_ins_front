import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import FeedbackCard from '../FeedbackCard/FeedbackCard';
import FeedbackFormModal from '../FeedbackFormModal/FeedbackFormModal';
import FeedbackSuccessModal from '../FeedbackSuccessModal/FeedbackSuccessModal';
import { useFeedbacks } from '../../hooks/useFeedbacks';
import * as S from './FeedbackSection.styled';

const FeedbackSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const { feedbacks, total, averageRating: averageRatingRaw, onIndexChange } = useFeedbacks();
  const averageRating = Number(averageRatingRaw);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const cardsPerPage = isDesktop ? 3 : isTablet ? 2 : 1;
  const visibleCards = feedbacks.slice(currentIndex, currentIndex + cardsPerPage);
  const canPrev = currentIndex > 0;
  const canNext = currentIndex + cardsPerPage < feedbacks.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = Math.max(0, prev - 1);
      onIndexChange(next);
      return next;
    });
  }, [onIndexChange]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      onIndexChange(next);
      return next;
    });
  }, [onIndexChange]);

  const handleSuccess = () => setIsSuccessOpen(true);

  if (!feedbacks.length) return null;

  return (
    <S.Section>
      <S.Container>
        <S.Header>
          <S.HeaderLeft>
            <S.RatingBadge>
              <S.RatingValue>{averageRating.toFixed(1)}</S.RatingValue>
            </S.RatingBadge>
            <S.RatingInfo>
              <S.ReviewCount>{total} відгуків</S.ReviewCount>
              <S.ReviewCount>{averageRating.toFixed(1)}/5</S.ReviewCount>
            </S.RatingInfo>
          </S.HeaderLeft>

          <S.SectionTitle component="h2">Відгуки наших клієнтів</S.SectionTitle>

          <S.LeaveReviewButton onClick={() => setIsFormOpen(true)}>
            Залишити відгук
          </S.LeaveReviewButton>
        </S.Header>

        <S.CardsGrid>
          {visibleCards.map((feedback) => (
            <FeedbackCard
              key={feedback.id}
              name={feedback.name}
              text={feedback.text}
              rating={feedback.rating}
            />
          ))}
        </S.CardsGrid>

        <S.PaginationRow>
          <S.NavButton onClick={handlePrev} disabled={!canPrev} aria-label="попередній">
            <ArrowBackIcon />
          </S.NavButton>
          <S.NavButton onClick={handleNext} disabled={!canNext} aria-label="наступний">
            <ArrowForwardIcon />
          </S.NavButton>
        </S.PaginationRow>
      </S.Container>

      <FeedbackFormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleSuccess}
      />
      <FeedbackSuccessModal
        open={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </S.Section>
  );
};

export default FeedbackSection;
