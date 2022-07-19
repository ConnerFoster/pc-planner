const asyncHandler = require('express-async-handler')
const Manufacturer = require('../models/manufacturerModel')

//Gets list of manufacturers
const getAllManufacturers = asyncHandler(async (req, res) => {
  const manufacturers = await Manufacturer.find()

  res.json(manufacturers)
})

//Post a new manufacturer
const postManufacturer = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400)
    throw new Error('Please add a title')
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
