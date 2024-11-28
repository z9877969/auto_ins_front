import { Box, List, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { ContainerSection } from '../../style/Global.styled';

export const ItemS = styled(List)(({ theme }) => ({
  color: theme.palette.primary.main,
  listStyle: 'decimal',
  padding: '0 0 0 2em',
}));
export const AbsatzS = styled(Typography)(({ theme }) => ({
  '&.MuiTypography-caption': {
    textAlign: 'justify',
    margin: '1.4em 0',
    '&:last-child': {
      marginBottom: 0,
    },
    '&:first-of-type': {
      marginTop: 0,
    },
  },
  '& .link': {
    color: theme.palette.primary.blue,
    textDecoration: 'none',
  },
}));

export const CollapseContainer = styled(Collapse)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
  '& .MuiCollapse-vertical': {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 5,
    whiteSpace: 'normal',
    // whiteSpace: "pre-wrap",
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      WebkitLineClamp: 6,
    },
    [theme.breakpoints.up('lg')]: {
      WebkitLineClamp: 22,
    },
  },
  '&.MuiCollapse-entered': {
    '& .MuiCollapse-vertical': {
      display: 'block',
      // whiteSpace: "normal",
    },
  },
  '&.container': {
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
    },
  },
  '&.containerRight': {
    [theme.breakpoints.up('lg')]: {
      width: '568px',
      '& .MuiCollapse-vertical': { WebkitLineClamp: 4 },
    },
  },
}));
export const WrapperS = styled(Box)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    gap: '24px',
  },
  '& .cardMedia': {
    marginBottom: '24px',
    background:
      'linear-gradient(0deg, rgba(3, 3, 3, 0.05) 0%, rgba(3, 3, 3, 0.05) 100%)',
    borderRadius: '50px 0px 0px 50px',
    '& img': {
      borderRadius: '50px 0px 0px 50px',
      aspectRatio: '86/79',
    },
  },
}));

export const InfoSectionContainer = styled(ContainerSection)(({ theme }) => ({
  display: 'block',
  backgroundColor: theme.palette.primary.background,
  textAlign: 'center',
  [theme.breakpoints.up('lg')]: {
    padding: '120px 60px ',
  },

  '& .button': {
    marginTop: '24px',
    marginBottom: '32px',
    marginLeft: '0',
    marginRight: '0',

    [theme.breakpoints.up('sm')]: { marginTop: '32px', marginBottom: '56px' },
    [theme.breakpoints.up('lg')]: {
      marginTop: '48px',
      marginBottom: 0,
      transform: 'translate(-25%, 0%)',
    },
  },
  '& .cardMediaTablet': {
    marginTop: '32px',
    margin: '0 auto',
    aspectRatio: '343/240',
    [theme.breakpoints.up('sm')]: {
      width: '680px',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },

    '& img': { borderRadius: '50px' },
  },
  '& .cols': {
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, calc((100% - 16px) / 2))',
      gridColumnGap: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridColumnGap: '24px',
    },
  },
}));

export const SectionS = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.primary.background,
}));
