const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "GOOD":
      return {
        ...state,
        good: action.payload
      }
    case "OK":
      return {
        ...state,
        ok: action.payload
      }
    case "BAD":
      return {
        ...state,
        bad: action.payload
      }
    case "RESET":
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: 
      return state
  }
  
}

export default counterReducer