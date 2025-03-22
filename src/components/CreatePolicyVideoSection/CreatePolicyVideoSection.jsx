import { Typography } from '@mui/material';
import { ContainerSection } from 'style/Global.styled';
import YouTubePlayer from 'components/YouTubePlayer/YouTubePlayer';
import * as S from './CreatePolicyVideoSection.styled';

const items = [
  'Введіть параметри для розрахунку',
  'Заповніть коротку анкету ',
  'Сплатіть поліс онлайн',
  'Отримайте договір на електронну пошту',
];

const CreatePolicyVideoSection = () => {
  return (
    <S.Section>
      <ContainerSection id='як оформити поліс' className='section-container'>
        <S.Wrapper>
          <S.TitleWrapper>
            <Typography variant='h2' className='main-title'>
              Як оформити страховку на авто онлайн
            </Typography>
          </S.TitleWrapper>
          <S.VideoWrapper>
            <YouTubePlayer />
          </S.VideoWrapper>
          <S.List>
            {items.map((el, idx) => (
              <S.Item key={idx} variant='h3'>
                <S.Num>{idx + 1}</S.Num>
                {el}
              </S.Item>
            ))}
          </S.List>
        </S.Wrapper>
      </ContainerSection>
    </S.Section>
  );
};

export default CreatePolicyVideoSection;
