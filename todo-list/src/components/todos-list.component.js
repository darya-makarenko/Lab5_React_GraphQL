import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { showAllTasksGQL } from '../api';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_name}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_summary}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
        <td>
            <Link to={"/delete/" + props.todo._id}>Delete</Link>
        </td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_filename}</td>
    </tr>
)

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.onChangeShowActuals = this.onChangeShowActuals.bind(this);
        this.state = {todos: [], showingTodos: []};

        showAllTasksGQL((err, tasks) => {
            if (err){
                console.log(err);
            } else {
                console.log("showing tasks");
                this.setState({ todos: tasks, showingTodos: tasks });
            }  
        });
    }


    todoList() {
        return this.state.showingTodos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    onChangeShowActuals(e) {
        if (e.target.checked === true){
            this.setState({ showingTodos : this.state.todos.filter(todo => todo.todo_completed === false) });
        }
        else {
            this.setState({ showingTodos : this.state.todos });
        }
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <div>
                    <input type="checkbox" id="checkActualTasks" name="checkActualTasks" onChange={this.onChangeShowActuals}></input>
                    <label for="checkActualTasks">Show actual only</label>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Summary</th>
                            <th>Priority</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}