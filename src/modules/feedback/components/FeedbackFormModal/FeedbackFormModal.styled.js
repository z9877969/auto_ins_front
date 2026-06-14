import { Box, Dialog, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(3, 3, 3, 0.8)',
  },
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.primary.main,
    padding: '48px 16px',
    borderRadius: '50px',
    width: '100%',
    maxWidth: '504px',
    margin: '16px',
    position: 'relative',
    boxShadow: '0 0 60px 10px rgba(255, 255, 255, 0.15)',
    [theme.breakpoints.up('sm')]: {
      padding: '60px 72px',
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
  color: 'rgba(93,93,93,1)',
  transition: 'opacity 200ms',
  '&:hover': { color: theme.palette.primary.white },
}));

export const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  '&&': {
    fontSize: '1.375rem',
    fontWeight: 800,
    color: theme.palette.primary.white,
    marginBottom: '24px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.375rem',
      marginBottom: '32px',
    },
  },
}));

export const RatingRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  marginBottom: '20px',
}));

export const RatingLabel = styled(Typography)(({ theme }) => ({
  '&&': {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: theme.palette.primary.white,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
}));

export const StarsRow = styled(Box)(() => ({
  display: 'flex',
  gap: '2px',
}));

export const StarButton = styled('button')(() => ({
  background: 'none',
  border: 'none',
  padding: '2px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  '&&': {
    color: theme.palette.primary.red,
    fontSize: '12px',
    lineHeight: '1.1',
    textAlign: 'end',
    paddingRight: '15px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  },
}));

export const SubmitButton = styled('button')(({ theme }) => ({
  width: '100%',
  padding: '16px',
  marginTop: '8px',
  borderRadius: '50px',
  border: 'none',
  background: theme.palette.primary.blue,
  color: theme.palette.primary.white,
  fontFamily: 'Open Sans',
  fontSize: '1.125rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background 200ms',
  '&:hover': { background: theme.palette.primary.secondaryBlue },
  '&:active': { background: theme.palette.primary.tertiaryBlue },
  '&:disabled': {
    background: theme.palette.primary.lightBlue,
    cursor: 'default',
  },
}));
