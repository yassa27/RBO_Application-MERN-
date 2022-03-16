import React, { Component } from "react";
import UserService from "../services/user.service";
import PurchaserequestList from "../components/purchaserequest-list.component";

//employee view
export default class BoardEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getEmployeeBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <PurchaserequestList />
        <div className="list row">
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPurchaseRequests}
          >
            Remove All
          </button>
          <button
            className="m-3 btn btn-sm btn-success"
          >
            Allocate All
          </button>
          </div>
      </div>
    );
  }
}