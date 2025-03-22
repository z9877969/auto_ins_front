import { Typography } from '@mui/material';
import { ContainerSection } from 'style/Global.styled';
import YouTubePlayer from 'components/YouTubePlayer/YouTubePlayer';


const CreatePolicyVideoSection = () => {
  return (
    <ContainerSection id='як оформити поліс'>
      <Typography variant='h2' className='main-title'>
        Наші переваги
      </Typography>
      
      <YouTubePlayer />
    </ContainerSection>
  );
};

export default CreatePolicyVideoSection;
