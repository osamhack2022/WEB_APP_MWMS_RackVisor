import React, { useEffect, useState } from "react";
import { detailType } from "./typeList";
import DatePicker, { registerLocale } from "react-datepicker";
import "./datapicker.css";
import { ko } from "date-fns/esm/locale";
import "./react-datepicker.css";

export default function DetailSearch(props) {
  const { setAdvancedSearchReqBody } = props;
  const [Content, setContent] = useState("없음");
  const [type, setType] = useState("없음");
  const [minCnt, setMinCnt] = useState(0);
  const [maxCnt, setMaxCnt] = useState(0);
  const [people, setPeople] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [chkbox, setChkbox] = useState({
    property: false,
    duration: false,
    manager: false,
    quantity: false,
  });

  const [ch1, set1] = useState(false);
  const [ch2, set2] = useState(false);
  const [ch3, set3] = useState(false);
  const [ch4, set4] = useState(false);

  useEffect(() => {
    const toStringAndPadLeftWithZero = (e, maxLength) => e.toString().padStart(maxLength, "0");

    const getYYYYMMDDFromDate = (date) => {
      return (
        toStringAndPadLeftWithZero(date.getFullYear(), 4) +
        "/" +
        toStringAndPadLeftWithZero(date.getMonth() + 1, 2) +
        "/" +
        toStringAndPadLeftWithZero(date.getDate(), 2)
      );
    };

    setAdvancedSearchReqBody({
      type: "TYPE_" + (parseInt(Content) || "NULL"),
      minExpDate: startDate && getYYYYMMDDFromDate(startDate),
      maxExpDate: endDate && getYYYYMMDDFromDate(endDate),
      manager: people,
      minAmount: minCnt,
      maxAmount: maxCnt,
    });
  }, [startDate, endDate, people, minCnt, maxCnt, setAdvancedSearchReqBody, type, Content]);

  const chgPeople = (e) => {
    setPeople(e.currentTarget.value);
  };

  const chgMinCnt = (e) => {
    setMinCnt(e.currentTarget.value);
  };

  const chgMaxCnt = (e) => {
    setMaxCnt(e.currentTarget.value);
  };

  const onChangeHanlder = (e) => {
    setContent(e.currentTarget.value);
  };
  const onChangeType = (e) => {
    setType(e.currentTarget.value);
  };

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
  };

  return (
    <div class="p-2 text-[12px] border border-gray-300 rounded rounded-lg m-2 max-w-[600px]">
      <div class="flex">
        <input
          class="mx-2 bg-[#706F6F] accent-pink-500"
          id="property"
          type="checkbox"
          checked={ch1}
          onChange={onChkBox}
        />
        <div class="text-white font-bold mx-2">속성 : </div>
        <div>
          <select class="bg-[#706F6F] text-white rounded" onChange={onChangeHanlder} value={Content}>
            {Object.keys(detailType).map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <select class="bg-[#706F6F] text-white rounded" onChange={onChangeType} value={type}>
            {Object.keys(detailType[Content]).map((ty) => (
              <option key={ty}>{ty}</option>
            ))}
          </select>
          <div class="text-white">{detailType[Content][type]}</div>
        </div>
      </div>

      <div class="flex">
        <input
          class="mx-2 my-2 bg-[#706F6F] accent-pink-500"
          id="duration"
          type="checkbox"
          checked={ch2}
          onChange={onChkBox}
        />
        <div class="text-white font-bold mx-2">기한 : </div>
        <DatePicker
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <div class="text-white font-semibold mx-2"> 부터 ~ </div>
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
        <div class="text-white font-semibold mx-2"> 까지 </div>
      </div>

      <div class="flex">
        <input
          class="mx-2 my-2 bg-[#706F6F] accent-pink-500"
          id="manager"
          type="checkbox"
          checked={ch3}
          onChange={onChkBox}
        />
        <div class="text-white font-bold mx-2">담당자 : </div>
        <input
          type="string"
          class="bg-[#706F6F] h-[22px] p-2 text-white rounded border"
          value={people}
          onChange={chgPeople}
        />
      </div>

      <div class="flex">
        <input
          class="mx-2 my-2 border bg-[#706F6F] accent-pink-500"
          id="quantity"
          type="checkbox"
          checked={ch4}
          onChange={onChkBox}
        />
        <div class="text-white font-bold mx-2">{"수량 : "}</div>
        <input
          class="mx-2 my-2 border bg-[#706F6F] text-white rounded h-[22px] p-2"
          type="number"
          value={minCnt}
          onChange={chgMinCnt}
        />
        <div class="text-white font-bold mx-2">이상 ~ </div>
        <input
          class="mx-2 my-2 border bg-[#706F6F] text-white rounded h-[22px] p-2"
          type="number"
          value={maxCnt}
          onChange={chgMaxCnt}
        />
        <div class="text-white font-bold mx-2">이하</div>
      </div>
    </div>
  );
}
