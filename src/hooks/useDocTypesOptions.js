import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getIsPrivilage } from '@redux/byParameters/selectors';
import { selectAllowedDocTypes } from '@redux/Global/selectors';
import { PRIVILEGED_TYPE } from '../constants';
import { docsOptionsDict } from '../assets/utils/docsOptionsDict';

const getPrivilageType = (isPrivilage) =>
  isPrivilage ? PRIVILEGED_TYPE.PRIVILEGED : PRIVILEGED_TYPE.NATURAL;

export const useDocTypesOptions = () => {
  const isPrivilage = useSelector(getIsPrivilage);
  const allowedDocTypes = useSelector(selectAllowedDocTypes);

  const insurerDocsOptions = useMemo(() => {
    const privilageType = getPrivilageType(isPrivilage);
    const docTypesOptions = docsOptionsDict[privilageType].filter((el) =>
      allowedDocTypes.includes(el.value)
    );
    return docTypesOptions;
  }, [isPrivilage, allowedDocTypes]);

  return insurerDocsOptions;
};
