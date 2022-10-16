import React from 'react'
import AuthorHeader from '../../components/AuthorHeader'
import Sidebar from '../../components/Sidebar'
import HistoryList from '../../utils/history/historyList'
import SearchInput from '../../utils/search/SearchInput'

function HistoryFind() {
  return (
    <div>
      <AuthorHeader/>
      <div className="flex">
        <Sidebar/>
        <div className="flex-none">
          <div>
            <SearchInput/>
          </div>
          <div>
            <HistoryList/>
          </div>
        </div>
        <div className="flex-auto">
          <div>물자 추가 / 제거 / 위치 변경</div>
          <div>물품명 :  </div>
          <div>변동 수량 : </div>
          <div>변동 위치 : </div>
          <div>담당자 : </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryFind