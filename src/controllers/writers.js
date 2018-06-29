const models = require('../models/writers')
const books = require('../models/books')

function getAll(req, res, next){
  let id = req.params.id
  console.log(id)
  let getOne = books.getOne(id)
  if (getOne.error) return next({status: 404, message: 'Book Id Not Found, Fool'})

  let data = models.getAll(id)
  res.send({data})
}

function getOne(req,res, next){
  let id = req.params.id
  let getOne = books.getOne(id)
  if (getOne.error) return next({status: 404, message: 'Book Id Not Found, Fool'})

  let wid = req.params.wid
  let data = models.getOne(id, wid)
  if(data.error) return next({status: 404, message: 'Author Id Not Found, Fool'})

  res.send({data})
}

function create(req, res, next){
  let id = req.params.id
  let getOne = books.getOne(id)
  if (getOne.error) return next({status: 404, message: 'Book Id Not Found, Fool'})


  let data = models.create(req.body, id)

  if(data.error) return next({status: 404, message: `you need a firstname and a lastname`})


  res.status(201).send({data})
}

function update(req, res, next){
  let id = req.params.id
  let getOne = books.getOne(id)
  if (getOne.error) return next({status: 404, message: 'Book Id Not Found, Fool'})

  let wid = req.params.wid
  let writersGetOne = models.getOne(id, wid)
  if(writersGetOne.error) return next({status: 404, message: 'Author Id Not Found, Fool'})

  let data = models.update(req.body, id, wid)

  if(data.error) return next({status: 404, message: `you need a firstname and a lastname`})

  res.send({data})
}

function remove(req, res, next){
  let id = req.params.id
  let getOne = books.getOne(id)
  if (getOne.error) return next({status: 404, message: 'Book Id Not Found, Fool'})

  let wid = req.params.wid
  let writersGetOne = models.getOne(id, wid)
  if(writersGetOne.error) return next({status: 404, message: 'Author Id Not Found, Fool'})

  data = models.remove(id, wid)
  res.status(204).send()
}

module.exports = {getAll, getOne, create, update, remove}
