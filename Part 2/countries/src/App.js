import axios from 'axios'
import { useEffect, useState } from 'react'

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <div>
        <p>Languages:</p>
        <ul>
          {
            Object.keys(country.languages).map(each => <li key={each}>{country.languages[each]}</li>)
          }
        </ul>
      </div>
      <img src={country.flags.png} alt={country.name.common} />
    </div>
  )
} 

const Button = ({country, setSearch}) => {
  const handleClick = () => {
    setSearch(country.name.common)
  }

  return (
    <>
      <button onClick={handleClick}>Show</button>
    </>
  )
} 

const Result = ({res, search, setSearch}) => {

  if (res.length > 10 && search.length > 0){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  else if (res.length === 1){
    const country = res[0]
    return (
      <div>
        <Country country={country} />
      </div>
    )
  }

  else if (search.length === 0) {
    return(
      <div></div>
    )
  }
  
  return (
    <div>
      <ul>
        {res.map(each => <li key={each.name.common}>{each.name.common} <Button country={each} setSearch={setSearch} /></li>)}
      </ul>
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])
  
  // filter a list of countries based on search
  const checkSearch = (country) => country.name.common.toLowerCase().includes(search.toLocaleLowerCase())
  const res = countries.filter(country => checkSearch(country))


  return (
    <div>
      Find countries: <input value={search} onChange={(event) => setSearch(event.target.value)} />
      <Result res={res} search={search} setSearch={setSearch} />
    </div>
  )
}

export default App