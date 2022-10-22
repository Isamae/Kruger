import React, {Component} from "react";
import Form from 'react-validation/build/form';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail} from "validator";

import authService from "../services/auth-service";

const required = value => {
    if(!value){
        return(
            <div className="alert alert-danger" role="alert">
                This field is requiered
            </div>
        );
    }
};

const email = value => {
    if(!isEmail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                This is not a valid email
            </div>
        );
    }
};

const vCI = value => {
    if(value.length !== 10){
        return(
            <div className="alert alert-danger" role="alert">
                The CI must be 10 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if(value.length < 6 || value.length>40){
        return(
            <div className="alert alert-danger" role="alert">
                The password must be berwwen 6 and 40 characters.
            </div>
        );
    }
};

const vname = value => {
    if(value.length < 3 || value.length>20){
        return(
            <div className="alert alert-danger" role="alert">
                The password must be berwwen 3 and 20 characters.
            </div>
        );
    }
};

const vlastname = value => {
    if(value.length < 3 || value.length>20){
        return(
            <div className="alert alert-danger" role="alert">
                The password must be berwwen 3 and 20 characters.
            </div>
        );
    }
};

export default class Register extends Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onchangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCI = this.onChangeCI.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);

        this.state ={
            lastname: "",
            name : "",
            email : "",
            CI : "",
            password : "",
            successful: false,
            message: ""
        }
    }

    onChangeName(e){
        this.setState({
            name : e.target.value
        })
    }

    onChangeLastname(e){
        this.setState({
            lastname : e.target.value
        })
    }

    onChangeCI(e){
        this.setState({
            CI : e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password : e.target.value
        })
    }

    onChangeEmail(e){
        console.log(e.target.e)
       
    }

    handleRegister(e){
        e.preventDefault();
        
        this.setState({
            message:"",
            successful:false
        })

        this.form.validateAll();
        if(this.checkBtn.context._errors.length === 0){
            authService.register(
                this.email,
                this.password,
                this.CI,
                this.name,
                this.lastname
            ).then(
                response => {
                    this.setState({
                        message : response.data.message,
                        successful: true
                    })
                }, 
                error => {
                    const resMessage =(
                        error.response &&
                        error.response.data  &&
                        error.response.data.message 
                    ) || error.message || error.toSring();
                    
                    this.setState({
                        successful:false,
                        message:resMessage
                    })
                }
            )
        }
    }

    render(){
        return(
            <div className="col-md-12">
                <div className="card card-container">
                    <Form onSubmit = {this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful &&(
                         <div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                validations={[required,vname]}>
                                </Input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Last Name</label>
                                <Input
                                type="text"
                                className="form-control"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.onChangeLastname}
                                validations={[required,vlastname]}>
                                </Input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ci">CI</label>
                                <Input
                                type="text"
                                className="form-control"
                                name="ci"
                                value={this.state.CI}
                                onChange={this.onChangeCI}
                                validations={[required,vCI]}>
                                </Input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                type="text"
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[required,email]}>
                                </Input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required,vpassword]}>
                                </Input>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                         </div>
                        )}
                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                        ?"alert alert-success"
                                        :"alert alert-danger"
                                    }
                                    role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{display:"none"}}
                            ref = {
                                c => {
                                    this.checkBtn =c;
                                }
                            }
                        />
                    </Form>
                </div>
            </div>
        )
    }
}