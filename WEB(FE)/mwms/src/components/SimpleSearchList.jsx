export default function SimpleSearch({defaultList, data, korList}) {
  return (
    <div className="flex flex-col px-2 py-2">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 drop-shadow-lg">
              <thead class="bg-[#706F6F] ">
                <tr>
                  {korList.map((de) => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                    >
                      {de}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((person, personIdx) => (
                  <tr key={personIdx} className={personIdx}>
                    {defaultList.map((de, deIndex) => (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{person[de]}</td>
                    ))}
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
