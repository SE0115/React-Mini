import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'

function NewBoard({ visible, setModal }) {
    const [boardInfo, setBoardInfo] = useState({
        title: '',
        writer: '',
        content: '',
        writePassword: '',
    })

    const onChange = (event) => {
        const { name, value } = event.target
        setBoardInfo({
            ...boardInfo,
            [name]: value
        })
    }

    const onClick = () => {
        console.log(boardInfo)
        const { title, writer, content, writePassword } = boardInfo
        axios
            .post('/api/Board?type=save', {
                title: title,
                insert_user: writer,
                content: content,
                write_password: writePassword,
                view_count: 0
            })
            .then((res) => {
                console.log(res.data)
            })
    }

    return (
        <>
            {
                visible &&
                <DarkBackground onClick={() => setModal(false) }>
                    <DialogBlock onClick={(event) => event.stopPropagation()}>
                        <h3>새 게시물</h3>
                        <label>
                            <span>제목</span>
                            <input name="title" onChange={onChange} />
                        </label>
                        <label>
                            <span>작성자</span>
                            <input name="writer" onChange={onChange} />
                        </label>
                        <label>
                            <span>내용</span>
                            <textarea name="content" onChange={onChange} />
                        </label>
                        <label>
                            <span>작성 비밀번호</span>
                            <input type="password" name="password" onChange={onChange} />
                        </label>
                        <button onClick={onClick}>등록하기</button>
                    </DialogBlock>
                </DarkBackground>
            }
        </>
    )
}

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 5;
`;
const DialogBlock = styled.div`
  width: 70%;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;

  h3 {
    margin-bottom: 15px;
  }

  label {
        display: flex;
        align-items: center;
        font-size: 18px;
        width: 100%;
        padding: 10px 0;

        span {
            width: 120px;
            text-align: center;
        }

        input, textarea {
            margin-left: 10px;
            padding: 5px;
            flex: 1;
        }
        textarea {
            height: 180px;
            resize: none;
        }
  }

  button {
      padding: 10px 20px;
      margin-top: 10px;
      font-size: 18px;
      border-radius: 5px;
  }
`;

export default NewBoard