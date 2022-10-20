import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useState } from 'react';

export default function ForumList({ postsPerPage, totalPosts, paginate, currentPage }) {
  const backgroundColor="bg-gray-900";
  const hoverBackgroundColor="hover:bg-cyan-600"
  const pageNumbers = [];
  const selectedClassName = "z-10 bg-cyan-900 border-white text-white relative inline-flex items-center px-4 py-2 border text-sm font-bold"
  const noneSelectedClassName = backgroundColor + " " + hoverBackgroundColor + " border-white text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
  const noneSelectedMiddle = backgroundColor + " " +hoverBackgroundColor + " border-white text-white hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
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
    <div className={`${backgroundColor} px-4 py-3 flex items-center justify-center border-t border-white sm:px-6`}>
      <div className="flex-1 flex justify-between sm:hidden">
        <div
          onClick={moveLeft}
          className={`${backgroundColor} relative inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white ${hoverBackgroundColor}`}
        >
          Previous
        </div>
        <div
          onClick={moveRight}
          className={`${backgroundColor} ml-3 relative inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white ${hoverBackgroundColor}`}
        >
          Next
        </div>
      </div>
      <div className="hidden justify-center text-center sm:flex-1 sm:flex sm:items-center sm:justify-items-center">
        <div>
          <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={moveLeft}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-white ${backgroundColor} text-sm font-medium text-white ${hoverBackgroundColor}`}
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
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-white ${backgroundColor} text-sm font-medium text-white ${hoverBackgroundColor}`}
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
