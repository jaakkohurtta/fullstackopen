import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { castVote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => 
    state.anecdotes.sort((a,b) => b.votes - a.votes))
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    const content = anecdotes.find(anecdote => anecdote.id === id).content

    dispatch(castVote(id))
    dispatch(setNotification(`You voted "${content}".`))

    setTimeout(() => { 
      dispatch(removeNotification())
    }, 5000) // remove notification after 5 secs
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}  
      <hr />
    </div>
  )
}

export default AnecdoteList
