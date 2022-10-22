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

const email = value => {
    if(!isMail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                This is not a valid email
            </div>
        );
    }
};

const CI = value => {
    if(value.length != 10){
        return(
            <div className="alert alert-danger" role="alert">
                The CI must be 10 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if(value.length < 6 value.length>40){
        return(
            <div className="alert alert-danger" role="alert">
                The CI must be 10 characters.
            </div>
        );
    }
};