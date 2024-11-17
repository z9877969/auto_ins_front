import { Link as MuiLink, styled, Typography } from '@mui/material';

export const Link = styled(MuiLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: '12px',
  stroke: theme.palette.primary.main,
  fill: 'none',
  transition: 'stroke 250ms linear',
  '&:hover': {
    stroke: theme.palette.primary.blue,
  },
}));

export const LinkText = styled(Typography)(({ theme }) => ({
  '&.linkText': {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '1.5',
    color: theme.palette.primary.white,
    transition: 'color 250ms linear',
    textIlign: 'center',
    '&:hover': {
      color: theme.palette.primary.blue,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
}));
