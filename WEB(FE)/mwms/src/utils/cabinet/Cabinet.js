import React, { useState, useRef, useEffect } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Card from "../sidescroll/Card";
import { LeftArrow, RightArrow } from "../sidescroll/Arrow";
import usePrevious from "../sidescroll/usePrevious";

const elemPrefix = "번 박스";
const getId = (index) => `${index}${elemPrefix}`;

const exampleItems = [{"id":"1번 박스"}]

const CreateList = ({boxSelec, setBoxSelec}) => {
  const [countList, setCountList] = useState([1])

  const onAddDetailDiv = () => {
    let countArr = [...countList]
    let counter = countArr[0]
    countArr.reverse()
    counter += 1
    countArr.push(counter)	// index 사용 X
    countArr.reverse();
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
    setCountList(countArr)
    console.log(countArr)
  }

  const [items, setItems] = useState(exampleItems);

  const addItem = () => {
    setItems((items) =>
      items.concat({ id: getId(String(Math.random()).slice(2, 5)) })
    );
    console.log(items);
  };
  
  const removeItem = () => {
    setItems((items) => {
      const newItems = [...items];
      newItems.splice(-1, 1);
      return newItems;
    });
  };

  const handleBoxSelec = (e) => {
    setBoxSelec(e.currentTarget.getAttribute('value'));
  }

  const defaultFloorList = 
        {totCnt: 1, 
         floorList: [{floor : 1, list : [{id : 1, iid: 1}]}]}
  const [floorList, setFloorList] = useState( defaultFloorList );

  const floorAdd = () => {

  }

  return (
    <div>
      <button onClick={onAddDetailDiv}>
        추가
      </button>
      {countList.map((cnt) => (
        <div class="min-w-max min-h-max">
          <div>{cnt}층</div>
          <div class="flex border">
            {items.map((item) => (
              <div value={item.id} class="w-24 h-12 border" onClick={handleBoxSelec}>
                {item.id}
              </div>
            ))}
            <div onClick={addItem}>추가하기</div>
            <div onClick={removeItem}>제거하기</div>
          </div>
        </div>
      ))}


      {items.map((item, idx) => (
        <div>
          
        </div>
      ))}
    </div>
  )
}
export default CreateList