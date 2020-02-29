import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();
        this.state =  {
            name : "",
            username : "",
            password : "",
            isRegistered: Boolean
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const user = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
        }
        console.log(user);

        axios.post('http://localhost:5000/register', null, {params: user})
        .then(res => {
            if(res.status == 200)
            {
                console.log("Account created");
                this.setState({isRegistered: true})
            }
        })
    }

    render() {
        const {name, username, password, isRegistered} = this.state;
        if(isRegistered == true)
            return <Redirect to={{pathname: "/login"}}></Redirect>
        else {
        return (
            <div className="register">
                <h4>Let's get started!</h4>
                <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="name" type="text" className="validate" key="name" name="name" value={name} onChange={this.handleChange}>
                                </input>
                                <label htmlFor="name">Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate" key="username" name="username" value={username} onChange={this.handleChange}>
                                </input>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate" key="password" name="password" value={password} onChange={this.handleChange}>
                                </input>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <button className="btn waves-effect waves-light" type="submit" name="action">Register
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
        }
    }
}

export default Register;