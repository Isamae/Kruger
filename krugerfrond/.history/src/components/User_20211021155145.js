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
        ci : "",
        password : "",
        successful: false,
        message: ""
    };
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getProductItem =this.getProductItem.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);

        this.state ={
            item: this.emptyItem,
            options : [
                { value: 'admin', label: 'admin' },
                { value: 'user', label: 'user' }
            ],
            roles:[]
            
            
        }
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            this.getProductItem(this.props.match.params.id);
        }
    }

    getProductItem(id) {
        userService.getUser(id)
        .then(response => {
          

            this.setState({
                item: response.data
            },() => {
                console.log(this.state.item)
            });

            let roles = [];
            response.data["roles"].forEach(rol => {
                var name = rol.toSring().substring(5,rol.length).toLowerCase();
                roles.push({value:name,label:name})
            });

            this.setState({
                roles:roles
            },() => {
                console.log(this.state.roles)
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

    handleRegister(e){
        e.preventDefault();
        const {item} = this.state;
        this.form.validateAll();
        if(this.checkBtn.context._errors.length === 0 && this.state.roles.length!==0){
            if(item.id){

            }
            else{
                item["roles"] = this.state.roles;
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

    onChangeSelect(e) {
        this.setState({ 
            roles: e
        })
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
                            value={item.name}
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
                            value={item.lastname}
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
                            value={item.ci}
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
                            value={item.email}
                            onChange={this.handleChange}
                            validations={[required,email]}>
                            </Input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="roles">Roles</label>
                            <Select
                                value={item.roles}
                                isMulti
                                name="roles"
                                options={this.state.options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={this.onChangeSelect}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={item.password}
                            onChange={this.handleChange}
                            validations={[required,vpassword]}>
                            </Input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Save</button>
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