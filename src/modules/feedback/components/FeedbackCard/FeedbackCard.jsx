import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { SpriteSVG } from 'images/SpriteSVG';
import * as S from './FeedbackCard.styled';

const FeedbackCard = ({ name, text, rating }) => {
  return (
    <S.CardWrapper>
      <S.QuoteMarkWrapper>
        <SpriteSVG name="icon-quote-marks" />
      </S.QuoteMarkWrapper>
      <S.ReviewText>{text}</S.ReviewText>
      <S.AuthorName>{name}</S.AuthorName>
      <S.StarsRow>
        {Array.from({ length: 5 }, (_, i) =>
          i < rating ? (
            <StarIcon key={i} sx={{ color: '#FCD922', fontSize: '20px' }} />
          ) : (
            <StarBorderIcon key={i} sx={{ color: '#FCD922', fontSize: '20px' }} />
          )
        )}
      </S.StarsRow>
    </S.CardWrapper>
  );
};

export default FeedbackCard;
