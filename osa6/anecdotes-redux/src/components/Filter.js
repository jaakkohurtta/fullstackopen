import React from "react"
import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = (props) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div><strong>filter</strong></div>
      <input onChange={(e) => props.setFilter(e.target.value)}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (value) => {
      dispatch(setFilter(value))
    }
  }
}

const connectedFilter = connect(null, mapDispatchToProps)(Filter)
export default connectedFilter