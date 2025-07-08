import { styled } from '@mui/material/styles';
import { Box, Button as MuiButton } from '@mui/material';

export const Button = styled(MuiButton)(({ theme }) => ({
  marginTop: 16,
  marginBottom: 16,
  backgroundColor: 'transparent',
  color: theme.palette.primary.blue,
  borderRadius: 16,

  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.blue,
  },

  '& .chevronIcon': {
    transform: 'rotate(0)',
    transition: 'transform 0.1s linear',
    '&.rotate': {
      transform: 'rotate(180deg)',
    },
  },
}));

export const Wrapper = styled(Box)(({ theme, isShow }) => ({
  '&.MuiBox-root': {
    '& .MuiTypography-root': {
      backgroundColor: theme.palette.primary.white,
      color: theme.palette.primary.main,
    },
    overflow: 'hidden',
    maxHeight: '500px',
    opacity: 1,
    transition: 'opacity 0.4s ease',
    ...(!isShow && {
      maxHeight: 0,
      opacity: 0,
    }),
  },
}));

export const BoxFooter = styled(Box)(({ theme }) => ({
  padding: '16px 0',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    flexDirection: 'column',
    rowGap: '4px',
  },

  '& .rowWrapper': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& span': {
      alignSelf: 'center',
    },
  },
}));
