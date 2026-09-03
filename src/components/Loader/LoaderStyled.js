import { Box, styled } from '@mui/material';

export const LoaderBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

// Три кульки, що обертаються по трикутнику — візуальний еквівалент BallTriangle
// з react-loader-spinner. Та бібліотека заради одного спінера тягнула в
// стартовий бандл styled-components (другий CSS-in-JS рушій поряд з Emotion).
export const SpinnerSvg = styled('svg')`
  animation: loaderRotate 1.6s linear infinite;
  transform-origin: 50% 50%;

  @keyframes loaderRotate {
    to {
      transform: rotate(360deg);
    }
  }
`;
