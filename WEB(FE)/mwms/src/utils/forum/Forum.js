import React, { useEffect, useState } from 'react'
import Posts from './Posts';
//https://chanhuiseok.github.io/posts/react-12/

function Forum() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    setPosts([{id : 1, title:"wow", milClass:"일병", name:"홍길동", content:"내용입니당1" }, {id : 2, title:"33", milClass:"이병", name:"홍길동", content:"내용입니당2"}]);
  }, []);

  return (
    <div>
      <Posts posting={posts} setPosting={setPosts}/>
    </div>
  )
}

export default Forum