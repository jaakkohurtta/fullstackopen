import React from "react"
import { createStore } from "redux"
import reducer from "./reducer"

export const store = createStore(reducer)

const App = () => {

  // Click handlers
  const handleGoodClick = () => {
    store.dispatch({
      type: "GOOD",
      payload: store.getState().good += 1
    })
  }
  const handleNeutralClick = () => {
    store.dispatch({
      type: "OK",
      payload: store.getState().ok += 1
    })
  }
  const handleBadClick = () => {
    store.dispatch({
      type: "BAD",
      payload: store.getState().bad += 1
    })
  }
  const handleResetClick = () => {
    store.dispatch({
      type: "RESET"
    })
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGoodClick}>
        good
      </button> 
      <button onClick={handleNeutralClick}>
        neutral
      </button> 
      <button onClick={handleBadClick}>
        bad
      </button>
      <button onClick={handleResetClick}>
        reset stats
      </button>
      <h2>statistics</h2>
      <Statistics 
        good={store.getState().good}
        ok={store.getState().ok}
        bad={store.getState().bad}
      />
    </div>
  )
}

const Statistics = ({ good, ok, bad }) => {
  let allStats = good + ok + bad
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
      <div>
        <div><span style={statLabelStyle}>good</span>{good}</div>
        <div><span style={statLabelStyle}>ok</span>{ok}</div>
        <div><span style={statLabelStyle}>bad</span>{bad}</div>
        <div><span style={statLabelStyle}>all stats</span>{allStats}</div>
        <div><span style={statLabelStyle}>average</span>{average.toFixed(1)}</div>
        <div><span style={statLabelStyle}>positive</span>{positive.toFixed(1)} %</div>
      </div>
    )
  }
}

// styles
const statLabelStyle = {
  display: "inline-block",
  width: "5em"
}

export default App