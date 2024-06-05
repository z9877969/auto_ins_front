import { styled } from '@mui/material';

export const HeroContainer = styled('div')(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.secondaryDark}`,

  paddingTop: 24,
  paddingLeft: 16,
  paddingRight: 16,
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: 744,
    paddingTop: 64,
    paddingLeft: 32,
    paddingRight: 32,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 1400,
    paddingTop: 104,
    paddingLeft: 120,
    paddingRight: 120,
  },
}));
