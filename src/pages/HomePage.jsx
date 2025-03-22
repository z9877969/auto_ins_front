import { lazy, memo, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/Calculator/selectors';
import { getIsModalErrorOpen } from '../redux/Global/selectors';
import { useActions } from '../hooks/useActions';
import ModalError from '../components/ModalError/ModalError';
import AlertMUI from '../components/Alert/AlertMUI';
import Hero from '../components/Hero/Hero';
import { useScrollToTop } from 'hooks/useScrollToTop';

const CreatePolicyVideoSection = lazy(
  () => import('../components/CreatePolicyVideoSection/CreatePolicyVideoSection')
);
const AccordionSection = lazy(() =>
  import('../components/AccordionSection/index')
);
const CheckInsSection = lazy(() =>
  import('../components/CheckInsSection/index')
);
const InfoSection = lazy(() => import('../components/InfoSection/index'));
const AdvatagesSection = lazy(() =>
  import('../components/AdvantagesSection/index')
);
const Partners = lazy(() => import('../components/Partners/Partners'));

const MemoizedCreatePolicyVideoSection = memo(CreatePolicyVideoSection);
const MemoizedInfoSection = memo(InfoSection);
const MemoizedAccordionSection = memo(AccordionSection);
const MemoizedPartners = memo(Partners);
const MemoizedCheckInsSection = memo(CheckInsSection);
const MemoizedAdvatagesSection = memo(AdvatagesSection);

const HomePage = () => {
  useScrollToTop();
  const location = useLocation();
  const { loginThunk } = useActions();

  const user = useSelector(getUser);
  const isError = useSelector(getIsModalErrorOpen);

  useEffect(() => {
    if (location.state) {
      const { id } = location.state;
      let element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        location.state = null;
      }
    }
    // eslint-disable-next-line
  }, [location.state]);

  useEffect(() => {
    if (user) return;
    loginThunk();
  }, [user, loginThunk]);

  if (isError) {
    return <ModalError />;
  }
  return (
    <>
      <main style={{ height: '100%' }}>
        <AlertMUI type='info' message='Будь ласка, заповніть поля' />
        <Hero />
        <Suspense>
          <MemoizedCreatePolicyVideoSection />
          <MemoizedAdvatagesSection />
          <MemoizedCheckInsSection />
          <MemoizedPartners />
          <MemoizedAccordionSection />
          <MemoizedInfoSection />
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;
