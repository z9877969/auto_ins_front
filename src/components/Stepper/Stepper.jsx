import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import { lazy, Suspense } from 'react';
import { useEffect, useState } from 'react';
import { SpriteSVG } from '../../images/SpriteSVG';
import { Connector, Lable, LableIcon, StepperStyled } from './StepperStyled';
import StepIcon from './StepIcon';
import { useFormik } from 'formik';
import {
  contactsInitialValues,
  homeAddressInitialValues,
  insuredDataInitialValues,
} from '../../helpers/formikInitialValues';

import {
  ButtonContainerStyled,
  FormStyled,
  WhiteButtonSVGStyled,
  WhiteButtonStyled,
} from '../../forms/InsuredDataForm/InsuredDataForm.styled';
import { Typography } from '@mui/material';
import BtnBack from '../../forms/Buttons/BtnBack';
import {
  NATURALSelectOptions,
  PRIVILEGEDSelectOptions,
} from '../../assets/utils/isPrivilegedOptions';
import { useSelector } from 'react-redux';
import { getAutoByNumber } from '../../redux/References/selectors';
import {
  carDataFormValidationSchema,
  contactsValidationSchema,
  homeAddressFormValidationSchema,
  insuredDataFormValidationSchema,
} from '../../helpers/formValidationSchema';
import {
  getEngineType,
  getIsPrivilage,
  getRegistrationPlaceData,
  getSubmitObject,
} from '../../redux/byParameters/selectors';
import { useActions } from '../../hooks';

import sub from 'date-fns/sub';
import { contractSaveOSAGONormalize } from '../../helpers/dataNormalize/contractSaveOSAGONormalize';
import {
  getGlobalCustomerData,
  getHomeAddress,
} from '../../redux/Global/selectors';
import { getUser } from '../../redux/Calculator/selectors';
import { customerInsuriensObject } from '../../helpers/customerInsuriensObject';
import { contractSaveDGONormalize } from '../../helpers/dataNormalize/contractSaveDGONormalize';
import CustomButtonLoading from './CustomButtonLoading';
import SelectOrInputProvider from '../../context/SelectOrInputProvider';
import { format } from 'date-fns';
import * as storage from '../../helpers/storage';
import { FORMIK_DATA_KEYS as formikDataKeys } from '../../constants';

const steps = [
  { Контакти: 'icon-email' },
  { 'Дані страхувальника': 'icon-passport' },
  { 'Домашня адреса': 'icon-home' },
  { 'Дані авто': 'icon-car-little' },
];
const FormContacts = lazy(() =>
  import('../../forms/FormContacts/FormContacts')
);
const InsuredDataForm = lazy(() =>
  import('../../forms/InsuredDataForm/InsuredDataForm')
);
const HomeAddressForm = lazy(() =>
  import('../../forms/HomeAddressForm/HomeAddressForm')
);
const CarDataForm = lazy(() => import('../../forms/CarDataForm/CarDataForm'));

