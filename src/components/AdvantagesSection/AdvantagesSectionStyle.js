import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const GridContainer = styled(Grid)(({ theme }) => ({
  gap: '16px',
  justifyContent: 'center',
  '& .MuiGrid2-root': {},
  [theme.breakpoints.up('sm')]: {
    gap: '24px',
  },
  '& .title': {
    marginBottom: '4px',
    [theme.breakpoints.up('sm')]: { marginBottom: '8px' },
  },
}));
export const ItemS = styled(Box)({
  display: 'flex',
  gap: '8px',
});

export const TextContainerS = styled(Box)(({ theme }) => ({
  width: '81%',
  [theme.breakpoints.up('sm')]: {
    width: '242px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '266px',
  },
}));
export const BoxImgS = styled(Box)(({ theme }) => ({
  fill: theme.palette.primary.white,
  [theme.breakpoints.up('xs')]: {
    width: '64px',
    height: '64px',
    margin: '0 auto',
  },
  [theme.breakpoints.up('sm')]: {
    width: '78px',
    height: '78px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '96px',
    height: '96px',
  },
}));
