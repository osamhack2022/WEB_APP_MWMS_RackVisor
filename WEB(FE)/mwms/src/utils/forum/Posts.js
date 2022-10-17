import React, { useEffect, useState } from 'react';
import ExampleModal from '../modal/ExampleModal';
import Modal from '../modal/default/Modal';
import SettingModal from '../modal/SettingModal';
import DetailContent from '../modal/DetailContent';
import ContentPlusModal from '../modal/contentPlusModal';

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
      title : total.find(post => post.id == e.target.id).title,
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
    setPlusTitle("");
    setPlusContent("");
    setPlus(false)
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              번호
            </th>
            <button
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              제목
            </button>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              관등성명
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {posting && posting.map((article) => (
            <tr key={article.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{article.id}</td>
              <button className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" id={article.id} onClick={openModal}>{article.title}</button>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.milClass} {article.name}</td>
              <td  className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" >
                <div id={article.id} onClick={erasePost} className="text-indigo-600 hover:text-indigo-900">X</div>
              </td>
            </tr>
          ))}
          {modal.open && (
            <DetailContent open={modal.open} setOpen={() => setModal(false)} title={modal.title} content={modal.content}/>
          )}
        </tbody>
      </table>
      <button onClick={() => {
        setPlus(true);
        setPlusContent("");
        setPlusTitle("");
      }}>추가하기</button>
      <ContentPlusModal open={plus} setOpen={setPlus} title={plusTitle} setTitle={titleChange} content={plusContent} setContent={contentChange} makePost={makePost}/>

    </div>
    </div>
    </div>
    </div>

  );
}

export default Posts