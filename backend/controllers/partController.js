const asyncHandler = require('express-async-handler')
const Part = require('../models/partModel')
const Category = require('../models/categoryModel')
const manufacturer = require('../models/manufacturerModel')

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

  const manufacturer = await Manufacturer.create({
    title: req.body.title,
    description: req.body.description,
  })

  res.json(manufacturer)
})

//Get a manufacturer by id
const getManufacturer = asyncHandler(async (req, res) => {
  const manufacturer = await Manufacturer.findById(req.params.id)

  if (!manufacturer) {
    res.status(400)
    throw new Error('manufacturer not found')
  }

  res.json(manufacturer)
})

//Update a manufacturer
const updateManufacturer = asyncHandler(async (req, res) => {
  const manufacturer = await Manufacturer.findById(req.params.id)

  if (!manufacturer) {
    res.status(400)
    throw new Error('manufacturer not found')
  }

  const update = await Manufacturer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.json(update)
})

//Delete a manufacturer
const deleteManufacturer = asyncHandler(async (req, res) => {
  const manufacturer = await Manufacturer.findById(req.params.id)

  if (!manufacturer) {
    res.status(400)
    throw new Error('manufacturer not found')
  }

  await manufacturer.remove()

  res.json({id: req.params.id})
})

module.exports = {
  getAllManufacturers,
  postManufacturer,
  getManufacturer,
  updateManufacturer,
  deleteManufacturer,
}
