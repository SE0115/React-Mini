import React, { useState } from "react";
import styled from "styled-components";

function Login() {
  const [account, setAccount] = useState({
    email: '',
    password: ''
  })

  const onChange = (event) => {
    const { name, value } = event.target
    setAccount({
      ...account,
      [name]: value
    })
  }

  const handleLogin = () => {

  }

  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>로그인</h2>
      <LoginBox>
        <input name="email" onChange={onChange} placeholder="Email"/>
        <input name="password" onChange={onChange} placeholder="Password" type="password" />
        <button onClick={handleLogin}>로그인</button>
      </LoginBox>
    </div>
  );
};

const LoginBox = styled.div`
  width: 80%;
  max-width: 430px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;

  input {
    width: 100%;
    margin-left: 10px;
    padding: 10px;
    font-size: 20px;
  }
  input + input {
    margin-top: 10px;
  }
  
  button {
    font-size: 20px;
    width: 100%;
    padding: 10px 0;
    margin-top: 20px;
  }
`

export default Login;
