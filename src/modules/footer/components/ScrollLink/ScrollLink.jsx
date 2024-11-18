import { Link as ReactScrollLink } from 'react-scroll';
import * as S from './ScrollLink.styled';

const ScrollLink = ({ to, smooth, title, duration }) => (
  <ReactScrollLink to={to} smooth={smooth} duration={duration}>
    <S.ChapterSpan className="chapterSpan" component="span">
      {title}
    </S.ChapterSpan>
  </ReactScrollLink>
);

export default ScrollLink;
