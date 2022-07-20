const asyncHandler = require('express-async-handler')
const Part = require('../models/partModel')
const Category = require('../models/categoryModel')
const Manufacturer = require('../models/manufacturerModel')

//Gets list of parts
const getAllParts = asyncHandler(async (req, res) => {
  const parts = await Part.find()

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

  const category = Category.findOne({title: req.body.category})
  const manufacturer = Manufacturer.findOne({title: req.body.manufacturer})

  const part = await Part.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: category._id,
    manufacturer: manufacturer._id,
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

//Update a manufacturer
const updatePart = asyncHandler(async (req, res) => {
  res.json({message: 'update a part'})
  /*const manufacturer = await Manufacturer.findById(req.params.id)

  if (!manufacturer) {
    res.status(400)
    throw new Error('manufacturer not found')
  }

  const update = await Manufacturer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.json(update)*/
})

//Delete a manufacturer
const deletePart = asyncHandler(async (req, res) => {
  res.json({message: 'delete a part'})
  /*  const manufacturer = await Manufacturer.findById(req.params.id)

  if (!manufacturer) {
    res.status(400)
    throw new Error('manufacturer not found')
  }

  await manufacturer.remove()

  res.json({id: req.params.id})*/
})

module.exports = {
  getAllParts,
  postPart,
  getPart,
  updatePart,
  deletePart,
}
