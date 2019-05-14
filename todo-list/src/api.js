import openSocket from 'socket.io-client';
import SocketIOFileClient from 'socket.io-file-client';
const socket = openSocket('http://localhost:4000');


const { createApolloFetch } = require('apollo-fetch');

/////////////////////// File Uploader ////////////////////////////////////////////////////

var uploader = new SocketIOFileClient(socket);
 
uploader.on('start', function(fileInfo) {
    console.log('Start uploading', fileInfo);
});
uploader.on('stream', function(fileInfo) {
    console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
});
uploader.on('complete', function(fileInfo) {
    console.log('Upload Complete', fileInfo);
});
uploader.on('error', function(err) {
    console.log('Error!', err);
});
uploader.on('abort', function(fileInfo) {
    console.log('Aborted: ', fileInfo);
});

function uploadFile(file, input){
    console.log(file);
    let result = uploader.upload(input);
    console.log(result);
    return result;
}


///////////////////////END File Uploader ////////////////////////////////////////////////////

/////////////////////User work //////////////////////////////////////////////////////////////

function register(user){
    socket.emit('register', user);
}

function registrationResponce(cb){
    socket.on('registrationResponse', answer => cb(answer));
}

function cancelRegistration(){
    socket.off('registrationResponse');
}


function login(userdata) {
    socket.emit('login', userdata);
}

function loginResponse(cb){
    socket.on('loginResponse', (answer) => cb(answer));
}

function cancelLogin(){
    socket.off('loginResponse');
}

function logout(){
    socket.emit('logout');
}

function logoutResponse(cb){
    socket.on('logoutResponse', answer => cb(answer));
}

function cancelLogout(){
    socket.off('cancelLogout');
}

function checkAuthorised(){
    socket.emit('checkAuthorised');
}

function authorisationResponse(cb){
    socket.on('authorisationResponse', (answer) => {
        console.log(answer);
        cb(answer);
    });
}

function cancelCheckAuth(){
    //socket.off('authorisationResponse');
}
////////////////////END User work ////////////////////////////////////////////////////////////


/////////////////GQL PART////////////////////////////////////////////////////////////////////

function showAllTasksGQL(cb) {
    const fetch = createApolloFetch({
        uri: 'http://localhost:5000/graphql',
        fetchOptions: {
            mode: 'no-cors',
          },
      });
      
      console.log(sessionStorage.getItem("username"));
      const query = `
        query GetTasks($username: String!) {
            getTasks(username: $username){
                _id
                todo_name
                todo_summary
                todo_filename
                todo_priority
                todo_completed
            }
        }`;
      fetch({
        query: query,
        variables: { username: sessionStorage.getItem("username") },
      }).then(res => {
        console.log(res.data.getTasks);
        cb(null, res.data.getTasks)
      }).catch(err => console.log(err));
}


function getTaskGQL(_id, cb) {
    console.log(_id);
    const fetch = createApolloFetch({
        uri: 'http://localhost:5000/graphql',
        fetchOptions: {
            mode: 'no-cors',
          },
      });
      
      const query = `
        query GetTask($id: ID!) {
            getTask(id: $id){
                _id
                todo_name
                todo_summary
                todo_filename
                todo_priority
                todo_completed
            }
        }`;
      fetch({
        query: query,
        variables: { id: _id },
      }).then(res => {
        console.log(res.data.getTask);
        cb(res.data.getTask)
      }).catch(err => console.log(err));
}


function saveTaskGQL(formTask, cb){
    const fetch = createApolloFetch({
        uri: 'http://localhost:5000/graphql',
        fetchOptions: {
            mode: 'no-cors',
          },
      });
    const mutation = `
        mutation CreateTask($newTask: TaskInput!) {
            createTask(todo: $newTask)
        }`;
      fetch({
        query: mutation,
        variables: { newTask: formTask },
      }).then(res => {
        console.log(res.data.createTask);
        cb(res.data.createTask)
      }).catch(err => console.log(err));
}

function editTaskGQL(_id, formTask, cb){
    const fetch = createApolloFetch({
        uri: 'http://localhost:5000/graphql',
        fetchOptions: {
            mode: 'no-cors',
          },
      });
    const mutation = `
        mutation UpdateTask($id: ID!, $newTask: TaskInput!) {
            updateTask(id: $id, newTodo: $newTask)
        }`;
      fetch({
        query: mutation,
        variables: { id: _id, newTask: formTask },
      }).then(res => {
        console.log(res.data.updateTask);
        cb(res.data.updateTask)
      }).catch(err => console.log(err));
}

function deleteTaskGQL(_id, cb){
    const fetch = createApolloFetch({
        uri: 'http://localhost:5000/graphql',
        fetchOptions: {
            mode: 'no-cors',
          },
      });
    const mutation = `
        mutation DeleteTask($id: ID!) {
            deleteTask(id: $id)
        }`;
      fetch({
        query: mutation,
        variables: { id: _id },
      }).then(res => {
        console.log(res.data.deleteTask);
        cb(res.data.deleteTask)
      }).catch(err => console.log(err));
}



//////////////////////////END GQL PART //////////////////////////////////////////////////////////////////

export { 
    register,
    registrationResponce,
    cancelRegistration,
    uploadFile,
    login,
    loginResponse,
    cancelLogin,
    logout,
    logoutResponse,
    cancelLogout,
    checkAuthorised,
    authorisationResponse,
    cancelCheckAuth,
    showAllTasksGQL,
    saveTaskGQL,
    editTaskGQL,
    getTaskGQL,
    deleteTaskGQL
};

