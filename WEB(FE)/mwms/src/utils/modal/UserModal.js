import React from 'react'
import Modal from './default/Modal'
import {Link} from 'react-router-dom';

function UserModal({onClose}) {
  return (
    <Modal onClose={onClose}>
      <div>개인정보</div>
      <Link to="/logout">로그아웃</Link>
    </Modal>
  )
}

export default UserModal