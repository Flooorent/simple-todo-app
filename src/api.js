const MongoClient = require('mongodb').MongoClient
const { collection: mongoCollection, url: dbUrl, name: dbName } = require('../config/mongo')

const client = new MongoClient(dbUrl)


function insertTodo(collection, doc, cb) {
    collection.insertOne(doc, cb(err, result))
}


function getAllTodos(req, res, next) {
    /*
    MongoClient.connect(function(err) {
        if (err) {
            return next(err)
        }

        console.log('connected to the mongo server')
        const db = client.db(dbName)

    })
    */

    // TODO: send back all todos 
    res.json({ message: 'got back all todos' })
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
                // TODO: send back all todos
                //getAllTodos(req, res, next)
                res.json({message: `created todo: ${JSON.stringify(doc)}`})
            }
        })
    })
    
    // TODO: create todo and send back associated data
    //res.json({ message: 'created todo'})
}


function deleteTodo(req, res, next) {
    // TODO: delete todo
    res.json({ message: `todo deleted: ${req.params.todo_id}`})
}

module.exports = {
    createTodo,
    deleteTodo,
    getAllTodos
}
