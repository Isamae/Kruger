import React, {Component} from "react";
import Form from 'react-validation/build/form';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail} from "validator";
import Select from 'react-select';
import userService from "../services/user.service";
import authService from "../services/auth-service";

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

export default class BoardUser extends Component{
    emptyItem = {
        lastname: "",
        name : "",
        email : "",
        ci : "",
        password : "",
        dosevaccine:{}
    };
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getProductItem =this.getProductItem.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onChangeSelectTypeVaccine = this.onChangeSelectTypeVaccine.bind(this);
        this.handleChangeVaccine = this.handleChangeVaccine.bind(this);

        this.state ={
            item: this.emptyItem,
            options : [
                { value: 'admin', label: 'admin' },
                { value: 'user', label: 'user' }
            ],
            typeVaccine:undefined,
            typesVaccine : [
                { value: 'Sputnik', label: 'Sputnik' },
                { value: 'AstraZeneca', label: 'AstraZeneca' },
                { value: 'Pfizer', label: 'Pfizer' },
                { value: 'JhonsonAndJhonson', label: 'Jhonson&Jhonson' }
            ],
            roles:undefined
            
            
        }
    }

    async componentDidMount() {
        this.getProductItem(authService.getCurrentUsers().id);
        
    }

    getProductItem(id) {
        userService.getUser(id)
        .then(response => {
            this.setState({
                item: response.data
            });

            let roles = [];
            response.data["roles"].forEach(rol => {
                var name = rol["name"].substring(5,rol.length).toLowerCase();
                roles.push({value:name,label:name})
            });

            this.setState({
                roles:roles
            });
            let item = {...this.state.item};
            item["roles"] = roles;
            this.setState({item});

            if(response.data["dosevaccine"]==null){
                item["dosevaccine"] = {};
                this.setState({item},() => {
                    console.log(this.state.item)
                });
              
            }
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

    handleChangeVaccine(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item['dosevaccine'][name] = value;
        this.setState(item);
    }

    handleRegister(e){
        e.preventDefault();
        const {item} = this.state;
        this.form.validateAll();
        if(this.checkBtn.context._errors.length === 0 && this.state.roles.length!==0){
            item["roles"] = this.state.roles;
            item["dosevaccine"]["typeVaccine"] =this.state.typeVaccine;
            
            console.log(item);
        }
    }

    onChangeSelect(e) {
        this.setState({ 
            roles: e
        })
    }

    onChangeSelectTypeVaccine(e){
        this.setState({ 
            typeVaccine: e
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
                        <div className="row">
                            <div className="form-group col-md-6">
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
                            <div className="form-group col-md-6">
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
                        </div>
                        <div className="row">   
                            <div className="form-group col-md-3">
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
                            <div className="form-group col-md-9">
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
                        </div>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label htmlFor="movil">Movil</label>
                                <Input
                                type="text"
                                className="form-control"
                                name="movil"
                                value={item.movil}
                                onChange={this.handleChange}
                                >
                                </Input>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="brithdate">Birth Date</label>
                                <Input
                                type="date"
                                className="form-control"
                                name="brithdate"
                                value={item.brithdate}
                                onChange={this.handleChange}
                                >
                                </Input>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="roles">Roles</label>
                                <Select
                                    value={this.state.roles}
                                    isMulti
                                    name="roles"
                                    options={this.state.options}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={this.onChangeSelect}
                                    validations={[required]}
                                />
                            </div>
                        </div> 
                        <div className="form-group ">
                            <label htmlFor="address">Address</label>
                            <Input
                            type="text"
                            className="form-control"
                            name="address"
                            value={item.address}
                            onChange={this.handleChange}
                            >
                            </Input>
                        </div>
                        <div className="row ms-4 mb-4 mt-4">
                            <h4>Vaccine</h4>
                            <div className="form-group col-md-4">
                                <label htmlFor="dateVaccined">Vaccined Date</label>
                                <Input
                                type="date"
                                className="form-control"
                                name="dateVaccined"
                                onChange={this.handleChangeVaccine}
                                >
                                </Input>
                            </div>

                            <div className="form-group col-md-4">
                                <label htmlFor="numberDose">Number Dose</label>
                                <Input
                                type="number"
                                className="form-control"
                                name="numberDose"
                                onChange={this.handleChangeVaccine}>
                                </Input>
                            </div>
                        
                            <div className="form-group col-md-4">
                                <label htmlFor="typeVaccine">Type Vaccine</label>
                                <Select
                                    name="typeVaccine"
                                    value={this.state.typeVaccine}
                                    options={this.state.typesVaccine}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={this.onChangeSelectTypeVaccine}
                                />
                            </div>
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