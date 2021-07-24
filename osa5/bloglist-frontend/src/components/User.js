import React from "react"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(user => user.id === id)

  if(!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      {user.blogsAdded.length !== 0 ? <h3>blogs added</h3> : ""}
      {user.blogsAdded.map(blog =>
        <div key={blog.id}>{blog.title}</div>
      )}
    </div>
  )
}

User.propTypes = {
  users: PropTypes.array.isRequired
}

export default User
