import React, { Component } from 'react';

import { getTaskGQL, deleteTaskGQL } from "../api";

export default class DeleteTodo extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_name: '',
            todo_summary: '',
            todo_priority: '',
            todo_completed: false
        }

    }

    componentDidMount() {
        let id = this.props.match.params.id;
        getTaskGQL(id, (answer) => {
            if (!answer){
                console.log('Error: No such todo!');
            }
            else {
                this.setState({
                    todo_name: answer.todo_name,
                    todo_summary: answer.todo_summary,
                    todo_priority: answer.todo_priority,
                    todo_completed: answer.todo_completed,
                });
            }
        });   
    }


    onSubmit(e) {
        e.preventDefault();
        let token = sessionStorage.getItem("token");
    
        deleteTaskGQL(this.props.match.params.id, (answer) => {
            console.log("task deleted: " + answer)
        })
        
        this.props.history.push('/');
    }


    render() {
        return (
            <div> 
                <div>
                    <h3 align="center">Delete Todo</h3>
                    <p marginLeft="300px">Name: {this.state.todo_name}</p>
                    <p marginLeft="300px">Summary: {this.state.todo_summary}</p>
                    <p marginLeft="300px">Priority: {this.state.todo_priority}</p>
                    <p marginLeft="300px">Completed: {this.state.todo_completed.toString()}</p>
                </div>
                <form onSubmit={this.onSubmit}>
                <div className="form-group" align="center">
                    <input type="submit" value="Todo Deleted!" className="btn btn-primary" />
                </div>
                </form>
           </div>
        )
    }
}