const Stepper = ({ backLinkRef }) => {
  const { contractSave } = useActions();
  const user = useSelector(getUser);
  const { tariff, dgoTarrif } = useSelector(getGlobalCustomerData);
  const homeAddress = useSelector(getHomeAddress);
  const userParams = useSelector(getSubmitObject);
  const registrationPlaceData = useSelector(getRegistrationPlaceData);
  const [insurObject] = useSelector(getAutoByNumber);
  const customerCategory = useSelector(getIsPrivilage);
  const engineType = useSelector(getEngineType);

  const [activeStep, setActiveStep] = useState(0);
  const [identityCard, setIdentityCard] = useState(null);

  let InsuredDataSelectOptions = !customerCategory
    ? NATURALSelectOptions
    : PRIVILEGEDSelectOptions;

  useEffect(() => {
    setIdentityCard(InsuredDataSelectOptions[0]);
  }, [InsuredDataSelectOptions]);

  // =======================Formik======================================
  const contactsFormik = useFormik({
    initialValues:
      storage.getFromLS(formikDataKeys.CONTACTS) ?? contactsInitialValues,
    validationSchema: contactsValidationSchema(),
    onSubmit: () => {
      handleNext();
    },
  });

  const insuredDataFormik = useFormik({
    initialValues: storage.getFromLS(formikDataKeys.INSURED) ?? {
      ...insuredDataInitialValues,
      birthDate: format(
        sub(new Date(), {
          years: 18,
        }),
        'dd/MM/yyyy'
      ),
      date: format(new Date(), 'dd/MM/yyyy'),
    },
    validationSchema: insuredDataFormValidationSchema(),
    onSubmit: () => {
      handleNext();
    },
  });

  const homeAddressFormik = useFormik({
    initialValues: storage.getFromLS(formikDataKeys.HOME_ADDRESS) ?? {
      ...homeAddressInitialValues,
      regionANDcity: homeAddress,
    },
    validationSchema: homeAddressFormValidationSchema(),
    onSubmit: () => {
      handleNext();
    },
  });

  const carDataFormik = useFormik({
    initialValues: storage.getFromLS(formikDataKeys.CAR) ?? {
      stateNumber: insurObject?.stateNumber || '',
      year: insurObject?.year || '',
      brand: insurObject?.modelText || '',
      model: '',
      bodyNumber: insurObject?.bodyNumber || '',
      maker: '',
      outsideUkraine: userParams?.outsideUkraine || false,
      category: insurObject?.category || userParams?.autoCategory,
      engineVolume: insurObject?.engineVolume || '',
    },
    validationSchema: carDataFormValidationSchema({
      isPrivilege: identityCard?.privilegeType === 'PRIVILEGED',
      engineType,
    }),
    // enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: ({ model, maker, engineVolume }) => {
      const fullCarModel = `${maker.name} ${model.name}`;
      const privilegeData =
        identityCard.privilegeType === 'PRIVILEGED'
          ? {
              engineVolume,
              privilegeType: identityCard.privilegeType,
              customerStatus: identityCard.customerStatus,
            }
          : null;
      const customIsur = customerInsuriensObject(
        insuredDataFormik,
        homeAddressFormik,
        contactsFormik,
        identityCard,
        carDataFormik,
        insurObject,
        registrationPlaceData.id,
        fullCarModel,
        privilegeData
      );

      contractSave(
        contractSaveOSAGONormalize(
          userParams,
          user,
          tariff,
          customIsur,
          privilegeData
        )
      );

      if (dgoTarrif?.id) {
        contractSave(
          contractSaveDGONormalize(
            userParams,
            user,
            dgoTarrif,
            insurObject,
            customIsur,
            privilegeData
          )
        );
      }
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    switch (activeStep) {
      case 0:
        contactsFormik.handleSubmit(e);
        break;
      case 1:
        insuredDataFormik.handleSubmit(e);
        break;
      case 2:
        homeAddressFormik.handleSubmit(e);
        break;
      case 3:
        carDataFormik.handleSubmit(e);
        break;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Suspense>
            <FormContacts formik={contactsFormik} />
          </Suspense>
        );
      case 1:
        return (
          <Suspense>
            <InsuredDataForm
              formik={insuredDataFormik}
              selectData={{
                InsuredDataSelectOptions,
                identityCard,
                setIdentityCard,
              }}
            />
          </Suspense>
        );
      case 2:
        return (
          <Suspense>
            <HomeAddressForm formik={homeAddressFormik} />
          </Suspense>
        );
      case 3:
        return (
          <Suspense>
            <SelectOrInputProvider>
              <CarDataForm formik={carDataFormik} />
            </SelectOrInputProvider>
          </Suspense>
        );
      default:
        return 'Unknown step';
    }
  };

  useEffect(() => {
    storage.setToLS(formikDataKeys.CONTACTS, contactsFormik.values);
  }, [contactsFormik.values]);
  useEffect(() => {
    storage.setToLS(formikDataKeys.INSURED, insuredDataFormik.values);
  }, [insuredDataFormik.values]);
  useEffect(() => {
    storage.setToLS(formikDataKeys.HOME_ADDRESS, homeAddressFormik.values);
  }, [homeAddressFormik.values]);
  useEffect(() => {
    storage.setToLS(formikDataKeys.CAR, carDataFormik.values);
  }, [carDataFormik.values]);

  return (
    <Stack sx={{ width: '100%' }}>
      <StepperStyled
        alternativeLabel
        activeStep={activeStep}
        connector={<Connector />}
      >
        {steps.map((label) => {
          const stepProps = {};
          // const labelProps = {};

          return (
            <Step key={Object.keys(label)} {...stepProps}>
              <LableIcon>
                <SpriteSVG
                  key={Object.values(label).toString()}
                  name={Object.values(label).toString()}
                />
              </LableIcon>
              <Lable StepIconComponent={StepIcon}>{Object.keys(label)}</Lable>
            </Step>
          );
        })}
      </StepperStyled>
      <FormStyled component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="formTitle" component="h2">
          {Object.keys(steps[activeStep])}
        </Typography>
        {getStepContent(activeStep)}
        <ButtonContainerStyled component="div">
          <CustomButtonLoading
            btnTitle={'Підтвердити'}
            type={'submit'}
            // onCLick={handleSubmit}
          />
          {activeStep === 0 ? (
            <BtnBack backLinkRef={backLinkRef} />
          ) : (
            <WhiteButtonStyled onClick={handleBack}>
              <WhiteButtonSVGStyled component="span">
                <SpriteSVG name="icon-arrow-left" />
              </WhiteButtonSVGStyled>
              Назад
            </WhiteButtonStyled>
          )}
        </ButtonContainerStyled>
      </FormStyled>
    </Stack>
  );
};

Stepper.propTypes = {
  backLinkRef: PropTypes.object,
};

export default Stepper;
