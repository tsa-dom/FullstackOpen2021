import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries.js'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ input, setInput ] = useState('')
  const [ showCountry, setCountry ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])
  
  const handleInputChange = (event) => {
    setCountry('')
    setInput(event.target.value)
  }
  const handleButtonClick = (event) => setCountry(event.target.value)
  return (
    <div>
      <p>
        find countries <input 
          value={input}
          onChange={handleInputChange}
        />
      </p>
      <div>
        <Countries
          countryList={countries}
          input={input}
          showCountry={showCountry}
          handleButtonClick={handleButtonClick}
        />
      </div>
    </div>
  )
}

export default App
