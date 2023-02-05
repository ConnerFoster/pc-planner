import axios from 'axios'

const API_URL = 'https://pc-planner-api.onrender.com/api/parts/'

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

const updatePart = async (data) => {
  const id = data.id.id

  const body = {
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
    category: data.category,
    manufacturer: data.manufacturer,
  }

  const response = await axios.put(API_URL + id, body)

  return response.data
}

const partService = {
  getParts,
  getPartByID,
  deletePart,
  createPart,
  updatePart,
}

export default partService
