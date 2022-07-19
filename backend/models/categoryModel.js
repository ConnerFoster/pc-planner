const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
})

//Add Virtual for URL
CategorySchema.virtual('url').get(() => {
  return '/categories/' + this._id
})

module.exports = mongoose.model('Category', CategorySchema)
