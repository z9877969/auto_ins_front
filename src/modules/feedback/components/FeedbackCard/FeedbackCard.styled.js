import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 28px',
  borderRadius: '7px',
  backgroundColor: 'rgba(35,35,35,1)',
  height: '100%',
  [theme.breakpoints.up('sm')]: {
    padding: '38px',
    borderRadius: '10px',
  },
}));

export const CardTop = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '16px',
}));

export const RatingNumber = styled(Typography)(({ theme }) => ({
  '&&': {
    fontSize: '1.8125rem',
    fontWeight: 700,
    color: theme.palette.primary.white,
    lineHeight: '2.4375rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem',
      lineHeight: '3.375rem',
    },
  },
}));

export const ReviewText = styled(Typography)(({ theme }) => ({
  flex: 1,
  fontSize: '0.875rem',
  fontWeight: 400,
  color: theme.palette.primary.white,
  lineHeight: '1.3125rem',
  marginBottom: '24px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
}));

export const AuthorName = styled(Typography)(({ theme }) => ({
  '&&': {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: theme.palette.primary.white,
    lineHeight: '1.3125rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
}));
