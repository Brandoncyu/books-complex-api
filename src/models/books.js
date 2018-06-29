const db = require('../db/database')
const shortId = require('shortid')

function getAll() {
  return db
}

function getOne(id){
  let response
  let error = []
  let data = db.find(element => element.BookID === id)
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
  let writers = input.writers
  let description = input.description
  if (!writers || !description || !bookTITLE){
    error = 2
    response = {error}
    return response
  }
  if (writers.includes(',')){
    writersArray = writers.split(',')
    let newArray = []
    for (let i = 0; i < writersArray.length; i++){
      if (!writersArray[i].includes('#')){
        error = 1
        response = {error}
        return response
      } else{
        let splitAuthor = writersArray[i].split('#')
        nameFirst = splitAuthor[0]
        nameLast = splitAuthor[1]
        author = {nameFirst, nameLast}
        author.id = shortId()
        newArray.push(author)
      }
    }
    writers = newArray
  } else {
    if (!writers.includes('#')){
      error = 1
      response = {error}
      return response
    }
    let splitAuthor = writers.split('#')
    nameFirst = splitAuthor[0]
    nameLast = splitAuthor[1]
    writers = {nameFirst, nameLast}
    writers.id = shortId()
  }
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
  console.log(data)

  let response
  let error
  let bookTITLE = input.title
  let writers = input.writers
  let description = input.description
  if (!writers || !description || !bookTITLE){
    error = 2
    response = {error}
    return response
  }
  if (writers.includes(',')){
    writersArray = writers.split(',')
    let newArray = []
    for (let i = 0; i < writersArray.length; i++){
      if (!writersArray[i].includes('#')){
        error = 1
        response = {error}
        return response
      } else{
        let splitAuthor = writersArray[i].split('#')
        nameFirst = splitAuthor[0]
        nameLast = splitAuthor[1]
        author = {nameFirst, nameLast}
        author.id = shortId()
        newArray.push(author)
      }
    }
    writers = newArray
  } else {
    if (!writers.includes('#')){
      error = 1
      response = {error}
      return response
    }
    let splitAuthor = writers.split('#')
    nameFirst = splitAuthor[0]
    nameLast = splitAuthor[1]
    writers = {nameFirst, nameLast}
    writers.id = shortId()
  }

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
