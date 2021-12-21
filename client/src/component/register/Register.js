import React, { useState } from "react";
import axios from 'axios'
import styled from 'styled-components'

function Register() {
  const [userInfo, setUserInfo] = useState({
    // 필수 입력사항
    email1: '',
    email2: '',
    password: '',
    // 선택 입력사항
    name: '',
    phone: '',
    org: '',
    major: '',
  })
  const [checkEmail, setCheckEmail] = useState(false)

  const onChange = (event) => {
    const { name, value } = event.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const handleCheckEmail = () => {
    const { email1, email2 } = userInfo
    axios
      .post('/api/user?type=dplicheck', {
        user_email1: email1,
        user_email2: email2
      })
      .then((res) => {
        // 중복된 이메일이 없는 경우,
        if (!res.data.json[0].dupliEmailCount) {
          setCheckEmail(true)
        }
      })
  }

  const handleSignUp = () => {
    const { email1, email2, password, name, phone, org, major } = userInfo
    console.log(email1, email2, password, name, phone, org, major)
    // axios
    //   .post('/api/user?type=signup', {
    //     user_email1: email1,
    //     user_email2: email2,
    //     user_password: password,
    //     user_major: major,
    //     user_phone: phone,
    //     user_name: name,
    //     user_org: org
    //   })
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>회원가입</h2>
      <SignUpBox>
        <label>
          이메일
          <div>
            <input name="email1" onChange={onChange} /> @ <input name="email2" onChange={onChange} />
            <button onClick={handleCheckEmail}>중복 확인</button>
          </div>
        </label>
        { checkEmail && <span>사용가능한 이메일:)</span>}
        { !checkEmail && <span>이미 등록된 이메일:(</span>}
        <label>
          비밀번호
          <input type="password" name="password" onChange={onChange} />
        </label>
        {/* <label>
          비밀번호 확인
          <input type="password" placeholder="Password" />
        </label> */}
        <label>
          학생
          <input type="radio" name="org" value="학생" onChange={onChange} />
        </label>
        <label>
          직장인
          <input type="radio" name="org" value="직장인" onChange={onChange} />
        </label>
        <label>
          전공
        <input placeholder="Major" name="major" onChange={onChange} />
        </label>
        <label>
          이름
          <input placeholder="Name" name="name" onChange={onChange}/>
        </label>
        <label>
          전화번호
          <input placeholder="Phone Number" name="phone" onChange={onChange}/>
        </label>
        <button onClick={handleSignUp}>회원가입</button>
      </SignUpBox>
    </div>
  );
};

const SignUpBox = styled.div`
  /* display: flex; */
  /* flex-direction: column; */

  label {
    position: relative;
  }
  div {
    width: fit-content;
    /* position: absolute;
    left: 0px; */
  }
`
export default Register;
