import React, { Component } from 'react';

import { login, loginResponse, cancelLogin } from "../api";


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password: ''
    };

    loginResponse((answer) => {
        if (answer.error) {
            console.log(answer.error);
            alert('Error logging in please try again');
        }
        else {
            sessionStorage.setItem('username', this.state.username);
            this.props.history.push('/');
        }
    });
  }


  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    const userData = {username: this.state.username, password: this.state.password};
    console.log(userData);

    login(userData);
  }

  componentWillUnmount(){
      cancelLogin();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
            <h1>Please, sign in</h1>
            <div className="form-group">
                <input
                    className = "form-control"
                    type="username"
                    name="username"
                    placeholder="Enter username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    className = "form-control"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </div>
      </form>
    );
  }
}