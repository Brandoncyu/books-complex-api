const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const uuid = require('uuid/v4')

const port = process.env.PORT || 5000

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())

const bookRoutes = require('./src/routes/books')
app.use('/books', bookRoutes)

const authorRoutes = require('./src/routes/authors')
app.use('/author', authorRoutes)

app.use((req, res, next)=>{
  const status = 404
  const message = `Could not ${req.method} ${req.url}`

  next({status, message})
})

app.use((err, req, res, next)=>{
  console.log(err)
  const errorMessage = {}

  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Something went wrong'

  if(process.env.NODE_ENV !== 'production'){
    errorMessage.stack = err.stack
  }

  res.status(errorMessage.status).send(errorMessage)
})

const listener = () => console.log(`Listening on port ${port}`)
app.listen(port, listener)

module.exports = app
