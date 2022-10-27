/* This example requires Tailwind CSS v2.0+ */
import { ArrowDownIcon, ArrowUpIcon,ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'

export default function HistoryList({serverData, setSelect}) {
  const [ data, setData ] = useState([]);
  useEffect(() => {
    makeData(serverData);
  }, [ serverData ]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  const select = (e) => {
    const findItem = data[e.currentTarget.id];
    setSelect(findItem);
  }
  const makeData = (serverData) => {
    let newData = [];
    serverData.map((server1) => {
      let server = JSON.parse(server1.content);
      let newDataElem = {};
      newDataElem.datetime = server1.createdAt.substr(0, 10);
      newDataElem.id = server.id;
      newDataElem.name = server.name;
      newDataElem.manager = server.manager;
      newDataElem.type = server.type;
      newDataElem.type1 = server.type1;
      newDataElem.specipicType = server.specipicType;
      newDataElem.oriCount = server.oriCount;
      newDataElem.icon = server.icon;
      newDataElem.iconBackground = server.iconBackground;
      
      if (server.type == "추가") {
        newDataElem.icon = ArrowUpIcon
        newDataElem.iconBackground = 'bg-blue-500'
        newDataElem.content = '물품 추가'
        newDataElem.target = (server.oriCount).toString() + "개 증가";
        newDataElem.loc = server.location;
      } else if (server.type == "제거") {
        newDataElem.icon = ArrowDownIcon
        newDataElem.iconBackground = 'bg-red-500'
        newDataElem.content = '물품 제거'
        newDataElem.target = (server.oriCount - server.newCount).toString() + "개 감소";
        newDataElem.loc = server.location;
      } else if (server.type == "변경") {
        newDataElem.icon = ArrowNarrowRightIcon
        newDataElem.iconBackground = 'bg-gray-400'
        newDataElem.content = '물품 변경'
        newDataElem.target = server.name;
        newDataElem.loc = server.location;
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
              <div className="p-1 rounded-xl hover:bg-[#706F6F] " id={eventIdx} onClick={select}>
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