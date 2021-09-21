import React from 'react'

const Input = ({ handleChange }) => {
  return (
    <div>
      Find countries <input onChange={handleChange} />
    </div>
  )
}

export default Input
