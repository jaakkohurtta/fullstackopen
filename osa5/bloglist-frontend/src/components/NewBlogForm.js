import React from "react"

const NewBlogForm = ({ setNewBlogTitle, setNewBlogAuthor, setNewBlogUrl, createNewBlog }) => {
  return (
    <form onSubmit={createNewBlog}>
      <div>
        <label>title</label>
        <input type="text" onChange={(e) => setNewBlogTitle(e.target.value)} />
      </div>
      <div>
        <label>author</label>
        <input type="text" onChange={(e) => setNewBlogAuthor(e.target.value)} />
      </div>
      <div>
        <label>url</label>
        <input type="text" onChange={(e) => setNewBlogUrl(e.target.value)} />
      </div>
      <button type="submit">create</button>
    </form>    
  )
}

export default NewBlogForm
