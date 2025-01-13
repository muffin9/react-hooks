import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import ProductItem from '../../components/ProductItem';
import Title from '../../components/Title';
import OrderForm from './OrderForm';
import PaymentButton from './PaymentButton';
import ProductApi from 'shared/api/ProductApi';

const fakeProudct = {
  id: 'CACDA421',
  name: '해물 계란 라면',
  price: 6000,
  thumbnail: './images/menu-해물계란라면.jpg',
};

const CartPage = () => {
  const [cartList, setCartList] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartList = await ProductApi.fetchProduct('CACDA421');
        setCartList(cartList);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCart();
  }, []);

  return (
    <div className="CartPage">
      <Page
        header={
          <Title backUrl="/">
            <span>장바구니</span>
          </Title>
        }
        footer={<PaymentButton />}
      >
        {cartList && <ProductItem product={cartList} />}
        <OrderForm />
      </Page>
    </div>
  );
};

export default CartPage;
