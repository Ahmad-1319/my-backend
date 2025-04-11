const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: {
        type: String,
        required: true,
    },
    checked:{
        type:Boolean,
        required:true,
    },
    important:{
        type:Boolean,
        required:false,
        
    }
});
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;