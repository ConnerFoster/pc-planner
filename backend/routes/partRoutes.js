const express = require('express')
const router = express.Router()
const {
  getAllParts,
  postPart,
  getPart,
  updatePart,
  deletePart,
} = require('../controllers/partController')

router.get('/', getAllParts)

router.post('/', postPart)

router.get('/:id', getPart)

router.put('/:id', updatePart)

router.delete('/:id', deletePart)

module.exports = router
