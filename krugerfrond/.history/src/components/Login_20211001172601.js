import React,{Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/button";

import authService from "../services/auth-service";

const requiered = value => {
    if(!value){
        return(
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}
export default class Login extends Component{
    constructor(props){
        super(props);
    }
}