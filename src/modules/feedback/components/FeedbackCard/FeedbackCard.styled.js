import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  borderRadius: '16px',
  border: '1px solid rgba(254, 254, 255, 0.15)',
  backgroundColor: 'rgba(254, 254, 255, 0.04)',
  height: '100%',
  [theme.breakpoints.up('sm')]: {
    padding: '32px',
  },
}));

export const QuoteMark = styled(Typography)(({ theme }) => ({
  fontFamily: 'Georgia, serif',
  fontSize: '48px',
  lineHeight: 1,
  color: theme.palette.primary.white,
  marginBottom: '12px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '56px',
  },
}));

export const ReviewText = styled(Typography)(({ theme }) => ({
  flex: 1,
  fontSize: '0.875rem',
  fontWeight: 400,
  color: theme.palette.primary.white,
  lineHeight: 1.6,
  marginBottom: '24px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
}));

export const AuthorName = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 700,
  color: theme.palette.primary.white,
  marginBottom: '4px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.125rem',
  },
}));

export const StarsRow = styled(Box)(() => ({
  display: 'flex',
  gap: '2px',
}));
