import React from 'react'
import AuthorHeader from '../../components/AuthorHeader'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import SearchInput from '../../utils/search/SearchInput'
import DetailSearch from '../../utils/search/DetailSearch'

function StaticsPage() {
  return (
    <>
    <AuthorHeader/>
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">
        <div>통계 보여주기용 검색</div>
        <DetailSearch/>
        <div>통계 내용</div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default StaticsPage