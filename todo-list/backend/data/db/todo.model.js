const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_name: {
        type: String
    },
    todo_summary: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_filename: {
        type: String
    },
    todo_completed: {
        type: Boolean
    },

    todo_owner: {
        type: String
    }
});

module.exports = mongoose.model('Todo', Todo);