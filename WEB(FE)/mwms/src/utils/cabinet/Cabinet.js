import { arMA } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import { axiosGet, axiosPost, axiosPut } from "../../api";
import { useAuth } from "../../routes/AuthContext";
import DropDown from "../DropDown";

const CreateList = ({boxSelec, setBoxSelec, cabSelec}) => {
  const auth = useAuth();
  const currHouse = auth.houseSelected;
  const currUnit = auth.unitSelected;
  const [floorList, setFloorList] = useState([]);
  const [rend, setRend] = useState(true);

  const handleBoxSelec = (e) => {
    setBoxSelec(e.currentTarget.getAttribute('value'));
  }

  const fetchBoxList = async () => {
    const data = await axiosGet("/boxesbox-in-rack/" + cabSelec.toString());
    console.log(JSON.stringify(data));
    
    if (!data) {
      let itemToAdd = {
        name : "1-1",
        storedRackId : cabSelec
      }
      const response = await axiosPost("/boxes/", itemToAdd);
      console.log(JSON.stringify(response));

      let newList = [ [response] ];
      setFloorList(newList);
    } else {
      let floorIter = {};
      data.map((da) => {
        if (floorIter[da.name.split('-')[0]]) {
          floorIter[da.name.split('-')[0]].push(da);
        } else {
          floorIter[da.name.split('-')[0]] = [ da ]
        }
      });
      let newFloorList = [];
      Object.keys(floorIter).map((key) => {
        newFloorList.push(floorIter[key]);
      });
      setFloorList(newFloorList);
    }
  }

  useEffect(() => {
    fetchBoxList();
  }, []);

  const floorAdd = async () => {
    let itemToAdd = {
      name : ((floorList.length + 1).toString() + "-1"),
      storedRackId : cabSelec
    }
    const response = await axiosPost("/boxes/", itemToAdd);
    console.log(JSON.stringify(response));
    const newListInput = [response];
    let copyFloorList = [...floorList];
    copyFloorList.push(newListInput);
    setFloorList(copyFloorList);
    setRend(Math.random());
    const data = await axiosGet("/boxesbox-in-rack/" + cabSelec.toString());
    console.log(JSON.stringify(data));
  }

  const addItem = async (e) => {
    let currFloor = e.currentTarget.getAttribute('value');

    let cpyFloor = [... floorList[currFloor - 1]];
    let itemToAdd = {
      name : currFloor.toString() + "-" + (cpyFloor.length + 1).toString(),
      storedRackId : cabSelec
    }
    const response = await axiosPost("/boxes/", itemToAdd);
    console.log(JSON.stringify(response));
    cpyFloor.push(response);

    let copyFloorList = [...floorList];
    copyFloorList[currFloor - 1] = cpyFloor;

    setFloorList(copyFloorList);
    setRend(Math.random());

    const data = await axiosGet("/boxesbox-in-rack/" + cabSelec.toString());
    console.log(JSON.stringify(data));
  }

  return (
    <div>
      <button className="border" onClick={floorAdd}>
        층 추가
      </button>
      <div className="hidden">{rend}</div>
      {floorList != [] && (Array.from(floorList).reverse()).map((floor, idx) => (
        <div class="min-w-max min-h-max">
          <div>{floorList.length - idx} 층</div>
          <div class="flex border">
            {floor != [] && floor.map((item) => (
              <button value={item.id} onClick={handleBoxSelec} class="w-24 h-12 border">
                {item.name.split('-')[1]}
              </button>
            ))}
            <button value={floorList.length - idx} onClick={addItem}>추가하기</button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default CreateList