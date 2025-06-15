import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { InputContBoxStyled } from '../InsuredDataForm/InsuredDataForm.styled';
import GeneralInput from '../../components/GeneralInput/GeneralInput';
import GeneralSelect from '../../components/GeneralSelect/GeneralSelect';
import {
  getAutoByMakerAndModel,
  getAutoByNumber,
  getAutoMakers,
  getAutoModelByMaker,
} from '../../redux/References/selectors';
import { getSubmitObject } from '../../redux/byParameters/selectors';
import { useActions } from '../../hooks/useActions';
import { getIsModalErrorOpen } from '../../redux/Global/selectors';
import ModalError from '../../components/ModalError/ModalError';
import { useSelectOrInput } from '../../context/SelectOrInputProvider';
import SelectNoOptionsMessage from '../../components/SelectNoOptionsMessage/SelectNoOptionsMessage';
import InputInsteadSelect from '../../components/InputInsteadSelect/InputInsteadSelect';
// import { selectAutoCategory } from '../../helpers/ByParameters/selectOptions';
// import { getHasVclOrder } from '../../redux/Calculator/selectors';
import { FORMIK_DATA_KEYS, VEHICLES_GROUPS } from '../../constants';
import * as storage from '../../helpers/storage';

const customComponents = {
  NoOptionsMessage: SelectNoOptionsMessage,
};

