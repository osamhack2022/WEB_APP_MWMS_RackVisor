import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs({setTabType, defaultTabs}) {
  const [tabs, setTabs] = useState(defaultTabs);

  const setType = (e) => {
    setTabType(e.currentTarget.getAttribute('value'));
    let copyTab = tabs
    if (e.currentTarget.getAttribute('value') == "material") {
      copyTab[0].current = true;
      copyTab[1].current = false;
    } else {
      copyTab[0].current = false;
      copyTab[1].current = true;
    }
    setTabs(copyTab);
  }

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-[#7A5EA6] focus:border-[#7A5EA6] border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="relative z-0 rounded-lg shadow flex divide-x-2 divide-[#7A5EA6]" aria-label="Tabs">
          {tabs.map((tab, tabIdx) => (
            <button
              key={tab.name}
              onClick={setType}
              value={tab.value}
              className={classNames(
                tab.current ? 'text-white bg-[#706F6F]' : 'text-gray-300 bg-[#706F6F] hover:text-white',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-sm font-medium text-center hover:bg-[#7A5EA6] focus:z-10'
              )}
            >
              <span>{tab.name}</span>
              <span
                className={classNames(
                  tab.current ? 'bg-[#7A5EA6]' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
