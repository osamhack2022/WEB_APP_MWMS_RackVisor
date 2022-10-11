import { createContext, useContext, useState, } from "react";

const authContext = createContext({
  unitSelected : "",
  unitSelect : () => {},
  houseSelected : "",
  houseSelect : () => {},
  houseList: [],
  addHouse:() => {},
});

export function useProvideAuth(){
  const [unitSelected, setUnitSelected] = useState("");
  const [houseSelected, setHouseSelected] = useState("");
  const [houseList, setHouseList] = useState([]);

  const unitSelect = (newUnit) => {
    setUnitSelected(newUnit);
  }
  const houseSelect = (newHouse) => {
    setHouseSelected(newHouse);
  }

  const  addHouse= (newHouse) => {
    let newHouseList = houseList.concat(newHouse);
    setHouseList(newHouseList);
  }

  return {
    unitSelected,
    unitSelect,
    houseSelected,
    houseSelect,
    houseList,
    addHouse,
  }
}

export function useAuth() {
  return useContext(authContext);
}

export function ProvideAuth({children}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}