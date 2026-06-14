import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 28px',
  height: '100%',
  boxSizing: 'border-box',
  [theme.breakpoints.up('sm')]: {
    padding: '38px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '40px 38px',
  },
}));

export const QuoteMarkWrapper = styled(Box)(() => ({
  marginBottom: '16px',
  lineHeight: 0,
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
    fontWeight: 700,
    color: theme.palette.primary.white,
    lineHeight: '1.3125rem',
    marginBottom: '8px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.125rem',
      lineHeight: '1.5rem',
    },
  },
}));

export const StarsRow = styled(Box)(() => ({
  display: 'flex',
  gap: '4px',
}));
