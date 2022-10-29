import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosGet } from '../../api'
import AuthorHeader from '../../components/AuthorHeader'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../routes/AuthContext'
import HistoryList from '../../utils/history/historyList'
import { ArrowDownIcon, ArrowUpIcon,ArrowNarrowRightIcon } from '@heroicons/react/solid'
import SearchInput from '../../utils/search/SearchHistory'

function HistoryFind() {
  const navigate = useNavigate();
  const auth = useAuth();
  const currUnit = auth.unitSelected;
  const [ data, setData ] = useState([]);
  const [ select, setSelect ] = useState({});
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const fectchHistory = useCallback(async () => {
    try {
      const response = await axiosGet("/historys/" + (currUnit.id).toString());
      setData(response);
    } catch (e) {
      alert("히스토리를 불러오는 중 오류 발생");
    } 
  } ,[]);
  
  useEffect(() => {
    if (!currUnit) {
      alert("부대를 선택해주세요");
      navigate("/");
    } else {
      // fectchHistory();
    }
  }, []);

  useEffect(() => {
    console.log(select);
  }, [ select ]);

  return (
    <div class="bg-[#202020]">
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1 bg-[#202020]">
          <div class="sm:flex hidden border-b-2 border-[#706F6F] mb-2 mr-10 ml-6 pb-2 font-bold text-2xl text-white mt-5">히스토리</div>
          <div class="flex grid grid-cols-2 divide-x-2 gap-4 px-4 py-3 border-gray-200 bg-gray">
            <div class="flex-1 bg-[#323232] rounded-2xl">
              <SearchInput setData={setData} data={data} />
              <HistoryList serverData={data} setSelect={setSelect}/>
            </div>
            <div class="flex-auto text-white pl-3 pt-3 p-5">
              {select && (<div class="rounded-2xl bg-[#323232]">
                <div class="pl-3 pt-3 pb-3 ">
                  {select.icon && select.iconBackground && (<div class="flex">
                    <div>
                      <span
                        className={classNames(
                          select.iconBackground,
                          'ml-[2px] mr-[2px] h-8 w-8 rounded-full flex items-center justify-center '
                        )}
                      >
                        <select.icon className="h-5 w-5 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <div class="flex-auto text-xl ml-1 mt-1 mb-1 ">{select.content ? select.content : ""}</div>
                  </div>)}
                  {select.content && <div class="flex-1 mr-3 mt-1 mb-2 border h-[3px]">{" "}</div>}
                  {select.name && <div class="mt-1 text-lg">물품명 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {select.name ? select.name : ""}</div>}
                  {select.oriCount && <div class="mt-1 text-lg">기존 수량 &nbsp;&nbsp;&nbsp;: {select.oriCount ? select.oriCount : ""}</div>}
                  {select.type1 && <div class="mt-1 text-lg">종류 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {select.type1 ? (((select.type1)) + "종").substr(5) : ""}</div>}
                  {select.manager && <div class="mt-1 text-lg">담당자 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {select.manager ? select.manager : ""}</div>}
                </div>
              </div>)}
            </div>
          </div>
        </div>
    </div>
    <Footer />
  </div>
  )
}

export default HistoryFind