import { styled } from "styled-components";
import React from "react";
import { Button } from "./Button";

function Modal({ handleOpen, modalTitle }) {
  return (
    <Backdrop>
      <StyledModal>
        <h1>{modalTitle}</h1>
        <Button onClick={handleOpen}>Save</Button>
      </StyledModal>
    </Backdrop>
  );
}

export default Modal;

const StyledModal = styled.div`
  width: 80%;
  max-width: 500px;
  height: 80%;
  background: white;
  margin: auto;
`;

const Backdrop = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: rgb(0, 0, 0, 0.7);
`;
