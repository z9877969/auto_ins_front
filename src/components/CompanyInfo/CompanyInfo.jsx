import { useState } from 'react';
import clsx from 'clsx';
import { Box, Typography } from '@mui/material';
import { ChevronDown } from 'images/Icons/ChevronDown';
import * as S from './CompanyInfoStyled';

const companyInfoOptions = [
  {
    urlKey: 'insurerUrl',
    textContent: 'Посилання на інфо про СК',
  },
  {
    urlKey: 'conditionsProductUrl',
    textContent: 'Посилання на ЗУСП',
  },
  {
    urlKey: 'insuranceProductUrl',
    textContent: 'Посилання на ІнфоПродукт',
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
  };

  return (
    <>
      <S.Button
        type="button"
        variant="contained"
        endIcon={
          <ChevronDown className={clsx('chevronIcon', isShow && 'rotate')} />
        }
        onClick={() => setIsShow((p) => !p)}
      >
        {isShow ? 'Згорнути' : 'Детальніше'}
      </S.Button>
      <S.Wrapper isShow={isShow}>
        <S.BoxFooter>
          {companyInfoOptions.map(({ textContent, urlKey }, idx) => (
            <Box key={idx} className="rowWrapper">
              <a
                href={urlsDict[urlKey]}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Typography component="span">{textContent}</Typography>
              </a>
            </Box>
          ))}
        </S.BoxFooter>
      </S.Wrapper>
    </>
  );
};

export default CompanyInfo;
