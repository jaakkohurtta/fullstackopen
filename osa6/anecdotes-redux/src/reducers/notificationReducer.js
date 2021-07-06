export const setNotification = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    payload: notification
  }
}

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
    payload: null
  }
}

const notificationReducer = (state = null, action) => {
  console.log("state now: ", state)
  console.log("action", action)

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