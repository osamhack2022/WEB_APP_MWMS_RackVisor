import React, { useEffect, useState } from 'react';
import Modal from '../modal/default/Modal';
import SettingModal from '../modal/SettingModal';
import DetailContent from '../modal/DetailContent';
import ContentPlusModal from '../modal/contentPlusModal';
import Button from '../../components/Button';
import { axiosPost } from '../../api';
import { useAuth } from '../../routes/AuthContext';

//https://binaryjourney.tistory.com/20 [Binary Journey:티스토리]
function Posts({ posting, total, setPosting }) {
  const [modal, setModal] = useState({
    open: false,
    id: -1,
  });

  const [plus, setPlus] = useState(false);
  const [plusTitle, setPlusTitle] = useState("");
  const [plusContent, setPlusContent] = useState("");
  const auth = useAuth();
  const currUnit = auth.unitSelected;

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
    e.stopPropagation();
  }

  const erasePost = (e) => {
    //삭제 구현 필요
  
    setPosting(total.filter(post => post.id != e.target.id))
  
  
  }

  const makePost = async () => {
    // let itemToAdd = {
    //   title : plusTitle,
    //   milClass : localStorage.getItem("계급"),
    //   name : localStorage.getItem("이름"),
    //   content : plusContent
    // }
    // const itemResponse = await axiosPost("/posts/unit-posts/" + (currUnit.id).toString(), itemToAdd);
    // setPosting(total.concat(itemResponse));

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
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 rounded-tr-2xl rounded-tl-2xl">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-white">
            <table className="min-w-full divide-y divide-white rounded-tr-2xl rounded-tl-2xl">
        <thead class = "bg-[#706F6F]">
          <tr class=" ">
            <th
              scope="col"
              className="px-4 py-3 text-left text-lg font-blod text-[#CFCFCF] uppercase tracking-wider rounded-tl-2xl text-center"
            >
              번호
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-left text-lg font-blod text-[#CFCFCF] uppercase tracking-wider"
            >
              관등성명
            </th>
            <th
              scope="col"
              className="px-7 py-3 text-left text-lg font-blod text-[#CFCFCF] uppercase tracking-wider"
            >
              제목
            </th>
            <th scope="col" className="relative px-6 py-3 rounded-tr-2xl">
              <span className="sr-only text-white font-bold">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {posting && posting.map((article) => (
            <tr key={article.id}>
              <td className="text-center px-4 py-4 whitespace-nowrap text-base font-medium text-white">{article.id}</td>
              <td className=" px-5 py-4 whitespace-nowrap text-base text-white">{article.milClass} {article.name}</td>
              <button className=" absolute px-7 py-4 z-[0] whitespace-nowrap text-base text-white" id={article.id} onClick={openModal}>{article.title}</button>
              <td  className="px-6 py-4 whitespace-nowrap text-right text-base font-medium" >
                <div id={article.id} onClick={erasePost} className="text-white cursor-pointer hover:text-[#7A5EA6]">X</div>
              </td>
            </tr>
          ))}
          {modal.open && (
            <DetailContent open={modal.open} setOpen={() => setModal(false)} title={modal.title} content={modal.content}/>
          )}
        </tbody>
      </table>
      <Button
        class="text-[#5AB0AD] font-poppins font-semibold ml-3 mb-3"
        handleClick={() => {
          setPlus(true);
          setPlusContent("");
          setPlusTitle("");
        }}
        text="추가하기"
      />
      <ContentPlusModal open={plus} setOpen={setPlus} title={plusTitle} setTitle={titleChange} content={plusContent} setContent={contentChange} makePost={makePost}/>

    </div>
    </div>
    </div>
    </div>

  );
}

export default Posts