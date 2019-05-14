import React, { Component } from 'react';

import { register, registrationResponce, cancelRegistration, logout, logoutResponse, cancelLogout } from '../api';

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password: '',
      validLogout: true
    };

    registrationResponce((answer) => {
        if (answer.error) {
            console.log('error');
            console.log(answer.error);
        }
        else {
            console.log(answer.message);
            this.props.history.push('/login');
        }
    });


    logoutResponse((answer) => {
        if (answer.error){
            this.setState({ validLogout: false });
        }
        else {
            this.props.history.push('/login');
        }
    });

  }


  componentWillUnmount() {
      cancelRegistration();
      cancelLogout();
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
    this.setState({ validLogout: true });


    logout();

    if (this.state.validLogout){
        register(userData);
    }
  }
  
  render() {
    return (
      <form onSubmit={this.onSubmit}>
            <h1>Please, register</h1>
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