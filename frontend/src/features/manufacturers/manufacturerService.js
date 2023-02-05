import axios from 'axios'

const API_URL = 'https://pc-planner-api.onrender.com/api/manufacturers/'

const getManufacturers = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const getManufacturerByID = async (id) => {
  const response = await axios.get(API_URL + id)

  return response.data
}

const createManufacturer = async (data) => {
  console.log(data)

  const response = await axios.post(API_URL, data)

  return response.data
}

const updateManufacturer = async (data) => {
  const id = data.id

  const body = {
    title: data.title,
    description: data.description,
  }

  const response = await axios.put(API_URL + id, body)

  return response.data
}

const deleteManufacturer = async (manufacturerId) => {
  const response = await axios.delete(API_URL + manufacturerId)

  return response.data
}

const manufacturerService = {
  getManufacturers,
  getManufacturerByID,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
}

export default manufacturerService
