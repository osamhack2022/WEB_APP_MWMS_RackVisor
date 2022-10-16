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
         floorList: [{floor : 1, list : [{id : 1, iid: 1}], iid : 1}]}
  const [floorList, setFloorList] = useState( defaultFloorList );

  const floorAdd = () => {
    let newFloor = {};
    let newFloorList = floorList;
    newFloorList.floorList.reverse();
    newFloor.floor = newFloorList.totCnt;
    newFloor.list = [{id : 1, iid: 1}];
    newFloor.iid = 1;
    newFloorList.totCnt += 1;
    newFloorList.floorList.push(newFloor);
    newFloorList.floorList.reverse();
    setFloorList(newFloorList);
  }

  // const addItem = (e) => {
  //   let currFloor = e.currentTarget.getAttribute('value');
  //   let upDateFloor = floorList.floorList.filter(floor => floor.floor == currFloor).iid;


  // }

  // const removeItem = (e) => {
  //   e.currentTarget.getAttribute('value')
  // }

  return (
    <div>
      <button className="border" onClick={floorAdd}>
        층 추가
      </button>

      {floorList.floorList.map((floor) => (
        <div class="min-w-max min-h-max">
          <div>{floor.floor} 층</div>
          <div class="flex border">
            {floor.list.map((item) => (
              <div value={item.id} class="w-24 h-12 border" onClick={handleBoxSelec}>
                {item.id}
              </div>
            ))}
            <div value={floor.floor} onClick={addItem}>추가하기</div>
            <div value={floor.floor} onClick={removeItem}>제거하기</div>
          </div>
        </div>
      ))}

    </div>
  )
}
export default CreateList