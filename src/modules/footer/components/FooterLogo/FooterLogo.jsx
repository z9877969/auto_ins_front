import { SpriteSVG } from 'images/SpriteSVG';
import * as S from './FooterLogo.styled';

const FooterLogo = () => {
  return (
    <S.LogoBox>
      <S.BoxIcon className="logoIcon">
        <SpriteSVG name={'icon-logo'} />
      </S.BoxIcon>
      <S.LogoText className="logoText">AUTO-INS</S.LogoText>
    </S.LogoBox>
  );
};

export default FooterLogo;
