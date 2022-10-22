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
        userService.getUserBoard().then(
            response => {
                this.setState({
                    content : response.data
                })
            }
        )
    }
}