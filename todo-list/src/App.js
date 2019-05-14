import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import DeleteTodo from "./components/delete-todo.component";
import Login from "./components/login.component";
import Logout from "./components/logout.component";
import Register from "./components/register.component";

import guard from './components/guard.component';

import logo from "./pictures/logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/" target="_blank">
              <img src={logo} width="30" height="30" alt="ToDoApp" />
            </a>
            <Link to="/" className="navbar-brand">Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/logout" className="nav-link">Logout</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={ guard(TodosList) } />
          <Route path="/edit/:id" component={ guard(EditTodo) } />
          <Route path="/create" component={ guard(CreateTodo) } />
          <Route path="/delete/:id" component={ guard(DeleteTodo) } />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={ Logout } />
          <Route path="/register" component={Register} />
        </div>
      </Router>

    );
  }
}

export default App;
