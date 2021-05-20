import React, { Component } from 'react';
import Home from './Home';
import Admin from './Admin';

class LoginSignUp extends React.Component {
    render() {
    return (
        <div>
            if (isAdmin === true){
                <Admin />
            } else {
                <Home />
                // toggle to "logout"
            }
            {/* modal with switch button based on isAdmin: true/false 
            <Admin /> 
            <User /> */}
        </div>
        )
    }
}
export default LoginSignUp;