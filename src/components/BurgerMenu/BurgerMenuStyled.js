import { styled } from '@mui/material/styles';
import { Box, Divider, Drawer } from '@mui/material';

export const BoxImg = styled(Box)(({ theme }) => ({
  stroke: theme.palette.primary.white,
  width: '32px',
  height: '32px',
  padding: '0',
}));

export const HeaderMenu = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.primary.main,
  padding: '8px 16px',
  alignIitems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    padding: '16px',
    justifyContent: 'flex-end',
  },
}));
export const MenuContainer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paperAnchorRight': {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '48%',
    },
  },
  '& .MuiBackdrop-root': {
    top: '80px',
  },
  '& .menuBodyWrapper': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'calc(100% - 80px)',
  },
}));

export const BodyMenu = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.white,
  height: '100%',
  padding: ' 32px 16px 16px 16px',
  [theme.breakpoints.up('sm')]: {
    padding: '40px 16px 16px 16px',
  },

  '& .MuiTypography-root': {
    color: theme.palette.primary.main,
    fontSize: '1.375rem',
    padding: '16px 0',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 800,
    lineHeight: '1.5rem',

    [theme.breakpoints.up('sm')]: {
      padding: '24px 0',
      lineHeight: '2.06rem',
    },
  },
}));

export const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
}));
