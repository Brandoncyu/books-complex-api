const express = require('express')
const contr = require('../controllers/books')
const router = express.Router()

router.get('/', contr.getAll)
router.get('/:id', contr.getOne)
router.post('/', contr.create)
router.put('/:id', contr.update)
router.patch('/:id/borrowed', contr.borrowed)
router.delete('/:id', contr.remove)

module.exports = router
