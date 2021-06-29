import axios from "axios"
const baseUrl = "/api/users"

const newUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { newUser }