const mongoose = require("mongoose");
const Todo = require("../data/db/todo.model");
const User = require("../data/db/user.model");


mongoose.Promise = global.Promise;

mongoose.connect(
    'mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true }
);


mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

gracefulShutdown = (msg, callback) => {
  console.log("Mongoose disconnected through " + msg);
  callback();
};

process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", () => {
  gracefulShutdown("app termination", function() {
    process.exit(0);
  });
});

module.exports = {
  Todo: Todo,
  User: User
};