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
        <S.UrlsList as={'ul'}>
          {companyInfoOptions.map(({ textContent, urlKey }, idx) => (
            <S.UrlItem as={'li'} key={idx}>
              <a
                href={urlsDict[urlKey]}
                target="_blank"
                rel="noreferrer noopener"
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
