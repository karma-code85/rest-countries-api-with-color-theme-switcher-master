import { Link } from "react-router-dom"


export default function CountryCard({name,popluation,region,capital,flag,des}){
  return(
    <Link to={`/country/${name}`}>
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow-lg  rounded-lg space-y-2 ">
      <div>
        <img src={flag} alt={des} className="w-full h-40 rounded-t-lg" />
      </div>
      <div className="p-4  space-y-2">
        <h1 className="font-bold text-lg">{name}</h1>
        <div>
        <p><span className="font-semibold">Population: </span> <span className="text-gray-400">{popluation}</span></p>
        <p><span className="semibold">Region: </span><span className="text-gray-400">{region}</span></p>
        <p><span className="font-semibold">capital: </span><span className="text-gray-400">{capital}</span></p>
        </div>
      </div>
    </div>
    </Link>
  )
}