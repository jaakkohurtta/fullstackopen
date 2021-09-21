import React from 'react'

const InfoMessage = ({ message }) => {
  if(message.content === null) {
    return (
      <></>
    )
  } else {
    return (
      <div className="mt-5 mb-5">
        <p className={message.type}>{message.content}</p>
      </div>
    )
  }
}

export default InfoMessage