import { lazy, Suspense } from 'react';
import { Link as ScrollLink } from 'react-scroll';
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
  UlListHS,
} from './HeaderStyled';
// import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useNavigate } from 'react-router-dom';
import { socialMediaDict } from '../../assets/utils/socialMedia';

const BurgerMenu = lazy(() => import('../BurgerMenu/BurgerMenu'));

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
                <LiItemHS disablePadding={true}>
                  <ScrollLink
                    to="переваги"
                    smooth={true}
                    duration={700}
                    style={{ cursor: 'pointer' }}
                    activeClass="active"
                    onClick={() => handleScrollToSection('переваги')}
                  >
                    <ChapterSpanHS className="chapterSpan">
                      Переваги
                    </ChapterSpanHS>
                  </ScrollLink>
                </LiItemHS>
                <LiItemHS disablePadding={true}>
                  <ScrollLink
                    to="партнери"
                    smooth={true}
                    duration={700}
                    style={{ cursor: 'pointer' }}
                    activeClass="active"
                    onClick={() => handleScrollToSection('партнери')}
                  >
                    <ChapterSpanHS className="chapterSpan">
                      Партнери
                    </ChapterSpanHS>
                  </ScrollLink>
                </LiItemHS>
                <LiItemHS disablePadding={true}>
                  <ScrollLink
                    to="питання-відповіді"
                    smooth={true}
                    duration={700}
                    style={{ cursor: 'pointer' }}
                    activeClass="active"
                    onClick={() => handleScrollToSection('питання-відповіді')}
                  >
                    <ChapterSpanHS className="chapterSpan">
                      Питання-відповіді
                    </ChapterSpanHS>
                  </ScrollLink>
                </LiItemHS>
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
