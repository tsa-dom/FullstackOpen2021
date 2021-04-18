import { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    field: { type,
      value,
      onChange
    },
    clear
  }
}

export const useToggle = value => {
  const [visible, setVisible] = useState(value)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggle = () => {
    setVisible(!visible)
  }

  return {
    hideWhenVisible,
    showWhenVisible,
    toggle
  }
}

export const useResource = () => {
  let token
  const user = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))
  try {
    token = `bearer ${user.token}`
  } catch (error) {
    token = null
  }

  const getConfig = () => ({
    headers: { Authorization: token }
  })

  const getAll = url => {
    const request = axios.get(url)
    return request.then(response => response.data)
  }

  const add = async (object, url) => {
    try {
      const response = await axios.post(url, object, getConfig())
      return response.data
    } catch (error) {
      return null
    }
  }

  const modify = async (object, url) => {
    try {
      await axios.put(url, object, getConfig())
      return true
    } catch (error) {
      return false
    }
  }

  const remove = async (url) => {
    try {
      await axios.delete(url, getConfig())
      return true
    } catch (error) {
      return false
    }
  }

  return {
    getAll,
    add,
    modify,
    remove
  }
}

useToggle.propTypes = {
  value: PropTypes.bool.isRequired
}