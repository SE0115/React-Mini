import axios from "axios";
import React, { useState, useEffect } from "react";
import NewBoard from "./NewBoard";
import BoardList from "./BoardList";
import styled from "styled-components";

function Board() {
  const [boardList, setBoardList] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      .post("/api/Board?type=page", {
        length: 5,
        start: 0,
      })
      .then((res) => {
        const result = res.data.json;
        setBoardList(result);
      });
  }, [setBoardList]);

  const onClick = () => {
    setModal(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <h2 style={{ textAlign: "center", padding: "10px" }}>게시판</h2>
      <NewBoardButton onClick={onClick}>게시물 추가</NewBoardButton>
      <NewBoard visible={modal} setModal={setModal} />
      <BoardList boardList={boardList} />
    </div>
  );
}

const NewBoardButton = styled.button`
  position: absolute;
  top: 8%;
  right: 10%;
  padding: 10px;
  font-size: 16px;
  font-weight: 700;
`;

export default Board;
