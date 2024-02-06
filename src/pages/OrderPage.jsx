import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlockThank, {
  orderMessagesKeys,
} from "../components/BlockThank/BlockThank";
import { ContainerSectionPage, PageContainerS } from "../style/Global.styled";

const OrderPage = () => {
  const navigate = useNavigate();
  const { orderStage } = useParams();

  const isBlockRender =
    orderStage && Object.values(orderMessagesKeys).includes(orderStage);

  useEffect(() => {
    if (!isBlockRender) {
      navigate("/");
      return;
    }
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
