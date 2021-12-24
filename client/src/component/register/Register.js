import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router";

function Register() {
  const [userInfo, setUserInfo] = useState({
    // 필수 입력사항
    email: "",
    password: "",
    // 선택 입력사항
    name: "",
    phone: "",
    org: "",
    major: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleCheckEmail = () => {
    const { email } = userInfo;
    const [email1, email2] = email.split("@");
    axios
      .post("/api/user?type=dplicheck", {
        user_email1: email1,
        user_email2: email2,
      })
      .then((res) => {
        // 중복된 이메일이 없는 경우,
        if (res.data.json[0].dupliEmailCount === 0) {
          // setCheckEmail(true);
          if (
            !window.confirm(
              "사용 가능한 이메일입니다.\n해당 이메일 주소를 사용하시겠습니까?"
            )
          ) {
            setUserInfo({
              ...userInfo,
              email: "",
            });
          }
        } else {
          alert("이미 등록된 이메일입니다.");
          setUserInfo({
            ...userInfo,
            email: "",
          });
        }
      });
  };

  const history = useHistory();

  const handleSignUp = () => {
    const { email, password, name, phone, org, major } = userInfo;
    const [email1, email2] = email.split("@");
    axios
      .post("/api/user?type=signup", {
        user_email1: email1,
        user_email2: email2,
        user_password: password,
        user_major: major,
        user_phone: phone,
        user_name: name,
        user_org: org,
      })
      .then((res) => {
        if (res.data === "success") {
          alert("회원가입 되었습니다.");
          history.push("/");
        } else {
          alert("회원가입을 진행 도중 오류가 발생했습니다.");
        }
      });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>회원가입</h2>
      <SignUpBox>
        <label>
          <span>이메일</span>
          <input name="email" onChange={onChange} value={userInfo.email} />
          <button onClick={handleCheckEmail}>중복 확인</button>
        </label>
        <label>
          <span>비밀번호</span>
          <input type="password" name="password" onChange={onChange} />
        </label>
        <div className="org">
          <span>직업</span>
          <label>
            <span>학생</span>
            <input type="radio" name="org" value="학생" onChange={onChange} />
          </label>
          <label>
            <span>직장인</span>
            <input type="radio" name="org" value="직장인" onChange={onChange} />
          </label>
        </div>
        <label>
          <span>전공</span>
          <input placeholder="Major" name="major" onChange={onChange} />
        </label>
        <label>
          <span>이름</span>
          <input placeholder="Name" name="name" onChange={onChange} />
        </label>
        <label>
          <span>전화번호</span>
          <input placeholder="Phone Number" name="phone" onChange={onChange} />
        </label>
        <button className="register" onClick={handleSignUp}>
          회원가입
        </button>
      </SignUpBox>
    </div>
  );
}

const SignUpBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 530px;
  margin: 0 auto;
  padding: 10px;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: 18px;

    input {
      flex: 1;
      height: 80%;
      padding: 0 10px;
    }
  }
  label + label {
    margin-top: 10px;
  }

  span {
    display: inline-block;
    width: 80px;
    min-width: fit-content;
    text-align: center;
    margin-right: 10px;
  }

  div.org {
    display: flex;
    align-items: center;

    span {
      font-size: 18px;
    }
    label {
      span {
        width: fit-content;
      }
    }
    label + label {
      margin: 0;
      margin-left: 15px;
    }
  }

  button {
    border-radius: 5px;
    background-color: #fcde45;
    padding: 5px 7px;
    margin-left: 10px;
    font-weight: 700;
    min-width: fit-content;

    &.register {
      background-color: #dedede;
      font-size: 20px;
      padding: 10px 20px;
      margin: 10px auto 0;
    }
  }
`;
export default Register;
