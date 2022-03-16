import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardEmployee from "./components/board-employee.component";
import BoardAdmin from "./components/board-admin.component";
import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import PurchaseRequestList from "./components/purchaserequest-list.component";
import Purchaserequest from "./components/purchaserequest.component";
import AddPurchaseRequest from "./components/add-purchaserequest.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showEmployeeBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        //only show boards after role verification
        showEmployeerBoard: user.roles.includes("ROLE_EMPLOYEE"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
    EventBus.on("logout", () => {
      this.logOut();
    });
  }
  componentWillUnmount() {
    EventBus.remove("logout");
  }
  
  logOut() {
    AuthService.logout();
    this.setState({
      showEmployeeBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  render() {
    const { currentUser, showEmployeeBoard, showAdminBoard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <Link to={"/"} className="navbar-brand">
            ReadBooks Online
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {showEmployeeBoard && (
              <li className="nav-item ">
                <Link to={"/employee"} className="nav-link">
                  Employee Control
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item " >
                <Link to={"/admin"} className="nav-link">
                  Admin Control
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/purchaserequests"} className="nav-link">
                Purchase Requests
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/employee" component={BoardEmployee} />
            <Route path="/admin" component={BoardAdmin} /> 
            <Route path="/purchaserequests/:id" component={Purchaserequest} />
            <Route path="/add" component={AddPurchaseRequest} />
            <Route path="/purchaserequests" component={PurchaseRequestList} />
          </Switch>
        </div>
        <AuthVerify logOut={this.logOut}/>
      </div>
    );
  }
}
export default withRouter(App);