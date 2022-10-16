import React, { useState } from 'react'
import DetailSearch from './DetailSearch';

//style={{position: "absolute", inset: "0px auto auto 0px", margin: "0px", transform: "translate(0px, 10px)"}}
function SearchInput({search, setSearch}) {
  //https://velog.io/@hoje15v/React-%EB%8B%A4%EC%A4%91%ED%95%84%ED%84%B0-%EB%A1%9C%EC%A7%81-%EC%A7%9C%EB%8A%94-%EB%B2%95-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-with-query-string -> 여기
  //
  const [dropDown, setDropDown] = useState(false);
  const [name, setName] = useState();
  const [detail, setDetail] = useState(false);

  const onNameHandle = (e) => {
    setName(e.target.value);
  }


  return (
    <form>
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="군수품명" required="" value={name} onChange={onNameHandle}/>
        <div class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</div>
      </div>
      {!detail && (
        <button onClick={() => setDetail(true)}>상세검색 열기</button>
      )}
      {detail && (
        <button onClick={() => setDetail(false)}>상세검색 닫기</button>
      )}
      {detail && (
        <DetailSearch/>
      )}
    </form>
  )
}

export default SearchInput