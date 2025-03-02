import { Box, Typography, styled } from '@mui/material';

export const LogoBox = styled(Box)(({ theme }) => ({
  width: '163px',
  height: '97px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    width: '174px',
    height: '104px',
  },
}));

export const BoxIcon = styled(Box)(({ theme }) => ({
  '&.logoIcon': {
    width: '110px',
    height: '52px',
    [theme.breakpoints.up('sm')]: {
      width: '117px',
      height: '55px',
    },
  },
  '&.socialIconBox': {
    width: '24px',
    height: '24px',
  },
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  '&.logoText': {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '33px',
    fontWeight: 700,
    lineHeight: '1.39',
    inlineSize: 'max-content',
    [theme.breakpoints.up('sm')]: {
      fontSize: '36px',
      lineHeight: '1.36',
    },
  },
}));
