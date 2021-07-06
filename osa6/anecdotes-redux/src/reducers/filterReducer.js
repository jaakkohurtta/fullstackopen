export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter
  }
}

const filterReducer = (state = "", action) => {
  console.log("state now: ", state)
  console.log("action", action)

  switch(action.type) {
    case "SET_FILTER":
      return state = action.payload
    default:
      return state
  }
}

export default filterReducer