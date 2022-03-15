import React, { Component } from "react";
import PurchaserequestDataService from "../services/purchaseRequest.service";
import { Link } from "react-router-dom";

export default class PurchaseRequestList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrievePurchaseRequests = this.retrievePurchaseRequests.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePurchaseRequests = this.setActivePurchaseRequests.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      purchaserequests: [],
      currentPurchaseRequest: null,
      currentIndex: -1,
      searchTitle: " "
    };
  }

  componentDidMount() {
    this.retrievePurchaseRequests();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrievePurchaseRequests() {
    PurchaserequestDataService.getAll()
      .then(response => {
        this.setState({
          purchaserequests: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePurchaseRequests();
    this.setState({
      currentPurchaseRequest: null,
      currentIndex: -1
    });
  }

  setActivePurchaseRequests(purchaserequest, index) {
    this.setState({
      currentPurchaseRequest: purchaserequest,
      currentIndex: index
    });
  }

  searchTitle() {
    this.setState({
      currentPurchaseRequest: null,
      currentIndex: -1
    });
    PurchaserequestDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          purchaserequests: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, purchaserequests, currentPurchaseRequest, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Purchase Requests List</h4>

          <ul className="list-group">
            {purchaserequests &&
              purchaserequests.map((purchaserequest, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePurchaseRequests(purchaserequest, index)}
                  key={index}
                >
                  {purchaserequest.bookTitle}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentPurchaseRequest ? (
            <div>
              <h4>Purchase Request</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentPurchaseRequest.bookTitle}
              </div>
              <div>
                <label>
                  <strong>Book Author:</strong>
                </label>{" "}
                {currentPurchaseRequest.bookAuthor}
              </div>
              <div>
                <label>
                  <strong>Book type:</strong>
                </label>{" "}
                {currentPurchaseRequest.bookType}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPurchaseRequest.requested ? "Requested" : "Pending"}
              </div>
              <div>
                <label>
                  <strong>Created at:</strong>
                </label>{" "}
                {currentPurchaseRequest.createdAt}
              </div>
              <Link
                to={"/purchaserequests/" + currentPurchaseRequest.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
              <br/>
              <Link to={"/add"}  className="badge badge-success">
                Add Purchase Requests
            </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Purchaserequest...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}