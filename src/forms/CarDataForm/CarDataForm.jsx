import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
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

const customComponents = {
  NoOptionsMessage: SelectNoOptionsMessage,
};

const CarDataForm = ({ formik }) => {
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
  const isPrivilage = useSelector(getIsPrivilage);

  const [selectedAutoMaker, setSelectedAutoMaker] = useState({
    name: 'Оберіть марку авто',
  });
  const [selectedAutoModel, setSelectedAutoModel] = useState({
    name: 'Оберіть модель авто',
  });
  const [disabled, setDisabled] = useState(
    insuranceObject?.stateNumber ? false : true
  );

  const selectOrInput = useSelectOrInput();

  const modelInputRef = useRef(null);
  const modelInputId = useId();
  
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
  const handleChangeBrand = (e) => {
    setSelectedAutoModel({
      name: 'Оберіть модель авто',
    });

    setSelectedAutoMaker(e);
    allAutoModelByMaker(e.id);
    formik.setFieldValue('maker', e.id);
  };

  const handleChangeModel = (e) => {
    setSelectedAutoModel(e);
    formik.setFieldValue('maker', e.autoMaker);
    formik.setFieldValue('model', { id: e.id, name: e.name });
  };

  const handleChangeVinNumber = (e) => {
    const e2 = e.target.value.trim().toUpperCase();
    e.target.value = e2;
    formik.handleChange(e);
  };

  const handleChangeEngineVolume = (e) => {
    const { value } = e.target;
    formik.setFieldValue('engineVolume', Number(value));
  };

  const handleChangeModelByInput = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, {
      value: modelInputId,
      label: value,
    });
  };

  const findMakerAndModel = useCallback(() => {
    const maker = autoByBrand[0]?.autoMaker;
    setSelectedAutoMaker(maker);
    if (autoByBrand?.length === 0) {
      allAutoMakers();
    }
  }, [autoByBrand, allAutoMakers]);

  useEffect(() => {
    if (insuranceObject) {
      setDisabled(false);
    }
    if (!insuranceObject) {
      setDisabled(true);
    }
  }, [insuranceObject]);

  useEffect(() => {
    findMakerAndModel();
  }, [findMakerAndModel]);

  useEffect(() => {
    const maker = formik.values?.brand?.replace(/ .*/, '');
    const model = formik.values?.brand?.replace(/^[^\s]+\s/, '').slice(0, 1);

    if (!outsideUkraine && maker?.length > 0) {
      autoByMakerAndModel(maker + ' ' + model);
    }
  }, [formik.values?.brand, autoByMakerAndModel, outsideUkraine]);

  const { setFieldValue } = formik;

  useEffect(() => {
    if (selectOrInput.isModelInput) {
      setFieldValue('model', {
        value: modelInputId,
        label: modelInputRef.current.value,
      });
    }
  }, [selectOrInput.isModelInput, setFieldValue, modelInputId]);

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
          customFunc={handleChangeStateNumber}
          formikData={formik}
        />
        {formik.errors.stateNumber ? (
          <div className="errorMessage">{formik.errors.stateNumber}</div>
        ) : (
          ''
        )}
        <GeneralInput
          id="year"
          lableText="Рік випуску*:"
          formikData={formik}
          isDisabled={disabled}
        />
        <GeneralSelect
          id="brand"
          lableText="Марка*:"
          currentValue={selectedAutoMaker}
          optionsArr={autoMakers}
          defaultValue={{ name: 'Оберіть марку авто' }}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          changeCB={handleChangeBrand}
          isDisabled={disabled}
          readOnly={Boolean(insuranceObject?.stateNumber)}
          noOptionsMessage="Така марка відсутня"
        />

        {!selectOrInput.isModelInput ? (
          <GeneralSelect
            handleSelectRef={handleSelectRef}
            id="model"
            lableText="Модель*:"
            currentValue={selectedAutoModel}
            optionsArr={modelOptions}
            defaultValue={{ name: 'Оберіть модель авто' }}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            isDisabled={disabled}
            isValid={
              selectedAutoModel?.name === 'Оберіть модель авто' ? false : true
            }
            changeCB={handleChangeModel}
            readOnly={Boolean(insuranceObject?.stateNumber)}
            noOptionsMessage="Така модель відсутня. Вкажіть її самостійно"
            components={customComponents}
          />
        ) : (
          <InputInsteadSelect
            formik={formik}
            label="Модель*:"
            name="model"
            onChange={handleChangeModelByInput}
            closeInput={() => selectOrInput.setIsModelInput(false)}
          />
        )}
        {isPrivilage && (
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
        />
      </InputContBoxStyled>
    </>
  );
};

export default CarDataForm;

CarDataForm.propTypes = {
  formik: PropTypes.object,
};
