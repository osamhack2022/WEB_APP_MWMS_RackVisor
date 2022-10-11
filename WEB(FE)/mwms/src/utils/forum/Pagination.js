import React from "react";
import Example from "./card_footer_with_page_buttons";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginated = (e) => {
    paginate(e.target.id);
  }

  return (
    <div className="flex">
      {pageNumbers.map((number) => (
        <div key={number} className="page-item">
          <div id = {number} onClick={(e) => paginated(e)} className="page-link">
            {number}
          </div>
        </div>
      ))}
      <Example/>
    </div>
  );
};

export default Pagination;