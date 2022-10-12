import { createContext, useContext, useState, } from "react";

const authContext = createContext({
  unitSelected : "",
  unitSelect : () => {},
  houseSelected : "",
  houseSelect : () => {},
});

export function useProvideAuth(){
  const [unitSelected, setUnitSelected] = useState("");
  const [houseSelected, setHouseSelected] = useState("");

  const unitSelect = (newUnit) => {
    setUnitSelected(newUnit);
  }
  const houseSelect = (newHouse) => {
    setHouseSelected(newHouse);
  }

  return {
    unitSelected,
    unitSelect,
    houseSelected,
    houseSelect,
  }
}

export function useAuth() {
  return useContext(authContext);
}

export function ProvideAuth({children}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}