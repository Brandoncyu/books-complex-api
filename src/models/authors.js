const db = require('../db/database')
const shortId = require('shortid')


function getAll(){
  const writersOnly = []
  const writerSort = db.map(element=>element.writers)
  for (var i = 0; i< writerSort.length; i++){
    if (writerSort[i].length > 1){
      writerSort[i].forEach(element => writersOnly.push(element))
    } else if (writerSort[i].length == 1){
      writersOnly.push(writerSort[i][0])
    }
  }
  return writersOnly
}

function getOne(id){
  let response
  let error = []
  const writersOnly = []
  const writerSort = db.map(element=>element.writers)
  for (var i = 0; i< writerSort.length; i++){
    if (writerSort[i].length > 1){
      writerSort[i].forEach(element => writersOnly.push(element))
    } else if (writerSort[i].length == 1){
      writersOnly.push(writerSort[i][0])
    }
  }
  let data = writersOnly.find(element =>
    element.id === id)
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
  let bookTITLE = 'None Yet'
  let description = ''
  let writers = input.writers
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
    let newArray =[]
    let splitAuthor = writers.split('#')
    nameFirst = splitAuthor[0]
    nameLast = splitAuthor[1]
    writers = {nameFirst, nameLast}
    writers.id = shortId()
    newArray.push(writers)
    writers = newArray
  }
  let newBook = { bookTITLE, description, writers }


  newBook.BookID = shortId()
  newBook.borrowed = false

  db.push(newBook)
  response = newBook.writers
  return response
}

function update(name, id){
  let response
  let error

  if (!name.includes('#')){
    error = 1
    response = {error}
    return response
  }

  if (name.includes(',')){
    error = 2
    response = {error}
    return response
  }

  let splitAuthor = name.split('#')
  nameFirst = splitAuthor[0]
  nameLast = splitAuthor[1]
  console.log(splitAuthor)

  for (let i = 0; i < db.length; i++){
    if (db[i].writers.length > 1){
      for (let j = 0; j < db[i].writers.length; j++){
        if(db[i].writers[j].id == id){
          db[i].writers[j].nameFirst = nameFirst
          db[i].writers[j].nameLast = nameLast
          response = db[i].writers[j]
          return response
        }
      }
    } else if(db[i].writers.length == 1) {
      if (db[i].writers[0].id == id){
        db[i].writers[0].nameFirst = nameFirst
        db[i].writers[0].nameLast = nameLast
        response = db[i].writers[0]
        return response
      }
    }
  }

  return response
}

function remove(id){
  for (var i = 0; i < db.length; i++){
    if (db[i].writers.length > 1){
      for(var j = 0; j < db[i].writers.length; j++) {
        if (db[i].writers[j].id == id){
          db[i].writers.splice(j, 1)
        }
      }
    } else {
      if (db[i].writers[0].id == id){
        db[i].writers.splice(0, 1)
      }
    }
  }
  return db[i]
}

module.exports = {getAll, getOne, create, update, remove}
