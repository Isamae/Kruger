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
        return(
            <div className="container">
                <header className="jumbotrom">
                    <h3>
                        <strong>{currenUser.username}</strong> Profile
                    </h3>
                </header>
            </div>
        )
    }
}