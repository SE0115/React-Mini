import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios'
import ProductList from "./ProductList";

function Product() {
  const [category, setCategory] = useState({
    c1: [],
    c2: [],
    c3: [],
    c4: []
  })
  const [selected, setSelected] = useState({
    c1: '',
    c2: '',
    c3: '',
    c4: ''
  })
  const onChange = (event) => {
    const { name, value } = event.target
    setSelected({
      ...selected,
      [name]: value
    })
  }
  
  const category1 = () => {
    axios
      .post('/api/product?type=category', { num: 1 })
      .then((res) => {
        setCategory({
          ...category,
          c1: res.data.json.map(x => x.category1)
        })
      })
  }
  const category2 = (selected) => {
    const { c1 } = selected
    axios
      .post('/api/product?type=category', {
        num: 2,
        category1: c1
      })
      .then((res) => {
        setCategory({
          ...category,
          c2: res.data.json.map(x => x.category2)
        })
      })
  }
  const category3 = (selected) => {
    const { c1, c2 } = selected
    axios
      .post('/api/product?type=category', {
        num: 3,
        category1: c1,
        category2: c2,
      })
      .then((res) => {
        setCategory({
          ...category,
          c3: res.data.json.map(x => x.category3)
        })
      })
  }
  const category4 = (selected) => {
    const { c1, c2, c3 } = selected
    axios
      .post('/api/product?type=category', {
        num: 4,
        category1: c1,
        category2: c2,
        category3: c3
      })
      .then((res) => {
        setCategory({
          ...category,
          c4: res.data.json.map(x => x.category4)
        })
      })
  }

  useEffect(() => {
    console.log('selected!!!')
    category1()
    category2(selected)
    // category3(selected)
    // category4(selected)
  }, [selected])
  
  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>상품</h2>
      <CategoryBox>
        <select name="c1" onChange={onChange} >
          <option>카테고리 1</option>
          {
            category.c1.map((option, idx) => (
              <option value={option} key={idx}>{option}</option>
            )) 
          }
        </select>
        <select name="c2" onChange={onChange}>
          <option>카테고리 2</option>
          {
            category.c2.map((option, idx) => (
              <option value={option} key={idx}>{option}</option>
            )) 
          }
        </select>
        <select name="c3" onChange={onChange}>
          <option>카테고리 3</option>
          {
            category.c3.map((option, idx) => (
              <option value={option} key={idx}>{option}</option>
            )) 
          }
        </select>
        <select name="c4" onChange={onChange}>
          <option>카테고리 4</option>
          {
            category.c4.map((option, idx) => (
              <option value={option} key={idx}>{option}</option>
            )) 
          }
        </select>
        <button>검색</button>
      </CategoryBox>
      <ProductList></ProductList>
    </div>
  );
};

const CategoryBox = styled.div`
  width: 80%;
  margin: 3rem auto 1rem;
  display: flex;
  justify-content: center;

  select {
    width: 20%;
    font-size: 18px;
    text-align: center;
    padding: 5px;
    margin-right: 10px;
  }

  button {
    font-size: 18px;
    font-weight: 700;
    padding: 0 20px;
    border-radius: 5px;
    background-color: #f5df4d;
  }
`

export default Product;
