export default function ManageList({korList, defaultList, data, setSelect}) {
  const selecting = (e) => {
    data.map((dt, idx) => {
      if (idx == e.currentTarget.value) {
        setSelect(dt);
      }
    });
  }
  return (
    <div className="flex flex-col mt-12">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {korList.map((de) => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      {de}
                    </th>
                  ))}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">수정</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((person, personIdx) => (
                  <tr key={personIdx} className={personIdx}>
                    {defaultList.map((de, deIndex) => (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{person[de]}</td>

                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={selecting} value={personIdx} className="text-indigo-300 hover:text-indigo-400">
                        수정
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}