import React from "react"
import NewBlogForm from "./NewBlogForm"
import Blog from "./Blog"
import Toggler from "./Toggler"
import PropTypes from "prop-types"

const Blogs = ({ blogs, postNewBlog, likeBlog, deleteBlog, newBlogFormRef, user }) => {
  return (
    <main>
      <div style={{ display: "flex", justifyContent: "center" }} className="mt-5 mb-5">
        <Toggler
          buttonLabel="Post New Blog"
          buttonClasses=""
          cancelId="NewBlogForm"
          ref={newBlogFormRef}
        >
          <NewBlogForm postNewBlog={postNewBlog} />
        </Toggler>
      </div>
      <div className="blogs-container mt-5 mb-5">
        <div>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          )}
        </div>
      </div>
    </main>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  postNewBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blogs
