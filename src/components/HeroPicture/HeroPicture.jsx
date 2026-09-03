import { PictureContainer } from './HeroPicture.styled';

import carMobile from '../../images/heroCar/car_mobile.jpg';
import carMobile2x from '../../images/heroCar/car_mobile@2x.jpg';
import carMobile3x from '../../images/heroCar/car_mobile@3x.jpg';
import carMobileWebp from '../../images/heroCar/car_mobile.webp';
import carMobile2xWebp from '../../images/heroCar/car_mobile@2x.webp';
import carMobile3xWebp from '../../images/heroCar/car_mobile@3x.webp';

import carTablet from '../../images/heroCar/car_tablet.jpg';
import carTablet2x from '../../images/heroCar/car_tablet@2x.jpg';
import carTablet3x from '../../images/heroCar/car_tablet@3x.jpg';
import carTabletWebp from '../../images/heroCar/car_tablet.webp';
import carTablet2xWebp from '../../images/heroCar/car_tablet@2x.webp';
import carTablet3xWebp from '../../images/heroCar/car_tablet@3x.webp';

import carDesktop from '../../images/heroCar/car_desktop.jpg';
import carDesktop2x from '../../images/heroCar/car_desktop@2x.jpg';
import carDesktop3x from '../../images/heroCar/car_desktop@3x.jpg';
import carDesktopWebp from '../../images/heroCar/car_desktop.webp';
import carDesktop2xWebp from '../../images/heroCar/car_desktop@2x.webp';
import carDesktop3xWebp from '../../images/heroCar/car_desktop@3x.webp';

const DESKTOP_MEDIA = '(min-width: 1400px)';
const TABLET_MEDIA = '(min-width: 744px)';

const srcSet = (x1, x2, x3) => `${x1} 1x, ${x2} 2x, ${x3} 3x`;

const HeroPicture = () => {
  return (
    <PictureContainer>
      <source
        media={DESKTOP_MEDIA}
        type="image/webp"
        srcSet={srcSet(carDesktopWebp, carDesktop2xWebp, carDesktop3xWebp)}
      />
      <source
        media={DESKTOP_MEDIA}
        srcSet={srcSet(carDesktop, carDesktop2x, carDesktop3x)}
      />
      <source
        media={TABLET_MEDIA}
        type="image/webp"
        srcSet={srcSet(carTabletWebp, carTablet2xWebp, carTablet3xWebp)}
      />
      <source
        media={TABLET_MEDIA}
        srcSet={srcSet(carTablet, carTablet2x, carTablet3x)}
      />
      <source
        type="image/webp"
        srcSet={srcSet(carMobileWebp, carMobile2xWebp, carMobile3xWebp)}
      />
      <img
        src={carMobile}
        srcSet={srcSet(carMobile, carMobile2x, carMobile3x)}
        alt="Автомобіль на трасі — автоцивілка онлайн від AUTO-INS"
        width="375"
        height="200"
        // React 18 не знає fetchPriority, тож атрибут пишемо в нижньому
        // регістрі — так він потрапляє в DOM без попередження в консолі.
        // eslint-disable-next-line react/no-unknown-property
        fetchpriority="high"
        decoding="async"
      />
    </PictureContainer>
  );
};

export default HeroPicture;
