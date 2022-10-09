import React, {useState, useRef,  useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext';
import AuthorHeader from '../../components/AuthorHeader';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import QRCode from 'qrcode';
import ReactToPrint from 'react-to-print';
import {QrReader} from 'react-qr-reader';
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

  const temp = props => {
    const { printR } = props;
    return (
      <div ref={printR}>                
        {imageUrl ? (
        <a href={imageUrl} download>
            <img src={imageUrl} alt="img"/>
        </a>) : null}
      </div>
    ) 
  }

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth.unitSelected === "") {
      alert("부대를 다시 선택해주세요");
      navigate("/");
    }
  }, []);

  return (
    <div>
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class ="flex border">
          <div class="flex-1 border">
              <input class="border" onChange={(e) => setText(e.target.value)}/>
              <button class="border" onClick={() => generateQrCode()}>QR코드 생성</button>
                <br/>
                <br/>
                <br/>
                {imageUrl ? (
                <a href={imageUrl} download>
                    <div  ref={printR} class="display-none"><img src={imageUrl} alt="img"/>eoeo</div>
                </a>) : null}
          </div>
          <div class="flex-1 border">
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