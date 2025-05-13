import { useSelector } from 'react-redux';
import Company from '../Company/Company';
import {
  getFilteredCompanies,
  getTariffsStatus,
  getTariffVcl,
} from '../../redux/Calculator/selectors';
// import { useActions } from 'hooks/useActions';
// import { selectIsPrivileged } from '@redux/byParameters/selectors';

const CompanyList = () => {
  let dgo = null;

  const proposals = useSelector(getFilteredCompanies);
  let dgos = useSelector(getTariffVcl);
  const status = useSelector(getTariffsStatus);
  // const isPrivileged = useSelector(selectIsPrivileged);

  // const { setIsOpenPrivilageSupportModal } = useActions();

  const insurerProposal = proposals?.map((companyObject, idx, arr) => {
    dgo = dgos?.find((el) => el?.insurerId === companyObject?.insurerId);
    if (!dgo) {
      dgo = null;
    } else {
      const d = [...dgo.tariff];
      d.unshift({ limit: 0, discountedPayment: 0 });
      dgo = { ...dgo, tariff: d };
    }
    companyObject = { ...companyObject, dgo };

    // const handleOpenSuportModal = () => {
    //   setIsOpenPrivilageSupportModal(true);
    // };

    return (
      <Company
        key={companyObject?.insurerId}
        companyObject={companyObject}
        lastItem={idx === arr.length - 1}
        // isPrivileged={isPrivileged}
        // handleOpenSuportModal={handleOpenSuportModal}
      />
    );
  });
  return <ul>{status && insurerProposal}</ul>;
};

export default CompanyList;
