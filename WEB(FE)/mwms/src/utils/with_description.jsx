/* This example requires Tailwind CSS v2.0+ */
export default function Title({title, descript}) {
  return (
    <div className="px-4 py-3 pb-5 border-b border-gray-200">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">
        {descript}  
      </p>
    </div>
  )
}
