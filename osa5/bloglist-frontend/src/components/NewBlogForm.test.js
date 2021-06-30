import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render } from "@testing-library/react"
// import { prettyDOM } from "@testing-library/dom"
import NewBlogForm from "./NewBlogForm"

test("new blog form works correctly", () => {
  const mockSubmit = jest.fn()

  const newBlogFormComponent = render(
    <NewBlogForm
      handleNewBlogFormSubmit={mockSubmit}
    />
  )

  const newBlogForm = newBlogFormComponent.container.querySelector("#newBlogForm")
  // console.log(prettyDOM(newBlogForm))

  const authorInput = newBlogFormComponent.container.querySelector("#newBlogAuthor")
  const titleInput = newBlogFormComponent.container.querySelector("#newBlogTitle")
  const urlInput = newBlogFormComponent.container.querySelector("#newBlogUrl")

  fireEvent.change(authorInput, { target: { value: "John Doe" } })
  fireEvent.change(titleInput, { target: { value: "My Awesome Blog" } })
  fireEvent.change(urlInput, { target: { value: "https://johnsawesomeblog.com" } })

  expect(authorInput.value).toBe("John Doe")
  expect(titleInput.value).toBe("My Awesome Blog")
  expect(urlInput.value).toBe("https://johnsawesomeblog.com")

  fireEvent.submit(newBlogForm)

  // console.log(mockSubmit.mock.calls)
  expect(mockSubmit).toHaveBeenCalled()
  expect(mockSubmit.mock.calls[0][1].title).toBe("My Awesome Blog")
  expect(mockSubmit.mock.calls[0][1].author).toBe("John Doe")
  expect(mockSubmit.mock.calls[0][1].url).toBe("https://johnsawesomeblog.com")
})