const CarDataForm = ({ formik, userParams }) => {
  const {
    setAutoByMakerAndModel,
    allAutoMakers,
    autoByNumber,
    allAutoModelByMaker,
    autoByMakerAndModel,
    setRefError,
  } = useActions();
  const autoMakers = useSelector(getAutoMakers);
  const allAutoModel = useSelector(getAutoModelByMaker);
  const autoByBrand = useSelector(getAutoByMakerAndModel);
  const { outsideUkraine } = useSelector(getSubmitObject);
  const [insuranceObject] = useSelector(getAutoByNumber);
  const isError = useSelector(getIsModalErrorOpen);
  // const hasVclOrder = useSelector(getHasVclOrder);
  // const { engineCapacity } = useSelector((state) => state.byParameters);

  const selectOrInput = useSelectOrInput();

  const modelInputRef = useRef(null);
  const engineVolumeRef = useRef(insuranceObject?.engineVolume || 0);
  const modelInputId = useRef('custom').current; // must be 'custom' because so used in insuranceObjectNormalize.js

  const { values, setFieldValue, setValues } = formik;

  const handleSelectRef = useCallback((elementRef) => {
    modelInputRef.current = elementRef;
  }, []);

  const modelOptions = useMemo(() => {
    return allAutoModel?.length > 0 ? allAutoModel : autoByBrand;
  }, [allAutoModel, autoByBrand]);

  const handleBlurStateNumber = (e) => {
    setRefError('');
    setAutoByMakerAndModel([]);
    if (e.target.value && outsideUkraine) {
      allAutoMakers();
    }
    if (e.target.value && !outsideUkraine) {
      autoByNumber(e.target.value);
    }
    formik.handleChange(e);
  };
  const handleChangeTextInput = (e) => {
    const { value, name } = e.target;
    setFieldValue(name, value.trim().toUpperCase());
  };

  const handleChangeMaker = (maker) => {
    const { id, name } = maker;
    setFieldValue('maker', { id, name });
    allAutoModelByMaker(id);
  };

  const handleChangeModel = (modelData) => {
    const { id, name } = modelData;
    setFieldValue('model', { id, name });
  };

  const handleChangeModelByInput = (e) => {
    const { value } = e.target;
    setFieldValue('model', {
      id: modelInputId,
      name: value,
    });
  };

  const handleChangeEngineVolume = (e) => {
    const { value } = e.target;
    setFieldValue('engineVolume', Number(value));
  };

  useEffect(() => {
    const storedValues = storage.getFromLS(FORMIK_DATA_KEYS.CAR);
    setValues((v) => ({
      ...v,
      year: insuranceObject?.year || '',
      modelText: insuranceObject?.modelText || storedValues?.modelText || '',
      maker: {
        id: insuranceObject?.model?.autoMaker?.id || '',
        name: insuranceObject?.model?.autoMaker?.name || '',
      },
      model: {
        id: insuranceObject?.model?.id || '',
        name: insuranceObject?.model?.name || '',
      },
      bodyNumber: insuranceObject?.bodyNumber || '',
      category:
        insuranceObject?.category || userParams?.autoCategory || v.category,
      engineVolume: insuranceObject?.engineVolume || '',
      grossWeight: insuranceObject?.grossWeight || '',
      curbWeight: insuranceObject?.curbWeight || '',
      seatingCapacity: insuranceObject?.seatingCapacity || '',
      electricMotorPower: insuranceObject?.electricMotorPower || '',
    }));
    // eslint-disable-next-line
  }, [insuranceObject]);

  useEffect(() => {
    const maker = autoByBrand[0]?.autoMaker;
    maker && setFieldValue('maker', maker);
    if (autoByBrand?.length === 0) {
      allAutoMakers();
    }
  }, [autoByBrand, allAutoMakers, setFieldValue]);

  useEffect(() => {
    const maker = values?.modelText?.replace(/ .*/, '');
    const model = values?.modelText?.replace(/^[^\s]+\s/, '').slice(0, 1);

    if (!outsideUkraine && maker?.length > 0) {
      autoByMakerAndModel(maker + ' ' + model);
    }
  }, [values?.modelText, autoByMakerAndModel, outsideUkraine]);

  useEffect(() => {
    if (selectOrInput.isModelInput) {
      setFieldValue('model', {
        id: modelInputId,
        name: modelInputRef.current.value,
      });
    }
  }, [selectOrInput.isModelInput, setFieldValue, modelInputId]);

  useEffect(() => {
    storage.setToLS(FORMIK_DATA_KEYS.CAR, values);
  }, [values]);

  if (isError) {
    return <ModalError />;
  }

  return (
    <>
      <InputContBoxStyled>
        <GeneralInput
          id="stateNumber"
          lableText="Номерний знак*:"
          handleBlur={handleBlurStateNumber}
          customFunc={handleChangeTextInput}
          formikData={formik}
          placeholder={'AA1234AA'}
        />
        <GeneralInput
          id="year"
          lableText="Рік випуску*:"
          formikData={formik}
          placeholder={'2005'}
        />
        <GeneralSelect
          id="maker"
          lableText="Марка*:"
          // currentValue={values.maker.id ? values.maker : { name: 'Skoda' }}
          currentValue={values.maker?.id ? values.maker : undefined}
          placeholder={'Skoda'}
          optionsArr={autoMakers}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          changeCB={handleChangeMaker}
          readOnly={Boolean(insuranceObject?.model)}
          noOptionsMessage="Така марка відсутня"
          errorMessage={
            formik.touched['maker']?.id && formik.errors['maker']?.id
          }
        />

        {!selectOrInput.isModelInput ? (
          <GeneralSelect
            handleSelectRef={handleSelectRef}
            id="model"
            lableText="Модель*:"
            currentValue={values.model?.id ? values.model : undefined}
            placeholder={'Fabia'}
            optionsArr={modelOptions}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            isValid={!values.model?.id ? false : true}
            changeCB={handleChangeModel}
            readOnly={Boolean(insuranceObject?.model)}
            noOptionsMessage="Модель відсутня.👉 Натисніть щоб вказати самостійно 👈"
            components={customComponents}
            errorMessage={
              formik.touched['model']?.id && formik.errors['model']?.id
            }
          />
        ) : (
          <InputInsteadSelect
            formik={formik}
            label="Модель*:"
            name="model"
            valueKey="name"
            onChange={handleChangeModelByInput}
            closeInput={() => selectOrInput.setIsModelInput(false)}
          />
        )}
        {!engineVolumeRef.current && (
          <GeneralInput
            id="engineVolume"
            lableText="Об'єм двигуна*:"
            formikData={formik}
            placeholder="1500"
            customFunc={handleChangeEngineVolume}
          />
        )}
        <GeneralInput
          id="bodyNumber"
          lableText="VIN Номер*:"
          formikData={formik}
          customFunc={handleChangeTextInput}
          placeholder={'WSXEDCRFV12345678'}
        />
        {/* ============ */}
        <GeneralInput
          id="grossWeight"
          lableText="Повна маса, кг:"
          formikData={formik}
          customFunc={(e) =>
            setFieldValue('grossWeight', e.target.value.trim())
          }
          placeholder={'1372'}
        />
        <GeneralInput
          id="curbWeight"
          lableText="Маса без навантаження, кг:"
          formikData={formik}
          customFunc={(e) => setFieldValue('curbWeight', e.target.value.trim())}
          placeholder={'1100'}
        />
        <GeneralInput
          id="seatingCapacity"
          lableText="Кількість місць (з водієм)"
          formikData={formik}
          customFunc={(e) =>
            setFieldValue('seatingCapacity', e.target.value.trim())
          }
          placeholder={'5'}
        />
        {values.category === VEHICLES_GROUPS.B.B5 && (
          <GeneralInput
            id="electricMotorPower"
            lableText="Потужність електродвигуна, кВт"
            formikData={formik}
            customFunc={(e) =>
              setFieldValue('electricMotorPower', e.target.value.trim())
            }
            placeholder={''}
          />
        )}
        {/*
         **grossWeight:  - Повна маса, кг
         **curbWeight:  - Маса без навантаження, кг
         **seatingCapacity: - Кількість місць (з водієм)
         **electricMotorPower: - Потужність електродвигуна, кВт
         */}
        {/* ============== */}
      </InputContBoxStyled>
    </>
  );
};

export default CarDataForm;

CarDataForm.propTypes = {
  formik: PropTypes.object,
};
