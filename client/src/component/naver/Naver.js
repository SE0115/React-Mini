import React, { useEffect, useState } from "react";
import axios from "axios";
import NaverProducts from "./NaverProducts";
import styled from "styled-components";

function Naver() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [relatedKeyword, setRelatedKeyword] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);

  const onChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    if (searchKeyword !== "") {
      autoCompleteKeyword(searchKeyword);
    } else {
      setRelatedKeyword([]);
    }
  }, [searchKeyword]);

  const autoCompleteKeyword = (keyword) => {
    axios.post("/api/naverApi?type=search", { query: keyword }).then((res) => {
      setRelatedKeyword(res.data.items[0]);
    });
  };

  const onClickKeyword = (event) => {
    setSearchKeyword(event.target.textContent);
    setInputFocus(false);
  };

  const onSearch = () => {
    if (searchKeyword) {
      axios
        .post("/api/naverApi?type=shopList", { query: searchKeyword })
        .then((res) => {
          setProducts(res.data.items);
        });
    } else {
      setProducts([]);
    }
    setInputFocus(false);
  };

  const onFocus = () => {
    setInputFocus(true);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>
        최저가 상품 조회 및 등록 하기
      </h2>
      <SearchBox>
        <input
          name="searchKeyword"
          placeholder="검색어를 입력하세요."
          onChange={onChange}
          value={searchKeyword}
          onFocus={onFocus}
        />
        <button onClick={onSearch}>검색</button>
        {inputFocus && relatedKeyword.length > 0 && (
          <RelatedKeyword>
            {relatedKeyword.map((x, idx) => (
              <li key={idx} onClick={onClickKeyword}>
                {x[0]}
              </li>
            ))}
          </RelatedKeyword>
        )}
      </SearchBox>

      <NaverProducts products={products} />
    </div>
  );
}

const SearchBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 1rem auto;

  input {
    box-sizing: border-box;
    font-size: 18px;
    flex: 1;
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
  }

  ul {
    position: absolute;
    top: 3rem;
    left: 0;
    right: 4.5rem;
  }

  button {
    font-size: 18px;
    min-width: 4rem;
    margin-left: 0.5rem;
  }
`;
const RelatedKeyword = styled.ul`
  list-style: none;
  box-sizing: border-box;
  border: 2px solid #dedede;
  padding: 0;
  margin: 0;
  z-index: 5;

  li {
    padding: 1rem;
    cursor: pointer;
    background: #fff;
    &:hover {
      background: #f3f3f3;
    }
  }
  li + li {
    border-top: 1px solid #dedede;
  }
`;

export default Naver;
