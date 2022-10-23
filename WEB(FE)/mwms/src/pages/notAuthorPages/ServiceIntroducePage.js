import React from 'react'
import Header from '../../components/Header';
import Footer from "../../components/Footercopy";
import styles from "../../style.js";
import Title from "../../utils/with_description";

function ServiceIntroducePage() {
  return (
    <body>
      <div class="bg-primary-900 w-full overflow-hidden">
        <div class={`bg-primary-900 ${styles.flexCenter}`}>
          <div class={`${styles.boxWidth}`}>
            <Header />
          </div>
        </div>
        <Title title={"서비스 소개"} />
        <div class="flex justify-center m-6 ml-40 text-white">
          <ul>
            <li>부대 창고별 모양에 맞춘 저장 공간 뷰어 & 에디터</li>
            <li>입 • 출고 기능</li>
            <li>히스토리 기능</li>
            <li>검색 기능</li>
            <li>유통기한 알림 기능</li>
            <li>QR코드 제작 기능</li>
          </ul>
        </div>
        <Footer />
      </div>
    </body>
  )
}

export default ServiceIntroducePage