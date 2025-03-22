import { Box, styled, Typography } from '@mui/material';

export const Section = styled(Box)(() => ({
  '& .section-container': {
    paddingBottom: 0,
  },
}));

export const Wrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.5rem',
  },
}));

export const TitleWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    gridArea: '1 / 1 / 2 / 2',
    paddingTop: '1rem',
    '& .main-title': {
      marginBottom: '2rem',
    },
  },
}));

export const VideoWrapper = styled('div')(({ theme }) => ({
  marginBottom: '1rem',
  [theme.breakpoints.up('sm')]: {
    marginBottom: '2rem',
  },
  [theme.breakpoints.up('lg')]: {
    gridArea: '1 / 2 / span 3 / span 3',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 0,
  },
}));

export const List = styled(Box)(() => ({
  padding: '0 1rem',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '0.5rem',
  gridArea: '2 / 1 / 3 / 2',
}));

export const Item = styled(Typography)(({ theme }) => ({
  display: 'flex',
  columnGap: '0.5rem',
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    columnGap: '0.75rem',
  },
  [theme.breakpoints.up('lg')]: {
    columnGap: '1rem',
  },
}));

export const Num = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 1.9rem',
  height: '1.9rem',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  backgroundColor: theme.palette.primary.white,
  color: theme.palette.primary.main,
  borderRadius: '50%',
  alignSelf: 'center',
}));
