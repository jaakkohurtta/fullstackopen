import React, { useState } from "react"

const Blog = ({ blog, likeBlog }) => {
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

  const showBlogDetails = { display: showDetails ? "" : "none" }
  const detailsButtonLabel = showDetails ? "close" : "details"

  // console.log(blog)

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
      </div>
    </div>
  )
}


export default Blog