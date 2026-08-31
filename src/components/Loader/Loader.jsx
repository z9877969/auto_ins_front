import { BallTriangle } from 'react-loader-spinner';
// import { SpriteSVG } from '../../images/SpriteSVG';
import { LoaderBox } from './LoaderStyled';

const Loader = ({ size = 200, minHeight = '100vh' }) => {
  return (
    <LoaderBox sx={{ minHeight }}>
      {/* <SpriteSVG name={"icon-logo"} /> */}
      <BallTriangle
        height={size}
        width={size}
        radius={5.1}
        color="#1547F8"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </LoaderBox>
  );
};

export default Loader;
