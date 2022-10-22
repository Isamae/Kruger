import React, {Component} from "react";
import Form from 'react-validation/build/form';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isMail} from "validator";

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

const vemail = value => {
    if(!isMail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                This is not a valid email
            </div>
        );
    }
};

const vCI = value => {
    if(value.length != 10){
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

export default class Register extends Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onchangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCI = this.onChangeCI.bind(this);

        this.state ={
            name : "",
            email : "",
            CI : "",
            password : "",
        }
    }
}