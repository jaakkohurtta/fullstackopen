import React, { useRef } from "react"
import { useSelector } from "react-redux"
import NewBlogForm from "./NewBlogForm"
import Blog from "./Blog"
import Toggler from "./Toggler"

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

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
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        )}
      </div>
    </main>
  )
}

export default Blogs