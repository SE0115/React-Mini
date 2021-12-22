import React from 'react'
import styled from 'styled-components';

function Modal({ children, setModal }) {

    return (
        <DarkBackground onClick={() => setModal(false)}>
          <DialogBlock onClick={(event) => event.stopPropagation()}>
           {children}
          </DialogBlock>
        </DarkBackground>
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
  max-width: 50rem;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
`

export default Modal