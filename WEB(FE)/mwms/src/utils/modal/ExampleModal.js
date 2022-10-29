import React from 'react';
import Modal from './default/Modal';

function ExampleModal({onClose}) {
  return (
    <Modal onClose={onClose}>
      <div>테스트입니다</div>
    </Modal>
  )
}

export default ExampleModal