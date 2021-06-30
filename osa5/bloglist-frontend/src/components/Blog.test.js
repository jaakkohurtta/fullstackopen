import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render } from "@testing-library/react"
// import { prettyDOM } from "@testing-library/dom"
import Blog from "./Blog"

const testUser = {
  name: "Test User",
  username: "testuser"
}

const testBlog = {
  id: 1234,
  title: "A Test Blog",
  author: "Test Author",
  likes: "42",
  url: "https://atestblog.com/",
  userId: testUser
}

test("renders blog", () => {
  // component for test blog
  const blogComponent = render(<Blog blog={testBlog} user={testUser} />)
  const blogContainer = blogComponent.container.querySelector(".blog-container")
  const blogDetails = blogComponent.container.querySelector(".blog-details")

  // console.log(blogContainer)

  expect(blogContainer).toHaveTextContent("A Test Blog")
  expect(blogContainer).toHaveTextContent("Test Author")
  expect(blogDetails).toHaveStyle("display: none")
})

test("clicking details shows blog details", () => {
  // component for test blog
  const blogComponent = render(
    <Blog
      blog={testBlog}
      user={testUser}
    />
  )
  const blogDetails = blogComponent.container.querySelector(".blog-details")
  const detailsBtn = blogComponent.container.querySelector(".details-btn")

  // console.log(prettyDOM(detailsBtn))
  // console.log(userEvent)

  fireEvent.click(detailsBtn)

  expect(detailsBtn).toHaveTextContent("close")
  expect(blogDetails).not.toHaveStyle("display: none")
})

test("clicking like button twice is handled correctly", () => {
  const likeButtonClickHandler = jest.fn()
  // component for test blog
  const blogComponent = render(
    <Blog
      blog={testBlog}
      user={testUser}
      handleBlogLikeButton={likeButtonClickHandler}
    />
  )
  const likeBtn = blogComponent.container.querySelector(".like-btn")

  // console.log(prettyDOM(likeBtn))

  fireEvent.click(likeBtn)
  fireEvent.click(likeBtn)

  expect(likeButtonClickHandler).toHaveBeenCalledTimes(2)
})
