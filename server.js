const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const routers = require('./src/routers')
const { handleError } = require('./src/error')

const SERVER_PORT = 3000

const app = express()

app.use(express.static(path.join(__dirname, 'public'))) // set the static files location /public/img will be /img for users
app.use(logger('dev')) // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) // parse application/vnd.api+json as json
app.use(methodOverride())

app.use('/api', routers.api)

app.use(handleError)

app.listen(SERVER_PORT, () => {
    console.log(`App listening on port ${SERVER_PORT}`)
})
