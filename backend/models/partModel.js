const mongoose = require('mongoose')
//const Manufacturer = require('./manufacturerModel')

const Schema = mongoose.Schema

const PartSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true, min: 0, max: 99000},
  stock: {type: Number, required: true, min: 0, max: 50},
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: 'Manufacturer',
    required: true,
  },
  //Add Image later
})

//Add Virtual for URL

module.exports = mongoose.model('Part', PartSchema)
