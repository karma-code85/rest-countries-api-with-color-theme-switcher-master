import { useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from "react-router-dom"


export default function CountryDetails(){
  const navigate=useNavigate();
  const {name}=useParams();
  const [country, setCountry]=useState(null)
  const [countries, setCountries]=useState([])




  useEffect(()=>{
    async function fetchcountry() {
      try{
      const res=await fetch(`https://restcountries.com/v2/name/${name}?fullText=true`)
      const  data=await res.json()
        setCountry(data[0])

      }
      catch(error){
        console.error("Error Fetching country", error)
      }
    }
    fetchcountry();

  },[name])



 useEffect(() => {
    async function fetchAllCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v2/all?fields=name,alpha3Code"
        );
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    }

    fetchAllCountries();
  }, []);
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
      <p><span>Sub Region :</span><span>{country.subregion}</span></p>
      <p><span>Capital :</span><span>{country.capital}</span></p>


      </div>
      <div>
      <p><span>Top Level Domain:</span><span>{country.topLevelDomain}</span></p>
      <p><span>Currencies:</span><span>{country.currencies?.map((c)=>c.name).join(", ")}</span></p>
      <p><span>Languages: </span><span>{country.languages?.map((l)=>l.name).join(", ")}</span></p>

      </div>
      <div className="space-y-4">
        <h1 className="font-bold ">Border countries</h1>
        <div className="flex gap-4 flex-wrap ">
          {
          country.borders?.map((code)=>{
            const border=countries.find((c)=> c.alpha3Code===code)
            if(!border) return null
            return (
              <Link to={`/country/${border.name}`} key={code}>
              <button className="bg-white shadow px-3 py-1 rounded">{border.name}</button>
              </Link>
            )
          }

          )}
        </div>
      </div>
      </div>
    </div>

  )
}