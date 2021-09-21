import anecdoteService from "../services/anecdotes"

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch({
      type: "INIT_ANECDOTES",
      payload: anecdotes
    })
  }
}

export const castVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)
    dispatch({
      type: "CAST_VOTE",
      payload: updatedAnecdote
    })
  }
}

export const addNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch({
      type: "ADD_NEW_ANECDOTE",
      payload: newAnecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  // console.log("state now: ", state)
  // console.log("action", action)

  switch(action.type) {
    case "CAST_VOTE":
      // console.log(action.payload)
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
    
    case "ADD_NEW_ANECDOTE":
      return state.concat(action.payload)
    
    case "INIT_ANECDOTES":
      return action.payload

    default:
      return state
  }
}

export default anecdoteReducer