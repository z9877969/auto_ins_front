import { useSelector } from 'react-redux';
import {
  getFilteredCompanies,
  getTariffsStatus,
  getTariffVcl,
} from '../../redux/Calculator/selectors';

import Company from '../Company/Company';

const CompanyList = () => {
  let dgo = null;

  const proposals = useSelector(getFilteredCompanies);

  let dgos = useSelector(getTariffVcl);
  const status = useSelector(getTariffsStatus);
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

    return (
      <Company
        key={companyObject?.insurerId}
        companyObject={companyObject}
        lastItem={idx === arr.length - 1}
      />
    );
  });
  return <ul>{status && insurerProposal}</ul>;
};

export default CompanyList;
