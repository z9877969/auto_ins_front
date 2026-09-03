import { styled } from '@mui/material';

export const PictureContainer = styled('picture')(({ theme }) => ({
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  height: 200,
  backgroundColor: theme.palette.primary.secondaryDark,

  [theme.breakpoints.up('sm')]: {
    width: 744,
    height: 341,
  },
  [theme.breakpoints.up('lg')]: {
    width: 1400,
    height: 434,
  },

  '& img': {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));
