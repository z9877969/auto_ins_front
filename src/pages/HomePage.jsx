import { memo, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/Calculator/selectors';
import { getIsModalErrorOpen } from '../redux/Global/selectors';
import { useActions } from '../hooks/useActions';
import ModalError from '../components/ModalError/ModalError';
import AlertMUI from '../components/Alert/AlertMUI';
import Hero from '../components/Hero/Hero';
import { useScrollToTop } from 'hooks/useScrollToTop';
import { loadComponentWithRetry } from 'helpers/loadComponentWithRetry';
import { scrollToElementWhenReady } from 'helpers/scrollToElementWhenReady';

const CreatePolicyVideoSection = loadComponentWithRetry(
  () =>
    import('../components/CreatePolicyVideoSection/CreatePolicyVideoSection'),
);
const AccordionSection = loadComponentWithRetry(
  () => import('../components/AccordionSection/index'),
);
const CheckInsSection = loadComponentWithRetry(
  () => import('../components/CheckInsSection/index'),
);
const InfoSection = loadComponentWithRetry(
  () => import('../components/InfoSection/index'),
);
const AdvatagesSection = loadComponentWithRetry(
  () => import('../components/AdvantagesSection/index'),
);
const Partners = loadComponentWithRetry(
  () => import('../components/Partners/Partners'),
);
const FeedbackSection = loadComponentWithRetry(
  () =>
    import('../modules/feedback/components/FeedbackSection/FeedbackSection'),
);

const MemoizedCreatePolicyVideoSection = memo(CreatePolicyVideoSection);
const MemoizedInfoSection = memo(InfoSection);
const MemoizedAccordionSection = memo(AccordionSection);
const MemoizedPartners = memo(Partners);
const MemoizedFeedbackSection = memo(FeedbackSection);
const MemoizedCheckInsSection = memo(CheckInsSection);
const MemoizedAdvatagesSection = memo(AdvatagesSection);

const HomePage = () => {
  const location = useLocation();
  useScrollToTop(location.state?.id);
  const { loginThunk, setIsModalErrorOpen } = useActions();

  const user = useSelector(getUser);
  const isError = useSelector(getIsModalErrorOpen);

  useEffect(() => {
    const id = location.state?.id;
    if (!id) return;

    return scrollToElementWhenReady(id);
  }, [location.state]);

  // ==========
  useEffect(() => {
    setIsModalErrorOpen(false);
  }, [setIsModalErrorOpen]);
  // ==========

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
        <AlertMUI type="info" message="Будь ласка, заповніть поля" />
        <Hero />
        <Suspense>
          <MemoizedCreatePolicyVideoSection />
          <MemoizedAdvatagesSection />
          <MemoizedFeedbackSection />
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
