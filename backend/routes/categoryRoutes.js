const express = require('express')
const router = express.Router()
const {
  getAllCategories,
  postCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController')

router.get('/', getAllCategories)

router.post('/', postCategory)

router.get('/:id', getCategory)

router.put('/:id', updateCategory)

router.delete('/:id', deleteCategory)

module.exports = router
