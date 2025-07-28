import { styled } from '@mui/material/styles';
import { Box, Button as MuiButton } from '@mui/material';

export const Button = styled(MuiButton)(({ theme }) => ({
  minWidth: 126,
  marginTop: 16,
  paddingLeft: 0,
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  borderRadius: 16,
  textTransform: 'initial',

  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },

  '& .iconWrapper': {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.yellow,
  },

  '& .chevronIcon': {
    width: 16,
    height: 16,
    transform: 'rotate(0)',
    transition: 'transform 0.1s linear',
    '&.rotate': {
      transform: 'rotate(-180deg)',
    },
  },
}));

export const Wrapper = styled(Box)(({ theme }) => ({
  '&.MuiBox-root': {
    '& .MuiTypography-root': {
      backgroundColor: theme.palette.primary.white,
      color: theme.palette.primary.main,
    },
    overflow: 'hidden',
    maxHeight: '500px',
    opacity: 1,
    transition: 'opacity 0.4s ease',
    '&.show': {
      maxHeight: 0,
      opacity: 0,
    },

    [theme.breakpoints.up('lg')]: {
      maxHeight: 'unset',
      display: 'flex',
      flexWrap: 'wrap',
      columnGap: '2em'
    },
  },
}));

export const InfoWrapper = styled(Box)(({ theme }) => ({
  '&:first-of-type': {
    marginBottom: '1em',
    [theme.breakpoints.up('lg')]: {
      marginBottom: 0,
    },
  },
  [theme.breakpoints.up('lg')]: {
    width: '40%',
  },
}));

export const InfoTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.1em',
  marginBottom: '0.2em',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2em',
  },
}));

export const InfoList = styled(Box)(() => ({
  display: 'block',
}));

export const InfoItem = styled(Box)(() => ({
  display: 'block',
}));

export const UrlsList = styled(Box)(({ theme }) => ({
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

  [theme.breakpoints.up('lg')]: {
    width: 'auto',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    rowGap: '4px',
    columnGap: '2em'
  },
}));

export const UrlItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  listStyle: 'inside',

  [theme.breakpoints.up('lg')]: {
    width: '40%',
  },

  '& span': {
    alignSelf: 'center',
  },
}));
