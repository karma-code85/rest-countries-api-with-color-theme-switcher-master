import { useEffect, useState } from "react";
import CountryDetails from "./components/CountryDetails";
import Home from "./components/Home";
import { Routes,Route } from "react-router-dom";



export default function App(){
  const [dark ,setDark]=useState(false)


  useEffect(()=>{
    localStorage.setItem("dark", dark)
    if(!dark){
      document.documentElement.classList.add("dark")

    }else{
      document.documentElement.classList.remove("dark")

    }


  },[dark])
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="country/:name"  element={<CountryDetails/>}/>
      </Routes>
    </div>
  )
}

