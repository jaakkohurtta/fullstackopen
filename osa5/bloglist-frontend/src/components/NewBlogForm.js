import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { setAlert } from "../reducers/alertReducer"
import { createNewBlog } from "../reducers/blogsReducer"

import styled from "styled-components"
import {
  Button,
  Form,
  Input,
  InputGroup,
  Header3
} from "../theme/styledComponents"

const Label = styled.label`
  display: inline-block;
  color: dimgray;
  width: 50px;
  padding-right: 5px;
`

const NewBlogForm = ({ togglerRef }) => {
  const dispatch = useDispatch()

  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [newBlogUrl, setNewBlogUrl] = useState("")

  const handleNewBlogFormSubmit = async (e, newBlog) => {
    // console.log(newBlog)

    e.preventDefault()
    e.target.reset()
    togglerRef.current.toggleVisibility()

    dispatch(createNewBlog(newBlog))
    dispatch(setAlert({
      message: `"${newBlog.title}" by ${newBlog.author} added to database.`,
      type: "info",
      duration: 4
    }))
  } // Create new blog

  return (
    <span>
      <Header3>Post New Blog</Header3>
      <Form
        id="newBlogForm"
        style={{ display:"inline" }}
        onSubmit={(e) => handleNewBlogFormSubmit(e, {
          title: newBlogTitle,
          author: newBlogAuthor,
          url: newBlogUrl
        })}
      >
        <InputGroup>
          <Label>title</Label>
          <Input wide
            id="newBlogTitle"
            type="text"
            onChange={(e) => setNewBlogTitle(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>author</Label>
          <Input wide
            id="newBlogAuthor"
            type="text"
            onChange={(e) => setNewBlogAuthor(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>url</Label>
          <Input wide
            id="newBlogUrl"
            type="text"
            onChange={(e) => setNewBlogUrl(e.target.value)}
          />
        </InputGroup>
        <Label />
        <Button type="submit">post</Button>
      </Form>
    </span>
  )
}

export default NewBlogForm
