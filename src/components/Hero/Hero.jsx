import { useState } from 'react';
import HeroTabs from '../HeroTabs/HeroTabs';
import { HeroContainer } from './Hero.styled';
import ByParameters from '../ByParameters/ByParameters';
import ByLicensePlate from '../ByLicensePlate/ByLicensePlate';
import HeroPicture from '../HeroPicture/HeroPicture';
import NoWorkModal from 'components/NoWorkModal/NoWorkModal';

const Hero = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAppWork] = useState(true);

  return (
    <section>
      {isAppWork ? (
        <HeroContainer>
          <HeroTabs setActiveTab={setActiveTab} />
          {/* Вміст для вкладок */}
          {activeTab === 0 && <ByParameters />}
          {activeTab === 1 && <ByLicensePlate />}
        </HeroContainer>
      ) : (
        <NoWorkModal />
      )}
      <HeroPicture />
    </section>
  );
};

export default Hero;
