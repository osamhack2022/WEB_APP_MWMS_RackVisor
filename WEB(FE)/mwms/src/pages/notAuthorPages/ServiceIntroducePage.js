import React from 'react'
import Header from '../../components/Header';
import Footer from "../../components/Footercopy";

function ServiceIntroducePage() {
  return (
    <body>
      <div>
        <Header/>
        <h1 class="border-b-2 m-6 ml-40 pl-8 pb-6 font-bold text-4xl">서비스 소개</h1>  
        <div class="m-6 ml-40">
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