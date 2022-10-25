import { Fragment, useCallback, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../routes/AuthContext'
import { axiosGet } from '../api'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AlarmDropDown() {
  const auth = useAuth();
  const currUnit = auth.unitSelected;
  const [ data, setData] = useState([]);

  const fetchAlarm = useCallback(async () => {
    const response = await axiosGet("/stocks/by-expiration-date/" + (currUnit.id).toString());
    let resultData = [];
    response.map((res) => {
      let newSentence = "🔔 " + (res.name);
      var now = new Date();
      var year = now.getFullYear();// 연도
      var month = now.getMonth()+1;// 월    
      var day = now.getDate();

      var exYear = (res.expirationDate).substr(0, 10).split("-")[0];
      var exMonth = (res.expirationDate).substr(0, 10).split("-")[1];
      var exDay = (res.expirationDate).substr(0, 10).split("-")[2];
      
      var endDate=new Date(Number(exYear), Number(exMonth), Number(exDay));
      var stDate = new Date(year, month, day);
      var btMs=endDate.getTime()-stDate.getTime();
      var btDay=btMs/(1000*60*60*24);
      
      if (btDay < 0 || (endDate.getTime() < stDate.getTime())) {
        newSentence += " 사용기한이 지났습니다."
      } else {
        newSentence += " " + btDay.toString() + "일 남았습니다."
      }

      resultData.push(newSentence);
    });
    setData(resultData);
  }, []);

  useEffect(() => {
    fetchAlarm();
  }, []);

  return (
    <>
    {(data.length != 0) ?  (<Menu as="div" className="text-slate-900 z-50">
        <div>
          <Menu.Button className="font-bold inline-flex justify-center rounded-md text-sm text-white hover:text-blue-300 xs:mr-10 ss:mr-0 sm:mr-10 md:mr-0">
            알람
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute rounded-md shadow-lg bg-black-gradient ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {data.map((da) => 
              (<Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-white bg-[#7A5EA6] font-medium rounded-md' : 'text-gray-200',
                      'block px-4 py-2 text-sm font-medium'
                    )}
                  >
                    {da}
                  </div>
                )}
              </Menu.Item>))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>) : ""}
    </>
  )
}
