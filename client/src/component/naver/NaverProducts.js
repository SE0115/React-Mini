import React from "react";
import styled from "styled-components";

function NaverProducts({ products }) {
  return (
    <div>
      <ProductsBox>
        <Product>
          <span className="pImage">이미지</span>
          <span className="pTitle">제품명</span>
          <span className="pPrice">가격</span>
          <span className="pBuy">상품등록</span>
        </Product>
        {products.map((product) => (
          <Product key={product.productId}>
            <div className="pImage">
              <img src={product.image} alt="" />
            </div>
            <div className="pTitle">
              <span dangerouslySetInnerHTML={{ __html: product.title }}></span>
            </div>
            <span className="pPrice">
              {product.lprice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </span>
            <div className="pBuy">
              <button>등록</button>
            </div>
          </Product>
        ))}
      </ProductsBox>
    </div>
  );
}

const ProductsBox = styled.ul`
  width: 90%;
  border: 1px solid #dedede;
  padding: 0;
  margin: 1rem auto;
`;
const Product = styled.li`
  height: 5rem;
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  font-size: 16px;
  overflow: hidden;

  .pImage {
    width: 10%;
    img {
      display: block;
      margin: 0 auto;
      width: 80%;
      height: 100%;
      object-fit: cover;
    }
  }
  .pTitle {
    width: 60%;
    height: 100%;
    display: table;
    span {
      display: table-cell;
      padding-left: 20px;
      vertical-align: middle;
      text-overflow: ellipsis;
    }
  }
  .pPrice {
    width: 20%;
    margin: auto 0;
    text-align: center;
  }
  .pBuy {
    width: 10%;
    margin: auto 0;
    button {
      display: block;
      padding: 0.5rem 1rem;
      margin: 0 auto;
      border-radius: 5px;
      background-color: #f5df4d;
    }
  }

  &:first-child {
    height: fit-content;
    padding: 1rem;
    font-weight: 700;
    text-align: center;
  }
  & + & {
    border-top: 1px solid #dedede;
    padding: 0.5rem 1rem;
  }
`;

NaverProducts.defaultProps = {
  products: [],
};

export default NaverProducts;
