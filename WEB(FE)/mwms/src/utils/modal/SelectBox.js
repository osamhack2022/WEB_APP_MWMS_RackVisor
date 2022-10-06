import React from 'react';
import { createPortal } from 'react-dom';
import CreateList from '../cabinet/Cabinet';

const SelectBox = ({ setModalShow, visible }) => {
  const handleOk = () => {
    console.log('댓글 삭제');
  };
  return createPortal(
    <div style={{visibility: visible}}>
      <button onClick={() => setModalShow("hidden")}>끄기</button>
      <CreateList/>
    </div>,
    document.getElementById('modal')
  );
};

//모달 - https://velog.io/@dfd1123/react-create-portal-%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC

export default SelectBox;