const express = require('express')
const contr = require('../controllers/writers')
const router = express.Router({mergeParams: true})

router.get('/', contr.getAll)
router.get('/:wid', contr.getOne)
router.post('/', contr.create)
router.put('/:wid', contr.update)
router.delete('/:wid', contr.remove)

module.exports = router
