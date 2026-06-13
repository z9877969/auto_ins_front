import { Box, Dialog, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(3, 3, 3, 0.8)',
  },
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.primary.main,
    padding: '56px 40px 0',
    borderRadius: '32px',
    width: '100%',
    maxWidth: '504px',
    margin: '16px',
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      padding: '72px 56px 0',
    },
  },
}));

export const CloseButton = styled('button')(({ theme }) => ({
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
  color: theme.palette.primary.white,
  opacity: 0.6,
  transition: 'opacity 200ms',
  '&:hover': { opacity: 1 },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 800,
  color: theme.palette.primary.white,
  textAlign: 'center',
  marginBottom: '12px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
  },
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 400,
  color: theme.palette.primary.white,
  textAlign: 'center',
  marginBottom: '40px',
  [theme.breakpoints.up('sm')]: {
    marginBottom: '56px',
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
