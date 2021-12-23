import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";
import cookie from "react-cookies";

function Login() {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleLogin = () => {
    if (!(account.email && account.password)) {
      sweetalert("이메일과 비밀번호를 확인해주세요", "", "info", "닫기");
    }

    axios
      .post("/api/user?type=login", {
        user_email: account.email,
        user_password: account.password,
      })
      .then((res) => {
        if (res.data[0]) {
          let user_email = res.data[0].user_email;
          let user_name = res.data[0].user_name;
          let user_password = res.data[0].user_password;

          if (user_email) {
            sweetalert("로그인 성공!", "", "info", "닫기");

            // 로그인 후, 세션 유효기간을 60분으로 설정
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 60);
            axios
              .post("/api/user?type=webtoken", {
                user_email: user_email,
                user_name: user_name,
              })
              .then((res) => {
                console.log(res.data);
                console.log(res.data.token_id);
                console.log(res.data.token_name);

                cookie.save("token_id", res.data.token_id, {
                  path: "/",
                  expires,
                });
                cookie.save("token_name", res.data.token_name, {
                  path: "/",
                  expires,
                });
                cookie.save("user_password", user_password, {
                  path: "/",
                  expires,
                });
              })
              .catch((err) => {
                sweetalert("error 발생", err, "error", "닫기");
              });

            setTimeout(() => {
              window.location.href = "/naverApi";
            }, 1000);
          }
        } else {
          sweetalert("아이디 or 비밀번호 일치 x", "", "error", "닫기");
        }
      });
  };

  const sweetalert = (title, showConfirmButton, icon) => {
    Swal.fire({
      position: "bottom-end",
      icon: icon,
      title: title,
      showConfirmButton: showConfirmButton,
      timer: 1000,
    });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>로그인</h2>
      <LoginBox>
        <input name="email" onChange={onChange} placeholder="Email" />
        <input
          name="password"
          onChange={onChange}
          placeholder="Password"
          type="password"
        />
        <button onClick={handleLogin}>로그인</button>
      </LoginBox>
    </div>
  );
}

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
`;

export default Login;
