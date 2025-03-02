import { Box, Typography, styled } from '@mui/material';

export const InputContStyled = styled(Box)(({ theme, errorposition }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,

  [theme.breakpoints.up('sm')]: {
    gap: 16,
  },
  '& .errorMessage': {
    position: 'absolute',
    top: 'calc(100% + 0.2em)',
    right: 0,
    color: theme.palette.primary.red,
    textAlign: 'end',
    maxWidth: '100%',
    lineHeight: '1.1',
    fontSize: '12px',
    fontWeight: 600,
    ...errorposition,

    [theme.breakpoints.up('sm')]: {
      maxWidth: 'unset',
      fontSize: '16px',
      '&.half': {
        maxWidth: 'calc(100% / 2)',
      },
    },
  },
  '&.baseLine': {
    [theme.breakpoints.up('lg')]: {
      alignSelf: 'baseline',
    },
  },
}));

export const LableStyled = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));
