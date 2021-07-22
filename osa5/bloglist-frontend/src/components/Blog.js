import React, { useState } from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"

import { setAlert } from "../reducers/alertReducer"
import { likeBlog, deleteBlog } from "../reducers/blogsReducer"

const Blog = ({
  blog,
  user
}) => {
  const dispatch = useDispatch()

  const [showBlogDetails, setShowBlogDetails] = useState(false)

  const handleDetailsButtonClick = () => {
    setShowBlogDetails(!showBlogDetails)
  }

  const showDetails = { display: showBlogDetails ? "" : "none" }
  const detailsButtonLabel = showBlogDetails ? "close" : "details"

  // Click handlers
  const handleBlogLikeButton = (blog) => {
    // console.log(blog)

    const likedBlog = {
      user: blog.userId.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes += 1
    }

    dispatch(likeBlog(blog.id, likedBlog))
    dispatch(setAlert({
      message: `You liked ${likedBlog.title} by ${likedBlog.author}!`,
      type: "info",
      duration: 4
    }))
  } // Update blog likes

  const handleBlogDeleteButton = (blog) => {
    if(window.confirm(`Delete "${blog.title}"?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(setAlert({
        message: `"${blog.title}" deleted.`,
        type: "alert",
        duration: 4
      }))
    }
  } // Delete blog from db

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
        <div>likes: {blog.likes}</div>
        <div>added by: {blog.userId.name}</div>
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
  user: PropTypes.object.isRequired
}

export default Blog