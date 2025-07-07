import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

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
