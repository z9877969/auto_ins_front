import { Box, Dialog, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(3, 3, 3, 0.8)',
  },
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.primary.main,
    padding: '56px 24px 0',
    borderRadius: '50px',
    width: '100%',
    maxWidth: '504px',
    margin: '16px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 0 60px 10px rgba(255, 255, 255, 0.15)',
    [theme.breakpoints.up('sm')]: {
      padding: '72px 56px 0',
    },
  },
}));

export const CloseButton = styled('button')(() => ({
  position: 'absolute',
  top: '20px',
  right: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'rgba(93,93,93,1)',
  transition: 'color 200ms',
  '&:hover': { color: '#fff' },
}));

export const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  '&&': {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: theme.palette.primary.white,
    marginBottom: '8px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.375rem',
      marginBottom: '12px',
    },
  },
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  '&&': {
    fontSize: '0.875rem',
    fontWeight: 400,
    color: theme.palette.primary.white,
    marginBottom: '40px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      fontWeight: 600,
      marginBottom: '56px',
    },
  },
}));

export const CarImageWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  '& img': {
    width: '100%',
    maxWidth: '340px',
    height: 'auto',
  },
}));
