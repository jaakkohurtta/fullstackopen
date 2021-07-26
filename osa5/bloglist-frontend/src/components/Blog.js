import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { setAlert } from "../reducers/alertReducer"
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogsReducer"

const Blog = () => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)

  const user = useSelector(state => state.user)

  const [comment, setComment] = useState("")

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

  const handleCommentSubmit = (e) => {
    e.preventDefault()

    dispatch(commentBlog(blog.id, { content: comment }))
    setComment("")

    e.target.reset()
  }

  return (
    <div>
      <div className="blog-container">
        <div className="blog-title">
          <span>{blog.title}</span>
          <span>
            <button className="like-btn" onClick={() => handleBlogLikeButton(blog)}>
              like
            </button>
            {user.username === blog.userId.username
              ?
              <button  className="delete-btn" onClick={() => handleBlogDeleteButton(blog)}>
                delete blog
              </button>
              :
              <></>
            }
          </span>
        </div>
        <div className="blog-author">author: {blog.author}</div>
        <div className="blog-details mt-5">
          <div>{blog.url}</div>
          <div>likes: {blog.likes}</div>
          <div>added by: {blog.userId.name}</div>
        </div>
      </div>
      <hr className="mt-5 mb-5" />
      <h4>Comments</h4>
      {blog.comments.map(comment => <div key={comment.id}>{comment.content}</div>)}
      <form onSubmit={handleCommentSubmit}>
        <input type="text" onChange={(e) => setComment(e.target.value)} />
        <button type="submit">submit comment</button>
      </form>
    </div>
  )
}

export default Blog