import React, { useState } from "react"

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const initialVotes = new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

  // Debuggeri
  // console.log(Math.floor(Math.random() * anecdotes.length))
  // console.log(initialVotes)
  // console.log(votes)

  const logVotes = (selectedAnecdote) => {
    const newVotes = [...votes]
    newVotes[selectedAnecdote] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <Button onClick={() => logVotes(selected)} text="vote" />
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote"/>
      <h2>Anecdote with most votes</h2>
      <FeaturedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const FeaturedAnecdote = ({ anecdotes, votes }) => {
  let mostVotes = 0,
      mostVotesIndex = 0;

  votes.forEach((vote, index) => {
    if(vote > mostVotes) {
      mostVotes = vote
      mostVotesIndex = index
    }
  })

  return (
    <p>"{anecdotes[mostVotesIndex]}" has {mostVotes} votes</p>
  )
}

export default App
