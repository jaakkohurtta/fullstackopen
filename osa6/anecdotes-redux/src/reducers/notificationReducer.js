export const setNotification = (notification, duration) => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: notification
    })
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        payload: null
      })
    }, duration * 1000)
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