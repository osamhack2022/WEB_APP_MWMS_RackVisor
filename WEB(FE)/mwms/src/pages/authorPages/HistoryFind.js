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
          히스토리 로그 하나씩 세부 사항 출력 부분
        </div>
      </div>
    </div>
  )
}

export default HistoryFind