import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom"


export default function CountryDetails(){
  const navigate=useNavigate();
  const {name}=useParams();
  const [country, setCountries]=useState(null)


  useEffect(()=>{
    async function fetchcountry() {
      try{
      const res=await fetch(`https://restcountries.com/v2/name/${name}?fullText=true`)
      const  data=await res.json()
        setCountries(data[0])

      }
      catch(error){
        console.error("Error Fetching country", error)
      }
    }
    fetchcountry();

  },[name])
 if(!country)return <p>Loading.....</p>
  return(


    <div className="p-4 space-y-6  flex flex-col items-center justify-center min-h-screen">
      <button onClick={()=>navigate(-1)} className="bg-white p-2 rounded shadow-lg text-center">
        ⬅ Back
      </button>
      <div className="space-y-8 md:flex md:gap-8">
      <div>
        <img src={country.flags.png} alt="country flag" />
      </div>
      <div>
      <h1>{country.name}</h1>
      <p><span>Native Name :</span> <span>{country.nativeName}</span></p>
      <p><span>population :</span><span>{country.population}</span></p>
      <p><span>Region :</span><span>{country.region}</span></p>
      <p><span>Sub Region</span><span>{country.subregion}</span></p>
      <p><span>Capital</span><span>{country.capital}</span></p>


      </div>
      <div>
      <p><span>Top Level Domain:</span><span>{country.topLevelDomain}</span></p>
      <p><span>Currencies:</span><span>{country.currencies?.map((c)=>c.name).join(", ")}</span></p>
      <p><span>Languages: </span><span>{country.languages?.map((l)=>l.name).join(", ")}</span></p>

      </div>
      </div>
    </div>

  )
}