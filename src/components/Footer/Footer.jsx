import { Link as ScrollLink } from 'react-scroll';
import { SpriteSVG } from '../../images/SpriteSVG';
import {
  FooterS,
  FooterBoxS,
  UlListS,
  ChapterSpan,
  BoxIconS,
  LogoBox,
  LogoText,
  LinkS,
  LiItemS,
} from './FooterStyled';
import { useNavigate } from 'react-router-dom';
import { socialMediaDict } from '../../assets/utils/socialMedia';

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (chapter) => {
    navigate('/', { state: { id: chapter } });
  };

  return (
    <footer style={{ oveflow: 'hidden' }}>
      <FooterS disableGutters={true} maxWidth={false}>
        <FooterBoxS disableGutters={true}>
          <LogoBox>
            <BoxIconS className="logoIcon">
              <SpriteSVG name={'icon-logo'} />
            </BoxIconS>
            <LogoText className="logoText">AUTO-INS</LogoText>
          </LogoBox>
          <UlListS>
            <LiItemS
              disablePadding={true}
              onClick={() => handleScrollToSection('переваги')}
            >
              <ScrollLink to="переваги" smooth={true} duration={700}>
                <ChapterSpan className="chapterSpan" component="span">
                  Переваги
                </ChapterSpan>
              </ScrollLink>
            </LiItemS>
            <LiItemS
              disablePadding={true}
              onClick={() => handleScrollToSection('партнери')}
            >
              <ScrollLink to="партнери" smooth={true} duration={700}>
                <ChapterSpan className="chapterSpan" component="span">
                  Партнери
                </ChapterSpan>
              </ScrollLink>
            </LiItemS>
            <LiItemS
              disablePadding={true}
              onClick={() => handleScrollToSection('питання-відповіді')}
            >
              <ScrollLink to="питання-відповіді" smooth={true} duration={700}>
                <ChapterSpan className="chapterSpan" component="span">
                  Питання-відповіді
                </ChapterSpan>
              </ScrollLink>
            </LiItemS>
          </UlListS>
          <UlListS className="centered">
            <LiItemS disablePadding={true}>
              <LinkS
                href={socialMediaDict.instagram.path}
                target="_blank"
                rel="noreferrer noopener nofollow"
                aria-label="instagram"
              >
                <BoxIconS className="socialIconBox">
                  <SpriteSVG name={'icon-instagram'} />
                </BoxIconS>
              </LinkS>
            </LiItemS>
            <LiItemS disablePadding={true}>
              <LinkS
                href={socialMediaDict.facebook.path}
                target="_blank"
                rel="noreferrer noopener nofollow"
                aria-label="facebook"
              >
                <BoxIconS className="socialIconBox">
                  <SpriteSVG name={'icon-facebook'} />
                </BoxIconS>
              </LinkS>
            </LiItemS>
            <LiItemS disablePadding={true}>
              <LinkS
                href={socialMediaDict.telegram.path}
                target="_blank"
                rel="noreferrer noopener nofollow"
                aria-label="telegram"
              >
                <BoxIconS className="socialIconBox">
                  <SpriteSVG name={'icon-telegram-send'} />
                </BoxIconS>
              </LinkS>
            </LiItemS>
            <LiItemS disablePadding={true}>
              <LinkS
                href={socialMediaDict.mail.path}
                target="_blank"
                rel="noreferrer noopener nofollow"
                aria-label="mail"
              >
                <BoxIconS className="socialIconBox">
                  <SpriteSVG name={'icon-mail'} />
                </BoxIconS>
              </LinkS>
            </LiItemS>
          </UlListS>
          <LinkS></LinkS>
          <ChapterSpan className="bottomSpan">
            <a
              className="link"
              href="https://docs.ewa.ua/insurance-products"
              rel="nofollow"
            >
              Інформація про СК та страхові продукти
            </a>
          </ChapterSpan>
          <ChapterSpan className="bottomSpan">
            &copy; ТОВ «Auto-ins», 2024. Всі права захищені.
          </ChapterSpan>
        </FooterBoxS>
      </FooterS>
    </footer>
  );
};

export default Footer;
