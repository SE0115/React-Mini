import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios'

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
  const category2 = (c1) => {
    axios
      .post('/api/product?type=category', {
        num: 2,
        category1: c1
      })
      .then((res) => {
        // setCategory({
        //   ...category,
        //   c2: res.data.json.map(x => x.category2)
        // })
        return res.data.json.map(x => x.category2)
      })
  }

  useEffect(() => {
    console.log(selected)
    console.log(selected.c1)
    category2()
  }, [selected])
  
  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>상품</h2>
      <div>
        <select name="c1" onChange={onChange} onClick={category1}>
          <option>카테고리 1</option>
          {
            category.c1.map((option, idx) => (
              <option value={option} key={idx}>{option}</option>
            )) 
          }
        </select>
        <select name="c2" >
          <option>카테고리 2</option>
          {/* {
            category.c1.map(option => (
              <option value={option}>{option}</option>
            )) 
          } */}
        </select>
        <select name="c3" >
          <option>카테고리 3</option>
          {/* {
            category.c1.map(option => (
              <option value={option}>{option}</option>
            )) 
          } */}
        </select>
        <select name="c4" >
          <option>카테고리 4</option>
          {/* {
            category.c1.map(option => (
              <option value={option}>{option}</option>
            )) 
          } */}
        </select>
        <button>검색</button>
      </div>
    </div>
  );
};

export default Product;
