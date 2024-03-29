import React,{Component} from "react";
import userService from "../services/user.service";

export default class BoardUser extends Component{
    constructor(props){
        super(props);

        this.state={
            content:""
        };
    }

    componentDidMount(){
        userService.getPublicContent.then(
            response => {
                this.setState({
                    content : response.data
                });
            }
        ),
        error => {
            this.setState({
                content:(
                    error.response &&
                    error.response.data  &&
                    error.response.data.message 
                ) || error.message || error.toSring()
            });
        }
    }

    render(){
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}