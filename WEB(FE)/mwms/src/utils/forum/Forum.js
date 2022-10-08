import React, { useEffect, useState } from 'react'
import Posts from './Posts';
import Pagination from './Pagination';
//https://chanhuiseok.github.io/posts/react-12/

function Forum() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currPostList, setCurrPostList] = useState([]);

  useEffect(() => {
    setPosts([{id : 1, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" }, {id : 2, title:"33", milClass:"이병", name:"홍길동", content:"내용입니당2"}]);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    console.log(currentPosts);
    setCurrPostList(currentPosts);
  }, []);

  useEffect(() => {
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    console.log(currentPosts);
    setCurrPostList(currentPosts);
  }, [posts, currentPage]);

  return (
    <div>
      <Posts posting={currPostList} total={posts} setPosting={setPosts}/>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={setCurrentPage}
      ></Pagination>
    </div>
  )
}

export default Forum