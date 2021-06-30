import React, { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({
  blog,
  handleBlogLikeButton,
  handleBlogDeleteButton,
  user
}) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)

  const handleDetailsButtonClick = () => {
    setShowBlogDetails(!showBlogDetails)
  }

  const showDetails = { display: showBlogDetails ? "" : "none" }
  const detailsButtonLabel = showBlogDetails ? "close" : "details"

  // console.log(blog)
  // console.log(user)

  return (
    <div className="blog-container">
      <div className="blog-title">
        <span>{blog.title}</span>
        <span>
          <button className="details-btn" onClick={handleDetailsButtonClick}>
            {detailsButtonLabel}
          </button>
          <button className="like-btn" onClick={() => handleBlogLikeButton(blog)}>
            like
          </button>
        </span>
      </div>
      <div className="blog-author">author: {blog.author}</div>
      <div style={showDetails} className="blog-details mt-5">
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <div>{blog.userId.name}</div>
        {/* render delete button if usernames match */}
        {user.username === blog.userId.username
          ?
          <div className="blog-deletebtn-container">
            <button  className="delete-btn" onClick={() => handleBlogDeleteButton(blog)}>
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
  handleBlogLikeButton: PropTypes.func,
  handleBlogDeleteButton: PropTypes.func,
  user: PropTypes.object
}

export default Blog