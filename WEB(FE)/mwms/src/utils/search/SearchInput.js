import React, { useState } from "react";
import DetailSearch from "./DetailSearch";
import { SearchIcon } from "@heroicons/react/solid";
import { axiosPost } from "../../api";

function SearchInput({ setData }) {
  const [name, setName] = useState();
  const [detail, setDetail] = useState(false);
  const [advancedSearchReqBody, setAdvancedSearchReqBody] = useState({});

  const onNameHandle = (e) => {
    setName(e.target.value);
  };

  const onSearch = async () => {
    setData([]);
    let reqBody = {
      ...advancedSearchReqBody,
      name,
    };

    if (reqBody.name == '') {
      delete reqBody.name;
    }

    console.log(reqBody);
    let result = await axiosPost("/stocks/advanced-search", reqBody);
    result.map((re) => {
      if (re.expirationDate) {
        re.expirationDate = re.expirationDate.substr(0, 10);
      }
      if (re.type) {
        re.type = re.type.substr(5) == "NULL" ? "없음" : re.type.substr(5) + "종";
      }
    });
    setData(result);
    console.log(result);
  };

  return (
    <form>
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div class="flex justify-center">
        <div class="relative">
          <div class="absolute inset-y-10 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            class="block p-4 pl-10 w-[36rem] text-sm text-white rounded-2xl bg-[#202020] focus:border mt-6"
            placeholder="군수품명"
            required=""
            value={name}
            onChange={onNameHandle}
          />
          <SearchIcon
            className="h-9 w-9 px-1 absolute right-2 bottom-2.5 rounded-full text-white hover:bg-[#7A5EA6]"
            onClick={onSearch}
          />
        </div>
      </div>
      {!detail && (
        <button class="ml-4 mt-4 text-[#5AB0AD] font-poppins font-semibold mb-4 hover:text-white" onClick={() => setDetail(true)}>
          상세검색
        </button>
      )}
      {detail && (
        <button
          class="ml-4 mt-4 text-white font-poppins rounded-lg p-1 font-semibold bg-[#5AB0AD] mb-4"
          onClick={() => setDetail(false)}>
          상세검색
        </button>
      )}
      {detail && <DetailSearch setAdvancedSearchReqBody={setAdvancedSearchReqBody} />}
    </form>
  );
}

export default SearchInput;
