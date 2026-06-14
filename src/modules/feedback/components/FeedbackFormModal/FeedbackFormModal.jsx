import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import GeneralInput from 'components/GeneralInput/GeneralInput';
import {
  InputContStyled,
  InputStyled,
  LableStyled,
} from 'components/GeneralInput/GeneralInput.styled';
import { useSubmitFeedback } from '../../hooks/useSubmitFeedback';
import * as S from './FeedbackFormModal.styled';

const validationSchema = Yup.object({
  rating: Yup.number().min(1, 'Оберіть рейтинг').required('Оберіть рейтинг'),
  name: Yup.string()
    .min(2, 'Мінімум 2 символи')
    .max(20, 'Максимум 20 символів')
    .required('Обов\'язкове поле'),
  text: Yup.string()
    .min(5, 'Мінімум 5 символів')
    .max(300, 'Максимум 300 символів')
    .required('Обов\'язкове поле'),
});

const FeedbackFormModal = ({ open, onClose, onSuccess }) => {
  const [hovered, setHovered] = useState(0);
  const { submit, isLoading } = useSubmitFeedback();

  const formik = useFormik({
    initialValues: { rating: 0, name: '', text: '' },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await submit(values);
      resetForm();
      onClose();
      onSuccess();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const ratingError = formik.touched.rating && formik.errors.rating;

  return (
    <S.DialogStyled open={open} onClose={handleClose}>
      <S.CloseButton onClick={handleClose} aria-label="закрити">
        <CloseIcon sx={{ fontSize: '24px' }} />
      </S.CloseButton>

      <S.Title component="h2">Залишити відгук</S.Title>

      <form onSubmit={formik.handleSubmit} noValidate>
        <S.RatingRow>
          <S.RatingLabel>Рейтинг</S.RatingLabel>
          <S.StarsRow>
            {Array.from({ length: 5 }, (_, i) => {
              const starValue = i + 1;
              const isFilled = starValue <= (hovered || formik.values.rating);
              return (
                <S.StarButton
                  key={i}
                  type="button"
                  aria-label={`${starValue} зірок`}
                  onMouseEnter={() => setHovered(starValue)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => formik.setFieldValue('rating', starValue)}
                >
                  {isFilled ? (
                    <StarIcon sx={{ color: '#FCD922', fontSize: '32px' }} />
                  ) : (
                    <StarBorderIcon sx={{ color: 'rgba(254,254,255,0.4)', fontSize: '32px' }} />
                  )}
                </S.StarButton>
              );
            })}
          </S.StarsRow>
        </S.RatingRow>
        {ratingError && (
          <S.ErrorText sx={{ mb: '12px' }}>
            {ratingError}
          </S.ErrorText>
        )}

        <Box sx={{ mb: '16px' }}>
          <GeneralInput
            id="name"
            lableText=""
            placeholder="Ваше ім'я"
            formikData={formik}
            handleBlur={formik.handleBlur}
          />
        </Box>

        <InputContStyled sx={{ mb: '24px' }}>
          <LableStyled variant="inputLable" component="label" htmlFor="text">
            {formik.touched.text && formik.errors.text && (
              <span className="errorMessages">{formik.errors.text}</span>
            )}
          </LableStyled>
          <InputStyled
            id="text"
            name="text"
            multiline
            rows={5}
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ваш відгук"
            error={formik.touched.text && Boolean(formik.errors.text)}
            sx={{
              '&&': { height: 'auto', alignItems: 'flex-start', paddingLeft: '24px', paddingRight: '24px' },
              '& .MuiInputBase-inputMultiline': { padding: 0 },
            }}
          />
        </InputContStyled>

        <S.SubmitButton type="submit" disabled={isLoading}>
          Надіслати
        </S.SubmitButton>
      </form>
    </S.DialogStyled>
  );
};

export default FeedbackFormModal;
