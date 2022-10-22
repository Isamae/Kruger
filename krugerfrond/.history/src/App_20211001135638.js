
import { Component, useReducer } from 'react';
import { Router } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';
import authService from './services/auth-service';

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
            </div>
          </nav>
        </div>
      </Router>
    );
  }
}

export default App;