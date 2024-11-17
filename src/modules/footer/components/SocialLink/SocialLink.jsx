import * as S from './SocialLink.styled';
import { SpriteSVG } from 'images/SpriteSVG';

const SocialLink = ({
  href,
  target,
  rel,
  ariaLabel,
  iconName,
  linkTitle,
  fill,
}) => {
  return (
    <S.Link href={href} target={target} rel={rel} aria-label={ariaLabel}>
      <S.IconWrapper>
        <S.Icon className="socialIconBox" fill={fill}>
          <SpriteSVG name={iconName} />
        </S.Icon>
      </S.IconWrapper>
      <S.LinkText>{linkTitle}</S.LinkText>
    </S.Link>
  );
};

export default SocialLink;
