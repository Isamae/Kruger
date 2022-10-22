import React,{Component} from "react";
import userService from "../services/user.service";

export default class Home extends Component{
    constructor(props){
        super(props);

        this.state={
            content:""
        };
    }

    componentDidMount(){
        userService.getPublicContent().then(
            response => {
                console.log("error 1" +response.data);
                this.setState({
                    content : response.data
                });
            }
        ).catch(
            error => {
                console.log("error 2");
                this.setState({
                    content:(
                        error.response &&
                        error.response.data
                    ) || error.message || error.toSring()
                });
            }
        )
        
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