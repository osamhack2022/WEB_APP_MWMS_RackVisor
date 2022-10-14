/* This example requires Tailwind CSS v2.0+ */
import { ArrowDownIcon, ArrowUpIcon,ArrowNarrowRightIcon } from '@heroicons/react/solid'

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

export default function HistoryList() {
  return (
    <div className="flow-root px-3 py-4">
      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >
                    <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.content}{' '}
                      <p className="font-medium text-gray-900">
                        {event.target}
                      </p>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={event.datetime}>{event.datetime}</time>
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
