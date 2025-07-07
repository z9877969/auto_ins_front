import { Box, Typography } from '@mui/material';
import * as S from './CompanyInfoStyled';

const CompanyInfo = ({
  /* informationAboutGeneralConditionsProduct: conditionsUrl, */
  informationAboutGeneralConditionsProductUrl: conditionsProductUrl,
  informationAboutInsuranceProductUrl: insuranceProductUrl,
}) => {
  return (
    <S.BoxFooter>
      {/* <Box className="rowWrapper">
        <Typography component="span">{conditionsUrl}</Typography>
      </Box> */}
      <Box className="rowWrapper">
        <a
          href={conditionsProductUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Typography component="span">Посилання на ЗУСП</Typography>
        </a>
      </Box>
      <Box className="rowWrapper">
        <a href={insuranceProductUrl} target="_blank" rel="noreferrer noopener">
          <Typography component="span">Посилання на ІнфоПродукт</Typography>
        </a>
      </Box>
    </S.BoxFooter>
  );
};

export default CompanyInfo;
