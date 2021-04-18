import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) return <div></div>

  return (
    <Alert variant={notification.type}>
      {notification.message}
    </Alert>
  )
}

export default Notification