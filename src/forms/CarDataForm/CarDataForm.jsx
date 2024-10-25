import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import {
  getIsPrivilage,
  getSubmitObject,
} from '../../redux/byParameters/selectors';
import { useActions } from '../../hooks/useActions';
import { getIsModalErrorOpen } from '../../redux/Global/selectors';
import ModalError from '../../components/ModalError/ModalError';
import { useSelectOrInput } from '../../context/SelectOrInputProvider';
import SelectNoOptionsMessage from '../../components/SelectNoOptionsMessage/SelectNoOptionsMessage';
import InputInsteadSelect from '../../components/InputInsteadSelect/InputInsteadSelect';
// import { selectAutoCategory } from '../../helpers/ByParameters/selectOptions';
import { getHasVclOrder } from '../../redux/Calculator/selectors';
import { FORMIK_DATA_KEYS } from '../../constants';
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
    // setEngineCapacity,
  } = useActions();
  const autoMakers = useSelector(getAutoMakers);
  const allAutoModel = useSelector(getAutoModelByMaker);
  const autoByBrand = useSelector(getAutoByMakerAndModel);
  const { outsideUkraine } = useSelector(getSubmitObject);
  const [insuranceObject] = useSelector(getAutoByNumber);
  const isError = useSelector(getIsModalErrorOpen);
  const isPrivilage = useSelector(getIsPrivilage);
  const hasVclOrder = useSelector(getHasVclOrder);
  // const { engineCapacity } = useSelector((state) => state.byParameters);
  const [disabled, setDisabled] = useState(
    insuranceObject?.stateNumber ? false : true
  );

  const selectOrInput = useSelectOrInput();

  const modelInputRef = useRef(null);
  const modelInputId = useRef('custom').current;

  const { values, setFieldValue } = formik;

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
      setDisabled(false);
      allAutoMakers();
    }
    if (e.target.value && !outsideUkraine) {
      autoByNumber(e.target.value).then(
        ({ payload }) => !payload.length && setDisabled(false)
      );
    }
    formik.handleChange(e);
  };
  const handleChangeStateNumber = (e) => {
    const { value, name } = e.target;
    formik.setFieldValue(name, value.trim().toUpperCase());
  };
  const handleChangeBrand = (maker) => {
    const { id, name } = maker;
    setFieldValue('maker', { id, name });
    allAutoModelByMaker(id);
  };

  const handleChangeModel = (modelData) => {
    const { id, name } = modelData;
    setFieldValue('model', { id, name });
  };

  const handleChangeVinNumber = (e) => {
    const value = e.target.value.trim().toUpperCase();
    setFieldValue('bodyNumber', value);
  };

  const handleChangeEngineVolume = (e) => {
    const { value } = e.target;
    setFieldValue('engineVolume', Number(value));
  };

  const handleChangeModelByInput = (e) => {
    const { value } = e.target;
    setFieldValue('model', {
      id: modelInputId,
      name: value,
    });
  };

  useEffect(() => {
    if (insuranceObject) {
      setDisabled(false);
    }
    if (!insuranceObject) {
      setDisabled(true);
    }
    const storedValues = storage.getFromLS(FORMIK_DATA_KEYS.CAR);
    formik.setValues((v) => ({
      ...v,
      // stateNumber: insuranceObject?.stateNumber ?? '',
      year: insuranceObject?.year || storedValues?.year || '',
      brand: insuranceObject?.brand || storedValues?.brand || '',
      maker: {
        id:
          insuranceObject?.model?.autoMaker?.id || storedValues?.maker?.id || '',
        name:
          insuranceObject?.model?.autoMaker?.name ||
          storedValues?.maker?.name ||
          '',
      },
      model: {
        id: insuranceObject?.model?.id || storedValues?.model?.id || '',
        name: insuranceObject?.model?.name || storedValues?.model?.name || '',
      },
      bodyNumber: insuranceObject?.bodyNumber || storedValues?.bodyNumber || '',
      category:
        insuranceObject?.category || userParams?.autoCategory || v.category,
      engineVolume:
        insuranceObject?.engineVolume || storedValues?.engineVolume || '',
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
    const maker = values?.brand?.replace(/ .*/, '');
    const model = values?.brand?.replace(/^[^\s]+\s/, '').slice(0, 1);

    if (!outsideUkraine && maker?.length > 0) {
      autoByMakerAndModel(maker + ' ' + model);
    }
  }, [values?.brand, autoByMakerAndModel, outsideUkraine]);

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

  // values={model: {name: "model" || "some model"}, maker: 1741 || {id: 1741, lastModified: "2019-08-...."}}

  return (
    <>
      <InputContBoxStyled>
        <GeneralInput
          id="stateNumber"
          lableText="Номерний знак*:"
          handleBlur={handleBlurStateNumber}
          customFunc={handleChangeStateNumber}
          formikData={formik}
          placeholder={'AA1234AA'}
        />
        {formik.errors.stateNumber && (
          <div className="errorMessage">{formik.errors.stateNumber}</div>
        )}
        <GeneralInput
          id="year"
          lableText="Рік випуску*:"
          formikData={formik}
          isDisabled={disabled}
          placeholder={'2005'}
        />
        <GeneralSelect
          id="brand"
          lableText="Марка*:"
          // currentValue={values.maker.id ? values.maker : { name: 'Skoda' }}
          currentValue={values.maker.id ? values.maker : undefined}
          placeholder={'Skoda'}
          optionsArr={autoMakers}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          changeCB={handleChangeBrand}
          isDisabled={disabled}
          readOnly={Boolean(insuranceObject?.stateNumber)}
          noOptionsMessage="Така марка відсутня"
          errorMessage={formik.errors['maker']?.id}
        />

        {!selectOrInput.isModelInput ? (
          <GeneralSelect
            handleSelectRef={handleSelectRef}
            id="model"
            lableText="Модель*:"
            // currentValue={values.model.id ? values.model : { name: 'Fabia' }}
            currentValue={values.model.id ? values.model : undefined}
            placeholder={'Fabia'}
            optionsArr={modelOptions}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            isDisabled={disabled}
            isValid={
              // values.model?.name === 'Оберіть модель авто' ? false : true
              !values.model?.id ? false : true
            }
            changeCB={handleChangeModel}
            readOnly={Boolean(insuranceObject?.stateNumber)}
            noOptionsMessage="Така модель відсутня. Вкажіть її самостійно"
            components={customComponents}
            errorMessage={formik.errors['model']?.id}
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
        {(isPrivilage || hasVclOrder) && (
          <GeneralInput
            id="engineVolume"
            lableText="Об'єм двигуна*:"
            formikData={formik}
            customFunc={handleChangeEngineVolume}
            isDisabled={disabled}
          />
        )}
        <GeneralInput
          id="bodyNumber"
          lableText="VIN Номер*:"
          formikData={formik}
          customFunc={handleChangeVinNumber}
          isDisabled={disabled}
          placeholder={'WSXEDCRFV12345678'}
        />
      </InputContBoxStyled>
    </>
  );
};

export default CarDataForm;

CarDataForm.propTypes = {
  formik: PropTypes.object,
};
