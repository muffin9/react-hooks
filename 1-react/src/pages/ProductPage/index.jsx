import NavBar from '../../components/NavBar';
import Page from '../../components/Page';
import Title from '../../components/Title';
import ProductItem from '../../components/ProductItem';
import { useEffect, useState } from 'react';
import ProductApi from 'shared/api/ProductApi';

// const fakeProduct = {
//   id: 'CACDA421',
//   name: '해물 라면',
//   price: 6000,
//   thumbnail: './images/menu-해물계란라면.jpg',
// };

const ProductPage = () => {
  // 여기서 상태 관리
  const [productList, setProudctList] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productList = await ProductApi.fetchProductList();
        setProudctList(productList);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="ProductPage">
      <Page header={<Title>메뉴목록</Title>} footer={<NavBar />}>
        <ul>
          {productList.map((product) => {
            return (
              <li key={product.id}>
                <ProductItem product={product} />
              </li>
            );
          })}
        </ul>
      </Page>
    </div>
  );
};

export default ProductPage;
