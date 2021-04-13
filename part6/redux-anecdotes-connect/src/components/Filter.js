import React from 'react'
import { connect } from 'react-redux'
import { modify } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = event => props.modify(event.target.value)
  
  const style = { marginBottom: 10 }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  modify,
}

export default connect(null, mapDispatchToProps)(Filter)