import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { checkAuthorised, authorisationResponse, cancelCheckAuth } from "../api";


export default function guard(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };

      authorisationResponse((answer) => {
        if(answer){
          this.setState({ loading: false });
        } 
        else {
          this.setState({ loading: false, redirect: true });
        }
      
      });

      checkAuthorised();
    }

    componentWillUnmount(){
      cancelCheckAuth();
    }

    componentDidMount() {
     
    }

    render() {          
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}