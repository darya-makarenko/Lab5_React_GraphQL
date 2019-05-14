const taskService = require("../services/taskService");

async function findTasks(username) {
  let tasks = await taskService.findTasks(username);
  return tasks;
}

async function createTask(todo) {
    let response = await taskService.createTask(todo);
    return response;
}

async function updateTask(id, new_todo) {
    let answer = await taskService.updateTask(id, new_todo);
    return answer;
}

async function getTask(id) {
    let task = await taskService.getTask(id);
    return task;
}

async function deleteTask(id) {
    let answer = await taskService.deleteTask(id);
    return answer;
}

module.exports = {
    findTasks, 
    createTask,
    updateTask,
    getTask,
    deleteTask
};