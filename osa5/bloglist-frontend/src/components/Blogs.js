import React from "react"
import NewBlogForm from "./NewBlogForm"
import Blog from "./Blog"
import Toggler from "./Toggler"

const Blogs = ({ blogs, postNewBlog, likeBlog, newBlogFormRef }) => {
  return (
    <main>
      <div className="mt-5 mb-5">
        <Toggler buttonLabel="Post New Blog" ref={newBlogFormRef}>
          <NewBlogForm postNewBlog={postNewBlog} />
        </Toggler>
      <div className="blogs-container mt-5 mb-5">
      </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
        )}
      </div>
    </main>
  )
}

export default Blogs
