import { useEffect, useState } from "react";
import {
  TabStyled,
  TabsContainer,
  TabsStyled,
  TitleStaled,
} from "./HeroTabs.styled";
import { useMediaQuery } from "@mui/material";

const HeroTabs = ({ setActiveTab }) => {
  const [value, setValue] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleChange = (_, newValue) => {
    setValue(newValue);
    setActiveTab(newValue);
  };

  useEffect(() => {
    setActiveTab(value);
  }, []);

  return (
    <section>
      <TabsContainer>
        <TitleStaled variant="h1" component="h1">
          Автоцивілка {isMobile && <br />} без зайвих рухів
        </TitleStaled>

        <TabsStyled value={value} onChange={handleChange}>
          <TabStyled label="За параметрами" />
          <TabStyled label="За держ. номерним знаком" wrapped />
        </TabsStyled>
      </TabsContainer>
    </section>
  );
};

export default HeroTabs;
