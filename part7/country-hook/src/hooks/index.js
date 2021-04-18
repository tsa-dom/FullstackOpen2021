import axios from 'axios'
import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(async () => {
    try {
      const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      setCountry({ data: response.data[0], found: true })
    } catch {
      setCountry({ found: false })
    }
  }, [name, setCountry])

  return country
}