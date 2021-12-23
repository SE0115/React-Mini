import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from '../modal/Modal'

function BoardList({ boardList }) {
    const [modal, setModal] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState([])

    const onClick = (event) => {
        setSelectedBoard(event.target.innerText.split('\n'))
        setModal(true)
    }

    return (
        <BoardBox>
            <Board>
                <span className='id'>번호</span>
                <span className='title'>제목</span>
                <span className='writer'>작성자</span>
                <span className='date'>작성일</span>
                <span className='viewCnt'>조회수</span>
            </Board>
            {
                boardList.map((x) => (
                    <Board key={x.id} onClick={onClick}>
                        <span className='id'>{x.id}</span>
                        <span className='title'>{x.title}</span>
                        <span className='writer'>{x.insert_user}</span>
                        <span className='date'>{x.insert_date}</span>
                        <span className='viewCnt'>{x.view_count}</span>
                    </Board>
                ))
            }
            {
                modal && <Modal setModal={setModal}>{
                    selectedBoard.map(x => (
                        <span>{x}</span>
                    ))
                }</Modal>
            }
        </BoardBox>
    )
}

const BoardBox = styled.ul`
    width: 80%;
    padding: 0;
    margin: 3rem auto 1rem;
`
const Board = styled.li`
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    text-align: center;

    span {
        overflow: hidden;
        padding: 5px 0;
        pointer-events: none;
    }
    .id {
        width: 20%;
    } 
    .title {
        width: 40%;
    } 
    .writer {
        width: 15%;
    } 
    .date {
        width: 15%;
    } 
    .viewCnt {
        width: 10%;
    } 

    &:not(:first-child):hover {
        cursor: pointer;
        background-color: #f0f0f0;
    }

    &:first-child {
        border-bottom: 4px solid black;
        font-weight: 700;
        font-size: 18px;
        padding: 10px 0;
    }
    
    & + & {
        border-top: 1px solid #dedede;
        padding: .5rem 1rem;
    }
`

export default BoardList