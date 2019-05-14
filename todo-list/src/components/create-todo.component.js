import React, { Component } from 'react';

import { uploadFile, saveTaskGQL } from '../api';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.uploaderRef = React.createRef();

        this.state = {
            todo_name: '',
            todo_summary: '',
            todo_priority: '',
            todo_filename: '',
            todo_completed: false,
            file: null
        }

        this.onChangeTodoName = this.onChangeTodoName.bind(this);
        this.onChangeTodoSummary = this.onChangeTodoSummary.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeFilename = this.onChangeFilename.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChangeTodoName(desc) {
        this.setState({
            todo_name: desc.target.value
        });
    }

    onChangeTodoSummary(sum) {
        this.setState({
            todo_summary: sum.target.value
        });
    }

    onChangeTodoPriority(prior) {
        this.setState({
            todo_priority: prior.target.value
        });
    }

    onChangeFilename(filename) {
        this.setState({
            file: filename.target.files[0],
            todo_filename: filename.target.files[0].name
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Todo Name: ${this.state.todo_name}`);
        console.log(`Todo Summary: ${this.state.todo_summary}`);
        console.log(`Todo Filename: ${this.state.todo_filename}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Owner: ${sessionStorage.getItem('username')}`);

        const newTodo = {
            todo_name: this.state.todo_name,
            todo_summary: this.state.todo_summary,
            todo_filename: this.state.todo_filename,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed,
            todo_owner: sessionStorage.getItem('username')
        };


        let token = sessionStorage.getItem("token");
        

        saveTaskGQL(newTodo, (answer) => console.log("todo saved: " + answer));
        let file = this.state.file;
        if (file != null){
            uploadFile(file, this.uploaderRef.current);
        }

       
        
        this.setState({
            todo_name: '',
            todo_summary: '',
            todo_filename: '',
            todo_priority: '',
            todo_completed: false,
            file: null
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_name}
                                onChange={this.onChangeTodoName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Summary: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_summary}
                                onChange={this.onChangeTodoSummary}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group"> 
                        <input  type="file"
                                className="form-control"
                                onChange={this.onChangeFilename}
                                name="uploadedfile"
                                accept=".jpg, .jpeg, .png"
                                ref={ this.uploaderRef }
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}