import React, { Component } from 'react';
export default class Login extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            acc_email:'',
            acc_password:''
        };
    }
    handleInputChange=(event)=>{
        const{value,name}=event.target;
        this.setState({
            [name]:value
        });
    }
    onSubmit=(event)=>{
        event.preventDefault();
        fetch('http://127.0.0.1:3000/signin',{
            method:'POST',
            body:JSON.stringify(this.state)
        })
    }
}