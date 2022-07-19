const asyncHandler = require('express-async-handler')

//Gets list of categories
const getAllCategories = asyncHandler(async (req, res) => {
  res.json({message: 'Get list of categories'})
})

//Post a new category
const postCategory = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400)
    throw new Error('Please add a title')
  }
})

//Get a category by id
const getCategory = asyncHandler(async (req, res) => {
  res.json({message: 'Get a category'})
})

//Update a category
const updateCategory = asyncHandler(async (req, res) => {
  res.json({message: 'update a category'})
})

//Delete a category
const deleteCategory = asyncHandler(async (req, res) => {
  res.json({message: 'delete a category'})
})

module.exports = {
  getAllCategories,
  postCategory,
  getCategory,
  updateCategory,
  deleteCategory,
}
