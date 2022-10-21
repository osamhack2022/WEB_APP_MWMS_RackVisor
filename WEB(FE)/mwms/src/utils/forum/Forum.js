import React, { useCallback, useEffect, useState } from 'react'
import Posts from './Posts';
import Pagination from './Pagination';
import ForumList from './ForumList';
import { axiosGet } from '../../api';
//https://chanhuiseok.github.io/posts/react-12/

function Forum() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currPostList, setCurrPostList] = useState([]);

  const fetchPostList = useCallback(async () => {
    try {
      const data = await axiosGet("/posts");
      setPosts(data);
    } catch (error) {
      alert("Fetch error on post");
    }
  });

  useEffect(() => {
    fetchPostList();

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    setCurrPostList(currentPosts);
  }, []);

  useEffect(() => {
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    setCurrPostList(currentPosts);
  }, [posts, currentPage]);

  return (
    <div class="px-4 py-3 w-[40rem] drop-shadow-xl">
      <div class="bg-[#323232] rounded-2xl mb-6">
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