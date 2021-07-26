import React, { useRef } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import NewBlogForm from "./NewBlogForm"
import Toggler from "./Toggler"

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  const newBlogFormRef = useRef()

  return (
    <main>
      <div style={{ display: "flex", justifyContent: "center" }} className="mt-5 mb-5">
        <Toggler
          buttonLabel="Post New Blog"
          buttonClasses=""
          cancelId="NewBlogForm"
          ref={newBlogFormRef}
        >
          <NewBlogForm togglerRef={newBlogFormRef}/>
        </Toggler>
      </div>
      <div className="blogs-container mt-5 mb-5">
        {blogs.map(blog =>
          <div className="blog-container" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}><span className="blog-title">{blog.title}</span></Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default Blogs