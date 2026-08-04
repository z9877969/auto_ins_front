import { useSelector } from 'react-redux';
import { selectInsurerPhoneNum } from '@redux/Global/selectors';

export const InsurerPhoneNumber = () => {
  const insurerPhoneNumber = useSelector(selectInsurerPhoneNum);
  return (
    <>
      <br />
      <b>{insurerPhoneNumber}</b>
    </>
  );
};
