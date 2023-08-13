import { styled } from "styled-components";
import React from "react";

function Modal({ children }) {
  return (
    <Backdrop>
      <StyledModal>{children}</StyledModal>
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
