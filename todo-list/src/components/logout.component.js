import React, { Component } from 'react';

import { logout, cancelLogout, logoutResponse } from "../api";

export default class Logout extends Component {
  constructor(props) {
    super(props);

    logoutResponse((answer) => {
      if (answer.error){
        alert('Error logging out please try again');
      }
      else{
        this.props.history.push('/login');
      }
    });
  }

  componentWillUnmount(){
    cancelLogout();
  }

  onSubmit = (event) => {
    event.preventDefault();
    logout();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
            <h1>Are you sure you want to log out? </h1>
            <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </div>
      </form>
    );
  }
}