import NavBar from '../../components/NavBar';
import Page from '../../components/Page';
import Title from '../../components/Title';
import OrderApi from 'shared/api/OrderApi';
import OrderStatusCard from './OrderStatusCard';
import OrderPaymentCard from './OrderPaymentCard';
import OrderDeliveryCard from './OrderDeliveryCard';

import { useEffect, useState } from 'react';

const OrderPage = () => {
  const [orderList, setOrderList] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderList = await OrderApi.fetchMyOrder();
        setOrderList(orderList);
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className="OrderPage">
      <Page header={<Title>주문내역</Title>} footer={<NavBar />}>
        {orderList && (
          <>
            <div>
              <OrderStatusCard order={orderList} />
              <OrderPaymentCard order={orderList} />
              <OrderDeliveryCard order={orderList} />
            </div>
          </>
        )}
      </Page>
    </div>
  );
};

export default OrderPage;
