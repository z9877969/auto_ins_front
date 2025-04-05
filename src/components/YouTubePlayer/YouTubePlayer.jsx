import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Box } from '@mui/material';
import { Wrapper } from './YuoTubePlayer.styled';

const YouTubePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => setIsPlaying(true);

  return (
    <Wrapper>
      {!isPlaying ? (
        <Box sx={{ position: 'relative' }} onClick={handlePlay}>
          <img
            src={'https://img.youtube.com/vi/p_MyQ4RpLRg/maxresdefault.jpg'}
            alt="Video thumbnail"
            className="thumbnail"
          />
          <div className="play-button">
            <FaPlay className="play-icon" />
          </div>
        </Box>
      ) : (
        <iframe
          width="560"
          height="315"
          className="frame"
          src="https://www.youtube.com/embed/p_MyQ4RpLRg?si=CIn-fcxifB3bxO2s&autoplay=1&controls=0&showinfo=0&rel=0"
          title="YouTube video player"
          frameBorder="0"
          allow={'autoplay; encrypted-media;'}
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      )}
    </Wrapper>
  );
};

export default YouTubePlayer;
