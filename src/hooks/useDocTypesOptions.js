import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getIsPrivilage } from '../redux/byParameters/selectors';
import { PRIVILEGED_TYPE } from '../constants';
import { docsOptionsDict } from '../assets/utils/isPrivilegedOptions';

const getPrivilageType = (isPrivilage) =>
  isPrivilage ? PRIVILEGED_TYPE.PRIVILEGED : PRIVILEGED_TYPE.NATURAL;

export const useDocTypesOptions = () => {
  const isPrivilage = useSelector(getIsPrivilage);
  const allowedDocTypes = useSelector(
    (s) => s.global.globalCustomerData.allowedDocTypes
  );

  const insurerDocsOptions = useMemo(() => {
    const privilageType = getPrivilageType(isPrivilage);
    const docTypesOptions = docsOptionsDict[privilageType].filter((el) =>
      allowedDocTypes.includes(el.value)
    );
    return docTypesOptions;
  }, [isPrivilage]);

  return insurerDocsOptions;
};
