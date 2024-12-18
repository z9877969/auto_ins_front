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
  getRegistrationPlaceData,
  getSubmitObject,
} from '../../redux/byParameters/selectors';
import { useActions } from '../../hooks';

import sub from 'date-fns/sub';
import { contractSaveOSAGONormalize } from '../../helpers/dataNormalize/contractSaveOSAGONormalize';
import { getGlobalCustomerData } from '../../redux/Global/selectors';
import { getHasVclOrder, getUser } from '../../redux/Calculator/selectors';
import { customerInsuriensObject } from '../../helpers/customerInsuriensObject';
import { contractSaveDGONormalize } from '../../helpers/dataNormalize/contractSaveDGONormalize';
import CustomButtonLoading from './CustomButtonLoading';
import SelectOrInputProvider from '../../context/SelectOrInputProvider';
import { format } from 'date-fns';
import * as storage from '../../helpers/storage';
import { FORMIK_DATA_KEYS as formikDataKeys } from '../../constants';
import { useDocTypesOptions } from '../../hooks/useDocTypesOptions';
import { calcBirthdateFromIpn } from 'helpers/birthDate/calcBirthdateFromIpn';

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

const getInsurerStoredStateWithoutDocsData = (docTypeOption) => {
  const storedData = storage.getFromLS(formikDataKeys.INSURED);
  if (!storedData) return null;
  // eslint-disable-next-line
  const { type, series, number, ...rest } = storedData;
  return {
    ...rest,
    type: docTypeOption,
    series: '',
    number: '',
  };
};

const Stepper = ({ backLinkRef }) => {
  const { contractSave } = useActions();
  const user = useSelector(getUser);
  const { tariff, dgoTarrif } = useSelector(getGlobalCustomerData);
  const userParams = useSelector(getSubmitObject);
  const registrationPlaceData = useSelector(getRegistrationPlaceData);
  const [insurObject] = useSelector(getAutoByNumber);
  const engineType = useSelector(getEngineType);
  const hasVclOrder = useSelector(getHasVclOrder);
  const docTypesOptions = useDocTypesOptions();

  const [activeStep, setActiveStep] = useState(0);

  // =======================Formik======================================
  const contactsFormik = useFormik({
    initialValues:
      storage.getFromLS(formikDataKeys.CONTACTS) ?? contactsInitialValues,
    validationSchema: contactsValidationSchema(),
    onSubmit: () => {
      handleNext();
    },
  });

  const insurerDataFormik = useFormik({
    initialValues: getInsurerStoredStateWithoutDocsData(docTypesOptions[0]) ?? {
      ...insuredDataInitialValues,
      type: docTypesOptions[0],
      birthDate: format(
        sub(new Date(), {
          years: 18,
        }),
        'dd/MM/yyyy'
      ),
      date: format(new Date(), 'dd/MM/yyyy'),
    },
    validate: (values) => {
      try {
        const schema = insuredDataFormValidationSchema({
          docType: values.type.value,
        });
        schema.validateSync(values, { abortEarly: false });
      } catch (errors) {
        const validationErrors = {};
        errors.inner?.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        return validationErrors;
      }
      return {};
    },
    validateOnChange: true,
    onSubmit: (values, { setErrors }) => {
      const { taxNumber, birthDate } = values;

      const calculatedBirthdate = calcBirthdateFromIpn(taxNumber)
        .toJSON()
        .split('T')[0];
      const correctBirthDateFormat = birthDate.split('/').reverse().join('-');
      if (calculatedBirthdate !== correctBirthDateFormat) {
        setErrors({ birthDate: 'День народження не відповідає ІПН' });
        return;
      }

      handleNext();
    },
  });

  const homeAddressFormik = useFormik({
    initialValues: storage.getFromLS(formikDataKeys.HOME_ADDRESS) ?? {
      ...homeAddressInitialValues,
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
      maker: insurObject
        ? {
            id: insurObject.model?.autoMaker?.id,
            name: insurObject.model?.autoMaker?.name,
          }
        : // : { name: '', id: '' },
          null,
      model: insurObject
        ? {
            id: insurObject.model?.id,
            name: insurObject.model?.name,
          }
        : // : { name: '', id: '' },
          null,
      bodyNumber: insurObject?.bodyNumber || '',
      outsideUkraine: userParams?.outsideUkraine || false,
      category: insurObject?.category || userParams?.autoCategory,
      engineVolume: insurObject?.engineVolume || '',
    },
    validationSchema: carDataFormValidationSchema({
      isPrivilege: insurerDataFormik.values.type.privilegeType === 'PRIVILEGED',
      engineType,
      hasVclOrder,
    }),
    // enableReinitialize: true,
    // validateOnBlur: true,
    validateOnChange: true,
    onSubmit: ({ model, maker, engineVolume }) => {
      const fullCarModel = `${maker.name} ${model.name}`;
      const { privilegeType, customerStatus } = insurerDataFormik.values.type;
      const privilegeData =
        privilegeType === 'PRIVILEGED'
          ? {
              engineVolume,
              privilegeType,
              customerStatus,
            }
          : null;
      const vclOrderData = hasVclOrder
        ? {
            engineVolume,
            autoCategory: engineType,
          }
        : null;
      const customIsur = customerInsuriensObject(
        insurerDataFormik,
        homeAddressFormik,
        contactsFormik,
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
            privilegeData,
            vclOrderData
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
        insurerDataFormik.handleSubmit(e);
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
              formik={insurerDataFormik}
              docTypesOptions={docTypesOptions}
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
              <CarDataForm formik={carDataFormik} userParams={userParams} />
            </SelectOrInputProvider>
          </Suspense>
        );
      default:
        return 'Unknown step';
    }
  };

  const { setFieldValue: carDataSetFildValue } = carDataFormik;

  useEffect(() => {
    insurObject?.stateNumber &&
      carDataSetFildValue('stateNumber', insurObject?.stateNumber);
  }, [insurObject, carDataSetFildValue]);

  return (
    <Stack sx={{ width: '100%' }}>
      <StepperStyled
        alternativeLabel
        activeStep={activeStep}
        connector={<Connector />}
      >
        {steps.map((label) => {
          // const stepProps = {};
          // const labelProps = {};

          return (
            <Step key={Object.keys(label)}>
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
      <FormStyled component="form" autoComplete="on" onSubmit={handleSubmit}>
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
