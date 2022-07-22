const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const Part = require('../models/partModel')

//Gets list of categories
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find()

  res.json(categories)
})

//Post a new category
const postCategory = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400)
    throw new Error('Please add a title')
  }

  const category = await Category.create({
    title: req.body.title,
    description: req.body.description,
  })

  res.json(category)
})

//Get a category by id
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(400)
    throw new Error('Category not found')
  }

  res.json(category)
})

//Update a category
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(400)
    throw new Error('Category not found')
  }

  const update = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.json(update)
})

//Delete a category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(400)
    throw new Error('Category not found')
  }

  const parts = await Part.find({category: category._id})

  if (parts.length > 0) {
    res.json({
      parts_need_removed: parts,
      message: 'some parts need removed before category can be removed',
    })
  } else {
    await category.remove()

    res.json({id: req.params.id, message: 'deletion successful'})
  }
})

module.exports = {
  getAllCategories,
  postCategory,
  getCategory,
  updateCategory,
  deleteCategory,
}
