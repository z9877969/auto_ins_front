import { Link } from 'react-router-dom';
import { socialMedia } from 'assets/utils/socialMedia';
import { SpriteSVG } from 'images/SpriteSVG';
import * as S from './BurgerSocialList.styled';

const BurgerSocialList = ({ linkOnClick = null }) => {
  return (
    <S.ItemsList className="centered">
      {socialMedia.map(({ icon, path }, index) => {
        return (
          <S.Item key={index} disablePadding={true} className="liSocialIcon">
            <Link
              to={path}
              target="_blank"
              rel="noreferrer noopener nofollow"
              onClick={linkOnClick}
            >
              <S.Icon className="socialIconBox">
                <SpriteSVG name={icon} />
              </S.Icon>
            </Link>
          </S.Item>
        );
      })}
    </S.ItemsList>
  );
};

export default BurgerSocialList;
