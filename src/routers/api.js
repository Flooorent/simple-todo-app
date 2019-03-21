const express = require('express')
const { createTodo, deleteTodo, getAllTodos } = require('../api')

const router = express.Router()

router.get('/todos', getAllTodos)
router.post('/todos', createTodo)
router.delete('/todos/:todo_id', deleteTodo)

module.exports = router
