import { Box, styled } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '32px',
    padding: '60px',
    margin: '16px',
    borderRadius: '16px',
    backgroundColor: '#00000020',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #fff',
    [theme.breakpoints.up('sm')]: {
      width: '500px',
      margin: '80px auto',
    },
  };
});
