import React from 'react'
import Modal from './default/Modal'

function SettingModal({onClose}) {
  return (
    <Modal onClose={onClose}>
      <div>환경설정을 출력하는 모달</div>
    </Modal>
  )
}

export default SettingModal