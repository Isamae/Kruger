import React,{Component} from "react";
import UserService from "../services/user.service";

export default class BoardAdmin extends Component{
    constructor(props){
        super(props);

        this.state={
            users  : [],
            paginateOrder : [],
            pageCount : 0,
            pages : [],
            paginatePages: [],
            currentPage : 1,
            pageSize: 10,

        };
    }

    componentDidMount(){
        UserService.getUsers().then(
            response => {
                this.setState({
                    content : response.data
                });
            }
        ).catch( error => {
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