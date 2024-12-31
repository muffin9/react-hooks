import Page from '../../components/Page';
import ProductItem from '../../components/ProductItem';
import Title from '../../components/Title';
import OrderForm from './OrderForm';
import PaymentButton from './PaymentButton';

const fakeProudct = {
  id: 'CACDA421',
  name: '해물 계란 라면',
  price: 6000,
  thumbnail: './images/menu-해물계란라면.jpg',
};

const CartPage = () => {
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
        <ProductItem product={fakeProudct} />
        <OrderForm />
      </Page>
    </div>
  );
};

export default CartPage;
