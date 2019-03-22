const MongoClient = require('mongodb').MongoClient
const { collection: mongoCollection, url: dbUrl, name: dbName } = require('../config/mongo')

const client = new MongoClient(dbUrl)


function getAllTodos(req, res, next) {
    client.connect(function(err) {
        if (err) {
            return next(err)
        }

        console.log('Connected to the mongo server')
        const db = client.db(dbName)
        const collection = db.collection(mongoCollection)

        collection.find({}).toArray(function(err, docs) {
            if (err) {
                return next(err)
            }

            res.json({ docs })
        })
    })
}

function createTodo(req, res, next) {
    client.connect(function(err) {
        if (err) {
            return next(err)
        }

        console.log('Connected to the mongo server')
        const db = client.db(dbName)
        const collection = db.collection(mongoCollection)
        const doc = { text: req.body.text }

        collection.insertOne(doc, function(err, result) {
            if (err) {
                const message = `Couldn't insert doc '${doc}' in collection ${collection}: ${err}`
                console.log(message)
                res.json({ message })
            } else {
                return getAllTodos(req, res, next)
            }
        })
    })
}


// TODO: fix, ça marche pas
function deleteTodo(req, res, next) {
    client.connect(function(err) {
        if (err) {
            return next(err)
        }

        console.log('Connected to the mongo server')
        const db = client.db(dbName)
        const collection = db.collection(mongoCollection)

        const todoId = req.params.todo_id

        collection.deleteOne({ _id: todoId }, function(err, result) {
            if (err) {
                return next(err)
            } else {
                console.log(`Removed todo ${todoId}`)
                return getAllTodos(req, res, next)
            }
        })
    })
}

module.exports = {
    createTodo,
    deleteTodo,
    getAllTodos
}
