import axios from 'axios'
import { useEffect, useState } from 'react'

const Country = ({country, api_key}) => {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const url_location = `https://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=1&appid=${api_key}`
  
  const [weather, setWeather] = useState({
    wind: 0,
    temperature: 0
  })

  axios
    .get(url_location)
    .then(response => {
      console.log(response.data)
      setLat(response.data[0].lat)
      setLon(response.data[0].lon)
    })
  
  let url_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`

  axios
    .get(url_weather)
    .then(response => {
      const data = response.data
      setWeather({
        wind: data.wind.speed,
        temperature: data.main.temp
      })
    })

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
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature: {weather.temperature} Celsius</p>
      <p>Wind: {weather.wind}</p>
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

const Result = ({res, search, setSearch, api_key}) => {

  if (res.length > 10 && search.length > 0){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  else if (res.length === 1){
    const country = res[0]

    
    return (
      <div>
        <Country country={country} api_key={api_key} />
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

  const api_key = process.env.REACT_APP_API_KEY

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
      <Result res={res} search={search} setSearch={setSearch} api_key={api_key} />
    </div>
  )
}

export default App