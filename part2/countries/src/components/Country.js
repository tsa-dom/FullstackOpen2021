import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ weather }) => {
  if (weather.length === 1) {
    const content = weather[0].current
    return (
      <div>
        <p><b>temperature: </b>{content.temperature} Celsius</p>
        <img src={content.weather_icons[0]} alt='Weather logo' />
        <p><b>wind: </b>{content.wind_speed} mph direction {content.wind_dir}</p>
      </div>
    )
  }
  return <p></p>
}

const Country = ({ country }) => {
  const [ weather, setWeather ] = useState([])
  
  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }
    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(response => setWeather([response.data]))
  }, [country])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt='Country flag' width='17%' height='17%' />
      <h3>Weather in {country.capital}</h3>
      <Weather weather={weather} />
    </div>
  )
}

export default Country