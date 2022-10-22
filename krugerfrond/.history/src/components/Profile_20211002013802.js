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
                <p>
                    <strong>Token:</strong>{" "}
                    {currenUser.accessToken.substring(0,20)}...{" "}
                    {currenUser.accessToken.substr(currenUser.accessToken.length-20)}
                </p>
                <p>
                    <strong>Id:</strong>{" "}
                    {currenUser.id}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {currenUser.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                    {currenUser.roles &&
                    currenUser.roles.map((role,index) => <li key={index}>{role}</li>)}
                </ul>
            </div>
        )
    }
}