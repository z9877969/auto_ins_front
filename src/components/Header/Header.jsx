import { Suspense } from 'react';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { SpriteSVG } from '../../images/SpriteSVG';
import {
  BoxIconHS,
  ChapterSpanHS,
  HeaderBoxS,
  HeaderS,
  LiItemHS,
  LinkS,
  LogoBoxS,
  LogoTextHS,
  NavButtonHS,
  NavLinkHS,
  UlListHS,
} from './HeaderStyled';
// import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useNavigate } from 'react-router-dom';
import { socialMediaDict } from '../../assets/utils/socialMedia';
import { loadComponentWithRetry } from 'helpers/loadComponentWithRetry';
import { headerNavOptions } from './headerNavOptions';
import HeaderDropdown from './HeaderDropdown';

const BurgerMenu = loadComponentWithRetry(() =>
  import('../BurgerMenu/BurgerMenu')
);

const Header = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(`${theme.breakpoints.up('lg')}`);
  const navigate = useNavigate();
  const handleScrollToSection = (chapter) => {
    navigate('/', { state: { id: chapter } });
  };

  return (
    <header>
      <HeaderS disableGutters={true} maxWidth={false}>
        <HeaderBoxS>
          <LogoBoxS href="/" rel="noreferrer noopener">
            <BoxIconHS className="logoIcon">
              <SpriteSVG name={'icon-logo'} />
            </BoxIconHS>
            <LogoTextHS>AUTO-INS</LogoTextHS>
          </LogoBoxS>
          {isLargeScreen ? (
            <>
              <UlListHS>
                {headerNavOptions.map((item) => (
                  <LiItemHS key={item.uniqueName} disablePadding={true}>
                    {item.type === 'dropdown' ? (
                      <HeaderDropdown
                        id={`header-${item.uniqueName}-menu`}
                        title={item.title}
                        items={item.children}
                      />
                    ) : item.type === 'link' ? (
                      <NavLinkHS
                        href={item.href}
                        target={item.target}
                        rel={item.rel}
                      >
                        <ChapterSpanHS className="chapterSpan">
                          {item.title}
                        </ChapterSpanHS>
                      </NavLinkHS>
                    ) : (
                      <NavButtonHS
                        onClick={() => handleScrollToSection(item.to)}
                      >
                        <ChapterSpanHS className="chapterSpan">
                          {item.title}
                        </ChapterSpanHS>
                      </NavButtonHS>
                    )}
                  </LiItemHS>
                ))}
              </UlListHS>
              <UlListHS className="socialIcons">
                <LiItemHS disablePadding={true}>
                  <LinkS
                    href={socialMediaDict.instagram.path}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                    aria-label="instagram"
                  >
                    <BoxIconHS className="socialIconBox">
                      <SpriteSVG name={'icon-instagram'} />
                    </BoxIconHS>
                  </LinkS>
                </LiItemHS>
                <LiItemHS disablePadding={true}>
                  <LinkS
                    href={socialMediaDict.facebook.path}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                    aria-label="facebook"
                  >
                    <BoxIconHS className="socialIconBox">
                      <SpriteSVG name={'icon-facebook'} />
                    </BoxIconHS>
                  </LinkS>
                </LiItemHS>
                <LiItemHS disablePadding={true}>
                  <LinkS
                    href={socialMediaDict.telegram.path}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                    aria-label="telegram"
                  >
                    <BoxIconHS className="socialIconBox">
                      <SpriteSVG name={'icon-telegram-send'} />
                    </BoxIconHS>
                  </LinkS>
                </LiItemHS>
                <LiItemHS disablePadding={true}>
                  <LinkS
                    href={socialMediaDict.mail.path}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                    aria-label="mail"
                  >
                    <BoxIconHS className="socialIconBox">
                      <SpriteSVG name={'icon-mail'} />
                    </BoxIconHS>
                  </LinkS>
                </LiItemHS>
              </UlListHS>
            </>
          ) : (
            <Suspense>
              <BurgerMenu sx={{ width: '32px' }} />
            </Suspense>
          )}
        </HeaderBoxS>
      </HeaderS>
    </header>
  );
};

export default Header;
