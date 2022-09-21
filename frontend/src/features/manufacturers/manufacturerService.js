import axios from 'axios'

const API_URL = 'http://localhost:5000/api/manufacturers/'

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

const manufacturerService = {
  getManufacturers,
  getManufacturerByID,
  createManufacturer,
}

export default manufacturerService
