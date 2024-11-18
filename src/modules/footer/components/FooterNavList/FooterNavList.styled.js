import {
  List as MuiList,
  ListItem as MuiListItem,
  styled,
  Typography,
} from '@mui/material';

export const List = styled(MuiList)(({ theme }) => ({
  width: '220px',
  padding: '0px',
  margin: '0px',
  display: 'flex',
  flexDirection: 'column',

  gap: '24px',
  [theme.breakpoints.up('sm')]: {
    width: '242px',
  },
  '&.centered': {
    [theme.breakpoints.up('xs')]: {
      gap: '17px',
    },
    [theme.breakpoints.up('sm')]: {
      gap: '16px',
    },
  },
}));

export const ListItem = styled(MuiListItem)(({ justifyContent }) => ({
  cursor: 'pointer',
  width: 'auto',
  padding: '8px 0',
  display: 'flex',
  justifyContent,
  // alignSelf: 'center'
}));

export const ChapterSpan = styled(Typography)(({ theme }) => ({
  '&.chapterSpan': {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '1.5',
    color: theme.palette.primary.white,
    transition: 'color 250ms linear',
    '&:hover': {
      color: theme.palette.primary.blue,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
  '& .link': {
    [theme.breakpoints.up('xs')]: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.5',
      color: theme.palette.primary.white,
      paddingBottom: '0!important',
    },
  },
  '&.bottomSpan': {
    [theme.breakpoints.up('xs')]: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.5',
      paddingBottom: '32px',
    },
  },
}));
