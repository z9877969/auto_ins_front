import { useMemo, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import GeneralSelect from '../GeneralSelect/GeneralSelect';
import CompanyCardMedia from '../CompanyCardMedia/index';
import {
  BoxContent,
  BoxFooter,
  BoxSelect,
  ButtonStyled,
  CardStyled,
  GridContainer,
  GridContainerImg,
  WrapperStyled,
} from './CompanyStyled';
import { getUser } from '@redux/Calculator/selectors';
import { getSubmitObject } from '@redux/byParameters/selectors';
import { useActions } from 'hooks/useActions';
import { REGISTRATION_TYPES } from '@constants/index';

const content = {
  label: {
    FRANSHISE_TEXT: 'Франшиза',
    FRANSHISE_HELPER: 'Сума збитку, яка не відшкодовується страховою компанією',
    ADDITIONAL_COVER_TEXT: 'Додаткове покриття',
    ADDITIONAL_COVER_HELPER:
      'Рекомендуємо збільшувати суму покриття, оскільки при значних дтп,  або дтп з дорогим автомобілем стандартної суми може не вистачити',
  },
};

const Company = ({ companyObject, lastItem }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const { registrationType } = useSelector(getSubmitObject);
  const theme = useTheme();
  const { setGlobalCustomerData, setParamsFromUrl, changeVslOrderStatus } =
    useActions();

  const {
    insurerId,
    insurerName,
    tariff,
    autoCategory,
    registrationPlace,
    dgo,
  } = companyObject;

  const sortedTarrif = useMemo(() => {
    return [...tariff].sort((a, b) => b.franchise - a.franchise);
  }, [tariff]);

  const [franchise, setFranchise] = useState(sortedTarrif[0]);

  const [chooseDgo, setChooseDgo] = useState({
    limit: 0,
    discountedPayment: 0,
  });

  const price = useMemo(
    () => Math.round(franchise.discountedPayment + chooseDgo.discountedPayment),
    [franchise.discountedPayment, chooseDgo.discountedPayment]
  );
  const fullPrice = useMemo(() => {
    return franchise.brokerDiscount
      ? Math.round(
          franchise.discountedPayment / (1 - franchise.brokerDiscount) +
            chooseDgo.discountedPayment
        )
      : null;
  }, [
    franchise.discountedPayment,
    chooseDgo.discountedPayment,
    franchise.brokerDiscount,
  ]);

  useEffect(() => {
    if (!companyObject) return;
    scrollTo({ top: 0 });
    // eslint-disable-next-line
  }, []);

  const handleChangeSelect = (e) => {
    setFranchise(e);
  };
  const handleChangeDgoSelect = (option) => {
    const { limit, discountedPayment } = option;
    if (limit === 0 && discountedPayment === 0) {
      changeVslOrderStatus(false);
    } else {
      changeVslOrderStatus(true);
    }
    setChooseDgo(option);
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      const sendObj = {
        insurerId,
        price: Math.round(price),
        autoCategory,
        tariff: franchise,
        dgoTarrif: chooseDgo,
        usageMonths: 0,
        taxi: false,
        salePoint: 40629,
      };
      setGlobalCustomerData({
        user,
        type: franchise.type,
        tariff: {
          type: franchise.type,
          id: franchise.id,
        },
        dgoTarrif: {
          type: chooseDgo.type,
          id: chooseDgo.id,
          limit: chooseDgo.limit,
        },
        allowedDocTypes: {
          epolicy: tariff[0].customerSettings.documentTypes,
          vcl: dgo
            ? dgo.tariff[dgo.tariff.length - 1].customerSettings.documentTypes
            : null,
        },
      });

      setParamsFromUrl({
        price,
        insurer: { id: franchise.insurer.id, name: franchise.insurer.name },
        registrationPlace: registrationPlace || '',
        // autoCategory,
        franchise: franchise.franchise,
      });

      navigate('/form', {
        state: {
          from: location,
          data: { ...location.state?.data, ...sendObj },
        },
      });
    },
  });

  return (
    <CardStyled component="li" sx={{ overflow: 'visible' }}>
      <WrapperStyled
        className="wrapper"
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <WrapperStyled>
          <Grid container className="gridContainer">
            <GridContainer item xs={6} sm={0}>
              <Typography variant="subtitle1" component="h3">
                ОСЦПВ від {insurerName.replace(/,[^,]+$/, '')}
              </Typography>
            </GridContainer>
            <GridContainerImg item xs={6} sm={12}>
              <CompanyCardMedia id={insurerId} alt={insurerName} />
            </GridContainerImg>
          </Grid>
        </WrapperStyled>
        <BoxContent>
          <Typography variant="subtitle1" component="h3" className="title">
            ОСЦПВ від {insurerName.replace(/,[^,]+$/, '')}
          </Typography>

          <Box className="content">
            <BoxSelect className="franchise">
              <GeneralSelect
                id="franchise"
                lableText={content.label.FRANSHISE_TEXT}
                helper={content.label.FRANSHISE_HELPER}
                color={theme.palette.primary.main}
                optionsArr={sortedTarrif}
                // optionsArr={tariff}
                changeCB={handleChangeSelect}
                currentValue={franchise}
                getOptionLabel={(option) => `${option.franchise} грн`}
                getOptionValue={(option) => option.discountedPayment}
                $optionsOnTop={lastItem}
              />
            </BoxSelect>
            <BoxSelect>
              <GeneralSelect
                id="2"
                lableText={content.label.ADDITIONAL_COVER_TEXT}
                helper={content.label.ADDITIONAL_COVER_HELPER}
                color={theme.palette.primary.main}
                optionsArr={companyObject?.dgo?.tariff || []}
                changeCB={handleChangeDgoSelect}
                getOptionLabel={(option) =>
                  `+${option.limit} за ${option.discountedPayment} грн`
                }
                getOptionValue={(option) => option.discountedPayment}
                currentValue={chooseDgo}
                isDisabled={
                  !companyObject?.dgo ||
                  registrationType === REGISTRATION_TYPES.PERMANENT_WITH_OTK
                    ? true
                    : false
                }
                optionsOnTop={lastItem}
              />
            </BoxSelect>
          </Box>
        </BoxContent>
        <WrapperStyled className="footer">
          <BoxFooter>
            {fullPrice && (
              <>
                <Box className="rowWrapper">
                  <Typography component="span">Вартість</Typography>
                  <Typography
                    variant="h4"
                    component="span"
                    className="noDiscounted"
                  >
                    {fullPrice} грн
                  </Typography>
                </Box>
                <Box className="rowWrapper">
                  <Typography component="span">Вигода</Typography>
                  <Typography variant="h3" component="span" className="price">
                    {fullPrice - price} грн
                  </Typography>
                </Box>
              </>
            )}
            <Box className="rowWrapper">
              <Typography component="span">До сплати</Typography>
              <Typography variant="h3" component="span" className="price">
                {Math.round(price)} грн
              </Typography>
            </Box>
          </BoxFooter>
          <ButtonStyled type="submit">Придбати</ButtonStyled>
        </WrapperStyled>
      </WrapperStyled>
    </CardStyled>
  );
};

export default Company;

Company.propTypes = {
  companyObject: PropTypes.shape({
    insurerId: PropTypes.number,
    insurerName: PropTypes.string,
    tariff: PropTypes.array,
    autoCategory: PropTypes.string,
    registrationPlace: PropTypes.object,
    dgo: PropTypes.any,
  }),
  lastItem: PropTypes.bool,
};
