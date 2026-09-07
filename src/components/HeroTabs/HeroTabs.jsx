import { useEffect, useState } from 'react';
import {
  MobileBreakStyled,
  TabStyled,
  TabsContainer,
  TabsStyled,
  TitleStaled,
} from './HeroTabs.styled';

const HeroTabs = ({ setActiveTab }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    setActiveTab(newValue);
  };

  useEffect(() => {
    setActiveTab(value);
  // eslint-disable-next-line
  }, []);

  return (
    <section>
      <TabsContainer>
        <TitleStaled variant="h1" component="h1">
          Автоцивілка <MobileBreakStyled /> без зайвих рухів
        </TitleStaled>

        <TabsStyled value={value} onChange={handleChange}>
          <TabStyled label="За держ. номерним знаком" wrapped />
          <TabStyled label="За параметрами" />
        </TabsStyled>
      </TabsContainer>
    </section>
  );
};

export default HeroTabs;
