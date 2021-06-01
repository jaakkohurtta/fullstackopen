import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button 
        onClick={() => setGood(good + 1)} 
        text="good" 
        />
      <Button 
        onClick={() => setNeutral(neutral + 1)} 
        text="neutral" 
        />
      <Button 
        onClick={() => setBad(bad + 1)} 
        text="bad" 
        />
      <h2>statistics</h2>
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistic = ({ good, neutral, bad }) => {
  let allStats = good + neutral + bad
  let average = (good * 1 + bad * -1) / allStats
  let positive = good / allStats * 100

  if(allStats === 0) {
    return (
      <div>
        no feedback given
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
        <Stat label="good" value={good} />
        <Stat label="neutral" value={neutral} />
        <Stat label="bad" value={bad} />
        <Stat label="all" value={allStats} />
        <Stat label="average" value={average.toFixed(1)} />
        <Stat label="positive" value={positive.toFixed(1)} />
        </tbody>
      </table>
    )  
  } 
}

const Stat = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value} {label === "positive" ? "%" : ""}</td> 
    </tr>
  )
}

export default App
