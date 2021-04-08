import React from 'react'
import PropTypes from 'prop-types'

const BlogContent = ({ name, value, handleChange }) => {
  return (
    <div>
      {name}: <input
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

BlogContent.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default BlogContent