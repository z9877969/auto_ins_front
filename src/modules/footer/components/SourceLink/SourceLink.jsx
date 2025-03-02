import * as S from './SourceLink.styled';

const SourceLink = ({ href, target, rel, linkTitle }) => {
  return (
    <S.Link href={href} target={target} rel={rel}>
      <S.LinkText className="linkText" >
        {linkTitle}
      </S.LinkText>
    </S.Link>
  );
};

export default SourceLink;
