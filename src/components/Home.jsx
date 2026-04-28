import CountryCard from "./CountryCard";
import data from '../data.json'
import { useState ,useEffect} from "react";



export default function Home(){
  const [countries, setCountries]=useState([])
  const [loading , setLoading]=useState(true)
  const [search, setSearch]=useState("")
  const [region ,setRegion]=useState("")
  const [isOpen, setIsOpen]=useState(false)
  const [dark , setDark]=useState(false)

  const regions=["Africa", "Americas", "Asia", "Europe", "Oceania"]

  useEffect(()=>{
    const savedTheme=localStorage.getItem("dark")
    if(savedTheme ){
      setDark(savedTheme)
    }
  },[])


  useEffect(()=>{
    localStorage.setItem("dark", dark)
    if(dark){
      document.documentElement.classList.add("dark")
    }
    else{
      document.documentElement.classList.remove("dark")
    }


  },[dark])



  useEffect(()=>{
    async function fetchcountries() {
     try{
      const res=await fetch("https://restcountries.com/v2/all?fields=name,capital,region,population,flags,alpha3Code")
      const data=await res.json()
      setCountries(data)
     }
     catch(error){
      console.log(error)
     }
     finally{
      setLoading(false)
     }
    }
 fetchcountries()
    },
     [])

const filterd=countries.filter((country)=>{
  const matchesSearch=country.name
  .toLowerCase()
  .includes(search.toLowerCase())
  const matchesRegion=region===""  || country.region ===region

  return matchesSearch && matchesRegion
})

  return(
    <div className="bg-gray-100 min-h-screen  ">
      <div>
       <div className="flex justify-between  items-center p-4 bg-white shadow  dark:bg-gray-800 dark:text-white">
        <h1 className="font-bold ">Where in the world ?</h1>
        <button className="flex text-black cursor-pointer gap-2 items-center outline-none"
        onClick={()=>setDark(!dark)}
        >
          <img src={dark?"/images/icon-sun.svg" :"/images/icon-moon.svg"} alt="" className="shadow-2xl  w-4 h-4 "/> <span className="dark:text-white ">Dark Mode</span>
        </button>
       </div>
       <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className=" space-y-6 p-4  md:flex justify-between items-center">
          <input type="text"
          placeholder=" 🔍       Search for a country....."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className=" p-3 w-full  md:w-1/4 rounded  outline-none text-center text-black text-sm dark:bg-gray-800 md:h-10 dark:text-white"
           />
        <div className="bg-white dark:bg-gray-800 text-center dark:text-white shadow p-3  text-sm  relative w-1/2 md:w-40 rounded cursor-pointer" onClick={()=>setIsOpen(!isOpen)}>
         Filter by Region
          {
            isOpen && (
              <div className="bg-white p-2 absolute space-y-4 cursor-pointer top-[calc(100%+6px)] shadow rounded w-full left-0 z-10  dark:bg-gray-800 dark:text-gray-300">
            {regions.map((r)=>(
              <p key={r} className="hover:bg-gray-100  focus:text-sky-500 rounded p-1 w-full"
              onClick={()=>setRegion(r)
              }
              >{r}</p>
            ))
            }
          </div>

            )
          }

        </div>
       </div>
        <div className="  grid-cols-1 grid md:grid-cols-2 lg:grid-cols-4 gap-10 p-8 cursor-pointer">
          {filterd.map((country)=>(
            <CountryCard
            key={country.alpha3Code}
            name={country.name}
            popluation={country.population}
            capital={country.capital}
            flag={country.flags.png}
            des={country.name}
            region={country.region}

            />

          )

          )}
        </div>
        </div>
      </div>
    </div>
  )

}
