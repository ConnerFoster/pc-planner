const asyncHandler = require('express-async-handler')
const Part = require('../models/partModel')
const Category = require('../models/categoryModel')
const Manufacturer = require('../models/manufacturerModel')

//Gets list of parts
const getAllParts = asyncHandler(async (req, res) => {
  const parts = await Part.find().populate('category manufacturer')

  res.json(parts)
})

//Post a new part
const postPart = asyncHandler(async (req, res) => {
  if (
    !req.body.name ||
    !req.body.price ||
    !req.body.stock ||
    !req.body.category ||
    !req.body.manufacturer
  ) {
    res.status(400)
    throw new Error(
      'Parts must have name, price, stock, category, and manufacturer'
    )
  }

  const part = await Part.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    manufacturer: req.body.manufacturer,
  })

  res.json(part)
})

//Get a part by id
const getPart = asyncHandler(async (req, res) => {
  const part = await Part.findById(req.params.id).populate(
    'category manufacturer'
  )

  if (!part) {
    res.status(400)
    throw new Error('part not found')
  }

  res.json(part)
})

//Update a part
const updatePart = asyncHandler(async (req, res) => {
  const part = await Part.findById(req.params.id)

  if (!part) {
    res.status(400)
    throw new Error('part not found')
  }

  const update = await Part.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.json(update)
})

//Delete a part
const deletePart = asyncHandler(async (req, res) => {
  const part = await Part.findById(req.params.id)

  if (!part) {
    res.status(400)
    throw new Error('Part not found')
  }
  await part.remove()

  res.json({id: req.params.id, message: 'deletion successful'})
})

module.exports = {
  getAllParts,
  postPart,
  getPart,
  updatePart,
  deletePart,
}
