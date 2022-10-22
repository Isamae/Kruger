import React,{Component} from "react";
import UserService from "../services/user.service";

export default class BoardAdmin extends Component{
    constructor(props){
        super(props);

        this.state={
            content:""
        };
    }

    componentDidMount(){
        UserService.getAdminBoard(
            response => {
                this.setState({
                    content : response.data
                });
            }
        ).then().catch(error => {
            console.log("sadad");
            this.setState({
                content:(
                    error.response &&
                    error.response.data  &&
                    error.response.data.message 
                ) || error.message || error.toSring()
            });
        });
      
        
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