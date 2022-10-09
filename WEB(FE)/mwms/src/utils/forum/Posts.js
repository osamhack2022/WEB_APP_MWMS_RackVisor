import React, { useEffect, useState } from 'react';
import ExampleModal from '../modal/ExampleModal';
import Modal from '../modal/default/Modal';
import SettingModal from '../modal/SettingModal';
//https://binaryjourney.tistory.com/20 [Binary Journey:티스토리]
function Posts({ posting, total, setPosting }) {
  const [modal, setModal] = useState({
    open: false,
    id: -1,
  });

  const [plus, setPlus] = useState(false);
  const [plusTitle, setPlusTitle] = useState("");
  const [plusContent, setPlusContent] = useState("");

  useEffect(() => { 
    setPlusTitle("");
    setPlusContent("");
  }, [plus]);

  const titleChange = (e) => {  
    setPlusTitle(e.currentTarget.value)
  }

  const contentChange = (e) => {
    setPlusContent(e.currentTarget.value)
  }

  const openModal = (e) => {
    setModal({
      content : total.find(post => post.id == e.target.id).content,
      open : true
    });
  }

  const erasePost = (e) => {
    setPosting(total.filter(post => post.id != e.target.id))
  }

  const makePost = () => {
    setPosting(total.concat({
      id : total.length != 0 ? total[total.length - 1].id + 1 : 1,
      title : plusTitle,
      milClass : localStorage.getItem("계급"),
      name : localStorage.getItem("이름"),
      content : plusContent
    }))
    setPlus(false)
  }

  return (
    <div>
      <table>
        <colgroup class="flex">
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
        </colgroup>
        <tbody>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>이름</th>
            <th>삭제</th>
            <th></th>
          </tr>
        </tbody>
        <tbody>
          {posting && posting.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td id={article.id} onClick={openModal}>{article.title}</td>
              <td>{article.milClass} {article.name}</td>
              <td id={article.id} onClick={erasePost}>X</td>
            </tr>
          ))}
          {modal.open && (
            <Modal onClose={() => setModal(false)}>
              <div>
                {modal.content}
              </div>
            </Modal>
          )}
        </tbody>
      </table>
      <div onClick={() => setPlus(true)}>추가하기</div>
      {plus && (
        <Modal onClose={() => setPlus(false)}>
          <div>
            <input type="text" value={plusTitle} onChange={titleChange}placeholder="제목"></input>
            <input type="text" value={plusContent}  onChange={contentChange} placeholder="내용"></input>
            <button onClick={makePost}>저장</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Posts