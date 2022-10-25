import React from 'react'
import Modal from './default/Modal'
import { useAuth } from '../../routes/AuthContext'

function AlarmModal({onClose}) {
  let auth = useAuth();
  //서버에서 알람 가져오기

  return (
    <Modal onClose={onClose}> 
      <div>
        {localStorage.getItem("부대")} 의 알람을 표시하는 모달창
      </div>
    </Modal>
  )
}

export default AlarmModal