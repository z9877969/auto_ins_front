import { OutlinedInput, styled } from '@mui/material';

export const InputStyled = styled(OutlinedInput)(({ theme, isError }) => ({
  width: '100%',
  height: 56,
  padding: 16,
  borderRadius: 50,
  backgroundColor: `${theme.palette.primary.white}`,
  // outline: 'none !important',
  '&.Mui-focused': {
    outline: isError ? '2px solid red' : 'none',
  },

  // '&.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.Mui-focused':
  // '&.MuiInputBase-root.MuiOutlinedInput-root.Mui-focused': {
  //   outline: isError ? '2px solid red' : 'none',
  //   border: 'none',
  // },
  '& .MuiInputBase-input.MuiOutlinedInput-input': {
    color: `${theme.palette.primary.main}`,
    fontWeight: 600,
    fontFamily: 'Open Sans',
    fontSize: 16,
    lineHeight: '150%' /* 24px */,
    '&:-webkit-autofill': {
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: theme.palette.primary.main,
    },
    '&:-webkit-autofill:focus': {
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },
  },

  '& fieldset.MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${
      isError ? theme.palette.error.main : theme.palette.primary.main
    }`,
  },
  [theme.breakpoints.up('sm')]: {
    height: 59,
  },
}));
