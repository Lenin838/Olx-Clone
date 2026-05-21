import { useState } from "react";

function useLocalStorage(){

    const [value,setValue] = useState(0);

    const setVal = ()=>{
        localStorage.setItem(()=>setValue(c=>c+1))
    }

    const removeVal = ()=>{
        localStorage.clear(value);
    }

    


}
