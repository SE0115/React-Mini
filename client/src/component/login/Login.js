import React from "react";

const Login = (props) => {
  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>로그인</h2>
      <label>
        이메일
        <input />
      </label>
      <label>
        비밀번호
        <input type="password" />
      </label>
      <button>로그인</button>
    </div>
  );
};

export default Login;
