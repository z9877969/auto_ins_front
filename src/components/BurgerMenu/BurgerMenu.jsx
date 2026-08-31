import { Fragment, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Collapse,
  IconButton,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BurgerSocialList from 'components/BurgerSocialList/BurgerSocialList';
import { SpriteSVG } from '../../images/SpriteSVG';
import {
  BodyMenu,
  BoxImg,
  DividerStyled,
  HeaderMenu,
  MenuContainer,
  SubMenuStyled,
} from './BurgerMenuStyled';
import { BoxIconHS, LogoBoxS, LogoTextHS } from '../Header/HeaderStyled';
import { headerNavOptions } from '../Header/headerNavOptions';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const [openedDropdown, setOpenedDropdown] = useState(null);
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

  const onDropdownClick = (uniqueName) => () =>
    setOpenedDropdown((prev) => (prev === uniqueName ? null : uniqueName));
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
              {headerNavOptions.map(
                ({ uniqueName, title, type, to, href, target, rel, children }) => (
                  <Fragment key={uniqueName}>
                    {type === 'dropdown' ? (
                      <>
                        <ListItemButton
                          onClick={onDropdownClick(uniqueName)}
                          aria-expanded={openedDropdown === uniqueName}
                          sx={{ p: '0' }}
                        >
                          <ListItemText primary={title} sx={{ m: 0 }} />
                          <ExpandMoreIcon
                            sx={{
                              transition: 'transform 250ms linear',
                              transform:
                                openedDropdown === uniqueName
                                  ? 'rotate(180deg)'
                                  : 'none',
                            }}
                          />
                        </ListItemButton>
                        <Collapse
                          in={openedDropdown === uniqueName}
                          timeout="auto"
                          unmountOnExit
                        >
                          <SubMenuStyled>
                            {children.map((child) => (
                              <ListItemButton
                                key={child.uniqueName}
                                component="a"
                                href={child.href}
                                target={child.target}
                                rel={child.rel}
                                sx={{ p: '0' }}
                              >
                                <ListItemText
                                  primary={child.title}
                                  sx={{ m: 0 }}
                                />
                              </ListItemButton>
                            ))}
                          </SubMenuStyled>
                        </Collapse>
                      </>
                    ) : type === 'link' ? (
                      <ListItemButton
                        component="a"
                        href={href}
                        target={target}
                        rel={rel}
                        sx={{ p: '0' }}
                      >
                        <ListItemText primary={title} sx={{ m: 0 }} />
                      </ListItemButton>
                    ) : (
                      <ListItemButton onClick={onNavClick(to)} sx={{ p: '0' }}>
                        <ListItemText primary={title} sx={{ m: 0 }} />
                      </ListItemButton>
                    )}
                    <DividerStyled />
                  </Fragment>
                )
              )}
            </BodyMenu>
            <BurgerSocialList linkOnClick={toggleDrawer(false)} />
          </Box>
        </Box>
      </MenuContainer>
    </>
  );
};

export default BurgerMenu;
