import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlockThank, orderTypes } from 'modules/blockThank';
import { ContainerSectionPage, PageContainerS } from 'style/Global.styled';

const OrderPage = () => {
  const navigate = useNavigate();
  const { orderStage } = useParams();

  const isBlockRender =
    orderStage && Object.values(orderTypes)?.includes(orderStage);

  useEffect(() => {
    if (!isBlockRender) {
      navigate('/');
      return;
    }
    // eslint-disable-next-line
  }, [orderStage]);

  return (
    isBlockRender && (
      <PageContainerS>
        <ContainerSectionPage component="div">
          <BlockThank />
        </ContainerSectionPage>
      </PageContainerS>
    )
  );
};

export default OrderPage;
