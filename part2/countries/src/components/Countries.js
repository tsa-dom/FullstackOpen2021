import React from 'react'
import Country from './Country'

const Countries = ({ countryList, input, showCountry, handleButtonClick }) => {
  const countryFilter = (country) => country.name.toLowerCase().includes(input.trim().toLowerCase())
  const countries = countryList.filter(countryFilter)
  const countriesByName = countryList.filter((country) => country.name.includes(showCountry))

  if (countriesByName.length === 1) {
    const country = countriesByName[0]
    return (
      <Country country={country} />
    )
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => <p key={country.name}>
          {country.name} <button value={country.name} onClick={handleButtonClick}>show</button>
        </p>)}
      </div>
    )
  } else if (countries.length < 1) {
    return <p></p>
  }
  else {
    const country = countries[0]
    return (
      <Country country={country} />
    )
  }
}

export default Countries