import axios from 'axios'

const API_URL = 'http://localhost:5000/api/parts/'

const getParts = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const createPart = async (data) => {
  const response = await axios.post(API_URL, data)

  return response.data
}

const getPartByID = async (id) => {
  const response = await axios.get(API_URL + id)

  return response.data
}

const deletePart = async (id) => {
  const response = await axios.delete(API_URL + id)

  return response.data
}

const partService = {
  getParts,
  getPartByID,
  deletePart,
  createPart,
}

export default partService
