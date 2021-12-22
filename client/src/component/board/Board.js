import axios from "axios";
import React, { useState, useEffect } from "react";
import NewBoard from "./NewBoard";

function Board() {
  const [boardList, setBoardList] = useState([])
  const [modal, setModal] = useState(false)

  useEffect(() => {
    axios
      .post('/api/Board?type=list')
      .then((res) => {
        const result = res.data.json
        setBoardList(result)
      })
  }, [])

  const onClick = () => {
    setModal(true)
  }
  
  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>게시판</h2>
      <button onClick={onClick}>New</button>
      <NewBoard visible={modal} setModal={setModal} />
      { boardList.map(x => (
        <li key={x.id}>{x.id}: {x.title}</li>
      ))}
    </div>
  );
};

export default Board;
