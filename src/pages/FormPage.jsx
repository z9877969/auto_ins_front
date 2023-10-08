import { useLocation, useNavigate } from "react-router-dom";
import { ContainerSectionPage, PageContainerS } from "../style/Global.styled";
import OutletNavaigation from "../components/OutletNavigation/OutletNavigation";
import FormContacts from "../forms/FormContacts/FormContacts";
import CompanySmall from "../components/CompanySmall/CompanySmall";
import { useState } from "react";

import companyForm from "../assets/mocapi/companyForm.json";
import { Wrapper } from "./FormPageStyled";

const FormPage = () => {
  const location = useLocation();
  const [company, _] = useState(companyForm);

  return (
    <PageContainerS>
      <ContainerSectionPage component="div">
        <OutletNavaigation locationPath={location} />
        <Wrapper>
          <CompanySmall company={company} />

          <FormContacts />
        </Wrapper>
      </ContainerSectionPage>
    </PageContainerS>
  );
};

export default FormPage;
