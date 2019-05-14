const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const taskControllers = require("./controllers/taskControllers");
const userControllers = require("./controllers/userControllers");
const path = require("path");
const jwtHelper = require("./helpers/jwtHelper");
const cookieParser = require("cookie-parser");
let config = require('./config');

app.use(cors());


const io = require('socket.io')();
const SocketIOFile = require('socket.io-file');

const PORT = 4000;

/////////////// GraphQL part /////////////////////////////////////////////////////////////////

const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

////GraphQL schema. Types, Queries, Mutations
const schema = buildASTSchema(gql`
  type Task {
    _id: ID
    todo_name: String
    todo_summary: String
    todo_priority: String
    todo_filename: String
    todo_completed: Boolean
    todo_owner: String
  }

  input TaskInput {
    todo_name: String
    todo_summary: String
    todo_priority: String
    todo_filename: String
    todo_completed: Boolean
    todo_owner: String
  }

  type Query {
    getTasks(username: String!): [Task],
    getTask(id: ID!): Task,
  }


  type Mutation {
    createTask(todo: TaskInput!): Boolean
    updateTask(id: ID!, newTodo: TaskInput!): Boolean
    deleteTask(id: ID!): Boolean
  }
`);

/// GraphQL resolvers////////////////////////////////////////////////////////////
const root = {
    
        getTasks: ({ username }) => {
            let tasks = taskControllers.findTasks(username).then((all_tasks) => {
                return all_tasks;
            });
            return tasks;
        },
        getTask: ({ id }) => { 
            let wanted_task = taskControllers.getTask(id).then((task) => { return task; });
            console.log(wanted_task);
            return wanted_task;
        },
    

        createTask: ({ todo }) => {
            let answer = taskControllers.createTask(todo).then((_answer) => {  
                return _answer; 
            });
            return true;
        },

        updateTask: ({ id, newTodo }) => {
            let answer = taskControllers.updateTask(id, newTodo).then((_answer) => {
                return _answer;
            });
            return true;
        },

        deleteTask: ({ id }) => {
            let answer = taskControllers.deleteTask(id).then((_answer) => {
                return _answer;
            });
            return true;
        }
    
  };


////////GraphQL server ///////////////////
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));


/////////// END GraphQL part ///////////////////////////////////////////////////////////////////


io.on('connection', (client) => {

    if (!client.loggedIn){
        client.loggedIn = false;
    }

    if (!client.username){
        client.username = "";
    }

    var uploader = new SocketIOFile(client, {
        uploadDir: './pictures',									
        maxFileSize: 4194304, 						
        chunkSize: 10240,							
        transmissionDelay: 0,						
        overwrite: true 							
    });
    uploader.on('start', (fileInfo) => {
        console.log('Start uploading');
        console.log(fileInfo);
    });
    uploader.on('stream', (fileInfo) => {
        console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
    });
    uploader.on('complete', (fileInfo) => {
        console.log('Upload Complete.');
        console.log(fileInfo);
    });
    uploader.on('error', (err) => {
        console.log('Error!', err);
    });
    uploader.on('abort', (fileInfo) => {
        console.log('Aborted: ', fileInfo);
    });


    client.on('login', (userData) => {
        client.loggedIn = true;                
        userControllers.authenticate(userData).then((answer) => {
            if (answer.message){
                client.username = userData.username;
                console.log(client.username);
            }
            client.emit('loginResponse', answer);
        });

        
        console.log("login");
        console.log(client.loggedIn);
    });

    client.on('register', (user) => { 
        userControllers.create(user).then((answer) => {
            client.emit('registrationResponse', answer);
        });

        console.log("register");
    });

    client.on('logout', () => {
        console.log("logout");
        let answer = { error: null, message: "logged out" };
        client.loggedIn = false;
        client.emit("logoutResponse", answer);
        console.log(client.loggedIn);
    });

    client.on('checkAuthorised', () => {
        console.log("checking");
        console.log(client.loggedIn);
        client.emit('authorisationResponse', client.loggedIn);
    });

});


io.listen(PORT);
app.listen(5000);
console.log('listening on port ', PORT);