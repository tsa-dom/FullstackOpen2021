import axios from 'axios'
import { useEffect, useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    field: {
      type,
      value,
      onChange
    },
    clear
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }, [setResources, baseUrl])

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      setResources(resources.concat(response.data))
      return true
    } catch (error) {
      return false
    }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}