import { Box, styled } from '@mui/material';

export const Wrapper = styled(Box)(() => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  height: 'auto',
  padding: '0 1rem',
  display: 'flex',
  justifyContent: 'center',

  ['& .frame']: {
    position: 'relative',
    width: '100%',
    maxWidth: '560px',
    aspectRatio: '16 / 9',
    cursor: 'pointer',
  },

  ['& .thumbnail']: {
    width: '100%',
    height: '100%',
    padding: '4px',
    backgroundColor: 'white',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 0.3s ease-in-out',
  },

  ['& .thumbnail:hover']: {
    opacity: 0.9,
  },

  ['& .play-button']: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff50',
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
