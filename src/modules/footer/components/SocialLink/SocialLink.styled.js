import { Box, Link as MuiLink, styled, Typography } from '@mui/material';

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

export const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.white,
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Icon = styled(Box)(({ fill }) => ({
  '&.socialIconBox': {
    width: '24px',
    height: '24px',

    '& svg': {
      width: '24px',
      height: '24px',
      fill: fill ? fill : 'none',
    },
  },
}));

export const LinkText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Open Sans, sans-serif',
  fontSize: '12px',
  fontWeight: 700,
  lineHeight: '1.39',
  display: 'block',
  // inlineSize: 'max-content',
  [theme.breakpoints.up('sm')]: {
    // fontSize: '36px',
    lineHeight: '1.36',
  },
}));
