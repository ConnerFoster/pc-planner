const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ManufacturerSchema = new Schema({
  title: {type: String, required: true, unique: true},
  description: {type: String, required: true},
})

//Add Virtual for URL
ManufacturerSchema.virtual('url').get(() => {
  return '/manufacturers/' + this._id
})

module.exports = mongoose.model('Manufacturer', ManufacturerSchema)
