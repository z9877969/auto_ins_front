import { Fragment, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, ListItemButton, ListItemText } from '@mui/material';
import BurgerSocialList from 'components/BurgerSocialList/BurgerSocialList';
import { SpriteSVG } from '../../images/SpriteSVG';
import {
  BodyMenu,
  BoxImg,
  DividerStyled,
  HeaderMenu,
  MenuContainer,
} from './BurgerMenuStyled';
import { BoxIconHS, LogoBoxS, LogoTextHS } from '../Header/HeaderStyled';
import { headerNavOptions } from '../Header/headerNavOptions';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = useCallback(
    (open) => (event) => {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      setOpen(open);
    },
    []
  );

  const onNavClick = (id) => () => {
    navigate('/', { state: { id } });
    setOpen(false);
  };
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        sx={{ padding: '0px' }}
      >
        <BoxImg>
          <SpriteSVG name={'icon-burger'} />
        </BoxImg>
      </IconButton>
      <MenuContainer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ height: '100%' }}>
          <HeaderMenu>
            <LogoBoxS sx={{ display: { sm: 'none', lg: 'none' } }}>
              <BoxIconHS className="logoIcon">
                <SpriteSVG name={'icon-logo'} />
              </BoxIconHS>
              <LogoTextHS>AUTO-INS</LogoTextHS>
            </LogoBoxS>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close drawer"
              onClick={toggleDrawer(false)}
            >
              <BoxImg>
                <SpriteSVG name={'icon-x'} />
              </BoxImg>
            </IconButton>
          </HeaderMenu>

          <Box className="menuBodyWrapper">
            <BodyMenu>
              {headerNavOptions.map(({ uniqueName, title, to }) => (
                <Fragment key={uniqueName}>
                  <ListItemButton onClick={onNavClick(to)} sx={{ p: '0' }}>
                    <ListItemText primary={title} sx={{ m: 0 }} />
                  </ListItemButton>
                  <DividerStyled />
                </Fragment>
              ))}
            </BodyMenu>
            <BurgerSocialList linkOnClick={toggleDrawer(false)} />
          </Box>
        </Box>
      </MenuContainer>
    </>
  );
};

export default BurgerMenu;
