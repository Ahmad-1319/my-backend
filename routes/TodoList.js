const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const {check, validationResult} = require('express-validator');
const { addTodo, getTodo, deleteTodo, updateTodo, updateCheckedStatus, updateImportantStatus } = require('../Controller/web/todoController');
const authenticateToken = require('../middleware/fetchUser');



router.post('/add-todo',authenticateToken,addTodo) // login required
router.get('/get-todo',authenticateToken,getTodo) // login required
router.delete('/delete-todo/:id',authenticateToken,deleteTodo) // login required
router.put('/update-todo/:id',authenticateToken,updateTodo) // login required
router.put('/update-checked-status/:id',authenticateToken,updateCheckedStatus) // login required
router.put('/update-important-status/:id',authenticateToken,updateImportantStatus) // login required

module.exports = router