import React, { useEffect, useRef } from "react";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";

function Modal({ onClose, children }) {
  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };

  useOutSideClick(modalRef, handleClose);
  useEffect(() => {
    const $body = document.querySelector("body");
    $body.style.overflow = "hidden";
    return () => ($body.style.overflow = "auto");
  }, []);
  
  return (
    <ModalContainer>
      <div class="border" ref={modalRef}>
        <button class="border" onClick={handleClose}>X</button>
        <div>{children}</div>
      </div>
    </ModalContainer>
  );
}

export default Modal;
