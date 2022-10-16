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
  const valList = ['이름', '종류', '세부분류', '수량', '상태', '기한']
  const data = [{'이름' : '휴지', '종류' : '2종', '세부분류' : '기타물자류', '수량':1000, '상태':'좋음', '기한':'2022/10/27'}]
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
    if (item != "") {
      setText(item['이름']);
      generateQrCode(item['이름']);
    }
  }, [item]);

  return (
    <div>
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div>
        <SearchInput className = "flex-auto" />
        <Example defaultList={valList} data={data} setSelect={setItem}/>
        </div>
        <div class ="flex flex-auto border">
          <div class="flex-auto border">
            {/* <input class="border" onChange={(e) => setText(e.target.value)}/>
            <button class="border" onClick={() => generateQrCode()}>QR코드 생성</button>
              <br/> */}
              <div className="flex">
                <div>사이즈 입력 {'(cm 단위)'} : </div>
                <input type="number" value={size} onChange={handleSize} className="border"/>
              </div>
              <div className="flex">
                <div>개수 입력 : </div>
                <input type="number" value={count} onChange={handleCount} className="border"/>
              </div>
              <div className="flex">
                <input type="checkbox" value={showName} onChange={() => setShowName(!showName)} className="border"/>
                <div>이름 출력</div>
              </div>
              <div className="flex">
                <input type="checkbox" value={showDue} onChange={() => setShowDue(!showDue)} className="border"/>
                <div>유통기한 출력</div>
              </div>
              <div className="flex">
                <input type="checkbox" value={showManager} onChange={() => setShowManager(!showManager)} className="border"/>
                <div>담당자 출력</div>
              </div>
              <div className="flex">
                <input type="checkbox" value={showLocation} onChange={() => setShowLocation(!showLocation)} className="border"/>
                <div>위치 출력</div>
              </div>
              {imageUrl ? (
              <>
              <a href={imageUrl} download>
                <img src={imageUrl} alt="img" style={{width:"100px", height:"100px"}} className="border"/>
                {showName && <div className="flex">휴지</div>}
                {showDue && <div className="flex">2022-10-27</div>}
                {showManager && <div className="flex">홍길동</div>}
                {showLocation && <div className="flex">2종창고 - A 캐비넷</div>}
              </a>
              <div className="hidden">  
                <div ref={printR} className= {cname}>
                  {printArr.map(() => (
                    <div className="">
                      <img src={imageUrl} alt="img" style={{width: convert, height: convert}} className="border flex"/>
                      {showName && <div className="flex">휴지</div>}
                      {showDue && <div className="flex">2022-10-27</div>}
                      {showManager && <div className="flex">홍길동</div>}
                      {showLocation && <div className="flex">2종창고 - A 캐비넷</div>}
                    </div>
                  ))}
                </div>
              </div>
            </>) : null}
            <ReactToPrint
              trigger={() => <button>프린트하기</button>}
              content={() => printR.current}
            />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default BarcodeManage