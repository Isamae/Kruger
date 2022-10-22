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
        )
    }
}