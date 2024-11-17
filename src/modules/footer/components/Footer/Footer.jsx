import { useNavigate } from 'react-router-dom';
import ScrollLink from '../ScrollLink/ScrollLink';
import SocialLink from '../SocialLink/SocialLink';
import {
  FooterS,
  FooterBoxS,
  ChapterSpan,
  BoxIconS,
  LogoBox,
  LogoText,
  NavListsWrapper,
  WithBanksIconsWrapper,
} from './FooterStyled';
import FooterNavList from '../FooterNavList/FooterNavList';
import { SpriteSVG } from '../../../../images/SpriteSVG';
import {
  leftListOptions,
  centerListOptions,
  socialLinksOptions,
} from 'modules/footer/data/footerNavLIstOptions';
import SourceLink from '../SourceLink/SourceLink';

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
          <NavListsWrapper>
            <WithBanksIconsWrapper>
              <FooterNavList
                options={leftListOptions}
                linkComponent={SourceLink}
                itemsJustifyContent="center"
              />
            </WithBanksIconsWrapper>
            <FooterNavList
              onItemClick={handleScrollToSection}
              options={centerListOptions}
              linkComponent={ScrollLink}
              itemsJustifyContent="center"
            />
            <FooterNavList
              options={socialLinksOptions}
              linkComponent={SocialLink}
              sx={{ rowGap: '4px' }}
            />
          </NavListsWrapper>
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
            &copy; auto-ins.com.ua, 2024. Всі права захищені.
          </ChapterSpan>
        </FooterBoxS>
      </FooterS>
    </footer>
  );
};

export default Footer;
