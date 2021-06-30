import React from "react"
import NewBlogForm from "./NewBlogForm"
import Blog from "./Blog"
import Toggler from "./Toggler"
import PropTypes from "prop-types"

const Blogs = ({
  blogs,
  handleNewBlogFormSubmit,
  handleBlogLikeButton,
  handleBlogDeleteButton,
  newBlogFormRef,
  user
}) => {
  return (
    <main>
      <div style={{ display: "flex", justifyContent: "center" }} className="mt-5 mb-5">
        <Toggler
          buttonLabel="Post New Blog"
          buttonClasses=""
          cancelId="NewBlogForm"
          ref={newBlogFormRef}
        >
          <NewBlogForm handleNewBlogFormSubmit={handleNewBlogFormSubmit} />
        </Toggler>
      </div>
      <div className="blogs-container mt-5 mb-5">
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleBlogLikeButton={handleBlogLikeButton}
            handleBlogDeleteButton={handleBlogDeleteButton}
            user={user}
          />
        )}
      </div>
    </main>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleNewBlogFormSubmit: PropTypes.func.isRequired,
  handleBlogLikeButton: PropTypes.func.isRequired,
  handleBlogDeleteButton: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blogs
