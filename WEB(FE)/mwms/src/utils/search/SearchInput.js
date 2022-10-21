import React, { useState } from 'react'
import DetailSearch from './DetailSearch';

function SearchInput({search, setSearch}) {
  const [name, setName] = useState();
  const [detail, setDetail] = useState(false);

  const onNameHandle = (e) => {
    setName(e.target.value);
  }


  return (
    <form>
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input class="block p-4 pl-10 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="군수품명" required="" value={name} onChange={onNameHandle}/>
        <div class="text-black absolute right-2.5 bottom-2.5 bg-blue-gradient cursor-pointer font-semibold rounded-lg text-sm px-4 py-2">검색</div>
      </div>
      {!detail && (
        <button class="text-gray-500 m-2 border border-white rounded p-2 hover:text-white" onClick={() => setDetail(true)}>상세검색 열기</button>
      )}
      {detail && (
        <button class="text-gray-500 m-2 border border-white rounded p-2 hover:text-white" onClick={() => setDetail(false)}>상세검색 닫기</button>
      )}
      {detail && (
        <DetailSearch/>
      )}
    </form>
  )
}

export default SearchInput