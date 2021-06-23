import axios from 'axios'
const baseUrl = '/api/blogs'

// set user token
let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewBlog = async (newBlogObj) => {
  console.log(token)

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlogObj, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, createNewBlog }