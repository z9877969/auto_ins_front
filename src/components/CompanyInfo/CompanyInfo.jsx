import { useState } from 'react';
import clsx from 'clsx';
import { Box, Typography } from '@mui/material';
import { ChevronDown } from 'images/Icons/ChevronDown';
import * as S from './CompanyInfoStyled';

const companyInfoOptions = [
  {
    urlKey: 'insurerUrl',
    textContent: 'Інформація про страховика',
  },
  {
    urlKey: 'insuranceBrokerUrl',
    textContent: 'Інформація про страхового посередника',
  },
  {
    urlKey: 'conditionsProductUrl',
    textContent: 'Загальні умови страхового продукту ОСЦПВ',
  },
  {
    urlKey: 'insuranceProductUrl',
    textContent: 'Інформація про страховий продукт ОСЦПВ',
  },
];

const mainInfo = {
  title: 'Основна інформація',
  list: [
    {
      urlKey: '1',
      textContent: '✅ Підтримка 24/7 при ДТП',
    },
    {
      urlKey: '2',
      textContent: '✅ Пряме врегулювання',
    },
    {
      urlKey: '3',
      textContent: '✅ Ремонт без врахування зносу',
    },
    {
      urlKey: '4',
      textContent: '✅ Ремонт за рахунок вашої СК на авторизованому СТО',
    },
  ],
};

const limitInfo = {
  title: 'Ліміт відповідальності',
  list: [
    {
      urlKey: '1',
      textContent: '✅ 1 250 000 грн. по майну на один випадок',
    },
    {
      urlKey: '2',
      textContent: '✅ 250 000 грн. по майну на одну особу',
    },
    {
      urlKey: '3',
      // eslint-disable-next-line
      textContent: `✅ 5 000 000 грн. по життю та здоров'ю на один випадок`,
    },
    {
      urlKey: '4',
      // eslint-disable-next-line
      textContent: `✅ 500 000 грн. по життю та здоров'ю на одну особу`,
    },
  ],
};

const CompanyInfo = ({
  insurer: { informationAboutInsurerUrl: insurerUrl },
  informationAboutGeneralConditionsProductUrl: conditionsProductUrl,
  informationAboutInsuranceProductUrl: insuranceProductUrl,
}) => {
  const [isShow, setIsShow] = useState(false);

  const urlsDict = {
    insurerUrl,
    conditionsProductUrl,
    insuranceProductUrl,
    insuranceBrokerUrl: 'https://auto-ins.com.ua/pages/info/',
  };

  return (
    <>
      <S.Button
        type="button"
        variant="text"
        onClick={() => setIsShow((p) => !p)}
      >
        {isShow ? 'Згорнути' : 'Докладніше'}
        <Box className="iconWrapper">
          <ChevronDown className={clsx('chevronIcon', isShow && 'rotate')} />
        </Box>
      </S.Button>
      <S.Wrapper className={clsx(!isShow && 'show')}>
        <S.InfoWrapper>
          <S.InfoTitle as={'h2'}>{mainInfo.title}</S.InfoTitle>
          <S.InfoList as="ul">
            {mainInfo.list.map(({ textContent, urlKey }) => (
              <S.InfoItem as={'li'} key={urlKey}>
                <Typography component="span">{textContent}</Typography>
              </S.InfoItem>
            ))}
          </S.InfoList>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.InfoTitle as={'h2'}>{limitInfo.title}</S.InfoTitle>
          <S.InfoList as="ul">
            {limitInfo.list.map(({ textContent, urlKey }) => (
              <S.InfoItem as={'li'} key={urlKey}>
                <Typography component="span">{textContent}</Typography>
              </S.InfoItem>
            ))}
          </S.InfoList>
        </S.InfoWrapper>
        <S.UrlsList as={'ul'}>
          {companyInfoOptions.map(({ textContent, urlKey }, idx) => (
            <S.UrlItem as={'li'} key={idx}>
              <a
                href={urlsDict[urlKey]}
                target="_blank"
                rel="noreferrer noopener nofollow"
              >
                <Typography component="span">{textContent}</Typography>
              </a>
            </S.UrlItem>
          ))}
        </S.UrlsList>
      </S.Wrapper>
    </>
  );
};

export default CompanyInfo;
