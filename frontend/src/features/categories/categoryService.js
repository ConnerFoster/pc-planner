import axios from 'axios'

const API_URL = 'http://localhost:5000/api/categories/'

const createCategory = async (data) => {
  const response = await axios.post(API_URL, data)
  console.log(data)
  return response.data
}

const updateCategory = async (data) => {
  const id = data.id

  const body = {
    title: data.title,
    description: data.description,
  }

  const response = await axios.put(API_URL + id, body)

  return response.data
}

const getCategories = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const getCategoryByID = async (categoryId) => {
  const response = await axios.get(API_URL + categoryId)

  return response.data
}

const deleteCategory = async (categoryId) => {
  const response = await axios.delete(API_URL + categoryId)

  return response.data
}

const categoryService = {
  getCategories,
  getCategoryByID,
  createCategory,
  deleteCategory,
  updateCategory,
}

export default categoryService
