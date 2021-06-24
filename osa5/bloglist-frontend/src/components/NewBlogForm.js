import React from "react"

const NewBlogForm = ({ setNewBlogTitle, setNewBlogAuthor, setNewBlogUrl, createNewBlog }) => {
  return (
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
      <button type="submit">create</button>
    </form>    
  )
}

export default NewBlogForm
