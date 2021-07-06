export const initAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    payload: anecdotes
  }
}

export const castVote = (id) => {
  return {
    type: "CAST_VOTE",
    payload: { id }
  }
}

export const addNewAnecdote = (newAnecdote) => {
  return {
    type: "ADD_NEW_ANECDOTE",
    payload: newAnecdote
  }
}

const anecdoteReducer = (state = [], action) => {
  // console.log("state now: ", state)
  // console.log("action", action)

  switch(action.type) {
    case "CAST_VOTE":
      const votedAnecdote = state.find(anecdote => anecdote.id === action.payload.id)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : updatedAnecdote)
    
    case "ADD_NEW_ANECDOTE":
      return state.concat(action.payload)
    
    case "INIT_ANECDOTES":
      return action.payload

    default:
      return state
  }
}

export default anecdoteReducer