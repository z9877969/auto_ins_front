import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Section = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '100%',
}));

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginBottom: '40px',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '56px',
  },
}));

export const HeaderLeft = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flexShrink: 0,
}));

export const RatingBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '54px',
  height: '54px',
  borderRadius: '50%',
  background: 'conic-gradient(from 270deg, rgba(252,217,34,0) 0deg, rgba(252,217,34,1) 360deg)',
  flexShrink: 0,
  [theme.breakpoints.up('sm')]: {
    width: '88px',
    height: '88px',
  },
}));

export const RatingBadgeInner = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'calc(100% - 6px)',
  height: 'calc(100% - 6px)',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
}));

export const RatingValue = styled(Typography)(({ theme }) => ({
  '&&': {
    fontSize: '0.875rem',
    fontWeight: 800,
    color: theme.palette.primary.white,
    lineHeight: 1,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.375rem',
    },
  },
}));

export const RatingInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}));

export const ReviewCount = styled(Typography)(({ theme }) => ({
  '&&': {
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.primary.white,
    lineHeight: '1.5rem',
  },
}));

export const ReviewFraction = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 400,
  color: theme.palette.primary.white,
  lineHeight: '1.3125rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  flex: 1,
  '&&': {
    fontSize: '1.375rem',
    fontWeight: 800,
    color: theme.palette.primary.white,
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      fontSize: '2.375rem',
    },
  },
}));

export const LeaveReviewButton = styled('button')(({ theme }) => ({
  flexShrink: 0,
  padding: '16px 38px',
  borderRadius: '50px',
  border: 'none',
  background: theme.palette.primary.blue,
  color: theme.palette.primary.white,
  fontFamily: 'Open Sans',
  fontSize: '1.125rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'opacity 200ms',
  whiteSpace: 'nowrap',
  '&:hover': { opacity: 0.85 },
  '&:active': { opacity: 0.7 },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '14px 24px',
    fontSize: '1rem',
  },
}));

const DIVIDER = '1px solid #F7F8FF';

export const CardsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 0,
  marginBottom: '32px',
  borderTop: DIVIDER,
  borderLeft: DIVIDER,
  borderTopLeftRadius: '50px',
  // mobile (1 col): horizontal line between stacked cards
  [theme.breakpoints.down('sm')]: {
    '& > *:not(:last-child)': {
      borderBottom: DIVIDER,
    },
  },
  // tablet (2 cols): vertical divider on even cards, horizontal between rows
  [theme.breakpoints.between('sm', 'lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    height: '436px',
    '& > *:nth-of-type(2n)': {
      borderLeft: DIVIDER,
    },
    '& > *:nth-of-type(n+3)': {
      borderTop: DIVIDER,
    },
  },
  // desktop (3 cols): vertical dividers only
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    height: '496px',
    '& > *:nth-of-type(2n)': {
      borderLeft: DIVIDER,
      borderTop: 'none',
    },
    '& > *:nth-of-type(n+3)': {
      borderLeft: DIVIDER,
      borderTop: 'none',
    },
    '& > *:first-of-type': {
      borderLeft: 'none',
    },
  },
}));

export const PaginationRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
}));

export const NavButton = styled(IconButton)(({ theme }) => ({
  width: '56px',
  height: '56px',
  backgroundColor: theme.palette.primary.blue,
  color: theme.palette.primary.white,
  '&:hover': { backgroundColor: theme.palette.primary.blue, opacity: 0.85 },
  '&:active': { backgroundColor: theme.palette.primary.blue, opacity: 0.7 },
  '&.Mui-disabled': {
    backgroundColor: 'rgba(21,71,248,0.25)',
    color: 'rgba(254,254,255,0.3)',
  },
  [theme.breakpoints.up('sm')]: {
    width: '59px',
    height: '59px',
  },
}));
