import React,{Component} from "react";
import authService from "../services/auth-service";

export default class Profile extends Component{
    constructor(props){
        super(props);

        this.state = {
            currenUser:authService.getCurrentUsers()
        };
    }
    render(){
        const {currenUser} = this.state;
    }
}