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
    color: theme.palette.primary.red,
    textAlign: 'end',
    maxWidth: '50%',
    lineHeight: '1.1',
    fontSize: '12px',
    ...errorposition,

    [theme.breakpoints.up('xs')]: {
      maxWidth: '200px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'unset',
      fontSize: '16px'
    },
  },
}));

export const LableStyled = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));
