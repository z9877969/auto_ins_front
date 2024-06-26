import { Box, MenuItem, OutlinedInput, Select, styled } from '@mui/material';

export const InputContStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  [theme.breakpoints.up('sm')]: {
    gap: 16,
    width: 292,
  },
  [theme.breakpoints.up('lg')]: {
    width: 470,
  },
}));

export const ChevronBoxStyled = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems:'center',
  pointerEvents: 'none',
  position: 'absolute',
  right:15,
  cursor: 'pointer',
  '& svg': {
    height: 24,
    width: 24,
},
}));
export const InputStyled = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
  height: 56,
  padding: 16,
  borderRadius: 50,
  backgroundColor: theme.palette.primary.lightBlue2,
  border: 'none !important',
  outline: 'none !important',
  '&:hover, &:focus': {
    border: 'none !important',
    outline: 'none !important',
  },
  '& .Mui-focused': {
    border: 'none !important',
    outline: 'none !important',
  },
  '& .MuiInputBase-input.MuiOutlinedInput-input': {
    color: `${theme.palette.primary.main}`,
    fontWeight: 600,
    fontFamily: 'Open Sans',
    fontSize: 16,
    lineHeight: '150%' /* 24px */,
    border: 'none !important',
    outline: 'none !important',
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
    border: `1px solid ${theme.palette.primary.white} !important`,
    outline: 'none !important',
    '&:hover, &:focus': {
      border: 'none !important',
      outline: 'none !important',
    },
  },
  [theme.breakpoints.up('sm')]: {
    height: 59,
  },
}));
export const SelectStyled = styled(Select)(() => ({
  '& svg': {
    transition: 'transform 200ms ease-in-out',
  },
  '[aria-expanded=false]': {
    '& svg': {
      transform: 'rotateX(180deg)',
    },
  },
  '[aria-expanded=true]': {
    '& svg': {
      transform: 'rotateX(0deg)',
    },
  },

  '&.MuiButtonBase-root.MuiMenuItem-root': {
    padding: 12,
  },

  width: '100%',
}));

export const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: 12,
  transition: 'color 200ms ease-in-out',
  '&:hover': {
    color: theme.palette.primary.blue,
    '& .MuiListItemText-root': {
      color: theme.palette.primary.blue,
    },
    '& svg': {
      color: theme.palette.primary.blue,
    },
  },
  '&.Mui-selected': {
    '& .MuiListItemText-root': {
      color: theme.palette.primary.blue,
    },
    '& .MuiButtonBase-root': {
      '& svg': {
        width: 20,
        height: 20,
        fill: theme.palette.primary.white,
        stroke: theme.palette.primary.blue,
        background: theme.palette.primary.blue,
      },
    },
  },
  '& svg': {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  '& .MuiListItemText-root': {
    color: theme.palette.primary.main,
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: 1.5,
  },
  '& .MuiCheckbox-root': {
    width: 40,
  },
}));

const ITEM_HEIGHT = 59;
const ITEM_PADDING_TOP = 0;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 'fit-content',
      borderRadius: '25px',
      '&::WebkitScrollbar': {
        width: 6 /* ширина всей полосы прокрутки */,
      },
      '&::WebkitScrollbarTrack': {
        background: 'rgba(21, 71, 248, 0.6)' /* цвет зоны отслеживания */,
      },
      '&::WebkitScrollbarThumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)' /* цвет бегунка */,
        borderRadius: 4 /* округлось бегунка */,
      },
    },
  },
};
