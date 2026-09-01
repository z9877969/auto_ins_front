import * as S from './ScrollLink.styled';

// Скрол виконує onClick на елементі списку (navigate -> state.id ->
// scrollToElementWhenReady у HomePage), тож обгортка react-scroll була зайвою.
const ScrollLink = ({ title }) => (
  <S.ChapterSpan className="chapterSpan" component="span">
    {title}
  </S.ChapterSpan>
);

export default ScrollLink;
