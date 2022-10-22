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
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username : "",
            password : "",
            loading : false,
            message: ""
        }

    }

    onChangePassword(e){
        this.setState({
            password : e.target.value
        })
    }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        })
    }

    handleLogin(e){
        e.preventDefault();
        
        this.setState({
            message:"",
            loading:true
        })

        this.form.validateAll();
        if(this.checkBtn.context._errors.length === 0){
            authService.login(this.state.username,this.state.password).then(
                () => {
                    this.props.history.push("/profile");
                    window.location.reload();
                },
                error => {
                    const resMessage = 
                    (error.responde &&
                        error.responde.data &&
                        error.responde.data.message) ||
                    error.message ||
                    error.toString();

                    this.setState({
                        loading:false,
                        message: resMessage
                    })
                }
            )
        }else{
            this.setState({
                loading:false
            })
        }
    }

    render(){
        return(
            <div className="col-md-12">
                <div className="card card-container">
                    <Form onSubmit={this.handleLogin}
                    ref={c => {
                        this.form = c;
                    }

                    }>

                    </Form>
                </div>
            </div>
        )
    }
}