import React, { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  // click handlers
  const handleDetailsButton = () => {
    setShowDetails(!showDetails)
  }

  const handleLikeButton = () => {
    const likedBlog = {
      user: blog.userId.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes += 1
    }

    likeBlog(blog.id, likedBlog)
  }

  const handleDeleteButton = () => {
    deleteBlog(blog)
  }

  const showBlogDetails = { display: showDetails ? "" : "none" }
  const detailsButtonLabel = showDetails ? "close" : "details"

  // console.log(blog)
  // console.log(user)

  return (
    <div className="blog-container">
      <div className="blog-title">
        <span>{blog.title}</span>
        <span>
          <button className="details-btn" onClick={handleDetailsButton}>
            {detailsButtonLabel}
          </button>
          <button className="like-btn" onClick={handleLikeButton}>
            like
          </button>
        </span>
      </div>
      <div className="blog-author"><span>author: {blog.author}</span></div>
      <div style={showBlogDetails} className="mt-5">
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <div>{blog.userId.name}</div>
        {/* render delete button if ids match */}
        {user.username === blog.userId.username
          ?
          <div className="blog-deletebtn-container">
            <button  className="delete-btn" onClick={handleDeleteButton}>
              delete blog
            </button>
          </div>
          :
          <></>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog