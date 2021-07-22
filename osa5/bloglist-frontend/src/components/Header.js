import React from "react"
import { useSelector } from "react-redux"
import User from "./User"

const Header = () => {
  const user = useSelector(state => state.user)

  return (
    <header>
      <span className="header-title">Bloglist</span>
      {user
        ? <User user={user} />
        : <></>
      }
    </header>
  )
}

export default Header