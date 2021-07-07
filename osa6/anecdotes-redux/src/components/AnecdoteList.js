import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { castVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => 
    state.anecdotes.sort((a,b) => b.votes - a.votes))
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVoteClick = (anecdote) => {
    dispatch(castVote(anecdote))
    dispatch(setNotification(`You voted "${anecdote.content}".`, 5))
  }

  return (
    <div>
      <hr />
      {anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVoteClick(anecdote)}>vote</button>
            </div>
          </div>
        )}  
      <hr />
    </div>
  )
}

export default AnecdoteList
