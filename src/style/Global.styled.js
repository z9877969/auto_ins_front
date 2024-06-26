import { Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const BlueButton = styled(Button)(({ theme }) => ({
  padding: '16px 32px',
  borderRadius: '50px',
  fontFamily: 'Open Sans',
  fontSize: '18px',
  fontWeight: 600,
  textTransform: 'none',
  background: theme.palette.primary.blue,
  color: theme.palette.primary.white,
  '&:hover': {
    background: theme.palette.primary.secondaryBlue,
    color: theme.palette.primary.white,
  },
  '&:active': {
    background: theme.palette.primary.tertiaryBlue,
    color: theme.palette.primary.white,
  },
  '&.Mui-disabled': {
    background: theme.palette.primary.lightBlue,
    color: theme.palette.primary.white,
  },
}));

export const WhiteButton = styled(Link)(({ theme }) => ({
  width: '100%',
  padding: '16px 38px',
  textDecoration: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '50px',
  fontFamily: 'Open Sans',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '1.5',
  textTransform: 'none',
  border: '1px solid transparent',
  background: theme.palette.primary.white,
  color: theme.palette.primary.main,
  transition: 'background 350ms linear',
  [theme.breakpoints.up('sm')]: {
    width: '163px',
    border: `1px solid ${theme.palette.primary.main}`,
    fontSize: '18px',
  },
  '&:hover': {
    '& div': {
      fill: theme.palette.primary.yellow,
    },
    background: theme.palette.primary.yellow,
  },
  '&:active': {
    background: theme.palette.primary.tertiaryYellow,
  },
  '&.Mui-disabled': {
    background: theme.palette.primary.white,
    color: theme.palette.primary.tertiaryDark,
    border: `1px solid ${theme.palette.primary.tertiaryDark}`,
    cursor: 'default',
    '& div': {
      fill: theme.palette.primary.white,
    },
  },
}));

export const YellowButton = styled(Button)(({ theme }) => ({
  padding: '16px 38px',
  fontSize: '1rem',
  borderRadius: '50px',
  fontFamily: 'Open Sans',
  fontWeight: 600,
  textTransform: 'none',
  background: theme.palette.primary.yellow,
  color: theme.palette.primary.main,
  '&:hover': {
    background: theme.palette.primary.secondaryYellow,
  },
  '&:active': {
    background: theme.palette.primary.tertiaryYellow,
  },
  '&.Mui-disabled': {
    background: theme.palette.primary.lightYellow,
    color: theme.palette.primary.tertiaryDark,
    border: '1px solid theme.palette.primary.lightYellow',
  },
}));

export const ContainerSection = styled(Container)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  [theme.breakpoints.up('xs')]: {
    padding: '56px 16px',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '72px 32px',
    width: '744px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '120px 120px',
    width: '1400px',
  },
  '& .main-title': {
    marginBottom: '32px',
    textAlign: 'center ',
    [theme.breakpoints.up('sm')]: { marginBottom: '56px' },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '72px',
    },
  },
}));

export const ContainerSectionPage = styled(ContainerSection)(() => ({
  '&.MuiContainer-root': { paddingTop: '16px' },
}));

export const PageContainerS = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.primary.lightBlue2,
  color: theme.palette.primary.main,
  display: 'flex',
  flex: 'auto',
}));

export const FormContainer = styled(Container)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.primary.white,
  padding: '16px',
  borderRadius: '35px',
  color: theme.palette.primary.main,

  [theme.breakpoints.up('sm')]: {
    padding: '24px',
    borderRadius: '50px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '32px',
  },
}));

export const InputS = styled('input')(({ theme }) => ({
  padding: '16px',
  border: '1px solid',
  borderColor: `${theme.palette.primary.main}`,
  borderRadius: '50px',
  fontFamily: 'Open Sans, sans-serif',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.5',
  color: theme.palette.primary.main,
  transition: 'borderColor 350ms linear',
  [theme.breakpoints.up('md')]: {
    fontSize: '18px',
  },
  '&::placeholder': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    borderColor: `${theme.palette.primary.darkBlue}`,
  },
  '&:focus': {
    borderColor: `${theme.palette.primary.darkBlue}`,
    outline: 'none',
  },
  '&.error': {
    borderColor: `${theme.palette.primary.red}`,
    '&:hover': {
      borderColor: `${theme.palette.primary.red}`,
    },
    '&:focus': {
      borderColor: `${theme.palette.primary.red}`,
      outline: 'none',
    },
  },
  '&.disabled': {
    borderColor: `${theme.palette.primary.tertiaryDark}`,
  },
}));
