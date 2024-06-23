import { Box, Typography, styled } from '@mui/material';

export const InputContStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,

  [theme.breakpoints.up('sm')]: {
    gap: 16,
  },
}));

export const LableStyled = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  '& .errorMessages': {
    position: 'absolute',
    color: theme.palette.primary.red,
    textAlign: 'end',
    maxWidth: 300,
    right: 15,
    // textAlign: "left",
    lineHeight: '1.1',
  },
}));
