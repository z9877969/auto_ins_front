import { Box, Container, Typography, styled } from '@mui/material';
import { masterCardIcon, visaIcon } from '../../images';

export const Footer = styled(Container)(({ theme }) => ({
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

export const FooterContainer = styled(Container)(({ theme }) => ({
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

export const OrderingWrapper = styled(Box)(({ theme }) => ({
  '&.links': {
    order: 3,

    [theme.breakpoints.up('sm')]: {
      order: 1,
    },
  },
  '&.scroll': {
    order: 2,
  },
  '&.social': {
    order: 1,

    [theme.breakpoints.up('sm')]: {
      order: 3,
    },
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
  '&.bottomSpan': {
    [theme.breakpoints.up('xs')]: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.5',
      paddingBottom: '32px',
    },
  },
}));
