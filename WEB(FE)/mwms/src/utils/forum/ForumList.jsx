/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useState } from 'react';

export default function ForumList({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];
  const selectedClassName = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
  const noneSelectedClassName = "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
  const noneSelectedMiddle = "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
  const [before, setBefore] = useState();
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginated = (e) => {
    paginate(e.currentTarget.id);
    // if (before) {
    //   before.target.className = noneSelectedClassName;
    //   console.log("before : ");
    //   console.log(before.target.id)
    //   setBefore(e);
    // }
    // console.log("next: ");
    console.log(e.currentTarget.id);
    // e.currentTarget.className = selectedClassName;
  }

  const moveLeft = () => {
    if (currentPage != 1) {
      paginate(currentPage - 1);
    }
  }

  const moveRight = () => {
    if (currentPage != pageNumbers.length) {
      paginate(currentPage + 1);
    }
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <div
          onClick={moveLeft}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={moveRight}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden justify-center text-center sm:flex-1 sm:flex sm:items-center sm:justify-items-center">
        <div>
          <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={moveLeft}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pageNumbers.map((number) => (
              <button id={number} className = {number == currentPage ? selectedClassName : noneSelectedClassName}
                onClick={(e) => paginated(e)}>
                {number}
              </button>
            ))}
            <button
              onClick={moveRight}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
