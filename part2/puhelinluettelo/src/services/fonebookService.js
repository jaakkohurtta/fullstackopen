import axios from "axios"
const baseUrl = "/api/fonebook"

const read = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(res => res.data)
}

const update = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then(res => res.data)
}

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { read, create, update, del }