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
        <div class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
          <button class="border" onClick={handleClose}>X</button>
          <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default Modal;
