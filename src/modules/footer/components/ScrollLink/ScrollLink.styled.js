import { styled, Typography } from '@mui/material';

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
}));
