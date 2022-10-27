/* This example requires Tailwind CSS v2.0+ */
import { ArrowDownIcon, ArrowUpIcon,ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'


const timeline = [
  {
    id: 1,
    content: '물품 이동',
    target: '10개',
    datetime: '2020-09-20',
    icon: ArrowNarrowRightIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: '물품 제거',
    target: '20개',
    datetime: '2020-09-22',
    icon: ArrowDownIcon,
    iconBackground: 'bg-red-500',
  },
  {
    id: 3,
    content: '물품 추가',
    target: '30개',
    datetime: '2020-09-28',
    icon: ArrowUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 4,
    content: '물품 제거',
    target: '5개',
    datetime: '2020-09-30',
    icon: ArrowDownIcon,
    iconBackground: 'bg-red-500',
  },
  {
    id: 5,
    content: '물품 추가',
    target: '7개',
    datetime: '2020-10-04',
    icon: ArrowUpIcon,
    iconBackground: 'bg-blue-500',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


// 물품 수정 시
// let newHistory = {
//   manager : localStorage.getItem("이름"),
//   name : itemToAdd.name,
//   id : itemToAdd.id,
//   oriCount : response.amount,
//   newCount : itemToAdd.amount,
//   oriLoc : response.storedBoxId,
//   location : (itemToAdd.storedBoxId).toString(),
//   type : typeCheck,
// }
// let typeCheck = (response.amount > itemToAdd.amount) ? "제거" : ((response.amount < itemToAdd.amount) ? "추가" : "변경");


// 물품 추가 시
// let newHistory = {
//   manager : localStorage.getItem("이름"),
//   name : response.name,
//   id : response.id,
//   oriCount : response.amount,
//   location : "",
//   type : "추가",
// }

// {
//   id: 5,
//   content: '물품 추가',
//   target: '7개',
//   datetime: '2020-10-04',
//   icon: ArrowUpIcon,
//   iconBackground: 'bg-blue-500',
// },

// content: "{\"manager\":\"TestUser\",\"name\":\"사랑해\",\"id\":13,\"oriCount\":111,\"newCount\":111,\"oriLoc\":76,\"location\":\"76\",\"type\":\"변경\"}"
// createdAt: "2022-10-27T09:46:58.009Z"
// unitId: 1

export default function HistoryList({serverData, setSelect}) {
  const [ data, setData ] = useState([]);
  useEffect(() => {
    makeData(serverData);
  }, [ serverData ]);

  const makeData = (serverData) => {
    let newData = [];
    serverData.map((server1) => {
      let server = JSON.parse(server1.content);
      let newDataElem = {};
      newDataElem.datetime = server1.createdAt.substr(0, 10);
      newDataElem.id = server.id;
      newDataElem.name = server.name;
      newDataElem.name = server.manager;

      if (server.type == "추가") {
        newDataElem.icon = ArrowUpIcon
        newDataElem.iconBackground = 'bg-blue-500'
        newDataElem.content = '물품 추가'
        newDataElem.target = (server.newCount - server.oriCount).toString() + "개 증가";
        newDataElem.loc = server.loc;
      } else if (server.type == "제거") {
        newDataElem.icon = ArrowDownIcon
        newDataElem.iconBackground = 'bg-red-500'
        newDataElem.content = '물품 제거'
        newDataElem.target = (server.oriCount - server.newCount).toString() + "개 감소";
        newDataElem.loc = server.loc;
      } else if (server.type == "변경") {
        newDataElem.icon = ArrowNarrowRightIcon
        newDataElem.iconBackground = 'bg-gray-400'
        newDataElem.content = '물품 변경'
        newDataElem.target = server.name;
        newDataElem.loc = server.loc;
      }
      newData.push(newDataElem);
    });
    setData(newData);
  }

  return (
    <div className="flow-root px-3 py-4">
      <ul role="list" className="-mb-8">
        {data.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8 bg-grey-500">
              <div className="p-1 rounded-xl hover:bg-[#706F6F] " >
                {eventIdx !== data.length - 1 ? (
                  <span className="absolute top-4 left-4 ml-3 h-full w-0.5 bg-[#706F6F] text-white" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={classNames(
                        event.iconBackground,
                        'ml-2 mt-[7px] h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white'
                      )}
                    >
                      <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-white">
                        {event.content}{' '}
                        <p className="font-medium text-gray-400">
                          {event.target}
                        </p>
                      </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-300">
                      <time dateTime={event.datetime}>{event.datetime}</time>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </li>
        ))}
      </ul>
    </div>
  )
}