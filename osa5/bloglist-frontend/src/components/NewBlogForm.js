import React, { useState } from "react"

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
    <div>
      <h3>post new blog</h3>
      <form onSubmit={createNewBlog}>
        <div>
          <label>title</label>
          <input type="text" id="newBlogTitle" onChange={(e) => setNewBlogTitle(e.target.value)} />
        </div>
        <div>
          <label>author</label>
          <input type="text" id="newBlogAuthor" onChange={(e) => setNewBlogAuthor(e.target.value)} />
        </div>
        <div>
          <label>url</label>
          <input type="text" id="newBlogUrl" onChange={(e) => setNewBlogUrl(e.target.value)} />
        </div>
        <button type="submit">post</button>
      </form>
    </div>    
  )
}

export default NewBlogForm
