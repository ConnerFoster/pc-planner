const express = require('express')
const router = express.Router()
const {
  getAllManufacturers,
  postManufacturer,
  getManufacturer,
  updateManufacturer,
  deleteManufacturer,
} = require('../controllers/manufacturerConroller')

router.get('/', getAllManufacturers)

router.post('/', postManufacturer)

router.get('/:id', getManufacturer)

router.put('/:id', updateManufacturer)

router.delete('/:id', deleteManufacturer)

module.exports = router
