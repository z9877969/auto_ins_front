import { Box, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ItemsList = styled(List)(({ theme }) => ({
  width: '100%',
  padding: '0 16px 16px 16px',
  margin: '0px',
  display: 'flex',
  alignItems: 'center',

  '&.centered': {
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.up('xs')]: {
      gap: '17px',
    },
    [theme.breakpoints.up('sm')]: {
      gap: '16px',
      padding: '0 24px 20px 24px',
    },
  },
}));

export const Item = styled(ListItem)(({ theme }) => ({
  '&.liSocialIcon': {
    width: '40px',
    height: '40px',
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'center',
    borderRadius: '50%',
    stroke: theme.palette.primary.white,
    fill: 'none',
    transition: 'stroke 250ms linear',
    '&:hover': {
      stroke: theme.palette.primary.blue,
    },
  },
}));

export const Icon = styled(Box)(({ theme }) => ({
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
