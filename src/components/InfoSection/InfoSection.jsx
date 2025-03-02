import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@emotion/react';

import CardMedia from '@mui/material/CardMedia';
import useMediaQuery from '@mui/material/useMediaQuery';

import Car320Webp from '../../images/infoCar/carMob.webp';
import Car320Webp2x from '../../images/infoCar/carMob2x.webp';
import Car320Webp3x from '../../images/infoCar/carMob3x.webp';
import Car320Jpg from '../../images/infoCar/carMob.jpg';
import Car320Jpg2x from '../../images/infoCar/carMob2x.jpg';
import Car320Jpg3x from '../../images/infoCar/carMob3x.jpg';

import Car768Web from '../../images/infoCar/carTab.webp';
import Car768Web2x from '../../images/infoCar/carTab2x.webp';
import Car768Web3x from '../../images/infoCar/carTab3x.webp';
import Car768Jpg from '../../images/infoCar/carTab.jpg';
import Car768Jpg2x from '../../images/infoCar/carTab2x.jpg';
import Car768Jpg3x from '../../images/infoCar/carTab3x.jpg';

import Car1400Webp from '../../images/infoCar/carDes.webp';
import Car1400Webp2x from '../../images/infoCar/carDes2x.webp';
import Car1400Webp3x from '../../images/infoCar/carDes3x.webp';
import Car1400Jpg from '../../images/infoCar/carDes.jpg';
import Car1400Jpg2x from '../../images/infoCar/carDes2x.jpg';
import Car1400Jpg3x from '../../images/infoCar/carDes3x.jpg';

import { YellowButton } from '../../style/Global.styled';
import {
  AbsatzS,
  CollapseContainer,
  InfoSectionContainer,
  SectionS,
  WrapperS,
} from './InfoSectionStyle';

import Text from './Text';
import {
  infoTextStart,
  infoTextTitle,
  infoTextMiddleFirst,
  infoTextMiddleSecond,
  infoTextEnd,
  newInfoText,
} from '../../assets/texts';
import { links } from '../../assets/texts/index';
import { Link } from '@mui/material';

const TextLink = ({ text, href, rel }) => {
  return (
    <AbsatzS variant="caption" component="p">
      <Link
        href={href}
        target="_blank"
        rel={rel || 'noreferrer noopener nofollow'}
        className="link"
      >
        {text}
      </Link>
    </AbsatzS>
  );
};

const InfoSection = () => {
  const [checked, setChecked] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const n = [{ id: 1 }];

  let callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };
  useEffect(() => {
    let observer = new IntersectionObserver(callback);
    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const theme = useTheme();
  const MOBILE = useMediaQuery(theme.breakpoints.down('sm'));
  const TABLET = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const DESKTOP = useMediaQuery(theme.breakpoints.up('lg'));

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const display = () => {
    if (MOBILE) {
      return '8.64em';
    }
    if (TABLET) {
      return '216px';
    }
    if (DESKTOP) {
      return '784px';
    }
  };

  const displayLink = links.map(({ href, text }) => {
    return <TextLink key={text} text={text} href={href} />;
  });

  return (
    <SectionS>
      <InfoSectionContainer component="article">
        <WrapperS>
          <CollapseContainer
            in={checked}
            orientation="vertical"
            timeout={300}
            collapsedSize={display()}
            className="container"
          >
            {DESKTOP ? (
              <div className="cols">
                <div className="col">
                  <Text text={infoTextTitle} />
                  <Text
                    text={[...newInfoText, ...infoTextStart]}
                    outsideEls={{
                      textLink: (
                        <TextLink
                          text={'Програми КАСКО на авто.'}
                          href={'https://auto-ins.com.ua/pages/kasko/'}
                          rel="noreferrer noopener follow"
                        />
                      ),
                    }}
                  />
                </div>
                <div className="col">
                  <CardMedia className="cardMedia" src={Car1400Webp}>
                    <img
                      src={Car1400Jpg}
                      srcSet={`${Car1400Webp} 688w,${Car1400Jpg} 688w,${Car1400Webp2x} 1376w,${Car1400Jpg2x} 1376w,${Car1400Webp3x} 2064w,${Car1400Jpg3x} 2064w`}
                      sizes="688px"
                      width="688px"
                      height="632px"
                      alt="автомобіль"
                    />
                  </CardMedia>
                  <Text
                    text={[
                      ...infoTextMiddleFirst.slice(
                        0,
                        infoTextMiddleFirst.length - 2
                      ),
                      ...infoTextMiddleSecond,
                      ...infoTextEnd,
                    ]}
                    outsideEls={{ links: displayLink }}
                    style={{ marginTop: '24px' }}
                  />
                </div>
              </div>
            ) : TABLET ? (
              <div className="cols">
                <div className="col">
                  <Text text={infoTextTitle} />
                  <Text
                    text={[
                      ...newInfoText,
                      ...infoTextStart.slice(0, infoTextStart.length / 2 + 1),
                    ]}
                    outsideEls={{
                      textLink: (
                        <TextLink
                          text={'Програми КАСКО на авто.'}
                          href={'https://auto-ins.com.ua/pages/kasko/'}
                          rel="noreferrer noopener follow"
                        />
                      ),
                    }}
                  />
                </div>
                <div className="col">
                  <Text
                    text={[
                      ...infoTextStart.slice(infoTextStart.length / 2 + 1),
                      ...infoTextMiddleFirst.slice(
                        infoTextMiddleFirst.length - 2
                      ),
                      ...infoTextMiddleSecond,
                      ...infoTextEnd,
                    ]}
                    outsideEls={{ links: displayLink }}
                  />
                </div>
              </div>
            ) : (
              <>
                <Text text={infoTextTitle} />
                <Text
                  text={[
                    ...newInfoText,
                    ...infoTextStart,
                    ...infoTextMiddleFirst,
                    ...infoTextMiddleSecond,
                    ...infoTextEnd,
                  ]}
                  outsideEls={{
                    links: displayLink,
                    textLink: (
                      <TextLink
                        text={'Програми КАСКО на авто.'}
                        href={'https://auto-ins.com.ua/pages/kasko/'}
                        rel="noreferrer noopener follow"
                      />
                    ),
                  }}
                />
              </>
            )}
          </CollapseContainer>
        </WrapperS>
        <YellowButton onClick={handleChange} className="button">
          {!checked ? 'Читати далі' : 'Приховати текст'}
        </YellowButton>
        {(MOBILE || TABLET) &&
          (inView ? (
            <CardMedia className="cardMediaTablet" src={Car320Webp}>
              <img
                src={Car320Jpg}
                srcSet={`${Car320Jpg} 343w,${Car320Webp} 343w,${Car320Webp2x} 686w,${Car320Jpg2x} 686w,${Car320Webp3x} 1029w,${Car320Jpg3x} 1029w,${Car768Jpg} 680w,${Car768Web} 680w,${Car768Web2x} 1360w,${Car768Jpg2x} 1360w,${Car768Web3x} 2040w,${Car768Jpg3x} 2040w`}
                sizes="(max-widht:744px) 680px, 100vw"
                alt="автомобіль"
              />
            </CardMedia>
          ) : (
            <CardMedia
              ref={ref}
              id={n.id}
              key={n.id}
              className="cardMediaTablet"
              src={Car320Webp}
            />
          ))}
      </InfoSectionContainer>
    </SectionS>
  );
};

export default InfoSection;
