import React, { Component } from "react";

import UserService from "../services/user.service";
import PurchaserequestDataService from "../services/purchaseRequest.service";
import PurchaserequestList from "../components/purchaserequest-list.component";


export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.removeAllPurchaseRequests = this.removeAllPurchaseRequests.bind(this);

    this.state = {
      content: ""
    };
  }

  
  removeAllPurchaseRequests() {
    PurchaserequestDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  componentDidMount() {
    UserService.getAdminBoard().then(
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
        <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPurchaseRequests}
          >
            Remove All
          </button>
          <button
            className="m-3 btn btn-sm btn-success"
          >
            Approve All
          </button>
      </div>
    );
  }
}