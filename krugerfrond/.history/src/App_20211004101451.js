
import React, { Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import authService from './services/auth-service';

import BoardAdmin from './components/BoardAdmin';
import BoardUser from './components/BoardUser';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';


class App extends Component {
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state ={
      showUserBoard:false,
      showAdminBoard:false,
      currentUser:undefined
    };
  }

  componentDidMount(){
    const user = authService.getCurrentUsers();
    if(user){
      this.setState({
        currentUser: authService.getCurrentUsers(),
        showAdminBoard: user.roles.includes("ROLE_USER"),
        showUserBoard: user.roles.includes("ROLE_ADMIN")
      })
    }
  }

  logOut(){
    authService.logout();
  }

  render() {
    const {currentUser, showAdminBoard, showUserBoard} = this.state;
    return (
      <Router>
        <div>
          <nav className="navbar navbr-expand navbar-dark bg-drak">
            <link to={"/"} className="navbar-brand">
              Kruger
            </link>
            <div className = "navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              {
                showUserBoard && (
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      User Moard
                    </Link>
                  </li>
                )
              }

              {
                showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Admin Moard
                    </Link>
                  </li>
                )
              }
            </div>
            {
                currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        {currentUser.username}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        LogOut
                      </a>
                    </li>
                  </div>
                  

                ) :(
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/register" className="nav-link">
                        Sign Up
                      </a>
                    </li>
                  </div>
                )
              }
          </nav>
          <div className="container mt-3">
              <Route exact path={["/","/home"]} component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/register"component={Register}></Route>
              <Route exact path="/profile"component={Profile}></Route>
              <Route exact path="/user"component={BoardUser}></Route>
              <Route exact path="/admin"component={BoardAdmin}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;