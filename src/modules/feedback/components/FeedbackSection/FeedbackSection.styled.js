import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Section = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '100%',
}));

export const Container = styled(Box)(({ theme }) => ({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '56px 16px',
  [theme.breakpoints.up('sm')]: {
    padding: '72px 32px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '120px 120px',
  },
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
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  border: `3px solid ${theme.palette.primary.yellow}`,
  flexShrink: 0,
  [theme.breakpoints.up('sm')]: {
    width: '64px',
    height: '64px',
  },
}));

export const RatingValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 800,
  color: theme.palette.primary.white,
  lineHeight: 1,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.375rem',
  },
}));

export const RatingInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}));

export const ReviewCount = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.primary.white,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.375rem',
  fontWeight: 800,
  color: theme.palette.primary.white,
  textAlign: 'center',
  flex: 1,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.75rem',
    textAlign: 'center',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '2rem',
  },
}));

export const LeaveReviewButton = styled('button')(({ theme }) => ({
  flexShrink: 0,
  padding: '12px 24px',
  borderRadius: '50px',
  border: 'none',
  background: theme.palette.primary.blue,
  color: theme.palette.primary.white,
  fontFamily: 'Open Sans',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background 200ms',
  whiteSpace: 'nowrap',
  '&:hover': { background: theme.palette.primary.secondaryBlue },
  '&:active': { background: theme.palette.primary.tertiaryBlue },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '14px 24px',
  },
}));

export const CardsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  marginBottom: '32px',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

export const PaginationRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
}));

export const NavButton = styled(IconButton)(({ theme }) => ({
  width: '48px',
  height: '48px',
  backgroundColor: theme.palette.primary.blue,
  color: theme.palette.primary.white,
  '&:hover': { backgroundColor: theme.palette.primary.secondaryBlue },
  '&:active': { backgroundColor: theme.palette.primary.tertiaryBlue },
  '&.Mui-disabled': {
    backgroundColor: 'rgba(254,254,255,0.1)',
    color: 'rgba(254,254,255,0.3)',
  },
}));
