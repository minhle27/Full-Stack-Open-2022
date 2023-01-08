import axios from 'axios'
import { useEffect, useState } from 'react'

const Result = ({countries, checkSearch, search}) => {

  const res = countries.filter(country => checkSearch(country))

  if (res.length > 10 && search.length > 0){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (res.length === 1){
    const country = res[0]
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
  else if (search.length === 0) {
    return(
      <div></div>
    )
  }
  return (
    <div>
      <ul>
        {res.map(res => <li key={res.name.common}>{res.name.common}</li>)}
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
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const checkSearch = (country) => country.name.common.toLowerCase().includes(search.toLocaleLowerCase())

  return (
    <div>
      Find countries: <input value={search} onChange={handleSearch} />
      <Result countries={countries} checkSearch={checkSearch} search={search}/>
    </div>
  )
}

export default App