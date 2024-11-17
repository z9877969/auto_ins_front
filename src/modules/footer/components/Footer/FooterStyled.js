import { Box, Container, Typography, styled } from '@mui/material';
import { masterCardIcon, visaIcon } from '../../images';

export const FooterS = styled(Container)(({ theme }) => ({
  padding: '0',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('xs')]: {
    padding: '32px 0 8px',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '48px 0 16px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '64px 0 32px',
  },
}));

export const FooterBoxS = styled(Container)(({ theme }) => ({
  margin: '0',
  [theme.breakpoints.up('xs')]: {
    width: '343px',
    height: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '28px',
  },
  [theme.breakpoints.up('sm')]: {
    width: '328px',
    height: '282px',
    gap: '32px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '370px',
  },
}));

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

export const BoxIconS = styled(Box)(({ theme }) => ({
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

export const NavListsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '32px',

  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    rowGap: 0,
  },
}));

export const WithBanksIconsWrapper = styled(Box)`
  padding-bottom: 32px;
  background-image: url(${masterCardIcon}), url(${visaIcon});
  background-repeat: no-repeat;
  background-position-y: bottom, bottom;
  background-position-x: calc(100% / 4 * 1.6), calc(100% - 100% / 4 * 1.6);
  background-size: auto 32px;
`;

export const ChapterSpan = styled(Typography)(({ theme }) => ({
  '&.chapterSpan': {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '1.5',
    color: theme.palette.primary.white,
    transition: 'color 250ms linear',
    '&:hover': {
      color: theme.palette.primary.blue,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
  '& .link': {
    [theme.breakpoints.up('xs')]: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.5',
      color: theme.palette.primary.white,
      paddingBottom: '0!important',
    },
  },
  '&.bottomSpan': {
    [theme.breakpoints.up('xs')]: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.5',
      paddingBottom: '32px',
    },
  },
}));