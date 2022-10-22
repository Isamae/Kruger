import React, {Component} from "react";
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail} from "validator";
import Select from 'react-select';
import userService from "../services/user.service";
const required = value => {
    if(!value){
        return(
            <div className="alert alert-danger" role="alert">
                This field is requiered
            </div>
        );
    }
};

const email = value => {
    if(!isEmail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                This is not a valid email
            </div>
        );
    }
};

const vCI = value => {
    if(value.length !== 10){
        return(
            <div className="alert alert-danger" role="alert">
                The CI must be 10 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if(value.length < 6 || value.length>40){
        return(
            <div className="alert alert-danger" role="alert">
                The password must be berwwen 6 and 40 characters.
            </div>
        );
    }
};

const vname = value => {
    if(value.length < 3 || value.length>20){
        return(
            <div className="alert alert-danger" role="alert">
                The password must be berwwen 3 and 20 characters.
            </div>
        );
    }
};

const vlastname = value => {
    if(value.length < 3 || value.length>20){
        return(
            <div className="alert alert-danger" role="alert">
                The password must be berwwen 3 and 20 characters.
            </div>
        );
    }
};

export default class User extends Component{
    emptyItem = {
        lastname: "",
        name : "",
        email : "",
        CI : "",
        password : "",
        successful: false,
        message: ""
    };
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getProductItem =this.getProductItem.bind(this);

        this.state ={
            item: this.emptyItem
            
        }
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            this.getProductItem();
        }
    }

    getProductItem(id) {
        userService.getUsers(id)
        .then(response => {
            this.setState({
                currentProduct: response.data,
            },() => {
                console.log(this.state.currentProduct)
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async  handleRegister(e){
        e.preventDefault();
        const {item} = this.state;
        this.form.validateAll();
        if(this.checkBtn.context._errors.length === 0){
            if(item.id){

            }
            else{
                userService.userSave(
                    item
                ).then(
                    response => {
                        this.props.history.push('/admin');
                    }, 
                    error => {
                        const resMessage =(
                            error.response &&
                            error.response.data  &&
                            error.response.data.message 
                        ) || error.message || error.toSring();
                        
                        this.setState({
                            message:resMessage
                        })
                    }
                )
            }
        }
    }

    render(){
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit User' : 'Add User'}</h2>
        return(
            <div className="col-md-12">
                <div className="card card-container">
                    {title}
                    <Form onSubmit = {this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            validations={[required,vname]}>
                            </Input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <Input
                            type="text"
                            className="form-control"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            validations={[required,vlastname]}>
                            </Input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ci">CI</label>
                            <Input
                            type="text"
                            className="form-control"
                            name="ci"
                            value={this.state.CI}
                            onChange={this.handleChange}
                            validations={[required,vCI]}>
                            </Input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                            type="text"
                            className="form-control"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            validations={[required,email]}>
                            </Input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            validations={[required,vpassword]}>
                            </Input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            <Link
                                to={"/admin"}
                            >
                                <button type="button" className="btn btn-danger btn-block">Cancel</button>

                            </Link>
                        </div>
                        </div>
                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className="alert alert-danger"
                                    role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{display:"none"}}
                            ref = {
                                c => {
                                    this.checkBtn =c;
                                }
                            }
                        />
                    </Form>
                </div>
            </div>
        )
    }
}