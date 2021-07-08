let activeNotification = null
/*
const timeoutDebugger = () => {
  let timeoutCounter = 0
  let timeoutInterval = setInterval(() => {
    timeoutCounter++
    console.log(timeoutCounter)
  }, 990)

  setTimeout(() => {
    clearInterval(timeoutInterval)
  }, 5000)
}
*/

export const setNotification = (notification, duration) => {
  
  if(activeNotification) {
    clearTimeout(activeNotification)
  }

  // timeoutDebugger()

  return async dispatch => {
    activeNotification = setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        payload: null
      })

      activeNotification = null
    }, duration * 1000)

    dispatch({
      type: "SET_NOTIFICATION",
      payload: notification
    })
  }
}

const notificationReducer = (state = null, action) => {
  // console.log("state now: ", state)
  // console.log("action", action)

  switch(action.type) {
    case "SET_NOTIFICATION":
      return state = action.payload
    case "REMOVE_NOTIFICATION":
      return state = action.payload
    default:
      return state
  }
}

export default notificationReducer