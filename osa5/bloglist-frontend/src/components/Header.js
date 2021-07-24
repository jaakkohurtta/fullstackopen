import React from "react"
import { useSelector } from "react-redux"
import Navbar from "./Navbar"

const Header = () => {
  const user = useSelector(state => state.user)

  return (
    <header>
      <span className="header-title">Bloglist</span>
      {user
        ? <Navbar user={user} />
        : <div />
      }
    </header>
  )
}

export default Header