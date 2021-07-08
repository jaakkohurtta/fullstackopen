import React from "react"
import { connect } from "react-redux"

const Notification = ({ notification }) => {
  return (
    <div>
      {notification !== null 
        ?
        <div style={{ border: "1px solid black", padding: "10px" }}>
          {notification}
        </div>
        : ""      
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification