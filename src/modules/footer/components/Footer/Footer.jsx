import { useNavigate } from 'react-router-dom';
import ScrollLink from '../ScrollLink/ScrollLink';
import SocialLink from '../SocialLink/SocialLink';
import FooterNavList from '../FooterNavList/FooterNavList';
import FooterLogo from '../FooterLogo/FooterLogo';
import SourceLink from '../SourceLink/SourceLink';
import * as S from './Footer.styled';
import {
  linksListOptions,
  scrollLinksOptions,
  socialLinksOptions,
} from 'modules/footer/data/footerNavLIstOptions';

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (chapter) => {
    navigate('/', { state: { id: chapter } });
  };

  const copyRightYear = new Date().getFullYear();

  return (
    <footer style={{ oveflow: 'hidden' }}>
      <S.Footer disableGutters={true} maxWidth={false}>
        <S.FooterContainer disableGutters={true}>
          <FooterLogo />
          <S.NavListsWrapper>
            <S.OrderingWrapper className="links">
              <S.WithBanksIconsWrapper className="linksOrder">
                <FooterNavList
                  options={linksListOptions}
                  linkComponent={SourceLink}
                  itemsJustifyContent="center"
                />
              </S.WithBanksIconsWrapper>
            </S.OrderingWrapper>
            <S.OrderingWrapper className="scroll">
              <FooterNavList
                onItemClick={handleScrollToSection}
                options={scrollLinksOptions}
                linkComponent={ScrollLink}
                itemsJustifyContent="center"
                className="scrollOrder"
              />
            </S.OrderingWrapper>
            <S.OrderingWrapper className="social">
              <FooterNavList
                options={socialLinksOptions}
                linkComponent={SocialLink}
                sx={{ rowGap: '4px' }}
                className="socialOrder"
              />
            </S.OrderingWrapper>
          </S.NavListsWrapper>
          <S.ChapterSpan className="bottomSpan">
            &copy; auto-ins.com.ua, {copyRightYear}. Всі права захищені.
          </S.ChapterSpan>
        </S.FooterContainer>
      </S.Footer>
    </footer>
  );
};

export default Footer;
