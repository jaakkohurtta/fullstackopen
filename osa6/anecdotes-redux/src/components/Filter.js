import React from "react"
import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleFilterChange = (e) => {
    // console.log(e.target.value)

    dispatch(setFilter(e.target.value))
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      <div><strong>filter</strong></div>
      <input onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter
