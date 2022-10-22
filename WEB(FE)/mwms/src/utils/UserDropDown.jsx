import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserDropDown({milClass, name}) {
  return (
    <Menu as="div" className="text-slate-900 z-50">
      <div>
        <Menu.Button className="font-bold inline-flex justify-cent0er rounded-md text-sm text-white hover:text-blue-300 mr-10">
          {milClass} {name}
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
        <Menu.Items className="absolute rounded-md shadow-lg bg-black-gradient">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-white bg-[#7A5EA6] font-medium rounded-md' : 'text-gray-200',
                    'block px-4 py-2 text-sm font-medium'
                  )}
                >
                  개인정보
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/logout"
                  className={classNames(
                    active ? 'bg-gray-100 text-white bg-[#7A5EA6] font-medium rounded-md' : 'text-gray-200 font-medium',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  로그아웃
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
