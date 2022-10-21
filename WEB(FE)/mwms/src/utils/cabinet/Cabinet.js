import React, { useState, useEffect } from "react";

const CreateList = ({boxSelec, setBoxSelec}) => {
  const [rend, setRend] = useState(true);
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
    newFloor.floor = newFloorList.totCnt + 1;
    newFloor.list = [{id : 1, iid: 1}];
    newFloor.iid = 1;
    newFloorList.totCnt += 1;
    newFloorList.floorList.push(newFloor);
    newFloorList.floorList.reverse();
    setFloorList(newFloorList);
    setRend(Math.random());

    //층 하나 추가 와 box 한개 추가하는 로직

  }

  const addItem = (e) => {
    let currFloor = e.currentTarget.getAttribute('value');
    let copyFloorList = floorList;
    let newId = copyFloorList.floorList.find(floor => floor.floor == currFloor).iid + 1;
    let floorIdx = copyFloorList.floorList.findIndex(floor => floor.floor == currFloor);
    let newBox = {id : newId, iid : newId};
    //박스 추가하기
    
    copyFloorList.floorList[floorIdx].list.push(newBox);
    copyFloorList.floorList[floorIdx].iid += 1;
    
    setFloorList(copyFloorList);
    setRend(Math.random());
  }

  return (
    <div>
      <button className="border" onClick={floorAdd}>
        층 추가
      </button>
      <div className="hidden">{rend}</div>
      {floorList.floorList.map((floor) => (
        <div class="min-w-max min-h-max">
          <div>{floor.floor} 층</div>
          <div class="flex border">
            {floor.list.map((item) => (
              <button value={(floor.floor).toString() + "층 "  + (item.id).toString()} class="w-24 h-12 border" onClick={handleBoxSelec}>
                {item.id}
              </button>
            ))}
            <button value={floor.floor} onClick={addItem}>추가하기</button>
          </div>
        </div>
      ))}

    </div>
  )
}
export default CreateList