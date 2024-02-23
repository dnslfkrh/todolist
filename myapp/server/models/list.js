const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    id: String,
    writer: String,
    body: String,
    done: { type: Boolean, default: false }
});

const List = mongoose.model('List', todoSchema, 'ToDoList');

module.exports = List;