import { LoaderBox, SpinnerSvg } from './LoaderStyled';

const Loader = () => {
  return (
    <LoaderBox>
      <SpinnerSvg
        width={200}
        height={200}
        viewBox="0 0 57 57"
        stroke="#1547F8"
        fill="none"
        strokeWidth="2"
        role="status"
        aria-label="Завантаження"
      >
        <circle cx="5" cy="50" r="5.1" />
        <circle cx="27" cy="5" r="5.1" />
        <circle cx="49" cy="50" r="5.1" />
      </SpinnerSvg>
    </LoaderBox>
  );
};

export default Loader;
