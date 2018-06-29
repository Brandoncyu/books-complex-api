const db = require('../db/database')
const shortId = require('shortid')


function getAll(id){
  let book = db.find(element=>element.BookID == id)
  data = book.writers
  return data
}

function getOne(id, wid){
  let response
  let error

  let book = db.find(element=>element.BookID == id).writers

  data = book.find(element=>element.id == wid)
  if(!data){
    error = 1
    response = {error}
    return response
  }
  return data
}

function create(input, id){
  let response
  let error

  let book = db.find(element=>element.BookID == id).writers

  let nameFirst = input.firstname
  let nameLast = input.lastname

  if(!nameFirst || !nameLast){
    error = 1
    response = {error}
    return response
  }

  let newAuthor = { nameFirst, nameLast }

  newAuthor.id = shortId()

  book.push(newAuthor)
  response = newAuthor
  return response
}

function update(input, id, wid){
  let response
  let error

  let nameFirst = input.firstname
  let nameLast = input.lastname

  if(!nameFirst || !nameLast){
    error = 1
    response = {error}
    return response
  }

  let book = db.find(element=>element.BookID == id).writers

  data = book.find(element=>element.id == wid)
  index = book.indexOf(data)

  book[index].nameFirst = nameFirst
  book[index].nameLast = nameLast

  return book[index]
}

function remove(id, wid){
  let response
  let error

  let book = db.find(element=>element.BookID == id).writers

  data = book.find(element=>element.id == wid)
  index = book.indexOf(data)
  book.splice(index, 1)

  return data
}

module.exports = {getAll, getOne, create, update, remove}
