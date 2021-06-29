import React, { useState } from "react"
import PropTypes from "prop-types"


const NewBlogForm = ({ postNewBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [newBlogUrl, setNewBlogUrl] = useState("")

  const createNewBlog = (e) => {
    e.preventDefault()

    postNewBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogTitle("")
    setNewBlogAuthor("")
    setNewBlogUrl("")

    e.target.reset()
  }

  return (
    <span>
      <h3 className="text-center">Post New Blog</h3>
      <form id="newBlogForm" style={{ display:"inline" }} onSubmit={createNewBlog}>
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
          <button type="submit">post</button>
        </div>
      </form>
    </span>
  )
}

NewBlogForm.propTypes = {
  postNewBlog: PropTypes.func.isRequired
}

export default NewBlogForm
