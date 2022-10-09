import React, {useState} from 'react';
import {detailType} from './typeList';
import DatePicker, { registerLocale } from 'react-datepicker';
import "./datapicker.css";
import { ko } from "date-fns/esm/locale";

export default function DetailSearch() {
  const [Content, setContent] = useState('없음');
  const [type, setType] = useState('없음');
  const [minCnt, setMinCnt] = useState(0);
  const [maxCnt, setMaxCnt] = useState(0);
  const [people, setPeople] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [chkbox, setChkbox] = useState({
    'property' : false,
    'duration' : false,
    'manager' : false,
    'quantity' : false,
  });

  const [ch1, set1] = useState(false);
  const [ch2, set2] = useState(false);
  const [ch3, set3] = useState(false);
  const [ch4, set4] = useState(false);

  const chgPeople = (e) => {
    setPeople(e.currentTarget.value);
  }

  const chgMinCnt = (e) => {
    setMinCnt(e.currentTarget.value);
  }

  const chgMaxCnt = (e) => {
    setMaxCnt(e.currentTarget.value);
  }

  const onChangeHanlder = (e) => {
  	setContent(e.currentTarget.value);
    console.log(Content);
  }
  const onChangeType = (e) => {
    setType(e.currentTarget.value);
    console.log(type);
  }
  
  const onChkBox = (e) => {
    let copy = chkbox;
    copy[e.currentTarget.id] = !copy[e.currentTarget.id];

    if (e.currentTarget.id === "property") {
      set1(!ch1);
    } else if (e.currentTarget.id === "duration") {
      set2(!ch2);
    } else if (e.currentTarget.id === "manager") {
      set3(!ch3);
    } else {
      set4(!ch4);
    }

    setChkbox(copy);
  }

  return (
    <div>
      <div class="flex">
        <input id = "property" type="checkbox" checked={ch1} onChange={onChkBox}/>
        <div>속성 : </div>
        <div>
          <select onChange={onChangeHanlder} value={Content}>
            {Object.keys(detailType).map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <select onChange={onChangeType} value={type}>
            {Object.keys(detailType[Content]).map((ty) => (
              <option key={ty}>{ty}</option>
            ))}
          </select>
          <div>{detailType[Content][type]}</div>
        </div>
      </div>
      <div class="flex">
        <input id = "duration" type="checkbox" checked={ch2} onChange={onChkBox}/>
        <div>기한 : </div>
        <DatePicker 
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <div> 부터 ~ </div>
        <DatePicker 
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        <div> 까지 </div>
      </div>
      <div class="flex">
        <input id = "manager" type="checkbox" checked={ch3} onChange={onChkBox}/>
        <div>담당자 : </div>
        <input type="string" class="border" value={people} onChange={chgPeople}/>
      </div>
      <div class="flex">
        <input id = "quantity" type="checkbox" checked={ch4} onChange={onChkBox}/>
        <div>{'수량 : '}</div>
        <input type="number" class="border" value={minCnt} onChange={chgMinCnt}/>
        <div>이상 ~ </div>
        <input type="number" class="border" value={maxCnt} onChange={chgMaxCnt}/>
        <div>이하</div>
      </div>
    </div>
  );
}