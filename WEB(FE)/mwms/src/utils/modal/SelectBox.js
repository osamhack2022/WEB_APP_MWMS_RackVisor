import React from 'react';
import { createPortal } from 'react-dom';
import CreateList from '../cabinet/Cabinet';
import Modal from './default/Modal';

function SelectBox({onClose}) {
  return (
    <Modal onClose={onClose}>
      <CreateList/>
    </Modal>
  )
}

//모달 - https://velog.io/@dfd1123/react-create-portal-%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC

export default SelectBox;