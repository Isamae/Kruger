
import { Component, useReducer } from 'react';
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
    return (
      <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={"/orders"} className="navbar-brand">
                Blaze
              </Link>
              <div className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <Link to={"/orders"} className="nav-link">
                          Orders
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/products"} className="nav-link">
                        Products
                      </Link>
                  </li>
              </div>
          </nav>

          <div className="container mt-3">
              <Switch>
                  <Route exact path="/products" component={ProductComponent} />
                  <Route exact path={["/", "/orders"]} component={OrderComponent} />
                  <Route exact path="/products/product" component={AddProductComponent} />
                  <Route exact path="/orders/order" component={AddOrderComponent} />
                  <Route exact path="/products/product/:id" component={EditProductComponent} />
                  <Route exact path="/orders/order/:id" component={EditOrderComponent} />
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;