import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useState } from 'react';

export default function ForumList({ postsPerPage, totalPosts, paginate, currentPage }) {
  const backgroundColor="bg-[#323232]";
  const hoverBackgroundColor="hover:bg-[#7A5EA6] rounded-full"
  const pageNumbers = [];
  const selectedClassName = "z-10 bg-[#7A5EA6]  rounded-full text-white relative inline-flex items-center px-4 py-2 text-sm font-bold"
  const noneSelectedClassName = backgroundColor + " " + hoverBackgroundColor + "   text-white relative inline-flex items-center px-4 py-2  text-sm font-medium"
  const noneSelectedMiddle = backgroundColor + " " +hoverBackgroundColor + "   text-white hidden md:inline-flex relative items-center px-4 py-2  text-sm font-medium"
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
    console.log(currentPage)
    if (Number(currentPage) > 1) {
      paginate(Number(currentPage) - 1);
    } else {
      paginate(1);
    }
  }

  const moveRight = () => {
    console.log(currentPage)
    if (Number(currentPage) < Number(pageNumbers.length)) {
      paginate(Number(currentPage) + 1);
    } else {
      paginate(pageNumbers.length);
    }
  }

  return (
    <div className={`${backgroundColor} px-4 py-3 flex items-center justify-center rounded-br-2xl rounded-bl-2xl sm:px-6`}>
      <div className="hidden justify-center text-center sm:flex-1 sm:flex sm:items-center sm:justify-items-center">
        <div>
          <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={moveLeft}
              className={`relative inline-flex items-center px-2 py-2 rounded-full  ${backgroundColor} text-sm font-medium text-white ${hoverBackgroundColor}`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="rounded-full h-5 w-5" aria-hidden="true" />
            </button>
            {pageNumbers.map((number) => (
              <button id={number} className = {number == currentPage ? selectedClassName : noneSelectedClassName}
                onClick={(e) => paginated(e)}>
                {number}
              </button>
            ))}
            <button
              onClick={moveRight}
              className={`relative inline-flex items-center px-2 py-2 rounded-full  ${backgroundColor} text-sm font-medium text-white ${hoverBackgroundColor}`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="rounded-full h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
