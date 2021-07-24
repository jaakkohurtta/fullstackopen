import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      {users.map((user, index) =>
        <div key={user.username}>
          <span style={{ display: "inline-block", width: "200px" }}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </span>
          <span>{user.blogsAdded.length}{index === 0 ? " blogs added" : ""}</span>
        </div>
      )}
    </div>
  )
}

export default Users
