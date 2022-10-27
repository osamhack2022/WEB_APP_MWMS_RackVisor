import React, {useState, useRef,  useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext';
import AuthorHeader from '../../components/AuthorHeader';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import QRCode from 'qrcode';
import ReactToPrint from 'react-to-print';
import {QrReader} from 'react-qr-reader';
import SearchInput from '../../utils/search/SearchInput';
import Example from '../../components/simple_striped';
import Tabs from '../../components/Tabs';
import BoxSelect from '../../components/BoxSelect';
import { isSameMinute, set } from 'date-fns';

//함수 내부 주석 -> 바코드 리더 부분을 일단 주석처리
/*
https://codiving.kr/57 -> 프린트기능
https://github.com/Musawirkhann/react_qrcode_generation_scanner -> QR 코드 리딩 기능
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function MyApp() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="somefile.pdf"
        onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
      	//이전 페이지 보기
        <span onClick={()=> pageNumber > 1 ? setPageNumber(pageNumber-1):null}>
        &lt;
        </span>
        <span>Page {pageNumber} of {numPages}</span>
       	//다음 페이지 보기
        <span onClick={()=> pageNumber < numPages ? setPageNumber(pageNumber+1):null}>
        &gt;
        </span>
      </p>
    </div>
  );
}
https://life-of-panda.tistory.com/30 -> PDF 리더
*/

/*
  // const [scanResultFile, setScanResultFile] = useState('');
  // const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const qrRef = useRef(null);

  // const handleErrorFile = (error) => {
  //   console.log(error);
  // }

  // const handleScanFile = (result) => {
  //     if (result) {
  //         setScanResultFile(result);
  //     }
  // }

  // const onScanFile = () => {
  //   qrRef.current.openImageDialog();
  // }
  // const handleErrorWebCam = (error) => {
  //   console.log(error);
  // }
  // const handleScanWebCam = (result) => {
  //   if (result){
  //       setScanResultWebCam(result);
  //   }
  //  }

          {/* <div class="flex-1 border">
            <button onClick={onScanFile}>QR 코드 스캔</button>
            <QrReader
              ref={qrRef}
              delay={300}
              style={{width: '100%'}}
              onError={handleErrorFile}
              onScan={handleScanFile}
              legacyMode
            />
            <h3>결과값: {scanResultFile}</h3>
          </div>
          <div class="flex-1 border">
              <h3>캠 화면</h3>
              <QrReader
              delay={300}
              style={{width: '100%'}}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
              />
              <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
          </div>

*/

function BarcodeManage() {
  const navigate = useNavigate();
  let auth = useAuth();
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const printR = useRef(null);
  const valList = ['name', 'type', 'specipicType', 'amount', 'comment', 'expirationDate']
  const korList = ['이름', '종류', '세부분류', '수량', '상태', '기한']
  const [ data, setData] = useState([]);
  const [ item, setItem ] = useState("");
  const [size, setSize] = useState(0);
  const [count, setCount] = useState(0);
  const [convert, setConvert] = useState("");
  const [printArr, setPrintArr] = useState([]);
  const [cname, setCName] = useState("");
  const [showName, setShowName] = useState(false);
  const [showDue, setShowDue] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [tabType, setTabType] = useState("material");
  const [boxSelect, setBoxSelect] = useState("");

  const generateQrCode = async (textInput) => {
    try {
      const response = await QRCode.toDataURL(textInput);
      setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }

  const handleSize = (e) => {
    setSize(e.target.value);
    setConvert((e.target.value * 10).toString() + "mm");

    let gridCnt = parseInt(20 / (e.target.value));
    if (gridCnt > 5) {
      setCName("grid grid-cols-5");
    } else if (gridCnt == 3) {
      if ((20 / (e.target.value)) > 3.5) {
        setCName("grid grid-cols-4");
      } else {
        setCName("grid grid-cols-2");
      }
    } else if (gridCnt > 0) {
      setCName("grid grid-cols-" + gridCnt.toString());
    }
  }

  const handleCount = (e) => {
    setCount(e.target.value);
    let i;
    let inputArr = [];
    for (i = 0; i < e.target.value; i++) {
      inputArr.push("1");
    }
    setPrintArr(inputArr);
  }
  
  useEffect(() => {
    if (auth.unitSelected === "") {
      alert("부대를 다시 선택해주세요");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (item != "" && tabType == "material") {
      if (item.barcode) {
        setText(item.barcode);
        generateQrCode(item.barcode);  
      }
    } else if (item != "" && tabType == "box") {
      if (item) {
        setText(item.toString());
        generateQrCode(item.toString());
      }
    } else {
      setImageUrl();
    }
  }, [item]);

  useEffect(() => {
    setItem("");
  }, [tabType])
  
  const defaultTabs = [
    { name: '물자 선택', value: 'material', current: true },
    { name: '박스 선택', value: 'box', current: false },
  ]

  return (
    <div class="bg-[#202020]">
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1 bg-[#202020]">
          <div class="flex grid grid-cols-2 divide-x-2 gap-4 px-4 py-3 border-gray-200 bg-gray">
            <div class="flex-1 mt-5">
              <Tabs setTabType={setTabType} defaultTabs={defaultTabs}/>
              <div class="bg-[#323232] rounded-xl mt-2">
              { tabType == "material" ? 
              (<>
                <SearchInput setData={setData}/>
                <Example korList={korList} defaultList={valList} data={data} setSelect={setItem}/>
              </>) : 
              (<>
                <BoxSelect setBoxSelect={setItem} popup={false} qr={true} addOne={false}/>
              </>
              )
              }
              </div>
            </div>
            <div class ="flex flex-auto mb-5 px-5 pt-2 px-2 ">
              <div class="flex-1 mt-4  bg-[#323232] rounded-2xl px-3 pt-2 ">
                {/* <input class="border" onChange={(e) => setText(e.target.value)}/>
                <button class="border" onClick={() => generateQrCode()}>QR코드 생성</button>
                  <br/> */}
                  <div className="flex">
                    <div class="text-white">사이즈 입력 {'(cm 단위)'} : </div>
                    <input type="number" value={size} onChange={handleSize} className="ml-2 accent-[#7A5EA6] border bg-[#706f6f] p-2 mx-2 text-white h-[22px] mt-[3px]"/>
                  </div>
                  <div className="flex my-3">
                    <div class="text-white" >개수 입력 : </div>
                    <input type="number" value={count} onChange={handleCount} className="ml-[95px] accent-[#7A5EA6] border bg-[#706f6f] p-2 mx-2 text-white mt-[3px] h-[22px]"/>
                  </div>
                  { tabType == "material" ? 
                  <>
                  <div className="flex my-3">
                    <input type="checkbox" value={showName} onChange={() => setShowName(!showName)} className="accent-[#7A5EA6] border bg-[#706f6f] p-2 mx-2 mt-[3px]"/>
                    <div class="text-white">이름 출력</div>
                  </div>
                  <div className="flex my-3">
                    <input type="checkbox" value={showDue} onChange={() => setShowDue(!showDue)} className="accent-[#7A5EA6] border bg-[#706f6f] p-2 mx-2 mt-[3px]"/>
                    <div class="text-white">유통기한 출력</div>
                  </div>
                  {/* <div className="flex my-3">
                    <input type="checkbox" value={showManager} onChange={() => setShowManager(!showManager)} className="border bg-[#706f6f] p-2 mx-2"/>
                    <div class="text-white">담당자 출력</div>
                  </div> */}
                  </> :
                  ""
                  }
                  <div className="flex my-3">
                    <input type="checkbox" value={showLocation} onChange={() => setShowLocation(!showLocation)} className="accent-[#7A5EA6] border bg-[#706f6f] p-2 mt-[3px] mx-2"/>
                    <div class="text-white">고유 식별번호 출력</div>
                  </div>
                  {imageUrl ? (
                  <>
                  <div class="text-white my-3 flex justify-center">
                    <div>
                      <img src={imageUrl} alt="img" style={{width:"100px", height:"100px"}} className="border bg-[#706f6f] p-2 mx-2"/>
                      {tabType == "material" && showName && <div className="flex-1 text-center">{item.name ? item.name : ""}</div>}
                      {tabType == "material" && showDue && <div className="flex-1 text-center text-sm">{item.expirationDate ? item.expirationDate : ""}</div>}
                      {/* {tabType == "material" && showManager && <div className="flex-1 text-center">{item.manager ? item.manager : ""}</div>} */}
                      {showLocation && <div className="flex-1 text-center">{item.id ? "물품 : " + (item.id).toString() : "박스 : " + item}</div>}
                    </div>
                  </div>
                  <div className="hidden text-white my-3">  
                    <div ref={printR} className= {cname}>
                      {printArr.map(() => (
                        <div className="border flex justify-center">
                          <div className="">
                            <div className = "flex-1 flex justify-center">
                            <img src={imageUrl} alt="img" style={{width: convert, height: convert}} className=""/>
                            </div>
                            {tabType == "material" && showName && <div className="flex-1 text-sm text-center">{item.name ? item.name : ""}</div>}
                            {tabType == "material" && showDue && <div className="flex-1 text-xs text-center">{item.expirationDate ? item.expirationDate : ""}</div>}
                            {/* {tabType == "material" && showManager && <div className="flex-1 text-xs text-center">{item.manager ? item.manager : ""}</div>} */}
                            {showLocation && <div className="flex-1 text-sm text-center">{item.id ? "물품 : " + (item.id).toString() : "박스 : " + item}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>) : null}
                <div class="flex-1 flex justify-center pr-3">
                <a class="text-[#5AB0AD] ml-3 mb-3" href={imageUrl} download>QR 코드 다운로드</a>
                <ReactToPrint
                  trigger={() => <button class="text-[#5AB0AD] font-semibold ml-3 mb-3">프린트하기</button>}
                  content={() => printR.current}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default BarcodeManage