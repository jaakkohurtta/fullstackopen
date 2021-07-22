import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { setAlert } from "../reducers/alertReducer"
import { createNewBlog } from "../reducers/blogsReducer"

const NewBlogForm = ({ togglerRef }) => {
  const dispatch = useDispatch()

  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [newBlogUrl, setNewBlogUrl] = useState("")

  const handleNewBlogFormSubmit = async (e, newBlog) => {
    // console.log(newBlog)

    e.preventDefault()
    e.target.reset()
    togglerRef.current.toggleVisibility()

    dispatch(createNewBlog(newBlog))
    dispatch(setAlert({
      message: `"${newBlog.title}" by ${newBlog.author} added to database.`,
      type: "info",
      duration: 4
    }))
  } // Create new blog

  return (
    <span>
      <h3 className="text-center">Post New Blog</h3>
      <form
        id="newBlogForm"
        style={{ display:"inline" }}
        onSubmit={(e) => handleNewBlogFormSubmit(e, {
          title: newBlogTitle,
          author: newBlogAuthor,
          url: newBlogUrl
        })}
      >
        <div className="form-group">
          <label>title</label>
          <input type="text" id="newBlogTitle" onChange={(e) => setNewBlogTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>author</label>
          <input type="text" id="newBlogAuthor" onChange={(e) => setNewBlogAuthor(e.target.value)} />
        </div>
        <div className="form-group">
          <label>url</label>
          <input type="text" id="newBlogUrl" onChange={(e) => setNewBlogUrl(e.target.value)} />
        </div>
        <div
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "right",
            marginTop: "5px"
          }}>
          <button id="submitNewBlogBtn" type="submit">post</button>
        </div>
      </form>
    </span>
  )
}

export default NewBlogForm
