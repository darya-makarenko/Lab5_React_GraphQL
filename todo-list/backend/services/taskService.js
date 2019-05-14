const db = require("../helpers/dbHelper");
const Todo = db.Todo;

async function findTasks(username) {
  try {
    const todos = await Todo.find({ todo_owner: username });
    console.log(todos[0].todo_name);
    return todos;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function createTask(newTodo) {

    let todo = new Todo();
    todo.todo_name = newTodo.todo_name;
    todo.todo_summary = newTodo.todo_summary;
    todo.todo_filename = newTodo.todo_filename;
    todo.todo_completed = newTodo.todo_completed;
    todo.todo_priority = newTodo.todo_priority;
    todo.todo_owner = newTodo.todo_owner;
    
    let response = "";
    try {
        let result = await todo.save();
        response = "Todo added successfully!";
    }
    catch (err) {
        response = "Failed to save todo :(";
    }
    return response;
}

async function updateTask(id, new_todo) {
    let answer = { error: null, message: null };

    const todo = await Todo.findById(id, function(err, todo) {
        if (!todo){
            answer.error = "Todo is not found";
        } else {
            todo.todo_name = new_todo.todo_name;
            todo.todo_summary = new_todo.todo_summary;
            todo.todo_filename = new_todo.todo_filename;
            todo.todo_completed = new_todo.todo_completed;
            todo.todo_priority = new_todo.todo_priority;
            //todo.todo_owner = new_todo.todo_owner;
            
            todo.save().then(todo => {
                answer.message = "Todo updated!";
            })
            .catch(err => {
                answer.error = "Update is not possible";
            });
        }
    });

    return answer;
}

async function getTask(id) {
    try {
        const todo = await Todo.findById(id);
        return todo;   
    }   
    catch (err) {
        console.log(err);
        return "";
    }
};


async function deleteTask(id) {
    let answer = "";
    try{
        let response = await Todo.findByIdAndDelete(id, function(err, todo) {
            if (!todo)
                answer = "There's no task like that!";
            else    
                answer = 'Todo deleted!';
        });
    }
    catch (err){
        answer = err;
    }
    console.log(answer);
    return answer;
}

module.exports = {
    findTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
  };