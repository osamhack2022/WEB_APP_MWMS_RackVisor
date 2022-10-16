import React, { useEffect, useState } from 'react'
import Posts from './Posts';
import Pagination from './Pagination';
import ForumList from './ForumList';
//https://chanhuiseok.github.io/posts/react-12/

function Forum() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currPostList, setCurrPostList] = useState([]);

  useEffect(() => {
    setPosts([{id : 1, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" }, 
    {id : 2, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 3, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 4, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 5, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 6, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 7, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 8, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 9, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 10, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 11, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 12, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 13, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 14, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 15, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" },
    {id : 16, title:"33", milClass:"이병", name:"홍길동", content:"내용입니당2"}]);

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
    <div class="px-4 py-3">
      <div class="bg-slate-300 border rounded-lg">
        <Posts posting={currPostList} total={posts} setPosting={setPosts}/>
        {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        ></Pagination> */}
        <ForumList
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default Forum