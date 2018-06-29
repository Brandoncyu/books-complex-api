const db = require('../db/database')
const shortId = require('shortid')

function getAll() {
  return db
}

function getOne(id){
  let response
  let error = []
  let data = db.find(element => element.BookID == id)
  if (!data){
    error.push('There was an error')
    response = {error}
  } else {
    response = data
  }
  return response
}

function create(input){
  let response
  let error
  let bookTITLE = input.title
  let nameFirst = input.firstname
  let nameLast = input.lastname
  let description = input.description
  if (!bookTITLE || !description || !nameFirst || !nameLast){
    error = 'error'
    response = {error}
    return response
  }
  let newArray =[]
  writers = {nameFirst, nameLast}
  writers.id = shortId()
  newArray.push(writers)
  writers = newArray

  let newBook = { bookTITLE, description, writers }

  newBook.BookID = shortId()
  newBook.borrowed = false

  db.push(newBook)
  response = newBook
  return response
}

function update(input, id){
  let data = db.find(element => element.BookID === id)
  let index = db.indexOf(data)

  let response
  let error
  let bookTITLE = input.title
  let nameFirst = input.firstname
  let nameLast = input.lastname
  let description = input.description
  if (!bookTITLE || !description || !nameFirst || !nameLast){
    error = 'error'
    response = {error}
    return response
  }

  let newArray =[]
  writers = {nameFirst, nameLast}
  writers.id = shortId()
  newArray.push(writers)
  writers = newArray

  db[index].bookTITLE = bookTITLE
  db[index].description = description
  db[index].writers = writers


  let returnValue = db[index]
  return returnValue
}

function borrowed(id){
  let data = db.find(element => element.BookID === id)
  let index = db.indexOf(data)
  if (data.borrowed == true) {
    db[index].borrowed = false
    return data
  } else if (data.borrowed == false){
    db[index].borrowed = true
    return data
  }
}

function remove(id){
  let data = db.find(element => element.BookID === id)
  let index = db.indexOf(data)
  db.splice(index, 1)
  return data
}

module.exports = {getAll, getOne, create, update, borrowed, remove}
